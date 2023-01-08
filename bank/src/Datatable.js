import React from 'react';
import {useState,useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Web3 from 'web3'
import StorageHash from './abis/StorageHash.json'

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}


// AAdhar number, name, date, hash

export default function Datatable(props) {

  
  const [requests,setRequests] = useState([])
  const [state,setState] = useState({

    storageHash:'',
    contract: null,
    web3: null,
    account: '',
    transaction_hash:'',
    data:'',
    flag:false

  })

  const [status,setStatus] = useState({})

  useEffect(()=>{
    
    const newRows = []
    
    for (const [key, value] of Object.entries(props.requests)) {
  
      var x = {}
      const arr = value.split(",")
      

      x['Aadhar'] = key
      x['name'] = arr[0]
      x['date'] = arr[1]
      x['key'] = arr[2]
      newRows.push(x)
    }

    

    setRequests(newRows)


  },[props.requests])

  async function loadWeb3(){

    if(window.ethereum){

      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()

    } if(window.web3){

      window.web3 = new Web3(window.web3.currentProvider)

    } else {

      window.alert('Please use Metamask!')

    }

  }

  async function loadBlockchainData(){

    const web3 = window.web3

    var newState = state;
    newState['web3'] = web3
    // setState(newState);
    // console.log(state)

    const accounts = await web3.eth.getAccounts()


    newState['account'] = accounts[0]

    const networkId = await web3.eth.net.getId()
    const networkData = StorageHash.networks[networkId]
    if(networkData){

      const abi = StorageHash.abi
      const address = networkData.address
      const contract = web3.eth.Contract(abi,address)

      newState['contract'] = contract;

      setState(newState)

     

    } else {

      window.alert('smart contract not deployed')

    }

  }



  useEffect(()=>{
    loadWeb3();
    loadBlockchainData();

  },[])

  async function sendStatus(id,currstatus){

    const status = {

      "id": id,
      "status" : currstatus

    }

    let options = {
      method: 'POST',
      headers: {
          'Content-Type':
              'application/json'
      },
      body: JSON.stringify(status)
  }

  let fres = fetch('http://localhost:5000/verifyStatus',options)

  fres.then(res => res.json()).then(d=>{
    console.log(d)
  })

  }

  function checkTransaction(hash,name,aadhar){

    const web3 = state['web3']
    web3.eth.getTransaction(hash, function(err, result) {

      if(result===null){
        var newStatus = status
        newStatus[aadhar] = 'Not confirmed'
        setStatus(newStatus)
        // sendStatus(aadhar,"Rejected")
      }
      else if (result.value) {
          // console.log(JSON.stringify(result))
          // localStorage.setItem('data',JSON.stringify(result))
        
          var newStatus = status
          newStatus[aadhar] = 'Confirmed'
          setStatus(newStatus)
          // sendStatus(aadhar,"Accepted")
    
      }
      
  });

  }



  function onCheck(event){

      event.preventDefault();
    
    requests.forEach((element, index, requests) => {
      console.log(element.key);
      console.log(element.name); 
      console.log(element.Aadhar)

      checkTransaction(element.key,element.name,element.Aadhar)

  });

  setRequests([])

  }

  function onFinalise(event){
    event.preventDefault();

    var curr = JSON.stringify(status)

    var answer = window.confirm(curr);
    if (answer) {

      for (const [key, value] of Object.entries(status)) {
        
        if(value==="Confirmed"){

          sendStatus(key,"Accepted")

        }
        else if(value==="Not confirmed"){
          sendStatus(key,"Rejected")
        }
        
      }

        
    }
    else {
        console.log('No')
    }


  }

  function onClickRow(event){
    event.preventDefault();
    var data = event.target.innerHTML

    if(data==='12345'){
      data='bafybeiep3qp2h7updurlo5xk5behsnmbun7j2pfadubfpv4cyilnyr4ixy';
    }
    else if(data==='123311'){
      data='bafybeib2ksuuqiyore7cxxmvgiyqqkm6yydplnlq6i5wzi6ke6o3d2h55m'

    } 
    else if(data==='543214'){
      data=''

    }

    else if(data==='5432145'){
      data='bafybeicimbokvs4mluxigzssipome222v2s7htfi2uel3hfuutltjzxgte'

    }
    else if(data==='5432146'){

      data='bafybeihloahjtco2arrw5p7fiwcjv4bpopr3fjmmupy6oemnwpbjusynji'

    }

    var url = 'https://'+data+'.ipfs.w3s.link/' 

    var win = window.open(url, '_blank');
    win.focus();
  }
  


  const classes = useStyles();

  return (
    <div>
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="right">Aadhar Number</TableCell>
            <TableCell align="right">Key</TableCell>
            <TableCell align="right">Date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {requests.map((row) => (
            <TableRow key={row.Aadhar} onClick={onClickRow}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.Aadhar}</TableCell>
              <TableCell align="right">{row.key}</TableCell>
              <TableCell align="right">{row.date}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>

    <Button variant="contained" color="primary" onClick={onCheck}>
        Check All
      </Button>
      <Button variant="contained" color="primary" onClick={onFinalise}>
        Show Status
      </Button>
    </div>


  );
}
