import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { createTheme, ThemeProvider } from '@mui/material/styles';
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

export default function NewDepartment() {

    const AllEmployees = useSelector(state => state.reducers.employees)

    const [employees, setEmployees] = React.useState([])
    const [department, setDepartment] = React.useState({ "name": "", "manager": "" })
    const [change, setChange] = React.useState("")


    React.useEffect(() => {
        setEmployees(AllEmployees)
    }, [])



    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
            email: data.get('email'),
            password: data.get('password'),
        });
    };

    const handleChange = (event) => {
        setChange(event.target.value);
    };

    return (
        <ThemeProvider theme={theme} >
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
                        Add New Department
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                        <Grid container spacing={2} >
                            <Grid item xs={12}>
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
                            <Grid item xs={12} sm={8} >
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Employees</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={change}
                                        label="employees"
                                        onChange={handleChange}
                                    >
                                        <MenuItem sx={{ height: 30 }} value="">{""}</MenuItem>
                                        {employees.map((employee, index) => (
                                            <MenuItem key={index} value={employee["_id"]}>{`${employee["First Name"]} ${employee["Last Name"]}`}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={4} >
                                <Button
                                    type="add"
                                    fullWidth
                                    sx={{ height: 55 }}
                                >
                                    make manager
                                </Button>
                            </Grid>
                        </Grid>
                        <Button
                            type="save"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 1 }}
                        >
                            save
                        </Button>
                        <Button
                            color='error'
                            type="cancel"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 2, mb: 2 }}
                        >
                            cancel
                        </Button>
                    </Box>
                </Box>
                <Copyright sx={{ mt: 5 }} />
            </Container>
        </ThemeProvider>
    );
}