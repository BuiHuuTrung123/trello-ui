import Box from '@mui/material/Box'
import ListColumns from './ListColumns/ListColumns'
import { mapOrder } from '~/utils/sort';
function BoardContent({board}) {
  const orderedColumns = mapOrder(board?.columns, board?.columnOrderIds,'_id')
  return (
    

    <Box sx={{
      width: '100%',
      display: 'flex',
      height: (theme) => theme.trelloCustom.boardContentHeight,
      bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#333643' : 'rgba(34, 114, 167, 1)'),
      overflowX: 'auto',
      overFloxY: 'hidden',
      p: '10px 0 0px 10px',

    }}>
    <ListColumns columns={orderedColumns} />

    </Box>


  )
}

export default BoardContent