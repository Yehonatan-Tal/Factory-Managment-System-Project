import * as React from 'react';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DesktopTimePicker } from '@mui/x-date-pickers/DesktopTimePicker';
import dayjs from 'dayjs'
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useSnackbar } from 'notistack'
import { useSelector, useDispatch } from 'react-redux'
import {employees} from '../redux/reducers'
import utils from '../utils';

export default function AllocateComp(props) {

    const dispatch = useDispatch()
    const { enqueueSnackbar } = useSnackbar()
    const employeesFromStore = useSelector(state => state.reducers.employees)
    const departmentsFromStore = useSelector(state => state.reducers.departments)
    const token = useSelector(state => state.reducers.token)

    const [depValue, setDepValue] = React.useState("")
    const [empValue, setEmpValue] = React.useState("")
    const [employees, setEmployees] = React.useState([])

    React.useEffect(() => {
        setEmployees(employeesFromStore)
    }, [employeesFromStore])


    const handleDepChange = (event) => {
        let depEmployees = employeesFromStore.filter(emp => emp["DepartmentID"] == event.target.value);
        if (depEmployees != '') setEmployees(depEmployees)
        else setEmployees(employeesFromStore)
        setDepValue(event.target.value)
    }

    const handleEmpValue = (empValue) => {
        let emp = employees.filter(emp => emp["_id"] == empValue)
        if (emp.length != 0) return empValue
        else return ''
    };

    const employeeDepartment = (employeeDepId) => {//Returns the department name of each employee in the list
        let departmentName = departmentsFromStore.filter(dep => dep["_id"] == employeeDepId).pop()
        return departmentName["name"]
    }

    async function updateShift() {
        let resp = await utils.putDataToServer(`http://127.0.0.1:5000/employees/allocateShift/${empValue}`, props.shift, token)
        if (resp.data == 'Duplication') {
            enqueueSnackbar('This shift has already been allocated to this employee !', { variant: 'error' })
        }
        else {
            updateEmployeesList()
            props.handleClick(false)
        } 
    }

    async function updateEmployeesList() {
        try {
            let resp = await utils.getDataFromServer('http://127.0.0.1:5000/employees', token)
            dispatch(employees(resp.data))
            enqueueSnackbar('Shift allocated successfully !', { variant: 'success' })
        }
        catch (err) {
            console.log("ERROR!! ", err)
        }
    }


    return (
        <CardContent sx={{ flexGrow: 1 }}>
            <Box sx={{ width: 200, ml: 1.9 }}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={12}>
                        <FormControl fullWidth sx={{ width: 200, mt: 3, mb: 2 }} >
                            <InputLabel id="departmentsSelect">Departments</InputLabel>
                            <Select
                                labelId="departmentsSelect"
                                id="departmentsSelect"
                                value={depValue}
                                label="Departments"
                                onChange={handleDepChange}
                            >
                                <MenuItem sx={{ height: 40 }} value="">{""}</MenuItem>
                                {departmentsFromStore.map((department, index) => (
                                    <MenuItem key={index} value={department["_id"]}>{`${department["name"]}`}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={12}>
                        <FormControl fullWidth>
                            <InputLabel id="employee select">Employees</InputLabel>
                            <Select
                                labelId="employee select"
                                id="employee select"
                                value={handleEmpValue(empValue)}
                                label="employees"
                                onChange={(event) => { setEmpValue(event.target.value) }}
                            >
                                <MenuItem sx={{ height: 30 }} value="">{""}</MenuItem>
                                {employees.map((employee, index) => (
                                    <MenuItem key={index} value={employee["_id"]}>{`${employee["First Name"]} ${employee["Last Name"]}`}<sub><small><small ><i>{`__${employeeDepartment(employee["DepartmentID"])}__`}</i></small></small></sub></MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6} >
                        <Button
                            type="add"
                            color='primary'
                            variant="contained"
                            fullWidth
                            sx={{ height: 30 }}
                            onClick={() => {
                                updateShift()
                            }}
                        >
                            allocate
                        </Button>
                    </Grid>
                    <Grid item xs={12} sm={6}  >
                        <Button
                            color='error'
                            variant="contained"
                            type="add"
                            fullWidth
                            sx={{ height: 30 }}
                            onClick={() => {
                                props.handleClick(false)
                            }}
                        >
                            cansel
                        </Button>
                    </Grid>
                </Grid>
            </Box>
        </CardContent>
    );
}