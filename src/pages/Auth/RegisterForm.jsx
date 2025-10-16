// TrungQuanDev: https://youtube.com/@trungquandev
import { Link, useNavigate } from 'react-router-dom'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Avatar from '@mui/material/Avatar'
import LockIcon from '@mui/icons-material/Lock'
import Typography from '@mui/material/Typography'
import { Card as MuiCard } from '@mui/material'
import { ReactComponent as TrelloIcon } from '~/assets/trello.svg'
import CardActions from '@mui/material/CardActions'
import TextField from '@mui/material/TextField'
import Zoom from '@mui/material/Zoom'
import { useForm } from 'react-hook-form'
import FieldErrorAlert from '~/components/Form/FieldErrorAlert'
import { registerUserAPI } from '~/apis'
import { toast } from 'react-toastify'
import { useTheme } from '@mui/material/styles'
import {
  FIELD_REQUIRED_MESSAGE,
  EMAIL_RULE,
  EMAIL_RULE_MESSAGE,
  PASSWORD_RULE,
  PASSWORD_RULE_MESSAGE,
  PASSWORD_CONFIRMATION_MESSAGE
} from '~/utils/validators'
import { createNewBoardAPI } from '~/apis'

function RegisterForm() {
  const { register, handleSubmit, formState: { errors }, watch } = useForm()
  const navigate = useNavigate()
  const theme = useTheme()

  const submitRegister = (data) => {
    const { email, password } = data
    toast.promise(registerUserAPI({ email, password }),
      { pending: 'Registration is in progress...' }
    ).then(user => {
      navigate(`/login?registeredEmail=${user.email}`)
    })
  }

  const error = (data) => {
    // Error handling logic if needed
  }

  return (
    <Box
      sx={{
        width: '100%',
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
        background: `linear-gradient(135deg, ${theme.palette.primary.light}15, ${theme.palette.success.light}15)`,
        py: { xs: 4, sm: 6, md: 8 },
        px: 2
      }}
    >
      <form onSubmit={handleSubmit(submitRegister, error)} style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
        <Zoom in={true} style={{ transitionDelay: '200ms' }}>
          <MuiCard
            sx={{
              width: '100%',
              maxWidth: { xs: 350, sm: 400, md: 420 },
              borderRadius: 3,
              boxShadow: theme.shadows[8],
              overflow: 'visible',
              border: `1px solid ${theme.palette.divider}`
            }}
          >
            {/* Header Section */}
            <Box sx={{ p: 3, textAlign: 'center' }}>
              <Box sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: 2,
                mb: 2
              }}>
                <Avatar
                  sx={{
                    bgcolor: 'primary.main',
                    width: 50,
                    height: 50,
                    boxShadow: theme.shadows[2]
                  }}
                >
                  <LockIcon />
                </Avatar>
                <Avatar
                  sx={{
                    bgcolor: 'primary.main',
                    width: 50,
                    height: 50,
                    boxShadow: theme.shadows[2]
                  }}
                >
                  <TrelloIcon />
                </Avatar>
              </Box>

              <Typography
                variant="h4"
                component="h1"
                gutterBottom
                sx={{
                  fontWeight: 700,
                  background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.success.main})`,
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  color: 'transparent'
                }}
              >
                Create Account
              </Typography>

              <Typography
                variant="body2"
                sx={{
                  color: 'text.secondary',
                  mb: 1
                }}
              >
                Author: TrungBuiDev
              </Typography>
            </Box>

            {/* Form Fields */}
            <Box sx={{ p: 3 }}>
              <Box sx={{ mb: 2 }}>
                <TextField
                  autoFocus
                  fullWidth
                  label="Email Address"
                  type="email"
                  variant="outlined"
                  error={!!errors['email']}
                  {...register('email', {
                    required: FIELD_REQUIRED_MESSAGE,
                    pattern: {
                      value: EMAIL_RULE,
                      message: EMAIL_RULE_MESSAGE
                    }
                  })}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2
                    }
                  }}
                />
                <FieldErrorAlert errors={errors} fieldName={'email'} />
              </Box>

              <Box sx={{ mb: 2 }}>
                <TextField
                  fullWidth
                  label="Password"
                  type="password"
                  variant="outlined"
                  error={!!errors['password']}
                  {...register('password', {
                    required: FIELD_REQUIRED_MESSAGE,
                    pattern: {
                      value: PASSWORD_RULE,
                      message: PASSWORD_RULE_MESSAGE
                    }
                  })}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2
                    }
                  }}
                />
                <FieldErrorAlert errors={errors} fieldName={'password'} />
              </Box>

              <Box sx={{ mb: 3 }}>
                <TextField
                  fullWidth
                  label="Confirm Password"
                  type="password"
                  variant="outlined"
                  error={!!errors['password_confirmation']}
                  {...register('password_confirmation', {
                    validate: (value) => {
                      if (value === watch('password')) return true
                      return 'Password confirmation does not match!'
                    }
                  })}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2
                    }
                  }}
                />
                <FieldErrorAlert errors={errors} fieldName={'password_confirmation'} />
              </Box>
            </Box>

            {/* Register Button */}
            <CardActions sx={{ px: 3, pb: 2 }}>
              <Button
                type="submit"
                variant="contained"
                color="success"
                size="large"
                fullWidth
                sx={{
                  borderRadius: 2,
                  py: 1.5,
                  textTransform: 'none',
                  fontSize: '1.1rem',
                  fontWeight: 600,
                  boxShadow: theme.shadows[2],
                  '&:hover': {
                    boxShadow: theme.shadows[4],
                    backgroundColor: theme.palette.success.dark
                  }
                }}
              >
                Create Account
              </Button>
            </CardActions>

            {/* Login Link */}
            <Box sx={{ p: 3, pt: 0, textAlign: 'center' }}>
              <Typography variant="body2" sx={{ mb: 1, color: 'text.secondary' }}>
                Already have an account?
              </Typography>
              <Link to="/login" style={{ textDecoration: 'none' }}>
                <Typography
                  sx={{
                    color: 'primary.main',
                    fontWeight: 600,
                    '&:hover': {
                      color: theme.palette.success.main,
                      transform: 'translateY(-1px)',
                      display: 'inline-block',
                      transition: 'all 0.2s ease'
                    }
                  }}
                >
                  Sign in to your account
                </Typography>
              </Link>
            </Box>
          </MuiCard>
        </Zoom>
      </form>
    </Box>
  )
}

export default RegisterForm