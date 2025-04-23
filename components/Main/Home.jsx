import React from 'react'
import Slider from './Slider'
import HomeHeader from "../Menu/HomeHeader"
import Body from "./Body"
import HomeFooter from "../Menu/HomeFooter"


export default function Home() {
  return (
    <section className='homePage'>
        <HomeHeader/>
        <Slider/>
        <Body/>
        <HomeFooter/>
       
    </section>
  )
}
