import Image from 'next/image'
import { Inter } from 'next/font/google'
import React from 'react'
import {allStocks} from './data/stockData.json'
import bkg from "./svgs/landing.png";
import figure from "./svgs/figure.png"
import luhq from "./svgs/luhq.png";
import * as d3 from 'd3';

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


  function handleUpdateStocks(){
    setStock(allStocks)
  }
  function handleBudgetIncrease(){
    setBudget(budget+1)
  }
  function handleBudgetDecrease(){
    setBudget(budget-1)
  }
  function handleBudgetSet(e:any){
    setBudget(e)
  }
  return (
    <div className="w-screen h-screen overflow-hidden bg-white relative">
      <Image src={bkg} alt="pp" className=" absolute w-screen h-screen object-cover z-0 brightness-150" />
    
      <div className='absolute origin-center translate-y-[120px] translate-x-[30%] font-sfpro flex-col space-y-3  z-1 items-center'> {/*Regular Text*/}
        <p className="text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pinkish to-purplish font-agxb text-center  ">PROPEL YOUR PORTFOLIO</p>
        <p className='text-3xl font-light text-[#919093] text-center pb-10'>Revolutionize portfolio optimization with our quantum-powered actively managed ETFs</p>
        <div className='flex space-x-4 justify-center'>
          <div className='transition h-14 w-48 p-1 bg-gradient-to-r from-pinkish to-purplish text-xl rounded-2xl text-black font-extrabold tracking-wider flex justify-center items-center hover:ease-out duration-150 ease-in shadow'>
            <button className='w-full h-full bg-[#3C2F60] rounded-xl text-pinkish font-extrabold tracking-wider'>
              TRADE NOW
            </button>
          </div>
          <div className=' h-14 w-48 p-1 bg-gradient-to-r from-light-green to-[#68DAEE] text-xl rounded-2xl text-black font-extrabold tracking-wider flex justify-center items-center'>
            <button className='w-full h-full bg-black rounded-xl text-light-green font-extrabold tracking-wider'>
              EXPLORE
            </button>
          </div>
        </div>
      </div>
      <div className='absolute translate-y-[50px] translate-x-[12%] flex w-full z-1'>
        <div className='relative h-full w-full'>
          <Image src={luhq} alt = "pp" className='absolute left-0 top-0 w-[130px] y-[34px]' />
        </div>
        <div className='flex font-sfpro w-3/4 justify-center space-x-24 font-extrabold translate-y-2 text-gray-500'>
          <button className='tracking-[.16em] text-md '>MARKETS</button>
          <button className='tracking-[.16em] text-md '>TRADE</button>
          <button className='tracking-[.16em] text-md '>EXPLORE</button>
          <button className='tracking-[.16em] text-md '>ABOUT</button>
        </div>
      </div>
      <Image src={figure} alt="pp" className=" h-[800px] w-auto translate-x-[75%] translate-y-[45%] z-1 m-0" />

      
      
     <>
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
    </div>
  )
}
