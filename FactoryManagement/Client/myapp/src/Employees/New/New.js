import * as React from 'react';
import {InputLabel, MenuItem, FormControl, Select, Typography, Container, Box, Grid, Link, TextField,CssBaseline, Button, Avatar, createTheme, ThemeProvider }  from '@mui/material';
import AddReactionOutlinedIcon from '@mui/icons-material/AddReactionOutlined';
import { useSelector, useDispatch } from 'react-redux'
import { useSnackbar } from 'notistack'
import utils from '../../utils';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom'


function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

export default function NewEmployee() {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { enqueueSnackbar } = useSnackbar()
  const token = useSelector(state => state.reducers.token)
  const departmentsFromStore = useSelector(state => state.reducers.departments)
 
  const [employee, setEmployee] = React.useState({ "First Name": "", "Last Name": '', "DepartmentID": '', 'Shifts' : [], "Start Work Year": dayjs()})
  const [departments, setDepartments] = React.useState([])

  React.useEffect(() => {
    setDepartments(departmentsFromStore)
  }, [])

 
  async function postNewEmployee() {
    console.log('EMPLOYEE : ', employee)
    if (employee['First Name'] == '' || employee['DepartmentID'] == '' || employee['Last Name'] == '' ) {
      enqueueSnackbar('Please fill in all boxes correctly, or cancel!', { variant: 'error' }) 
    }
    else{
      try {
        await utils.postDataToServer(`http://127.0.0.1:5000/employees`, employee, token)
        enqueueSnackbar('New employee card has been successfully created !', { variant: 'success' })
        setEmployee({ "First Name": "", "Last Name": '', "DepartmentID": '', 'Shifts' : [], "Start Work Year": dayjs()})
        updatesEmployees()
       }
       catch (err) {
         enqueueSnackbar('Failed to create new employee card !', { variant: 'error' })
         console.log("ERROR!!! ", err)
       }
      
    } 
  }

  async function updatesEmployees() {
    try {
      let resp = await utils.getDataFromServer('http://127.0.0.1:5000/employees', token)
      dispatch({ type: "EMPLOYEES", payload: resp.data })
      navigate(`/Employees`)
    }
    catch (err) {
      console.log("ERROR!! ", err)
    }
  }

  return (
    <ThemeProvider theme={theme} >
      <Container component="main" maxWidth="lg">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 7,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main', width: 56, height: 56 }}>
            <AddReactionOutlinedIcon  fontSize="large"/>
          </Avatar>
          <Typography component="h1" variant="h5">
            Create new employee
          </Typography>
          <Box component="form" sx={{ mt: 6 }}>
            <Grid container spacing={2} >
              <Grid item xs={12} sm={2.5}>
                <TextField
                  autoComplete="given-name"
                  required
                  label="First Name"
                  value={employee["First Name"]}
                  autoFocus
                  onChange={(event) => {
                    setEmployee({ ...employee, "First Name": event.target.value })
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={2.5}>
                <TextField
                  required
                  label="Last Name"
                  value={employee["Last Name"]}
                  autoComplete="family-name"
                  onChange={(event) => {
                    setEmployee({ ...employee, "Last Name": event.target.value })
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={2.5}>
                <FormControl sx = {{width: 210}} >
                  <InputLabel >Departments</InputLabel>
                  <Select
                    labelId="departmentsSelect"
                    value={employee['DepartmentID']}
                    label="Departments"
                    onChange={(event) => {
                      setEmployee({...employee, 'DepartmentID' : event.target.value})
                    }}
                  >
                    <MenuItem sx={{ height: 35 }} value=''>{''}</MenuItem>
                    {departments.map((department, index) => (
                      <MenuItem key={index} value={department["_id"]}>{`${department["name"]}`}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={2.5}>
                <DatePicker
                  views={['year']}
                  label="Work Year"
                  minDate={dayjs('1950')}
                  maxDate={dayjs('2023')}
                  value={dayjs(employee["Start Work Year"].toString())}
                  onChange={(event) => {
                    setEmployee({ ...employee, "Start Work Year": event.$d.getFullYear() });
                  }}
                  renderInput={(params) => <TextField {...params} helperText={null} />}
                />

              </Grid>
              <Grid item xs={12} sm={1}>
                <Button
                  fullWidth
                  variant="contained"
                  sx={{ height: 55 }}
                  onClick={() => {
                    postNewEmployee()
                  }}
                >
                  create new
                </Button>
              </Grid>
              <Grid item xs={12} sm={1}>
                <Button
                  color='error'
                  type="delete"
                  fullWidth
                  variant="contained"
                  sx={{ height: 55 }}
                  onClick={() => {
                    navigate(`/Employees`)
                  }}
                >
                  cancel
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 40 }} />
      </Container>
    </ThemeProvider>
  );
}