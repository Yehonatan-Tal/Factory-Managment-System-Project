import * as React from 'react';
import {InputLabel, MenuItem, FormControl, Select, Typography, Container, Box, Grid, Link, TextField,CssBaseline, Button, Avatar, createTheme, ThemeProvider }  from '@mui/material';
import BadgeOutlinedIcon from '@mui/icons-material/BadgeOutlined';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import {employees} from '../../redux/reducers'
import ShiftsTable from './ShiftsTable'
import RegisterShift from './registerShift'
import { useSnackbar } from 'notistack'
import utils from '../../utils';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom'
import AlertDialog from './alertDialog'


function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
      Factory Managment System
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

export default function EditEmployee() {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { enqueueSnackbar } = useSnackbar()
  const token = useSelector(state => state.reducers.token)
  const departmentsFromStore = useSelector(state => state.reducers.departments)
  const employeesFromStore = useSelector(state => state.reducers.employees)
  const [empDuplicate, setEmpDuplicate] = React.useState({ "First Name": "", "Last Name": "", "DepartmentID": '', "Start Work Year": "" })
  const [employee, setEmployee] = React.useState({ "First Name": "", "Last Name": "", "DepartmentID": '', "Start Work Year": "", "_id": useParams().id })
  const [departments, setDepartments] = React.useState([])
  const [register, setRegister] = React.useState(false)
  const [agreement, setAgreement] = React.useState(false)


  React.useEffect(() => {
    let result = employeesFromStore.filter(emp => emp["_id"] == employee["_id"])[0];
    let obj = { "First Name": result["First Name"], "Last Name": result["Last Name"], "DepartmentID": result['DepartmentID'], "Start Work Year": result["Start Work Year"], "_id": result["_id"] }
    setDepartments(departmentsFromStore)
    setEmployee(obj)
    setEmpDuplicate(obj)
  }, [employeesFromStore])

  React.useEffect(() => {
  }, [agreement])

  const handleDeleteCallback = (data) => {
    if(data == true){
      setAgreement(false)
      deleteEmployee()
    }
    if(data == false)setAgreement(false)
  }

  const handleCallbackClick = (data) => {
    setRegister(data)
  };

  async function updatesEmployee() {
    if (employee['First Name'] != empDuplicate['First Name'] || employee['DepartmentID'] != empDuplicate['DepartmentID'] || employee['Last Name'] != empDuplicate['Last Name'] ||  employee['Start Work Year'] != empDuplicate['Start Work Year']) {
      try {
       await utils.putDataToServer(`http://127.0.0.1:5000/employees/${employee['_id']}`, employee, token)
       enqueueSnackbar('Employee data has been successfully updated !', { variant: 'success' })
       updatesEmployees()
      }
      catch (err) {
        enqueueSnackbar('Failed to update new data !', { variant: 'error' })
        console.log("ERROR!!! ", err)
      }
    }
    else{
      enqueueSnackbar('No data has changed !', { variant: 'error' })
    } 
  }

  async function updatesEmployees() {
    try {
      let resp = await utils.getDataFromServer('http://127.0.0.1:5000/employees', token)
      dispatch(employees(resp.data))
      navigate(`/Employees`)
    }
    catch (err) {
      console.log("ERROR!! ", err)
    }
  }

  async function deleteEmployee() {
    try {
      navigate(`/Employees`)
      await utils.deleteDataFromServer(`http://127.0.0.1:5000/employees/${employee['_id']}`, token)
      updatesEmployees()
      enqueueSnackbar('Employee data has been successfully deleted!', { variant: 'success' })
    }
    catch (err) {
      enqueueSnackbar('Failed to delete the data !', { variant: 'error' })
      console.log("ERROR!! ", err)
    }
  }


  return (
    <ThemeProvider theme={theme} >
      <Container component="main" maxWidth="lg">
        {agreement? <AlertDialog handleClick = {handleDeleteCallback}/> : null}
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
            <BadgeOutlinedIcon sx={{mb: 0.5}} fontSize="large"/>
          </Avatar>
          <Typography component="h1" variant="h5">
            {`${empDuplicate['First Name']} ${empDuplicate['Last Name']} edit page`}
          </Typography>
          <Box component="form" sx={{ mt: 3 }}>
            <Grid container spacing={2} >
            <Grid item xs={12} sm={12}>
            <Button
                  startIcon={<ArrowBackIosIcon />}
                  fullWidth
                  sx={{ height: 40, width: 120, mb: 2 }}
                  onClick={() => {
                    navigate(`/Employees`)
                  }}
                >
                  go back
                </Button>
              </Grid>
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
                    updatesEmployee()
                  }}
                >
                  UPDATE
                </Button>
              </Grid>
              <Grid item xs={12} sm={1}>
                <Button
                  color='error'
                  fullWidth
                  variant="contained"
                  sx={{ height: 55 }}
                  onClick={() => {
                    setAgreement(true)
                  }}
                >
                  DELETE
                </Button>
              </Grid>
            </Grid>
          </Box>
          {register === true ? <RegisterShift empId={employee['_id']} mt={5.3} handleClick={handleCallbackClick} /> :
            <Grid>
              <Box sx={{ mt: 5.3, mr: 47, width: 120 }}>
                <Button
                  color='success'
                  type="delete"
                  fullWidth
                  variant="contained"
                  onClick={() => {
                    setRegister(true)
                  }}
                  sx={{ width: 100, height: 55 }}
                >
                  register
                </Button>
              </Box>
              <ShiftsTable empId={employee['_id']} mt={1} />
            </Grid>}
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}