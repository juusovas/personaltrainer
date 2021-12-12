import React from 'react';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

function EditCustomer(props) {

        const [open, setOpen] = React.useState(false);

        const[customer, setCustomer] = React.useState({
            firstname: '',
            lastname: '',
            streetaddress: '',
            postcode: '',
            city: '',
            email: '',
            phone: '',
        })
      
        const handleClickOpen = () => {
            setCustomer({
                firstname: props.customer.data.firstname,
                lastname: props.customer.data.lastname,
                streetaddress: props.customer.data.streetaddress,
                postcode: props.customer.data.postcode,
                city: props.customer.data.city,
                email: props.customer.data.email,
                phone: props.customer.data.phone,
            })
          setOpen(true);
        };
      
        const handleClose = () => {
          setOpen(false);
        };

        const handleSave = () => {
            props.editCustomer(props.customer.value, customer);
            handleClose();
        };

        const inputChanged = (event) => {
            setCustomer({...customer, [event.target.name]: event.target.value})
        }
    
return (
<div>

<Button size="small" variant="outlined" onClick={handleClickOpen}>
        Edit
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit Customer</DialogTitle>
        <DialogContent>
<TextField
            autoFocus
            margin="dense"
            name= "firstname"
            value= {customer.firstname}
            onChange={e => inputChanged(e)}
            label="First name"
            fullWidth
          />

<TextField
            margin="dense"
            name= "lastname"
            value= {customer.lastname}
            onChange={e => inputChanged(e)}
            label="Last name"
            fullWidth
          />

<TextField
            margin="dense"
            name= "streetaddress"
            value= {customer.streetaddress}
            onChange={e => inputChanged(e)}
            label="Street address"
            fullWidth
          />

<TextField
            margin="dense"
            name= "postcode"
            value= {customer.postcode}
            onChange={e => inputChanged(e)}
            label="Postcode"
            fullWidth
          />
<TextField
            margin="dense"
            name= "city"
            value= {customer.city}
            onChange={e => inputChanged(e)}
            label="City"
            fullWidth
          />
<TextField
            margin="dense"
            name= "email"
            value= {customer.email}
            onChange={e => inputChanged(e)}
            label="E-mail"
            fullWidth
          />
<TextField
            margin="dense"
            name= "phone"
            value= {customer.phone}
            onChange={e => inputChanged(e)}
            label="Phone"
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

export default EditCustomer;