
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
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI()

origins = [
    "http://localhost",
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


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
        def getTotalMarketData(result, stock_prices, stocks):
            portfolio_sel = np.argwhere(result.samples[0].x).reshape(-1)
            output = []
            if stock_prices._data:
                portfolio_sum = []
                for (cnt, s) in enumerate(stocks):
                    start = stock_prices._data[cnt][0]
                    eq = stock_prices._data[cnt] / start
                    if cnt in portfolio_sel:
                        portfolio_sum.append(eq)
                        output.append([s + "(Selected)", eq])
                    else:
                        output.append([s, eq])
                sab = sum(portfolio_sum)
                output.append(["PV", sab/budget])
                return output
            else:
                return

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

            return lines
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
        return {
            'raw': display_values(result, stocks),
            'data': getTotalMarketData(result, data, stocks),
            'start': str(startDatetime),
            'end': str(endDatetime)
        }
    except QiskitFinanceError as ex:
        return ex


class Query(BaseModel):
    stocks: list[str]
    risk: float
    budget: int

@app.post("/")
async def root(query: Query):
    return quant(stocks=query.stocks, startDatetime=datetime.datetime(2020, 1, 1), 
                 endDatetime=datetime.datetime(2023, 4, 7), 
                 budget=query.budget, 
                 risk=query.risk
                )
