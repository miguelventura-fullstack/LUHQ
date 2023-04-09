
from pydantic import BaseModel
from qiskit import Aer
from qiskit.circuit.library import TwoLocal, EfficientSU2
from qiskit.algorithms.optimizers import SPSA
from qiskit_finance.applications.optimization import PortfolioOptimization
from qiskit.algorithms import VQE
from qiskit_optimization.algorithms import MinimumEigenOptimizer
from pandas.plotting import register_matplotlib_converters
import matplotlib.pyplot as plt
from qiskit import IBMQ
import datetime
from qiskit_finance.data_providers import *
from qiskit_finance import QiskitFinanceError
import numpy as np
from fastapi import FastAPI

app = FastAPI()


def plot_portfolio_against_market(result, stock_prices):
    portfolio_sel = np.argwhere(result.samples[0].x).reshape(-1)
    fig, ax = plt.subplots(figsize=(8, 6))
    if stock_prices._data:
        portfolio_sum = []
        for (cnt, s) in enumerate(stocks):
            start = stock_prices._data[cnt][0]
            eq = stock_prices._data[cnt] / start
            if cnt in portfolio_sel:
                portfolio_sum.append(eq)
                ax.plot(eq, label=f"{s} (Selected)", linestyle="--", alpha=0.5)
            else:
                ax.plot(eq, label=s, alpha=0.15)
        sab = sum(portfolio_sum)
        # This has no purpose besides shifting the color because I don't like brown
        next(ax._get_lines.prop_cycler)
        ax.plot(sab/budget, label="Portfolio Value")
        ax.set_title("Portfolio Performance")
        ax.legend()
        plt.xticks(rotation=90)
        plt.show()

    else:
        print('No wiki data loaded.')


def quant(stocks, startDatetime, endDatetime, budget, risk):
    try:
        data = YahooDataProvider(
            tickers=stocks,
            start=startDatetime,
            end=endDatetime,
        )
        data.run()

        mu = data.get_period_return_mean_vector()
        sigma = data.get_period_return_covariance_matrix()

        def display_values(vqe_result, stocks):
            lines = []
            for result in vqe_result.samples[:5]:
                qubits, value, probability = result.x, result.fval, result.probability
                q_str = str(qubits.astype(int)).ljust(16)
                arr = np.array(qubits)
                opt = [str(stock[0]) +
                       ' ' for stock in np.take(stocks, np.argwhere(arr))]
                opt_str = "".join(opt).ljust(16)
                lines.append(
                    (opt_str, f'{q_str} {opt_str} {round(value,4)} \t {round(probability,4)}'))

            return lines[0][0]
            # print('\n------------------------ Top Results ------------------------')
            # print('solution \t stocks \t value \t\t probability')
            # print('--------------------------------------------------------------')
            # [print(p[1]) for p in lines]
            # print('--------------------------------------------------------------')

        num_assets = len(stocks)
        q = risk  # set risk factor

        penalty = num_assets  # set parameter to scale the budget penalty term

        portfolio = PortfolioOptimization(
            expected_returns=mu, covariances=sigma, risk_factor=q, budget=budget
        )
        qp = portfolio.to_quadratic_program()

        tunable_circuit = EfficientSU2(
            num_qubits=num_assets, reps=3, entanglement='full')

        optimizer = SPSA(maxiter=15)

        method = VQE(ansatz=tunable_circuit,
                     optimizer=optimizer,
                     quantum_instance=Aer.get_backend('qasm_simulator'))

        tunable_circuit.decompose().draw()

        # Solve the Problem
        calc = MinimumEigenOptimizer(method)
        result = calc.solve(qp)
        # Display Results
        return display_values(result, stocks)
    except QiskitFinanceError as ex:
        return ex


class Query(BaseModel):
    stocks: list[str]
    risk: float
    budget: int

@app.post("/")
async def root(query: Query):
    return quant(stocks=query.stocks, startDatetime=datetime.datetime(
        2018, 1, 1), endDatetime=datetime.datetime(2023, 4, 7), budget=query.budget, risk=query.risk)
