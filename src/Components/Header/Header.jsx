import React from 'react'

import {Section, Box} from '@radix-ui/themes'

import dogIcon from './../../assets/dog.png'

const Header = () => {
  return (
    <Box
        py="5"
        style={{ backgroundColor: 'var(--gray-a2)',height: '38px', display:'flex', justifyContent:'start', alignItems:'center'}}
    >
          <img src={dogIcon} alt="" style={{ height: '35px', margin: '0 2em' }} />
    </Box>
  )
}

export default Header