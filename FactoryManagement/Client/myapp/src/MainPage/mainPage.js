import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import { Route, Routes, useNavigate } from 'react-router-dom'
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import LoginSwitch from './loginSwitch'
import LogIn from '../Login/LogIn'
import utils from '../utils'
import EmployeesData from '../Employees/EmployeesData'
import EditEmployee from '../Employees/Edit/Edit'
import NewEmployee from '../Employees/New/New'
import DepartmentsData from '../Departments/DepartmentsData'
import EditDepartment from '../Departments/Edit/Edit'
import NewDepartment from '../Departments/New'
import Shifts from '../Shifts/ShiftsMain'
import { useSelector } from 'react-redux'
import {Switch, userName, token, shifts, employee, departments} from '../redux/reducers'
import GroupsIcon from '@mui/icons-material/Groups';
import ApartmentIcon from '@mui/icons-material/Apartment';
import EventNoteIcon from '@mui/icons-material/EventNote';
import PermContactCalendarIcon from '@mui/icons-material/PermContactCalendar';

const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  }),
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

export default function PersistentDrawerLeft() {


  const theme = useTheme();
  const navigate = useNavigate()
  const name = useSelector((state) => state.reducers.userName)
  const loginSwitch = useSelector((state) => state.reducers.switchButton)
  const [open, setOpen] = React.useState(false);

  const navigateTo = (name) => {
    navigate(`/${name}`)
  }

  React.useEffect(() => {
    document.title = 'Factory System'
    postDataToServer()
  }, [])

  async function postDataToServer() {
    try {
      await utils.get_all_authorized_users('http://127.0.0.1:5000/auth/users')
    }
    catch (err) {
      console.log("ERROR!! ", err)
    }
  }



  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 5, ...(open && { display: 'none' }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div" sx={{ width: '20rem' }}>
            {useSelector((state) => state.reducers.userName) == null ? "" : "Hello " + name}
          </Typography>
          <LoginSwitch />
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {useSelector(((state) => state.reducers.token) ) == null ? null : ['Employees', 'Departments', 'Shifts', 'Users'].map((text, index) => (
            <ListItem key={index} disablePadding>
              <ListItemButton
                onClick={() => { navigateTo(text) }}>
                <ListItemIcon>
                  {index === 0 ? <GroupsIcon /> : null}
                  {index === 1 ? <ApartmentIcon /> : null}
                  {index === 2 ? <EventNoteIcon /> : null}
                  {index === 3 ? <PermContactCalendarIcon /> : null}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
      </Drawer>
      <Main open={open}>
        {useSelector((state) => state.reducers.switchButton) == false ? <LogIn /> : null}
        <DrawerHeader />
        <Routes>
          <Route path="/" element={null} />
          {loginSwitch === true ? <Route path="/Employees" element={<EmployeesData />}></Route> : null}
          {loginSwitch === true ? <Route path="/Shifts" element={<Shifts />}></Route> : null}
          {loginSwitch === true ? <Route path="/edit_employee/:id" element={<EditEmployee />}></Route> : null}
          {loginSwitch === true ? <Route path="/new_employee" element={<NewEmployee />}></Route> : null}
          {loginSwitch === true ? <Route path="/Departments" element={<DepartmentsData />}></Route> : null}
          {loginSwitch === true ? <Route path="/edit_department/:id" element={<EditDepartment />}></Route> : null}
          {loginSwitch === true ? <Route path="/new_department" element={<NewDepartment />}></Route> : null}
        </Routes>
      </Main>
    </Box>
  );
}
