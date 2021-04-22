import React,{useState,useEffect} from 'react'
import {FormControl, Paper, Select, TextField, Button} from '@material-ui/core'
import './style.css';
import Axios from 'axios';

const CurrencyRow = () => {

  const[text1, settext1] =  useState(1);
  const[text2, settext2] =  useState(1);
  const[country, setcountry] =  useState([]);
  const[country2, setcountry2] =  useState([]);
  const[value1, setvalue1] =  useState(1);
  const[value2, setvalue2] =  useState(1);

  useEffect(()=>{
    getdata();

  },[])
  
  async function getdata(){
    const result=await Axios.get("http://data.fixer.io/api/latest?access_key=a8436e9ee9e754ebc46effaed8f03449&format=1")
    console.log(result.data);
    setcountry(result.data.rates);
    setcountry2(result.data.rates);
  }

 function convert(e) {
   e.preventDefault();
   let num = (value2 / value1)*text1;
   settext2(num);

 }

  return (
    <div>
      <Paper className="paper">
        <h3>CURRENCY CONVERTER</h3>
        <form onSubmit={convert}>
      <div> 
      <TextField variant='outlined'value={text1 || ""} onChange={(e)=>settext1(e.target.value)} autoComplete='off'></TextField>
      <FormControl className="dropdown" variant='outlined' onChange={(e)=>setvalue1(e.target.value)} >
      <Select native>
        {Object.keys(country).map((value, index)=>( 
        <option key={index} value={country[value]}>{value}</option>))}
      </Select>
      </FormControl>
      </div>

      <div>
      <TextField variant='outlined' value={text2 || ""} ></TextField>
      <FormControl className="dropdown" variant='outlined'onChange={(e)=>setvalue2(e.target.value)}>
      <Select native>
        {Object.keys(country2).map((value,index)=> (
        <option key={index} value={country[value]}>{value}</option>))}
      </Select>
      </FormControl>
      </div>
      <Button type='submit' className="button" variant='contained' color='primary'>Convert
      </Button>
      </form>
      </Paper>
    </div>
  )
}

export default CurrencyRow
