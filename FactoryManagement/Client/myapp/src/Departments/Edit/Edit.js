import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import Container from '@mui/material/Container';
import FactoryIcon from '@mui/icons-material/Factory';
import TransferList from './TransferList'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'

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

export default function EditDepartment() {

  const navigate = useNavigate()
  const AllEmployees = useSelector((state) => state.reducers.employees)
  const AllDepartments = useSelector((state) => state.reducers.departments)

  const [department, setDepartment] = React.useState({ "name": "", "manager": "", "_id": useParams().id })
  const [depEmp, setDepEmp] = React.useState([])
  const [otherEmp, setOtherEmp] = React.useState([{ 'First Name': '', 'Last Name': '', 'DepartmentID' : ''}])
  const [render, setRender] = React.useState(false)
  const [change, setChange] = React.useState("")

  React.useEffect(() => {
    let rawInfo = AllDepartments.filter(dep => dep._id == department._id).pop();//Gets the full information about the department to be edited
    let finelInfo = { "name": rawInfo["name"], "manager": manager(rawInfo["manager"]), "_id": rawInfo["_id"] }//Gets the name of the department manager
    let depEmployees = AllEmployees.filter(emp => emp['DepartmentID'] == department._id)//Get only this department employees list
    let otherEmployees = AllEmployees.filter(emp => emp["DepartmentID"] != department._id);//Gets the employyes list that dont belong to this department
    setDepartment(finelInfo)
    setDepEmp(depEmployees)
    setOtherEmp(otherEmployees)
  }, [])

  React.useEffect(() => {

  },[otherEmp])

  const manager = (managerID) => {
    let manager = AllEmployees.filter(emp => emp["_id"] == managerID).pop()
    if (manager) {
      let managerFullName = `${manager["First Name"]} ${manager["Last Name"]}`
      return managerFullName
    }
    else return ""
  }
  const employeeDepartment = (employeeDepId) => {
    let departmentName = AllDepartments.filter(dep => dep["_id"] == employeeDepId).pop()
    if (departmentName) return departmentName["name"]
    else return ''
  }

  const handleChange = (event) => {
    setChange(event.target.value);
  };


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
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <FactoryIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Edit Department Page
          </Typography>
          <Box component="form" sx={{ mt: 3 }}>
            <Grid container spacing={2} >
              <Grid item xs={12} sm={12}>
                <Button
                  startIcon={<ArrowBackIosIcon />}
                  fullWidth
                  sx={{ height: 40, width: 120, mb: 2 }}
                  onClick={() => {
                    setRender(!render)
                    navigate(`/Departments`)
                  }}
                >
                  go back
                </Button>
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  autoComplete="given-name"
                  name="departmentName"
                  required
                  fullWidth
                  id="departmentName"
                  label="Department Name"
                  value={department["name"]}
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  required
                  fullWidth
                  id="manager"
                  label="manager"
                  value={department["manager"]}
                  name="manager"
                  autoComplete="given-name"
                />
              </Grid>
              <Grid item xs={12} sm={2}>
                <Button
                  type="update"
                  fullWidth
                  variant="contained"
                  sx={{ height: 55 }}
                >
                  UPDATE
                </Button>
              </Grid>
              <Grid item xs={12} sm={2}>
                <Button
                  color='error'
                  type="update"
                  fullWidth
                  variant="contained"
                  sx={{ height: 55 }}
                >
                  cancel
                </Button>
              </Grid>
              <TransferList otherEmp = {otherEmp} depEmp = {depEmp} name = {department["name"]} depID = {department["_id"]} />
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}