import React from 'react'
import Box from '@mui/material/Box'
import ModeSelect from '../../components/ModeSelect'
function AppBar() {
  return (
       <Box sx={{
        backgroundColor: 'primary.contrastText',
        width: '100%',
        height: (theme) => theme.trelloCustom.appBarHeight,
        display: 'flex',
        alignItems: 'center'
      }}>
        <ModeSelect />
      </Box>
  )
}

export default AppBar