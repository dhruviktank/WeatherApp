import './App.css';
import { useState, useEffect } from 'react';
import React from 'react';
import { Button, TextField, MenuItem, Box } from '@mui/material';

function App(){
  const [searchinput, setSearchinput] = useState("");
  let [region, setRegion] = useState(null);
  function getForcast(city){
    let url = 'http://api.weatherapi.com/v1/current.json?key=e09302e0fb0c42cab7862212231009&q='+city+'&aqi=no';
    fetch(url)
      .then(response=>response.json())
      .then(response=>{
        setRegion(response);
        setTimeout(console.log(region),1000);
      });
  }
  const handleChange = (e) =>{
    setSearchinput(e.target.value);
  }
  const handleSubmit = (e) =>{
    e.preventDefault();
    getForcast(searchinput);
  }
  const myStyle = {
    display: "flex",
    justifyContent: "space-between",
    width: "200px",
    margin: "auto",
  }
  return (
    <div className="App">
      <TextField id="filled-search" label="Search" type="search" size='small' variant="filled" onChange={(event)=>{handleChange(event)}}/>
      <Button variant='contained' onClick={handleSubmit}>Search</Button>
      <Box sx={{backgroundColor: "lightblue", width: "fit-content", padding: "30px"}}>
        <h1>{region && !region.error && region.location.name}</h1>
        <h2>Temperature {region && !region.error && region.current.temp_c}℃</h2>
        <p>
          <span><b>{region && !region.error && region.current.condition.text}</b></span>
        </p>
        <img src={region && !region.error && region.current.condition.icon} alt='weather'></img>
      </Box>
    </div>

  );
}


export default App;
