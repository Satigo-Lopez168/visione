"use client"
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { useEffect, useState, useRef} from "react";

export default function Home() {
  const [clickCounter, setClickCounter] = useState(0)
  const [startAnimation, setStartAnimation] = useState(false)
  const container=useRef(null)
  const clickTextElement=useRef(null)
  gsap.registerPlugin(useGSAP);
  useGSAP(()=>{
   gsap.to(clickTextElement.current, { scaleX:2, duration: 0.050, ease:"elastic",yoyo:true,repeat:1 }) 
  },{
    scope:container,
    dependencies:[clickCounter]
  })
  return (
    <div ref={container} className="bg-purple-500 flex flex-col gap-20" >

      <button className="w-xl h-1/3 border-solid border-2 self-center" onClick={() => {
        setClickCounter(clickCounter + 1)
        setStartAnimation(true)
      }}>click</button>
      <div ref={clickTextElement} className={`flex justify-center text-white ${startAnimation && 'animation-ping'}`}>haz hecho <div className="px-1"> {` ${clickCounter} `} </div> clicks </div>
    </div>

  );
}
