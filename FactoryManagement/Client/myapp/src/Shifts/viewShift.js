import * as React from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import dayjs from 'dayjs' 
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DesktopTimePicker } from '@mui/x-date-pickers/DesktopTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

export default function ViewComp(props) {

    const [value, setValue] = React.useState()

    React.useEffect(() => {
    })


    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}  adapterLocale={dayjs.locale('he')}>
            <CardContent sx={{ flexGrow: 1 }}>
                <Box sx={{ height: 263, width: 200, ml: 1.9 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={12}>
                            <DatePicker
                                disabled
                                label="Date"
                                value={props.shift['Date']}
                                onChange={(newValue) => {
                                    setValue(newValue);
                                }}
                                renderInput={(params) => <TextField {...params} />}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <DesktopTimePicker
                                disabled
                                label="starting shift"
                                value={props.shift["Starting Hour"]}
                                onChange={(newValue) => {
                                    setValue(newValue);
                                }}
                                renderInput={(params) => <TextField {...params} />}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <DesktopTimePicker
                                disabled
                                label="ending shift"
                                value={props.shift["Ending Hour"]}
                                onChange={(newValue) => {
                                    setValue(newValue);
                                }}
                                renderInput={(params) => <TextField {...params} />}
                            />
                        </Grid>
                    </Grid>
                </Box>
            </CardContent>
        </LocalizationProvider>
    );
}