"use client"
import Image from "next/image";
import { useState } from "react";

export default function Home() {
 const[clickCounter,setClickCounter] = useState(0)
 const[startAnimation,setStartAnimation] = useState(false)
  return (
    <div className="bg-purple-500 flex flex-col">
    
   <button onClick={()=>{
    setClickCounter(clickCounter +1)
   setStartAnimation(true)
   }}>click</button> 
   <div className={`flex justify-content-center text-white ${startAnimation && 'animation-ping'}`}>haz hecho {clickCounter} clicks </div>
    </div>
    
  );
}
