import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import dayjs from 'dayjs'
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { useSnackbar } from 'notistack'
import { useSelector, useDispatch } from 'react-redux'
import {employees} from '../../redux/reducers'
import utils from '../../utils';


const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 16,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));



export default function RegisterShift(props) {


    const dispatch = useDispatch()
    const { enqueueSnackbar } = useSnackbar()
    const employeesFromStore = useSelector(state => state.reducers.employees)
    const shiftsFromStore = useSelector(state => state.reducers.shifts)
    const token = useSelector(state => state.reducers.token)
    const [empShifts, setEmpShifts] = React.useState([{ 'Date': '', 'Starting Hour': '', 'Ending Hour': '' }])
    const [availableShifts, setAvailableShifts] = React.useState([{ 'Date': '', 'Starting Hour': '', 'Ending Hour': '' }])

    React.useEffect(() => {
        let myEmp = employeesFromStore.filter(employee => employee._id == props.empId).pop().Shifts
        setEmpShifts(myEmp)
    }, [props])

    React.useEffect(() => {
        const arr = []
        for (const shift of shiftsFromStore) {
            let counter = 0
            for (const empShift of empShifts){
                if(empShift['_id'] == shift['_id']) counter++              
            }
            if(counter == 0)arr.push(shift)
        }
        setAvailableShifts(arr)
    }, [empShifts])

    async function updateShift(shift) {
        await utils.putDataToServer(`http://127.0.0.1:5000/employees/allocateShift/${props.empId}`, shift, token)
        updateEmployeesList() 
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
        <Grid container spacing={1}>
            <Grid item xs={12} sx={{ ml: 122.5, mt: props.mt, maxWidth: 200 }}>
                <Button
                    color="error"
                    fullWidth
                    variant="contained"
                    sx={{ width: 100, height: 55 }}
                    onClick = {() => {
                        props.handleClick(false)
                    }}
                >
                    close
                </Button>
            </Grid>
            <Grid item xs={12} sm={6}  >
                <TableContainer component={Paper} sx={{ml: 5, maxWidth: 500 }}>
                    <Table aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell  align="center" colSpan={3}>
                                    Employee shifts
                                </StyledTableCell >
                            </TableRow>
                        </TableHead>
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ pl: 8 }} align="left">Date</TableCell >
                                <TableCell align="center">Strating Shift</TableCell >
                                <TableCell align="center">Ending Shift</TableCell >
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {empShifts.map((shift, index) => (
                                <StyledTableRow key={index}>
                                    <StyledTableCell sx={{ pl: 5 }} align="left" component="th" scope="row">
                                        {dayjs(shift['Date']).format('DD/MM/YYYY')}
                                    </StyledTableCell>
                                    <StyledTableCell align="center">{dayjs(shift['Starting Hour']).format('HH:mm')}</StyledTableCell>
                                    <StyledTableCell align="center">{dayjs(shift['Ending Hour']).format('HH:mm')}</StyledTableCell>
                                </StyledTableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>
            <Grid item xs={12} sm={6}>
                <TableContainer component={Paper} sx={{ maxWidth: 500 }}>
                    <Table aria-label="customized table">
                        <TableHead>
                        <TableRow>
                                <StyledTableCell  align="center" colSpan={6}>
                                    Shifts to be register
                                </StyledTableCell >
                            </TableRow>
                            <TableRow>
                                <TableCell sx={{ pl: 8 }} align="left">Date</TableCell >
                                <TableCell align="center">Strating Shift</TableCell >
                                <TableCell align="center" >Ending Shift</TableCell >
                                <TableCell > </TableCell >
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {availableShifts.map((shift, index) => (
                                <TableRow key={index}>
                                    <StyledTableCell sx={{ pl: 5 }} align="left" component="th" scope="row">
                                        {dayjs(shift['Date']).format('DD/MM/YYYY')}
                                    </StyledTableCell>
                                    <StyledTableCell align="center">{dayjs(shift['Starting Hour']).format('HH:mm')}</StyledTableCell>
                                    <StyledTableCell align="center" >{dayjs(shift['Ending Hour']).format('HH:mm')}</StyledTableCell>
                                    <StyledTableCell  >
                                                < Button
                                                    fullWidth
                                                    sx={{ width: 15, height: 30, mt: 0 }}
                                                    onClick={() => {
                                                        updateShift(shift)
                                                    }}
                                                >
                                                    allocate
                                                </Button>
                                            </StyledTableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>
        </Grid>
    );
}