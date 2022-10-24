import * as React from 'react';
import AvTimerTwoToneIcon from '@mui/icons-material/AvTimerTwoTone';
import EventTwoToneIcon from '@mui/icons-material/EventTwoTone';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import dayjs from 'dayjs'
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

export default function ShiftItem(props) {

    const [moreInfo, setMoreInfo] = React.useState(false);

    const handleClickMoreInfo = () => {
        setMoreInfo(!moreInfo);
    };


    return (
        <List sx={{ml:1,  width: '100%', maxWidth: 200, bgcolor: 'background.paper' }} component="div" disablePadding>
            <ListItemButton  onClick={handleClickMoreInfo}>
                <ListItemIcon>
                    <EventTwoToneIcon sx={{ mr: 1.5 }} />
                    <ListItemText sx={{ mr: 2 }} primary={`${dayjs(props.shift['Date']).$d.toLocaleDateString()}`} />
                </ListItemIcon>
                {moreInfo ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={moreInfo} timeout="auto" unmountOnExit>
                <List sx={{ ml:4 }} disablePadding>
                    <ListItemIcon fontSize='small'>
                        <AvTimerTwoToneIcon sx={{ mr: 1 }} fontSize="small" />
                        <b>Start :&nbsp;</b> {dayjs(props.shift['Starting Hour']).format('HH:mm')}
                    </ListItemIcon>
                    <ListItemIcon  >
                        <AvTimerTwoToneIcon sx={{ mr: 1 }} fontSize="small" />
                        <b>End :&nbsp;</b> {dayjs(props.shift['Ending Hour']).format('HH:mm')}
                    </ListItemIcon>
                </List>
            </Collapse>
        </List>
    );
}


{/* <ListItemText primary={timeFormat(dayjs(props.shift['Starting Hour']).$d.toLocaleTimeString())} />
<ListItemText primary={timeFormat(dayjs(props.shift['Ending Hour']).$d.toLocaleTimeString())} /> */}