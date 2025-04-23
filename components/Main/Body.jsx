import React from 'react'
import About from "./About"
import Discovery from "./Discovery"
import WellBeing from './WellBeing';
import Reviews from './Reviews';

export default function Body() {


  return (
    <div
    style={{
      backgroundImage: "url('https://nmtdevserver.com/welli/flowerbg.png')",
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",

    }}
  >
    <About/>
    <Discovery/>
    <WellBeing/>
    <Reviews/>
    </div>
  );
}
