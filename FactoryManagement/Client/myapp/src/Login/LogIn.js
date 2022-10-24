import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useDispatch } from 'react-redux'
import {switchButton, userName, token, shifts, employees, departments} from '../redux/reducers'
import { decodeToken } from "react-jwt"
import utils from '../utils'


function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Susita.co.il
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();



export default function LogIn() {

  const dispatch = useDispatch()

  async function GetEmployeesFromServer(token) {
    try {
      let resp = await utils.getDataFromServer('http://127.0.0.1:5000/employees', token)
      dispatch(employees(resp.data))
    }
    catch (err) {
      console.log("ERROR!! ", err)
    }
  }

  async function GetDepartmentsFromServer(token) {
    try {
      let resp = await utils.getDataFromServer('http://127.0.0.1:5000/departments', token)
      dispatch(departments(resp.data))
    }
    catch (err) {
      console.log("ERROR!! ", err)
    }
  }

  async function GetShiftsFromServer(token) {
    try {
      let resp = await utils.getDataFromServer('http://127.0.0.1:5000/shifts', token)
      dispatch(shifts(resp.data))
    }
    catch (err) {
      console.log("ERROR!! ", err)
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    postDataToServer({ username: data.get('userName'), email: data.get('email') })
  };


  const postDataToServer = async (obj) => {
    try {
      let resp = await utils.post_auth_info('http://127.0.0.1:5000/auth/login', obj)
      let info = decodeToken(resp.data["token"]).name;
      dispatch(token(resp.data["token"]))
      dispatch(switchButton(true))
      dispatch(userName(info))
      GetEmployeesFromServer(resp.data["token"])
      GetDepartmentsFromServer(resp.data["token"])
      GetShiftsFromServer(resp.data["token"])
    }
    catch (err) {
      console.log("ERROR !! ", err["message"])
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 15,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Log in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="userName"
              label="User Name"
              name="userName"
              autoComplete="userName"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="email"
              label="Email"
              type="email"
              id="email"
              autoComplete="email"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}


/*
*/