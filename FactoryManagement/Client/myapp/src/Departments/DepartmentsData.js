import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { useSnackbar } from 'notistack'

export default function DepartmentsData() {

    const navigate = useNavigate()
    const {enqueueSnackbar} = useSnackbar()
    const employeesFromStore = useSelector(state => state.reducers.employees)
    const departmentsFromStore = useSelector(state => state.reducers.departments)

    const [departments, setDepartments] = React.useState([{
        "_id": "",
        "manager": "",
        "name": "",
    }])
    const [employees, setEmployees] = React.useState([{
        "DepartmentID": "",
        "First Name": "",
        "Last Name": "",
        "Start Work Year": 0,
        "_id": ""
    }])
    const [change, setChange] = React.useState("")

    React.useEffect(() => {
        setEmployees(employeesFromStore)
        //console.log('Employees from main Department Page : ', employeesFromStore)
    }, [])

    React.useEffect(() => {
        setDepartments(departmentsFromStore)
    }, [])

    const GetManager = (managerID) => {
        let manager = employees.filter(emp => emp["_id"] == managerID).pop()
        if (manager) {
            let managerFullName = `${manager["First Name"]} ${manager["Last Name"]}`
            return managerFullName
        }
        else return ""
    }

    const handleChange = (event) => {
        setChange(event.target.value);
    };

    const handleValue = (DepartmentID) => {
        let dep = departments.filter(dep => dep["_id"] == DepartmentID).pop()["_id"]
        let emp = employees.filter(emp => emp["_id"] == change).pop()
        if (emp) emp = emp["DepartmentID"]
        if (emp === dep) return change
        else return ""
    };

    const navigateTo = () => {
        if (change != "") navigate(`/edit_employee/${change}`)
        else enqueueSnackbar('Please select employee from the list', { variant: 'error' })
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
                            Departments Data
                        </Typography>
                        <Button
                            color="success"
                            type="save"
                            fullWidth
                            variant="contained"
                            sx={{ mr: 79, width: 200, mt: 3, mb: 1, height: 55.5 }}
                            onClick={() => { navigate(`/new_department`) }}
                        >
                            New Department
                        </Button>
                        <Paper elevation={2} sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                            <Table sx={{ minWidth: 800 }} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Departments</TableCell>
                                        <TableCell align="center">Manager</TableCell>
                                        <TableCell align="center">Employees</TableCell>
                                        <TableCell align="left"></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {departments.map((department, index) => (
                                        <TableRow key={index} sx={{ '&:last-child tr, &:last-child th': { border: 0 } }}>
                                            <TableCell align="left" ><Link to={`/edit_department/${department["_id"]}`}>{`${department["name"]}`}</Link>
                                            </TableCell>
                                            <TableCell align="center">{GetManager(department["manager"])}</TableCell>
                                            <TableCell align="left">
                                                <FormControl fullWidth>
                                                    <InputLabel sx={{ ml: 10 }} id="selectEmployee">employees</InputLabel>
                                                    <Select
                                                        sx={{ ml: 10, width: 210, height: 50 }}
                                                        labelId="selectEmployee"
                                                        id="selectEmployee"
                                                        value={handleValue(department["_id"])}
                                                        label="employees"
                                                        onChange={handleChange}
                                                    >
                                                        <MenuItem sx={{ height: 35 }} value="">{" "}</MenuItem>
                                                        {employees.map((employee, index) => (
                                                            employee["DepartmentID"] == department["_id"] ?
                                                                <MenuItem key={index} value={employee["_id"]}>{`${employee["First Name"]} ${employee["Last Name"]}`}</MenuItem>
                                                                : null
                                                        ))}
                                                    </Select>
                                                </FormControl>
                                            </TableCell>
                                            <TableCell>
                                                < Button
                                                    type="edit"
                                                    fullWidth
                                                    sx={{ width: 15, height: 55, mt: 0 }}
                                                    onClick={() => { navigateTo() }}
                                                >
                                                    edit Employee
                                                </Button>
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




