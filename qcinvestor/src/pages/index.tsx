import Image from 'next/image'
import { Inter } from 'next/font/google'
import React from 'react'
import {allStocks} from './data/stockData.json'
import bkg from "./svgs/landing.png";
import figure from "./svgs/figure.png"
import luhq from "./svgs/luhq.png";
import * as d3 from 'd3';
import explore from "./svgs/EXPLORE.png"
import calc from "./svgs/calculate.png"
import down from "./svgs/downarrow.png"
import up from "./svgs/uparrow.png"
import box from "./svgs/box.png"

const inter = Inter({ subsets: ['latin'] })


export default function Home() {
  const [stockData, setStock] = React.useState({
    stocks:[
    {
      ticker: "PLCH",
      title: "placeholder",
      id:"idk what the id looks like",
      weight: 0,
      stats: {
        max: 0,
        min: 0,
        average: 0,
        returns: 0,
        startDate: 0,
        endDate: 0,
        misc:[]
      },
      reccomendations:{
        reccvol: 0,
        reccprice: 0,

      }
    },
    {
      ticker: "PLCH",
      title: "placeholder",
      id:"idk what the id looks like",
      weight: 0,
      stats: {
        max: 0,
        min: 0,
        average: 0,
        returns: 0,
        startDate: 0,
        endDate: 0,
        misc:[]
      },
      reccomendations:{
        reccvol: 0,
        reccprice: 0,

      }
    },
    {
      ticker: "PLCH",
      title: "placeholder",
      id:"idk what the id looks like",
      weight: 0,
      stats: {
        max: 0,
        min: 0,
        average: 0,
        returns: 0,
        startDate: 0,
        endDate: 0,
        misc:[]
      },
      reccomendations:{
        reccvol: 0,
        reccprice: 0,

      }
    },
  ]
  });
  const [budget, setBudget] = React.useState(0);
  const [tempBudget, setTemp] = React.useState(0);
  const [risk, setRisk] = React.useState(5);
  const [userTickers, setTickers] = React.useState("AAPL, AMZN, MSFT, VOO");
  const [stockCombo, setCombo] = React.useState(3);
  const [recc, setRecc] = React.useState([
    " "," "," "," "," "
  ])
  const [dta, setDta] = React.useState([])
  const [display, setDisplay] = React.useState(0);

  async function getStocks(){
    const response = await fetch("http://localhost:80", {
      method: "POST",
      headers:{
        'Content-Type': "application/json"
      },
      body: JSON.stringify({
        "stocks": userTickers.split(", ",10),
        "risk": risk/10,
        "budget": stockCombo  
      })

    }).then(resp => resp.json())
    setRecc(response.raw);
    setDta(response.data);
    console.log(response)
    //createGraph()
  }
  function chooseDisplay(){
    switch(display){
      case 0:
        return landingPage()
      case 1:
        return dashboardPage()
    }
  }

  const createGraph = async () => {
    let map:Map<string,Array<Object>> = new Map()
    for(let r of dta){
      let obj = r[1]
      let tempArr:Array<Object> = []
      Object.entries(obj).forEach(val => {
        tempArr.push({date: (val[0]).toString, value: val[1]})
      })
      map.set(r[0], tempArr)
    }
    let data = map.get("PV")

    console.log(data)
    let parseTime = d3.timeParse("%Y-%m-%dT%I:%p:%S");
    data?.forEach((d) => {
      d.date = parseTime(d.date);
      d.value = +d.value;
    });
    // set the dimensions and margins of the graph
    var margin = { top: 20, right: 20, bottom: 50, left: 70 },
        width = 960 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom;
    // append the svg object to the body of the page

    var svg = d3.select("body").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left},     ${margin.top})`);

      // Add X axis and Y axis  
   var x = d3.scaleTime().range([0, width]);
   var y = d3.scaleLinear().range([height, 0]);
   x.domain(d3.extent(map.get("PV"), (d) => { return d.date; }));
   y.domain([0, d3.max(map.value, (d) => { return d.value; })]);
   svg.append("g")
   .attr("transform", `translate(0, ${height})`)
   .call(d3.axisBottom(x));
   svg.append("g")
   .call(d3.axisLeft(y));

    // add the Line
    var valueLine = d3.line()
                   .x((d) => { return x(d.date); })
                   .y((d) => { return y(d.value); });
    svg.append("path")
    .data([map])
    .attr("class", "line")
    .attr("fill", "none")
    .attr("stroke", "steelblue")
    .attr("stroke-width", 1.5)
    .attr("d", valueLine)
    console.log()
  }

  function landingPage(){
    return(
      <div className="flex  justify-center w-screen h-screen overflow-hidden bg-white relative">
        <Image src={bkg} alt="pp" className=" absolute w-screen h-screen object-cover z-0 brightness-150" />
        <div className='absolute flex-col w-full z-1 justify-center mt-10'>
          <div className='flex font-sfpro w-full justify-center space-x-24 font-extrabold translate-y-2 text-gray-500'>
            <button className='tracking-[.16em] text-md '>MARKETS</button>
            <button className='tracking-[.16em] text-md '>TRADE</button>
            <button className='tracking-[.16em] text-md '>EXPLORE</button>
            <button className='tracking-[.16em] text-md '>ABOUT</button>
          </div>
        </div>
        <div className='absolute flex origin-center translate-y-[80px] w-full font-sfpro flex-col space-y-3  z-1 items-center'> {/*Regular Text*/}
          <Image src={luhq} alt = "pp" className='-translate-y-8 -translate-x-[510px] left-0 top-0' />
          <p className="text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pinkish to-purplish font-agxb text-center  ">PROPEL YOUR PORTFOLIO</p>
          <p className='text-3xl font-light text-[#919093] text-center pb-10'>Revolutionize portfolio optimization with our quantum-powered actively managed ETFs</p>
          <div className='flex space-x-4 justify-center'>
            <div className='transition h-14 w-48 p-1 bg-gradient-to-r from-pinkish to-purplish text-xl rounded-2xl text-black font-extrabold tracking-wider flex justify-center items-center hover:ease-out duration-150 ease-in shadow'>
              <button onClick={(e) => setDisplay(1)}className='w-full h-full bg-[#3C2F60] rounded-xl text-pinkish font-extrabold tracking-wider'>
                TRADE NOW
              </button>
            </div>
            <div className=' h-14 w-48 p-1 bg-gradient-to-r from-light-green to-[#68DAEE] text-xl rounded-2xl text-black font-extrabold tracking-wider flex justify-center items-center'>
              <button onClick={(e) => setDisplay(1)} className='w-full h-full bg-black rounded-xl text-light-green font-extrabold tracking-wider'>
                EXPLORE
              </button>
            </div>
          </div>
        </div>
        
        <Image src={figure} alt="pp" className="h-[800px] w-auto translate-y-[45%] z-1 m-0" />
      </div>
    )
  }

  function dashboardPage(){
    return(
      <div className="flex w-screen h-screen overflow-hidden bg-white relative border-purplish"> 
        
        
        <Image src={explore} alt="" className="absolute object-cover h-screen w-screen brightness-100 z-0"/>
        <button onClick={(e) => setDisplay(0)} className='absolute left-[33%] top-10'>
          <Image src={luhq} alt = "pp" className='' />
        </button>
        <div className='flex absolute w-screen h-screen mt-10'>
          <div className='grid ml-20 mr-20 h-3/5 w-3/5 justify-center grid-cols-2 space-x-10 '> {/* The two control panels*/}
              <div className='flex flex-col justify-start mt-10 pl-16 pr-16 pt-4 h-full w-full'> {/* The first Panel */}
                 <p className='font-sfpro text-center text-2xl pt-2 pb-1'>Risk Level ({risk/10})</p>
                 <input type="range" min="1" max="100" step="1" value={risk} className="slider w-full bg-gradient-to-r from-pinkish to-purplish h-1 mt-10 mb-10 rounded-lg" id="myRange" onChange={(e) => setRisk(parseInt(e.target.value))}/>

                 <p className='font-sfpro text-center text-2xl pt-8 pb-1'>Stocks to Include</p>
                 <div className='w-full h-24 bg-gradient-to-bl from-pinkish to-purplish rounded-xl flex p-1'>
                  <input type='text' className=' bg-backblue rounded-lg w-full text border-none' placeholder="APPL, AMAZN, etc." value={userTickers} onChange={(e) => setTickers(e.target.value)} />
                 </div>
                
                <button className='self-center mt-20'>
                  <Image src={calc} alt="" onClick={(e) => getStocks()} className='transition ease-in-out delay-15 hover:-translate-y-1 hover:scale-125 duration-300' />
                </button>

              </div>
              <div className='lex flex-col justify-start mt-10 pl-16 pr-16 pt-4 h-full w-full'> {/* The second Panel */}
                
                <div>
                  <p className='font-sfpro text-center text-2xl pb-1'>Budget</p>
                  <div className='w-full h-12 bg-gradient-to-bl from-pinkish to-purplish rounded-xl flex p-1'>
                    <input type='text' className=' bg-backblue rounded-lg w-full text border-none text-center' value={budget} onChange={(e) => setBudget(parseInt(e.target.value))} />
                  </div>
                </div>
                
                
                <p className='font-sfpro text-center text-2xl pt-20 pb-1'>Stock per Combinations</p>
                <div className='flex justify-center'>
                  <div className='w-1/6 h-12 bg-gradient-to-bl from-pinkish to-purplish rounded-xl flex p-1'>
                    <input type='number' className=' bg-backblue rounded-lg w-full text border-none text-center' value={stockCombo} onChange={(e) => setCombo(parseInt(e.target.value))} />
                  </div>
                  <div className='flex-col flex scale-150 place-self-center ml-2'>
                    <button onClick={(e) => setCombo(stockCombo+1)}> 
                      <Image src={(up)} alt="" className='transition ease-in-out delay-15 hover:-translate-y-1 hover:scale-125 duration-300' />
                    </button>
                    <button onClick={(e) => setCombo(stockCombo-1)}> 
                      <Image src={(down)} alt="" className='transition ease-in-out delay-15 hover:translate-y-1 hover:scale-125 duration-300'/>
                    </button>
                  </div>
                </div>
              </div>
          </div>

          <div className=' grid h-[68.4%] w-2/5 mr-10 space-y-4'>
              <div className=' flex flex-col border-purplish bg-bluish border-2 space-y-16'> {/*Display 1*/}
                <p className="mt-3 text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pinkish to-purplish font-sfpro text-center  ">Reccomended Stocks</p>
                <>
                  {recc.map((el, index) =>
                    <div className='flex flex-row w-full justify-start pl-48'>
                      <div className='relative h-10 w-10 -translate-y-0.5 mr-4'>
                        <Image src={box} alt="" className='absolute' />
                        <p className='absolute ml-4 mt-1'>{index+1}</p>
                      </div>
                      <p>{el[0]}</p>
                    </div>
                  )
                    
                  } 
                  </>
              </div>
          </div>
          <div className='absolute flex flex-col h-[30%] w-[95.58%] m-10 bottom-4'> 
            <div className='border-purplish bg-bluish border-2 w-64 h-10 '> {/*Heading for Bottom Panel*/}

            </div>
            <div className='border-purplish bg-bluish border-2 w-full h-max flex-grow'> {/*Bottom Panel*/}
              bruh
            </div>
          </div>



        </div>
      </div>
    )
  }
  return (
    

      
      
     <>
     {chooseDisplay()}
     {/*
        <Image src={bkg} alt="pp" className="absolute w-screen h-screen object-cover x-0 y-0 z-0" />
        <div className='absolute p-24 bg-scroll flex flex-col justify-center z-10'>
            budget: {budget}
            <button onClick={handleBudgetIncrease}>
              increase moeny
            </button>
            <button onClick={handleBudgetDecrease}>
              decrease moeny
            </button>
            <input onSubmit={handleBudgetSet}></input>
        </div>
        <div className='absolute h-screen w-screen'>
          <main className= "flex flex-col items-center justify-between p-12 gap-16 z-10">
        
        {
          stockData.stocks.map((stock) => 
          <div className='flex justify-left items-center items-left flex-row  w-2/3 h-24 bg-white space-x-5 gap-4 p-4'>
          <p className='p-12 text-black bg-gray-400 rounded-xl'>stock</p> 
          <div className=' w-full grid grid-cols-1 grid-rows-1 gap-2'>
            <p className='bg-gray-400 text-black'>Weight: {stock.weight}</p> 
            <div className="flex">
              <p className=' bg-slate-600 w-1/5 underline'>Stats: </p> 
              <p className=' bg-slate-600 w-1/5'>Max: {stock.stats.max}</p>
              <p className=' bg-slate-600 w-1/5'>Min: {stock.stats.max}</p>
              <p className=' bg-slate-600 w-1/5'>Average: {stock.stats.max}</p>
              <p className=' bg-slate-600 w-1/5'>Expected Returns: {stock.stats.max}</p>
            </div>
            <div className="flex">
              <p className=' bg-slate-600 w-1/3 underline'>Reccomendations: </p> 
              <p className=' bg-slate-600 w-1/3'>Reccomended Price: {stock.reccomendations.reccprice}</p>
              <p className=' bg-slate-600 w-1/3'>Reccomended Volume: {stock.reccomendations.reccvol}</p>
            </div>
          </div>
        </div>
        )}
        <button onClick={handleUpdateStocks}>
          Update Stock Data
        </button>
      
          </main>
        </div>
        */}
      </>
  )
}
