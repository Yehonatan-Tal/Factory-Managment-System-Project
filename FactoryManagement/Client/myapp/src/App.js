import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import dayjs from 'dayjs'
import { SnackbarProvider } from 'notistack';
import heLocale from 'dayjs/locale/he';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import MiniDrawer from './MainPage/mainPage';


function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}  adapterLocale={dayjs.locale('he')}>
      <SnackbarProvider maxSnack={3} anchorOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}>
        <div>
          <MiniDrawer />
        </div>
      </SnackbarProvider>
    </LocalizationProvider>
  );
}

export default App;