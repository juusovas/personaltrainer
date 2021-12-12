import React, { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import AddCustomer from './AddCustomer';
import EditCustomer from './EditCustomer';
import AddTraining from './AddTraining';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import 'ag-grid-react';

import { Button } from '@mui/material';
import Snackbar from '@mui/material/Snackbar';


function Customers() {


    const [open, setOpen] = useState(false);
    const [msg, setMsg] = useState("");

    const handleClose =() => {
    setOpen(false);
        };

    const [customer, setCustomer] = useState([]);

    useEffect(() => {
        fetchCustomers();
        }, []); 

    // HAETAAN ASIAKKAAT
    const fetchCustomers = () => {
        fetch('https://customerrest.herokuapp.com/api/customers')
        .then(response => response.json())
        .then(data => setCustomer(data.content))
        .catch(err => console.error(err))
        }


    // UUDEN ASIAKKAAN LISÄYS
    const addCustomer = customer => {
        fetch('https://customerrest.herokuapp.com/api/customers',
            {
                method: "POST",
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(customer)
            }
        )
        .then(_ => fetchCustomers())
        .then(err => console.error(err))
        }

    const [training, setTraining] = useState([]);

    useEffect(() => {
        fetchTrainings();
    }, []); 

    // HAETAAN HARJOITUKSET
    const fetchTrainings = () => {
        fetch('https://customerrest.herokuapp.com/gettrainings')
        .then(response => response.json())
        .then(data => setTraining(data.content))
        .catch(err => console.error(err))
        }

    // UUDEN HARJOITUKSEN LISÄYS
    const addTraining = training => {
        fetch('https://customerrest.herokuapp.com/gettrainings',
            {
                method: "POST",
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(training)
            }
        )
        .then(_ => fetchTrainings())
        .then(err => console.error(err))
        }

    // ASIAKKAAN EDITOINTI
    const editCustomer = (url, updatedCustomer) => {
        fetch(url, {
            method: "PUT",
            headers: {"Content-type" : "application/json"},
            body: JSON.stringify(updatedCustomer)
        }) 
        .then(_ => {
            setMsg("Customer updated");
            setOpen(true);
            fetchCustomers()})
        .catch(err => console.log(err))
        }

    // ASIAKKAAN POISTO
    const deleteCustomer = url => {
        if (window.confirm('Are you sure?')) {
        fetch(url, { method: 'DELETE' })
        .then (response => {
            if (response.ok) {
        fetchCustomers()
        setMsg("Customer deleted");
        setOpen(true)
        }
            else
        alert('Error while trying to delete customer')
        })
        .catch(err => console.error(err))
        }
        }


    // LAITETAAN ASIAKKAAN TIEDOT SARAKKEISIIN
    const columns = [
        {field: 'firstname', sortable: true, filter: true, width:'150%'},
        {field: 'lastname', sortable: true, filter: true, width:'150%'},
        {field: 'streetaddress', sortable: true, filter: true},
        {field: 'postcode', sortable: true, filter: true, width: '120%' },
        {field: 'city', sortable: true, filter: true, width: '140%'},
        {field: 'email', sortable: true, filter: true},
        {field: 'phone', sortable: true, filter: true, width: '140%'},
        {   // DELETE PAINIKE SUORITETAAN TÄSSÄ
            headerName: '', sortable: false, filter: false, width: 100,
            field: 'links.0.href',
            cellRendererFramework: params => <Button size="small" color="error" variant="contained" onClick ={() => deleteCustomer(params.value)}> Delete </Button> 
        },  // ASIAKKAAN MUOKKAUS
        {
            headerName: "",
            sortable: false,        
            filter: false,
            width: 100,
            field: "links.0.href",
            cellRendererFramework: params => <EditCustomer editCustomer={editCustomer} customer={params}/>
        },  
        {// HARJOITUKSEN LISÄYS
            headerName: "",
            sortable: false,        
            filter: false,
            width: 180,
            field: "data.id",
            cellRendererFramework: params => <AddTraining addTraining={addTraining} training={params}/>
        }
        ]

    // TIETOJEN LATAUS CSV-TIEDOSTONA

    var gridOptions = {
        defaultColDef: {
          editable: true,
          resizable: true,
          minWidth: 100,
          flex: 1,
        },
      
        suppressExcelExport: true,
        popupParent: document.body,
      
        columnDefs: [{ field: 'firstname' }, { field: 'lastname' }, { field: 'streetaddress' }, 
        { field: 'postcode' }, { field: 'city' }, { field: 'email' }, { field: 'phone' }],
      
        rowData: {customer},
        };
    function onBtnExport() {
         gridOptions.api.exportDataAsCsv();
        }
      
      /* setup the grid after the page has finished loading
      document.addEventListener('DOMContentLoaded', function () {
        var gridDiv = document.querySelector('#myGrid');
        new agGrid.Grid(gridDiv, gridOptions);
      });
      */
    
    return (
    <div> <Button onclick={() => onBtnExport()} >Download CSV export file</Button>
    <div> <AddCustomer addCustomer= { addCustomer } /> 
    

    <div className="ag-theme-material" style={{marginTop: 20, height: 600, width: '100%', margin: 'auto'}}>
        <AgGridReact 
        rowData={customer}
        columnDefs={columns}
        pagination={true}
        paginationPageSize= {10}
        // exportDataAsCsv={customer}
        />
    </div>
    <Snackbar 
    open={open}
    message= {msg}
    autoHideDuration= {5000}
    onClose= {handleClose}
    />  
    </div>
    </div>
);
}

export default Customers;