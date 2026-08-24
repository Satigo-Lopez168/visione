"use client"
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { useEffect, useState, useRef} from "react";

export default function Home() {
  const [clickCounter, setClickCounter] = useState(0)
  const [startAnimation, setStartAnimation] = useState(false)
  const container=useRef(null)
  const clickTextElement=useRef(null)
  const buttonElement=useRef(null)
  gsap.registerPlugin(useGSAP);
  const { contextSafe } = useGSAP(()=>{
   gsap.to(clickTextElement.current, { scaleX:2, duration: 0.050, ease:"elastic",yoyo:true,repeat:1 })
  },{
    scope:container,
    dependencies:[clickCounter]
  })
  const handleClick = contextSafe(() => {
    setClickCounter(clickCounter + 1)
    setStartAnimation(true)
    gsap.fromTo(
      buttonElement.current,
      { scale: 0.85 },
      { scale: 1, duration: 0.6, ease: "elastic.out(1, 0.35)" }
    )
  })
  return (
    <div ref={container} className="bg-purple-500 flex flex-col items-center justify-center gap-20 m-auto w-[80vw] h-[80vh] p-10" >

      <button ref={buttonElement} className="w-40 h-1/3 rounded-full border-solid border-2 border-white text-white self-center transition-colors hover:bg-red-400 hover:border-white-400 hover:text-purple-900" onClick={() => {
        handleClick()
      }}>click me</button>
      <div ref={clickTextElement} className={`flex justify-center text-white ${startAnimation && 'animation-ping'}`}>haz hecho <div className="px-1"> {` ${clickCounter} `} </div> clicks </div>
    </div>

  );
}
