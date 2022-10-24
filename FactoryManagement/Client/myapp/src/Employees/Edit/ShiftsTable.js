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
import { useSelector } from 'react-redux'

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



export default function ShiftsTable(props) {

    const employeesFromStore = useSelector(state => state.reducers.employees)

    const [empShifts, setEmpShifts] = React.useState(([{ 'Date': '', 'Starting Hour': '', 'Ending Hour': '' }]))

    React.useEffect(() => {
        let myEmp = employeesFromStore.filter(employee => employee._id == props.empId).pop().Shifts
        setEmpShifts(myEmp)
    })


    return (
        <TableContainer component={Paper} sx={{mr:87.9 ,mt: props.mt, maxWidth: 500 }}>
            <Table aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell align="center" colSpan={3}>
                            Employee shifts
                        </StyledTableCell >
                    </TableRow>
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
    );
}