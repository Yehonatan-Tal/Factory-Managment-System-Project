import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import NewShiftComp from './newShiftComp'
import CardComp from './card'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {useSelector } from 'react-redux'

function Copyright() {
    return (
        <Typography variant="body2" color="text.secondary" align="center">
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

export default function Shifts() {

    const shifts = useSelector(state => state.reducers.shifts)
    const [newShift, setNewShift] = React.useState(false)


    React.useEffect(() => {
    }, [newShift])

    
    const handleCallbackClick = () => {
        setNewShift(false)
    };


    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Container maxWidth="md">
                <Box
                    sx={{
                        marginTop: 15,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Typography sx={{ mb: 5 }} component="h1" variant="h5">
                        Shifts
                    </Typography>
                    <Grid container spacing={1}>
                        {newShift ? <NewShiftComp handleClick={handleCallbackClick}/> : <Grid item xs={12} sm={3}>
                            <Button
                                color="success"
                                type="save"
                                fullWidth
                                variant="contained"
                                onClick={() => {setNewShift(true)} }
                                sx={{ mb: 2, width: 200, height: 55 }}
                            >
                                New Shift
                            </Button>
                        </Grid>}
                    </Grid>
                    <Grid container spacing={4}>
                        {shifts.map((shift, index) => (
                            <Grid item key={index} xs={12} sm={6} md={4}>
                                <CardComp shift={shift} />
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            </Container>
            {/* Footer */}
            <Box sx={{ bgcolor: 'background.paper', p: 6 }} component="footer">
                <Copyright />
            </Box>
        </ThemeProvider>
    );
}