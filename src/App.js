// import './App.css';
import React, { useState } from 'react';
import Customers from './components/Customers';
import Trainings from './components/Trainings';
import Drawers from './components/Drawers';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

function App() {

  const [value, setValue] = useState(0)  

  const handleTabs=(e, value) => {
  setValue(value)
  }

  function TabPanel(props) 
  {
  const {children, value, index} = props;
  return (<div>
  {
    value===index && (<h1>{children}</h1>)
  }
  </div>);
  }

  return (
    <div className="App">
    <Drawers></Drawers>

      <header className="App-header">
     
       <AppBar position="static">
       
          <Toolbar> 
            <Typography variant="h6">
              <Tabs value={value} onChange={handleTabs} textColor="secondary">
                  <Tab label="Customers" />
                  <Tab label="Trainings" />
              </Tabs>
            </Typography>
          </Toolbar>
       </AppBar>
       
              <TabPanel value={value} index={0}> <Customers></Customers> </TabPanel>
              <TabPanel value={value} index={1}> <Trainings></Trainings> </TabPanel> 
              
       </header>
    </div>
  );
}

export default App;
