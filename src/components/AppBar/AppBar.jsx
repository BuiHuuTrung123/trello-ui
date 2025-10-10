import React from 'react'
import { useState } from 'react';
import Box from '@mui/material/Box'
import ModeSelect from '~/components/ModeSelect/ModeSelect'
import AppsIcon from '@mui/icons-material/Apps'
import SvgIcon from '@mui/material/SvgIcon'
import { ReactComponent as TrelloIcon } from '~/assets/trello.svg'
import { Typography } from '@mui/material'
import Workspaces from './Menus/Workspaces'
import Recent from './Menus/Recent'
import Starred from './Menus/Starred'
import Templates from './Menus/Templates'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone'
import Badge from '@mui/material/Badge'
import Tooltip from '@mui/material/Tooltip'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'
import Profiles from './Menus/Profiles'
import LibraryAddIcon from '@mui/icons-material/LibraryAdd'
import InputAdornment from '@mui/material/InputAdornment'
import SearchIcon from '@mui/icons-material/Search'
import CloseIcon from '@mui/icons-material/Close'
import { Link } from 'react-router-dom'
function AppBar() {
    const [searchValue, setSearchValue] = useState('')

    return (
        <Box px={2} sx={{

            width: '100%',
            height: (theme) => theme.trelloCustom.appBarHeight,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 2,
            overflowX: 'auto',
            backgroundImage: (theme) =>
                theme.palette.mode === 'light'
                    ? "linear-gradient(135deg, #0052a3, #673ab7)" // xanh → tím
                    : "linear-gradient(135deg, #0d1b2a, #2c003e)",
            borderBottom: (theme) =>
                theme.palette.mode === 'light'
                    ? '1px solid rgba(255,255,255,0.15)'
                    : '1px solid rgba(255,255,255,0.05)',
            transition: 'background-image 0.4s ease',
        }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <AppsIcon sx={{ color: 'white' }} />
                <Link to="/">
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <SvgIcon component={TrelloIcon} inheritViewBox fontSize='small' sx={{ color: 'white' }} ></SvgIcon>
                        < Typography variant="span" sx={{ fontSize: '1.2rem', fontWeight: 'bold', color: 'white' }}>Trello</Typography>
                    </Box>
                </Link>
                <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 1 }}>
                    < Workspaces />
                    <Recent />
                    <Starred />
                    <Templates />
                </Box>

                <Button
                    sx={{ color: 'white', border: 'none', '&:hover': { border: 'none' } }}
                    variant="outlined"
                    startIcon={<LibraryAddIcon />}>
                    Create
                </Button>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <TextField
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon sx={{ color: 'white' }} />
                            </InputAdornment>
                        ),
                        endAdornment: (
                            <InputAdornment position="end">
                                <CloseIcon
                                    onClick={() => setSearchValue('')}
                                    fontSize='small'
                                    cursor='pointer'
                                    sx={{ color: searchValue ? '#bdc3c7' : 'transparent' }} />
                            </InputAdornment>
                        )
                    }}
                    id="outlined-search" label="Search..." type="text" size="small"
                    sx={{
                        minWidth: '120px', maxWidth: '170px',
                        '& label': { color: 'white' },
                        '& input': { color: 'white' },
                        '& label.Mui-focused': { color: 'white' },
                        '& .MuiOutlinedInput-root': {
                            '& fieldset': {
                                borderColor: 'white'
                            },
                            '&:hover fieldset': {
                                borderColor: 'white'
                            },
                            '&.Mui-focused fieldset': {
                                borderColor: 'white'
                            }
                        }
                    }} />
                <ModeSelect />
                <Tooltip title="Notifycation">
                    <Badge color="warning" variant="dot" sx={{ cursor: 'pointer' }}>
                        <NotificationsNoneIcon sx={{ color: 'white' }} />
                    </Badge>
                </Tooltip>
                <Tooltip title="Help">
                    <HelpOutlineIcon sx={{ cursor: 'pointer', color: 'white' }} />
                </Tooltip>
                <Profiles />
            </Box>

        </Box>
    )
}

export default AppBar