import * as React from 'react';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import AllocateComp from './allocateShift'
import EditComp from './editShift'
import ViewComp from './viewShift'

export default function CardComp(props) {

    const [view, setView] = React.useState(true)
    const [edit, setEdit] = React.useState(false)
    const [allocate, setAllocate] = React.useState(false)
    const [elevation, setElevation] = React.useState(1)

    React.useEffect(() => {
        if (edit || allocate) setElevation(13)
        else setElevation(1)
    }, [edit])

    React.useEffect(() => {
        if (allocate || edit) setElevation(13)
        else setElevation(1)
    }, [allocate])

    const handleCallbackClick = () => {
        setEdit(false)
        setView(true)
        setAllocate(false)
    };



    return (
        <Card elevation={elevation} sx={{ height: '100%', mb: 0, pt: 0.5, display: 'flex', flexDirection: 'column' }}>
            {view ? <ViewComp shift={props.shift} /> : null}
            {edit ? <EditComp shift={props.shift} handleClick={handleCallbackClick} /> : null}
            {allocate ? <AllocateComp shift={props.shift} handleClick={handleCallbackClick} /> : null}
            <CardActions sx={{ ml: 5, pt: 0, mt: 0 }}>
                <Button variant={edit ? 'outlined' : 'text'} size="small" onClick={() => {
                    setEdit(!edit)
                    setView(edit)
                    setAllocate(false)
                }}>Edit</Button>
                <Button variant={allocate ? 'outlined' : 'text'} size="small" onClick={() => {
                    setEdit(false)
                    setAllocate(!allocate)
                    setView(allocate)
                }}>allocate</Button>
            </CardActions>
        </Card>
    );
}