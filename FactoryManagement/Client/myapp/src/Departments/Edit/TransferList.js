import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { useSelector } from 'react-redux'


export default function TransferList(props) {

    const AllEmployees = useSelector((state) => state.reducers.employees)

    const [depEmp, setDepEmp] = React.useState([{ 'First Name': '', 'Last Name': '' }])
    const [chosenEmp, setChosenEmp] = React.useState([])
    const [otherEmp, setOtherEmp] = React.useState([{ 'First Name': '', 'Last Name': '', 'DepartmentID': '' , '_id' : '', checked: false}])


    React.useEffect(() => {
        let arr = AllEmployees.filter(emp => emp.DepartmentID != props.depID)
        let others = []
        arr.map((emp) => (
            others.push({...emp, checked: false})
        ))
        //console.log('otherssss : ', arr)
        setOtherEmp(others)
        setDepEmp(props.depEmp)
    }, [props])

    const checked = (arr) => {
        return arr.map((emp) => ({
            ...emp, checked: false
        }))
    }

    React.useEffect(() => {
    }, [chosenEmp])
    
    React.useEffect(() => {
    }, [otherEmp])


    const department = (id) => {
        if (id === "62ee9d93dc37424b6acdb1b2") return "Production"
        if (id === "62ee9d93dc37424b6acdb1b6") return "Sales"
        if (id === "62ee9d93dc37424b6acdb1b4") return "Quality"
        if (id === "62ee9d93dc37424b6acdb1b5") return "Helth and Safty"
        if (id === "62ee9d93dc37424b6acdb1b3") return "Human resourse"
    }

    const handleChange = (emp) => {
        emp.checked =! emp.checked
        const found = chosenEmp.find(element => element._id === emp._id);
        if (found) {
            let arr = chosenEmp.filter(element => element._id != emp._id)
            setChosenEmp(arr)
        }
        else setChosenEmp([...chosenEmp, emp])
    }

    const handleTransfer = () => {
        let chosenEmpCopy = chosenEmp
        let depEmpCopy = depEmp
        let otherEmpCopy = otherEmp
        chosenEmpCopy.map((emp) => {
            emp.DepartmentID = props.id
            depEmpCopy.push(emp)
            let empIndex = otherEmpCopy.findIndex(element => element._id === emp._id)
            otherEmpCopy.splice(empIndex, 1)
        })
        setChosenEmp([])
        setDepEmp(depEmpCopy)
        setOtherEmp(otherEmpCopy)
    }

    return (
        <Grid container spacing={2} direction="row" align="center" width='800px' sx={{ ml: 20 }}>
            <Grid item xs={5} lg={5} md={5} >
                <Paper elevation={2} sx={{ mt: 5, width: 230, overflow: 'auto' }}>
                    <Typography sx={{ mt: 2, mb: 2 }} variant="h6" component="div">
                        {`${props.name} employees`}
                    </Typography>
                    <List >
                        {depEmp.map((emp, index) => (
                            <ListItem key={index} sx={{ height: 50, width: 230 }}>
                                <ListItemText primary={`${emp['First Name']} ${emp['Last Name']}`} />
                            </ListItem>
                        ))}
                    </List>
                </Paper>
            </Grid>
            <Grid item xs={2} lg={2} md={2} >
                <Button
                    sx={{ mt: 20 }}
                    variant="outlined"
                    size="large"
                    aria-label="move all left"
                    onClick={handleTransfer}
                >
                    ≪
                </Button>
            </Grid>
            <Grid item xs={5} lg={5} md={5}>
                <Paper elevation={2} sx={{ mt: 5, width: 230, overflow: 'auto' }}>
                    <Typography sx={{ mt: 2, mb: 2 }} variant="h6" component="div">
                        Other employees
                    </Typography>
                    <List >
                        {otherEmp.map((emp, index) => (
                            <ListItem key={index} sx={{ height: 50, width: 230 }}>
                                <Checkbox checked = {emp.checked} id = {emp._id} sx={{ mb: 2.2 }}
                                    onChange={() => { 
                                        handleChange(emp) 
                                    }}
                                />
                                <ListItemText
                                    primary={`${emp['First Name']} ${emp['Last Name']}`}
                                    secondary={department(emp['DepartmentID'])}
                                />
                            </ListItem>
                        ))}
                    </List>
                </Paper>
            </Grid>
        </Grid>

    );
}
