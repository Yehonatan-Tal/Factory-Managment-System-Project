import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function AlertDialog(props) {
    const [open, setOpen] = React.useState(true);

    const handleClose = () => {
        setOpen(false);
    };


    return (
        <div>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Are you sure you want to delete ?"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        If you delete this employee card, the data will be lost forever, and can not be recover!
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={() => {
                            handleClose()
                            props.handleClick(false)
                        }}>
                        i'm not so sure
                    </Button>
                    <Button
                        autoFocus
                        color='error'
                        onClick={() => {
                            handleClose()
                            props.handleClick(true)
                        }} >
                        i'm sure!
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
