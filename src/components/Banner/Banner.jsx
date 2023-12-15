import React from 'react'
import { makeStyles, Container} from '@mui/material'

const Banner = () => {
  return (
    <div className='Banner'>
        <Container className=''>
          <div>
            <h1 className='font-bold text-8xl flex flex-col justify-around' id='bannerContent'>
              CoinCanvas
            </h1>
            <p className='text-white text-xl text-center pt-2'>
              Everything About Crypto
            </p>
          </div>
          <div className='flex h-40 flex-col justify-center text-center'></div>
        </Container>
      
    </div>
  )
}

export default Banner
