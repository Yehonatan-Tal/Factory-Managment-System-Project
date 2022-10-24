import * as React from 'react';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { useDispatch, useSelector } from 'react-redux'
import {switchButton, userName, token} from '../redux/reducers'
import Switch from '@mui/material/Switch';

export default function LoginSwitch() {

    const dispatch = useDispatch()

    let tokenState = useSelector((state) => state.reducers.token)
    let switchState = useSelector((state) => state.reducers.switchButton)


    const handleChange = (event) => {
        if(tokenState && switchState){
            dispatch(switchButton(event.target.checked)) 
            if(event.target.checked == false)dispatch(userName(null))
        }
        else if(tokenState && !switchState){
            dispatch(token(null))
        }
    };

    return (
        <FormGroup posiotion = 'static' sx={{ ml: [5,10,30,60,90] }}>
            <FormControlLabel
                control={
                    <Switch
                        color="secondary"
                        checked={useSelector((state) => state.reducers.switchButton)}
                        onChange={handleChange}
                        aria-label="login switch"
                    />
                }
                label={switchState ? 'switch to Logout' : ''}
            />
        </FormGroup>
    );
}