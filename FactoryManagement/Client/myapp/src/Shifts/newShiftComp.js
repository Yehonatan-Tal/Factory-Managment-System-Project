import * as React from 'react';
import TextField from '@mui/material/TextField';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Button from '@mui/material/Button';
import { DesktopTimePicker } from '@mui/x-date-pickers/DesktopTimePicker';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import utils from '../utils'
import dayjs from 'dayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useDispatch, useSelector } from 'react-redux'
import {shifts} from '../redux/reducers'
import { useSnackbar } from 'notistack'


export default function NewShiftComp(props) {

    const dispatch = useDispatch()
    const { enqueueSnackbar } = useSnackbar()
    let token = useSelector(state => state.reducers.token)
    const [value, setValue] = React.useState({ "Date": null, "Starting Hour": null, "Ending Hour": null })
    const [timeValue, setTimeValue] = React.useState({ "Date": null, "Starting Hour": null, "Ending Hour": null });

    async function postDataToServer() {
        if (timeValue["Date"] == null || timeValue["Starting Hour"] == null || timeValue["Ending Hour"] == null) {
            enqueueSnackbar('Please fill in all boxes correctly, or cancel!', { variant: 'error' })
        }
        else {
            try {
                await utils.postDataToServer('http://127.0.0.1:5000/shifts', timeValue, token)
                enqueueSnackbar('New shift added successfully!', { variant: 'success' })
                updateShiftsList(token)
            }
            catch (err) {
                console.log("ERROR!! ", err)
            }
        }
    }

    async function updateShiftsList(token) {
        try {
            let resp = await utils.getDataFromServer('http://127.0.0.1:5000/shifts', token)
            dispatch(shifts(resp.data))
        }
        catch (err) {
            console.log("ERROR!! ", err)
        }
    }

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}  adapterLocale={dayjs.locale('he')}>
            <Box sx={{ width: 900, ml: 1, mb: 1.87, mt: 1 }}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={3}>
                        <DatePicker
                            label="Date"
                            value={value["Date"]}
                            onChange={(newValue) => {
                                setValue({ ...value, "Date": newValue })
                                setTimeValue({ ...timeValue, "Date": dayjs(newValue) })
                            }}
                            renderInput={(params) => <TextField {...params} />}
                        />
                    </Grid>
                    <Grid item xs={12} sm={3}>
                        <DesktopTimePicker
                            label="starting shift"
                            value={value["Starting Hour"]}
                            onChange={(newValue) => {
                                setValue({ ...value, "Starting Hour": newValue })
                                setTimeValue({ ...timeValue, "Starting Hour": dayjs(newValue) });
                            }}
                            renderInput={(params) => <TextField {...params} />}
                        />
                    </Grid>
                    <Grid item xs={12} sm={3}>
                        <DesktopTimePicker
                            label="ending shift"
                            value={value["Ending Hour"]}
                            onChange={(newValue) => {
                                setValue({ ...value, "Ending Hour": newValue })
                                setTimeValue({ ...timeValue, "Ending Hour": dayjs(newValue) });
                            }}
                            renderInput={(params) => <TextField {...params} />}
                        />
                    </Grid>
                    <Grid item xs={12} sm={1.5} >
                        <Button
                            type="add"
                            color='primary'
                            variant="contained"
                            fullWidth
                            sx={{ height: 55 }}
                            onClick={() => {
                                postDataToServer()
                            }}
                        >
                            add shift
                        </Button>
                    </Grid>
                    <Grid item xs={12} sm={1.5} >
                        <Button
                            color='error'
                            variant="contained"
                            type="add"
                            fullWidth
                            sx={{ height: 55 }}
                            onClick={() => {
                                props.handleClick(false);
                            }}
                        >
                            cansel
                        </Button>
                    </Grid>
                </Grid>
            </Box>
        </LocalizationProvider>
    );
}