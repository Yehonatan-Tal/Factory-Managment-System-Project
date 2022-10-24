import * as React from 'react';
import CalendarMonthTwoToneIcon from '@mui/icons-material/CalendarMonthTwoTone';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import ShiftItem from './ShiftItem'


export default function ShiftList(props) {

  const [showShifts, setShowShifts] = React.useState(false);

  const handleClickShowShiftsInfo = () => {
    setShowShifts(!showShifts);
  };

  return (
    <List sx={{ width: '95%', maxWidth: 200, bgcolor: 'background.paper' }} component="nav">
      <ListItemButton onClick={handleClickShowShiftsInfo}>
        <ListItemIcon>
          <CalendarMonthTwoToneIcon />
        </ListItemIcon>
        <ListItemText primary="shifts" />
        {showShifts ? <ExpandLess /> : <ExpandMore sx = {{ml:5}} />}
      </ListItemButton>
      <Collapse in={showShifts} timeout="auto" unmountOnExit>
          {props.shifts.map((shift, index) => (
            <ShiftItem key={index} shift={shift} />
          ))}
      </Collapse>
    </List>
  );
}
