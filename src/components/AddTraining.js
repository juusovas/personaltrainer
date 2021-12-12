import React from 'react';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

function AddTraining(props) {

        const [open, setOpen] = React.useState(false);

        const[training, setTraining] = React.useState({
            date: '',
            activity: '',
            duration: '',
            customer: '',
        })
      
        const handleClickOpen = () => {
          setTraining({
            date: '',
            activity: '',
            duration: '',
            customer: props.customer,
          })
          setOpen(true);
        };
      
        const handleClose = () => {
          setOpen(false);
        };

        const handleSave = () => {
            props.addTraining(training);
            handleClose();
        };

        const inputChanged = (event) => {
            setTraining({...training, [event.target.name]: event.target.value})
        }
    
return (
<div>

<Button variant="contained" color="success" onClick={handleClickOpen}>
        Add Training
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>New Training</DialogTitle>
        <DialogContent>
<TextField
            autoFocus
            margin="dense"
            name= "date"
            value= {training.date}
            onChange={e => inputChanged(e)}
            label="Date"
            fullWidth
          />
<TextField
            margin="dense"
            name= "activity"
            value= {training.activity}
            onChange={e => inputChanged(e)}
            label="Activity"
            fullWidth
          />
<TextField
            margin="dense"
            name= "duration"
            value= {training.duration}
            onChange={e => inputChanged(e)}
            label="Duration"
            fullWidth
          />


        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSave}>Save</Button>
        </DialogActions>
      </Dialog>
</div>

);
}

export default AddTraining;