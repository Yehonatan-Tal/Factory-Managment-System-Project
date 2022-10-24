import * as React from 'react';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DesktopTimePicker } from '@mui/x-date-pickers/DesktopTimePicker';
import dayjs from 'dayjs'
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { useSnackbar } from 'notistack'
import { useSelector, useDispatch } from 'react-redux'
import {shifts} from '../redux/reducers'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import utils from '../utils';


export default function EditComp(props) {

    const dispatch = useDispatch()
    const { enqueueSnackbar } = useSnackbar()
    let token = useSelector(state => state.reducers.token)
    const [value, setValue] = React.useState({ "Date": props.shift['Date'], "Starting Hour": props.shift['Starting Hour'], "Ending Hour": props.shift["Ending Hour"] })
    const [timeValue, setTimeValue] = React.useState({ "Date": props.shift['Date'], "Starting Hour": props.shift['Starting Hour'], "Ending Hour": props.shift["Ending Hour"] });

    const updateShift = () => {
        if (timeValue['Date'] != props.shift['Date'] || timeValue['Starting Hour'] != props.shift['Starting Hour'] || timeValue['Ending Hour'] != props.shift['Ending Hour']) {
            utils.putDataToServer(`http://127.0.0.1:5000/shifts/${props.shift['_id']}`, timeValue, token)
            updateShiftsList()
            props.handleClick(false)
        }
        else {
            enqueueSnackbar('No data was change, Try again or cancel !', { variant: 'error' })
        }
    }

    async function updateShiftsList() {
        try {
            let resp = await utils.getDataFromServer('http://127.0.0.1:5000/shifts', token)
            dispatch(shifts(resp.data))
            enqueueSnackbar('Shift updated successfully !', { variant: 'success' })
        }
        catch (err) {
            console.log("ERROR!! ", err)
        }
    }


    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}  adapterLocale={dayjs.locale('he')}>
            <CardContent sx={{ flexGrow: 1 }}>
                <Box sx={{ width: 200, ml: 1.9 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={12}>
                            <DatePicker
                                label="Date"
                                value={value.Date}
                                onChange={(newValue) => {
                                    setValue({ ...value, "Date": dayjs(newValue) })
                                    setTimeValue({ ...timeValue, "Date": dayjs(newValue) })
                                }}
                                renderInput={(params) => <TextField {...params} />}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <DesktopTimePicker
                                label="starting shift"
                                value={value['Starting Hour']}
                                onChange={(newValue) => {
                                    setValue({ ...value, "Starting Hour": newValue })
                                    setTimeValue({ ...timeValue, "Starting Hour": dayjs(newValue) });
                                }}
                                renderInput={(params) => <TextField {...params} />}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12}>
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
                                update
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
        </LocalizationProvider>
    );
}