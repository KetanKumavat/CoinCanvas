import React from 'react'
import { makeStyles, Container} from '@mui/material'
import Carousel from './Carousel';
const Banner = () => {
  return (
    <div className='Banner'>
        <Container>
          <div>
            <h1 className='font-extrabold mt-[10vh] text-8xl flex flex-col justify-center cursor-default' id='bannerContent'>
              CoinCanvas
            </h1>
            <p className='text-black text-2xl font-bold text-center pt-2 cursor-default'>
              Everything About Crypto
            </p>
          </div>
      
          <Carousel/>
          {/* <Sample/> */}
        </Container>
      
    </div>
  )
}

export default Banner
