import React from 'react'
import Box from '@mui/material/Box'
import Card from './Card/Card'
import {SortableContext, verticalListSortingStrategy} from '@dnd-kit/sortable';
function ListCards({cards}) {
     
    return (
        
        <SortableContext items={cards?.map(card =>card._id)} strategy={verticalListSortingStrategy}>
        <Box sx={{
            p: '0 100px',
            m: '0 5px',
            display: 'flex',
            flexDirection: 'column',
            gap: 1.5,
            p: 2,
            overflowX: 'hidden',
            overflowY: 'auto',
            maxHeight: (theme) => `calc(
          ${theme.trelloCustom.boardContentHeight} -
          ${theme.spacing(5)} -
          ${theme.trelloCustom.columnHeaderHeight} -
          ${theme.trelloCustom.columnFooterHeight}
            
          )`,
            "&::-webkit-scrollbar-thumb": {
                backgroundColor: '#ced0da',
            },
            "&::-webkit-scrollbar-thumb:hover": {
                backgroundColor: "#bfc2cf",
            },

        }}>
            {cards?.map(card => <Card key={card._id} card={card} />)}

        </Box>
        </SortableContext>
    )
}

export default ListCards