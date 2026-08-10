"use client"
import { gsap } from "gsap";
import { useEffect, useState } from "react";

export default function Home() {
  const [clickCounter, setClickCounter] = useState(0)
  const [startAnimation, setStartAnimation] = useState(false)

  const clickTextElement= gsap.to("#click-element", { rotation: 360, duration: 1, ease: "elastic" })
  useEffect(()=>{
    clickTextElement.play()
  },[clickCounter])
  return (
    <div className="bg-purple-500 flex flex-col">

      <button onClick={() => {
        setClickCounter(clickCounter + 1)
        setStartAnimation(true)
      }}>click</button>
      <div id="click-element" className={`flex justify-center text-white ${startAnimation && 'animation-ping'}`}>haz hecho {clickCounter} clicks </div>
    </div>

  );
}
