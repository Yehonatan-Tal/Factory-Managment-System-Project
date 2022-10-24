import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import ShiftList from './ShiftList'
import { useSelector } from 'react-redux'
import { Link, Outlet, useNavigate } from 'react-router-dom'


export default function EmployeesData() {

    const navigate = useNavigate()
    const employeesFromStore = useSelector(state => state.reducers.employees)
    const departmentsFromStore = useSelector(state => state.reducers.departments)

    const [change, setChange] = React.useState("")
    const [departments, setDepartments] = React.useState([])
    const [employees, setEmployees] = React.useState([{
        "DepartmentID": "",
        "First Name": "",
        "Last Name": "",
        "Start Work Year": 0,
        'Shifts': [],
        "_id": ""
    }])

    React.useEffect(() => {
        setEmployees(employeesFromStore)
    }, [employeesFromStore])

    React.useEffect(() => {
        setDepartments(departmentsFromStore)
    }, [departmentsFromStore])


    const department = (id) => {
        if (id === "62ee9d93dc37424b6acdb1b2") return "Production"
        if (id === "62ee9d93dc37424b6acdb1b6") return "Sales"
        if (id === "62ee9d93dc37424b6acdb1b4") return "Quality"
        if (id === "62ee9d93dc37424b6acdb1b5") return "Helth and Safty"
        if (id === "62ee9d93dc37424b6acdb1b3") return "Human resourse"
    }

    const handleChange = (event) => {
        if (event.target.value) {
            const depEmployees = employeesFromStore.filter(emp => emp["DepartmentID"] == event.target.value)
            setEmployees(depEmployees)
        }
        else setEmployees(employeesFromStore)
        setChange(event.target.value)
    };


    const navigateTo = () => {
        navigate('/new_employee')
    }


    return (
        <Grid
            container
            position={'absolute'}
            direction="row"
            justifyContent="center"
            alignItems="center">
            <Container spacing={5} maxWidth="md">
                <Box sx={{
                    marginTop: 15,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}>
                    <Typography component="h1" variant="h5">
                        Employees Data
                    </Typography>
                    <Grid container spacing={10}>
                        <Grid item xs={12} sm={6}>
                            <Button
                                color="success"
                                type="save"
                                fullWidth
                                variant="contained"
                                onClick={() => { navigateTo() }}
                                sx={{ ml: 24, width: 200, mt: 3, mb: 2, height: 55.5 }}
                            >
                                Add Employee
                            </Button>
                        </Grid>
                        <Grid item xs={12} sm={6} >
                            <FormControl fullWidth sx={{ width: 200, mt: 3, mb: 2 }} >
                                <InputLabel id="departmentsSelect">Departments</InputLabel>
                                <Select
                                    labelId="departmentsSelect"
                                    id="departmentsSelect"
                                    value={change}
                                    label="Departments"
                                    onChange={handleChange}
                                >
                                    <MenuItem sx={{ height: 30 }} value="">{""}</MenuItem>
                                    {departments.map((department, index) => (
                                        <MenuItem key={index} value={department["_id"]}>{`${department["name"]}`}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>
                    <Paper elevation={2} sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                        <Table sx={{ minWidth: 650}} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Full Name</TableCell>
                                    <TableCell align="left">Departments</TableCell>
                                    <TableCell align="center" sx ={{pr: 3}}>Shifts</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {employees.map((employee, index) => (
                                    <TableRow
                                        key={index}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell ><Link to={`/edit_employee/${employee["_id"]}`}>{`${employee["First Name"]} ${employee["Last Name"]}`}</Link></TableCell>
                                        <TableCell align="left"><Link to={`/edit_department/${employee["DepartmentID"]}`}>{department(employee["DepartmentID"])}</Link></TableCell>
                                        <Outlet />
                                        <TableCell sx = {{pl: 5, pr:0, minWidth: 250}}>
                                            <ShiftList shifts={employee.Shifts} />
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </Paper>
                </Box>
            </Container>
        </Grid >
    )
}




