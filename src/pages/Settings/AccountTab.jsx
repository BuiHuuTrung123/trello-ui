import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Avatar from '@mui/material/Avatar'
import Tooltip from '@mui/material/Tooltip'
import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'
import Button from '@mui/material/Button'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import MailIcon from '@mui/icons-material/Mail'
import AccountBoxIcon from '@mui/icons-material/AccountBox'
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Paper from '@mui/material/Paper'
import { useTheme } from '@mui/material/styles'

import { FIELD_REQUIRED_MESSAGE, singleFileValidator } from '~/utils/validators'
import FieldErrorAlert from '~/components/Form/FieldErrorAlert'
import { useSelector, useDispatch } from 'react-redux'
import { selectCurrentUser, updateUserAPI } from '~/redux/user/userSlice'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import VisuallyHiddenInput from '~/components/Form/VisuallyHiddenInput'

function AccountTab() {
  const dispatch = useDispatch()
  const currentUser = useSelector(selectCurrentUser)
  const theme = useTheme()

  const initialGeneralForm = {
    displayName: currentUser?.displayName
  }

  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: initialGeneralForm
  })

  const submitChangeGeneralInformation = (data) => {
    const { displayName } = data

    if (displayName === currentUser?.displayName) return

    toast.promise(
      dispatch(updateUserAPI({ displayName })),
      { pending: 'Updating ...' }
    ).then(res => {
      if (!res.error) { 
        toast.success('User updated successfully') 
      }
    })
  }

  const uploadAvatar = (e) => {
    const error = singleFileValidator(e.target?.files[0])
    if (error) {
      toast.error(error)
      return
    }

    let reqData = new FormData()
    reqData.append('avatar', e.target?.files[0])

    toast.promise(
      dispatch(updateUserAPI(reqData)),
      { pending: 'Updating ...' }
    ).then(res => {
      if (!res.error) { 
        toast.success('User updated successfully') 
      }
      e.target.value = ''
    })
  }

  if (!currentUser) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px' }}>
        <Typography variant="h6" color="text.secondary">
          Loading user data...
        </Typography>
      </Box>
    )
  }

  return (
    <Box sx={{
      width: '100%',
      minHeight: '100%',
      display: 'flex',
      alignItems: 'flex-start',
      justifyContent: 'center',
      py: 4,
      px: 2
    }}>
      <Card 
        sx={{ 
          maxWidth: '800px', 
          width: '100%',
          boxShadow: theme.shadows[3],
          borderRadius: 2,
          overflow: 'visible'
        }}
      >
        <CardContent sx={{ p: 4 }}>
          {/* Header Section */}
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <Typography 
              variant="h4" 
              component="h1" 
              gutterBottom
              sx={{ 
                fontWeight: 600,
                color: theme.palette.primary.main
              }}
            >
              Account Settings
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Manage your account information and preferences
            </Typography>
          </Box>

          {/* Profile Section */}
          <Paper 
            elevation={1} 
            sx={{ 
              p: 3, 
              mb: 4, 
              borderRadius: 2,
              background: `linear-gradient(135deg, ${theme.palette.primary.light}15, ${theme.palette.secondary.light}15)`
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, flexWrap: { xs: 'wrap', sm: 'nowrap' } }}>
              <Box sx={{ textAlign: 'center', flexShrink: 0 }}>
                <Avatar
                  sx={{ 
                    width: 100, 
                    height: 100, 
                    mb: 2,
                    border: `3px solid ${theme.palette.primary.main}`,
                    boxShadow: theme.shadows[2]
                  }}
                  alt={currentUser?.displayName}
                  src={currentUser?.avatar}
                />
                <Tooltip title="Upload a new image to update your avatar immediately">
                  <Button
                    component="label"
                    variant="outlined"
                    size="small"
                    startIcon={<CloudUploadIcon />}
                    sx={{
                      borderRadius: 2,
                      textTransform: 'none',
                      fontWeight: 500
                    }}
                  >
                    Change Avatar
                    <VisuallyHiddenInput type="file" onChange={uploadAvatar} />
                  </Button>
                </Tooltip>
              </Box>
              
              <Box sx={{ flexGrow: 1, minWidth: 0 }}>
                <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
                  {currentUser?.displayName}
                </Typography>
                <Typography 
                  variant="subtitle1" 
                  sx={{ 
                    color: 'text.secondary',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 0.5
                  }}
                >
                  @{currentUser?.username}
                </Typography>
                <Typography 
                  variant="body2" 
                  sx={{ 
                    color: 'text.secondary',
                    mt: 1,
                    display: { xs: 'none', sm: 'block' }
                  }}
                >
                  Update your avatar and personal information here. Your avatar will be visible to other users.
                </Typography>
              </Box>
            </Box>
          </Paper>

          {/* Form Section */}
          <Paper elevation={1} sx={{ p: 3, borderRadius: 2 }}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
              Personal Information
            </Typography>
            
            <form onSubmit={handleSubmit(submitChangeGeneralInformation)}>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                <TextField
                  disabled
                  defaultValue={currentUser?.email}
                  fullWidth
                  label="Email Address"
                  type="text"
                  variant="outlined"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <MailIcon fontSize="small" color="action" />
                      </InputAdornment>
                    )
                  }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2
                    }
                  }}
                />

                <TextField
                  disabled
                  defaultValue={currentUser?.username}
                  fullWidth
                  label="Username"
                  type="text"
                  variant="outlined"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <AccountBoxIcon fontSize="small" color="action" />
                      </InputAdornment>
                    )
                  }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2
                    }
                  }}
                />

                <Box>
                  <TextField
                    fullWidth
                    label="Display Name"
                    type="text"
                    variant="outlined"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <AssignmentIndIcon fontSize="small" color="action" />
                        </InputAdornment>
                      )
                    }}
                    {...register('displayName', {
                      required: FIELD_REQUIRED_MESSAGE
                    })}
                    error={!!errors['displayName']}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 2
                      }
                    }}
                  />
                  <FieldErrorAlert errors={errors} fieldName={'displayName'} />
                </Box>

                <Button
                  className="interceptor-loading"
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  sx={{
                    borderRadius: 2,
                    py: 1.5,
                    textTransform: 'none',
                    fontSize: '1rem',
                    fontWeight: 600,
                    boxShadow: theme.shadows[2],
                    '&:hover': {
                      boxShadow: theme.shadows[4]
                    }
                  }}
                >
                  Update Profile
                </Button>
              </Box>
            </form>
          </Paper>
        </CardContent>
      </Card>
    </Box>
  )
}

export default AccountTab