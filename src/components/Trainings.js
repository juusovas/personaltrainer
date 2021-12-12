import React, { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import 'dayjs';
import DeleteIcon from '@mui/icons-material/Delete';
import { Button } from '@mui/material';
import Snackbar from '@mui/material/Snackbar';
import dayjs from 'dayjs';


function Trainings() {

    const [training, setTraining] = useState([]);

    useEffect(() => {
        fetchTrainings();
    }, []);

    // HAETAAN HARJOITUKSET
        const fetchTrainings = () => {
        fetch('https://customerrest.herokuapp.com/gettrainings')
        .then(response => response.json())
        .then(data => setTraining(data))
        .catch(err => console.error(err))
    }

    const [open, setOpen] = useState(false);
    const [msg, setMsg] = useState("");

    const handleClose =() => {
    setOpen(false);
    };

    // POISTETAAN HARJOITUS
    const deleteTraining = url => {
        if (window.confirm('Are you sure?')) {
        fetch( url, { method: 'DELETE' })
        .then (response => {
            if (response.ok) {
        fetchTrainings()
        setMsg("Training deleted");
        setOpen(true)
    }
            else
        alert('Error while trying to delete training')
        })
        .catch(err => console.error(err))
    }}

    // LISTATAAN HARJOITUKSEN ATTRIBUUTIT
    const columns = [
        {field: 'date', sortable: true, filter: true, width: '200%', valueFormatter: function (params) {
            return dayjs(params.value).format('DD MMM YYYY, HH:MM');}},
        {field: 'duration', sortable: true, filter: true, width: '130%'},
        {field: 'activity', sortable: true, filter: true},
        {   // DELETE PAINIKE SUORITETAAN TÄSSÄ
            headerName: '', sortable: false, filter: false, width: 140,
            field: 'data.0.id',
            cellRendererFramework: params => <Button size="small" color="error" startIcon={<DeleteIcon />} variant="contained" onClick ={() => deleteTraining(params.value)}> Delete </Button> 
        },
    ]

    return (
    <div>
    <div className="ag-theme-material" style={{marginTop: 20, height: 600, width: '100%', margin: 'auto'}}>
    <AgGridReact 
    rowData={training}
    columnDefs={columns}
    pagination={true}
    paginationPageSize= {10}
    />
    </div>
    <Snackbar 
    open={open}
    message= {msg}
    autoHideDuration= {5000}
    onClose= {handleClose}
    />
    </div>
);
}
export default Trainings;