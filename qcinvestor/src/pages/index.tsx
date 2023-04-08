import Image from 'next/image'
import { Inter } from 'next/font/google'
import React from 'react'
import {allStocks} from './data/stockData.json'
import bkg from "./svgs/landing.png";
import figure from "./svgs/figure.png"
import line from "./svgs/line.png"

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
    <div className="w-screen h-screen overflow-hidden">
      <Image src={bkg} alt="pp" className=" absolute w-screen h-screen object-cover z-0" />
      <Image src={figure} alt="pp" className=" h-[80%] w-auto origin-left translate-x-[95%] translate-y-[25%] z-1" />
      
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
