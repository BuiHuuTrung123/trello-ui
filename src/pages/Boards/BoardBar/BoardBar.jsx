import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip';
import DashboardIcon from '@mui/icons-material/Dashboard';
import VpnLockIcon from '@mui/icons-material/VpnLock';
import AddToDriveIcon from '@mui/icons-material/AddToDrive';
import BoltIcon from '@mui/icons-material/Bolt';
import FilterListIcon from '@mui/icons-material/FilterList';
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import Tooltip from '@mui/material/Tooltip'
import Button from '@mui/material/Button'
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import {capitalizeFirstLetter} from '~/utils/formatter'   
const MENU_STYLES = {

  color: 'white',
  bgcolor: 'transparent', border: 'none',
  paddingX: '5px', borderRadius: '4px',
  '&:hover': {
    bgcolor: 'primary.50'
  },
  border: 'none',
  borderRadius: ' 4px',
  '.MuiSvgIcon-root': {
    color: 'white'
  }

}
function BoardBar({board}) {


  return (
    <Box sx={{
      width: '100%',
      height: (theme) => theme.trelloCustom.boardBarHeight,
      display: 'flex',
      paddingX: 2,
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 2,
      overflowX: 'auto',
      bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#2f3640' : 'rgb(34, 114, 167, 1)')
    }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Chip
          sx={MENU_STYLES}
          icon={<DashboardIcon />}
          label={board?.title}
          clickable />
        <Chip
          sx={MENU_STYLES}
          icon={<VpnLockIcon />}
          label={capitalizeFirstLetter(board?.type)}
          clickable />
        <Chip
          sx={MENU_STYLES}
          icon={<AddToDriveIcon />}
          label="Add To Google Drive"
          clickable />
        <Chip
          sx={MENU_STYLES}
          icon={<BoltIcon />}
          label="Automation"
          clickable />
        <Chip
          sx={MENU_STYLES}
          icon={<FilterListIcon />}
          label="Filters"
          clickable />
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Button
          sx={{

            color: 'white',
            borderColor: 'white',
            '&:hover': { borderColor: 'white' }
          }}
          variant="outlined" startIcon={<PersonAddIcon />}>Invite</Button>
        <AvatarGroup max={3}
          sx={{
            gap: '10px',
            '& .MuiAvatar-root': {
              width: 34,
              height: 34,
              fontSize: 16,
              border:'none',
              color: 'white',
              cursor: 'pointer',
              '&:firts-of-type': {bgcolor: '#a4b0be'}
            }
          }}
        >

          <Tooltip title='trungbuidev'>
            <Avatar alt="trungbuidev" src="#" />
          </Tooltip>
          <Tooltip title='trungbuidev'>
            <Avatar alt="trungbuidev" src="#" />
          </Tooltip>
          <Tooltip title='trungbuidev'>
            <Avatar alt="trungbuidev" src="#" />
          </Tooltip>
          <Tooltip title='trungbuidev'>
            <Avatar alt="trungbuidev" src="#" />
          </Tooltip>
          <Tooltip title='trungbuidev'>
            <Avatar alt="trungbuidev" src="#" />
          </Tooltip>

        </AvatarGroup>
      </Box>
    </Box>
  )
}

export default BoardBar