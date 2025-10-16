import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'
import Button from '@mui/material/Button'
import PasswordIcon from '@mui/icons-material/Password'
import LockResetIcon from '@mui/icons-material/LockReset'
import LockIcon from '@mui/icons-material/Lock'
import LogoutIcon from '@mui/icons-material/Logout'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Paper from '@mui/material/Paper'
import { useTheme } from '@mui/material/styles'
import SecurityIcon from '@mui/icons-material/Security'

import { FIELD_REQUIRED_MESSAGE, PASSWORD_RULE, PASSWORD_RULE_MESSAGE } from '~/utils/validators'
import FieldErrorAlert from '~/components/Form/FieldErrorAlert'
import { useForm } from 'react-hook-form'
import { useConfirm } from 'material-ui-confirm'
import { useDispatch } from 'react-redux'
import { updateUserAPI, logoutUserAPI } from '~/redux/user/userSlice'
import { toast } from 'react-toastify'

function SecurityTab() {
  const dispatch = useDispatch()
  const theme = useTheme()
  const { register, handleSubmit, watch, formState: { errors } } = useForm()

  const confirmChangePassword = useConfirm()

  const submitChangePassword = (data) => {
    confirmChangePassword({
      title: (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <SecurityIcon sx={{ color: 'warning.main' }} />
          <Typography variant="h6" component="span">
            Change Password
          </Typography>
        </Box>
      ),
      description: 'You will need to login again after successfully changing your password. Do you want to continue?',
      confirmationText: 'Confirm',
      cancellationText: 'Cancel',
      confirmationButtonProps: {
        variant: 'contained',
        color: 'warning',
        sx: { borderRadius: 2 }
      },
      cancellationButtonProps: {
        variant: 'outlined',
        sx: { borderRadius: 2 }
      }
    }).then(() => {
      const { current_password, new_password } = data

      toast.promise(
        dispatch(updateUserAPI({ current_password, new_password })),
        { pending: 'Updating password...' }
      ).then(res => {
        if (!res.error) {
          toast.success('Successfully changed your password. Please login again.')
          dispatch(logoutUserAPI(false))
        }
      })
    }).catch(() => {})
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
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1, mb: 2 }}>
              <SecurityIcon 
                sx={{ 
                  fontSize: 40,
                  color: theme.palette.primary.main 
                }} 
              />
              <Typography 
                variant="h4" 
                component="h1"
                sx={{ 
                  fontWeight: 600,
                  color: theme.palette.primary.main
                }}
              >
                Security Settings
              </Typography>
            </Box>
            <Typography variant="body1" color="text.secondary">
              Manage your password and account security
            </Typography>
          </Box>

          {/* Password Change Section */}
          <Paper 
            elevation={1} 
            sx={{ 
              p: 4, 
              borderRadius: 2,
              background: `linear-gradient(135deg, ${theme.palette.warning.light}10, ${theme.palette.error.light}10)`,
              border: `1px solid ${theme.palette.warning.light}20`
            }}
          >
            <Typography 
              variant="h6" 
              gutterBottom 
              sx={{ 
                fontWeight: 600, 
                mb: 3,
                display: 'flex',
                alignItems: 'center',
                gap: 1
              }}
            >
              <LockIcon color="warning" />
              Change Password
            </Typography>
            
            <form onSubmit={handleSubmit(submitChangePassword)}>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                <Box>
                  <TextField
                    fullWidth
                    label="Current Password"
                    type="password"
                    variant="outlined"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <PasswordIcon fontSize="small" color="action" />
                        </InputAdornment>
                      )
                    }}
                    {...register('current_password', {
                      required: FIELD_REQUIRED_MESSAGE,
                      pattern: {
                        value: PASSWORD_RULE,
                        message: PASSWORD_RULE_MESSAGE
                      }
                    })}
                    error={!!errors['current_password']}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 2
                      }
                    }}
                  />
                  <FieldErrorAlert errors={errors} fieldName={'current_password'} />
                </Box>

                <Box>
                  <TextField
                    fullWidth
                    label="New Password"
                    type="password"
                    variant="outlined"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <LockIcon fontSize="small" color="action" />
                        </InputAdornment>
                      )
                    }}
                    {...register('new_password', {
                      required: FIELD_REQUIRED_MESSAGE,
                      pattern: {
                        value: PASSWORD_RULE,
                        message: PASSWORD_RULE_MESSAGE
                      }
                    })}
                    error={!!errors['new_password']}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 2
                      }
                    }}
                  />
                  <FieldErrorAlert errors={errors} fieldName={'new_password'} />
                </Box>

                <Box>
                  <TextField
                    fullWidth
                    label="Confirm New Password"
                    type="password"
                    variant="outlined"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <LockResetIcon fontSize="small" color="action" />
                        </InputAdornment>
                      )
                    }}
                    {...register('new_password_confirmation', {
                      validate: (value) => {
                        if (value === watch('new_password')) return true
                        return 'Password confirmation does not match.'
                      }
                    })}
                    error={!!errors['new_password_confirmation']}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 2
                      }
                    }}
                  />
                  <FieldErrorAlert errors={errors} fieldName={'new_password_confirmation'} />
                </Box>

                <Button
                  className="interceptor-loading"
                  type="submit"
                  variant="contained"
                  color="warning"
                  fullWidth
                  sx={{
                    borderRadius: 2,
                    py: 1.5,
                    textTransform: 'none',
                    fontSize: '1rem',
                    fontWeight: 600,
                    boxShadow: theme.shadows[2],
                    '&:hover': {
                      boxShadow: theme.shadows[4],
                      backgroundColor: theme.palette.warning.dark
                    },
                    mt: 2
                  }}
                >
                  Change Password
                </Button>
              </Box>
            </form>
          </Paper>

          {/* Security Tips Section */}
          <Paper 
            elevation={0} 
            sx={{ 
              p: 3, 
              mt: 3, 
              borderRadius: 2,
              backgroundColor: theme.palette.info.light + '10',
              border: `1px solid ${theme.palette.info.light}30`
            }}
          >
            <Typography 
              variant="h6" 
              gutterBottom 
              sx={{ 
                fontWeight: 600,
                color: theme.palette.info.dark,
                display: 'flex',
                alignItems: 'center',
                gap: 1
              }}
            >
              <SecurityIcon />
              Security Tips
            </Typography>
            <Box component="ul" sx={{ pl: 2, m: 0, color: 'text.secondary' }}>
              <Typography component="li" variant="body2" sx={{ mb: 1 }}>
                Use a strong password with at least 8 characters
              </Typography>
              <Typography component="li" variant="body2" sx={{ mb: 1 }}>
                Include uppercase letters, numbers, and special characters
              </Typography>
              <Typography component="li" variant="body2">
                Avoid using personal information in your password
              </Typography>
            </Box>
          </Paper>
        </CardContent>
      </Card>
    </Box>
  )
}

export default SecurityTab  