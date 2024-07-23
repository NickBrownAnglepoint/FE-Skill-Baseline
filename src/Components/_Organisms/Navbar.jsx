import { Box, TabNav } from '@radix-ui/themes'
import { NavLink} from 'react-router-dom'

import dogIcon from './../../assets/dog.png'

const Navbar = () => {
  return (
    <Box
        py="5"
        style={{ backgroundColor: 'var(--gray-a2)',height: '38px', display:'flex', justifyContent:'start', alignItems:'center'}}
    >
      <img src={dogIcon} alt="" style={{ height: '35px', margin: '0 2em' }} />
      <TabNav.Root>
        <NavLink
          to="/"
        >
          {({ isActive}) => (
            <TabNav.Link active={isActive ? true : false}>Home { isActive }</TabNav.Link>
          )}
        </NavLink>
        <NavLink
          to="/about"
        >
          {({ isActive}) => (
            <TabNav.Link active={isActive ? true : false}>About { isActive }</TabNav.Link>
          )}
        </NavLink>
      </TabNav.Root>
    </Box>
  )
}

export default Navbar