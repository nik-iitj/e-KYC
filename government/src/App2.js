import React,{Component} from 'react'
import Web3 from 'web3' 
import Paper from '@material-ui/core/Paper';
import StorageHash from './abis/StorageHash.json'

import Button from '@material-ui/core/Button';
import Alert from '@material-ui/lab/Alert';




class App2 extends Component {


  async componentWillMount(){

    await this.loadWeb3();
    this.loadBlockchainData()

  }

  async loadWeb3(){
    if(window.ethereum){

      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()

    } if(window.web3){

      window.web3 = new Web3(window.web3.currentProvider)

    } else {

      window.alert('Please use Metamask!')

    }
  }

  async loadBlockchainData(){

    const web3 = window.web3
    this.setState({web3:web3})
    const accounts = await web3.eth.getAccounts()
    this.setState({account:accounts[0]})
    const networkId = await web3.eth.net.getId()
    const networkData = StorageHash.networks[networkId]
    if(networkData){

      const abi = StorageHash.abi
      const address = networkData.address
      const contract = web3.eth.Contract(abi,address)
      this.setState({contract})

      
      


    } else {

      window.alert('smart contract not deployed')

    }

  }




  constructor(props) {
    super(props)

    this.state = {
      storageHash: '',
      contract: null,
      web3: null,
      buffer: null,
      account: '',
      showNotif:false,
      IPFS_hash:'',
      transaction_hash:''
    }
  }

  //chrome-extension://nkbihfbeogaeaoehlefnkodbefgpgknn/home.html#




  onSubmit = (event)=>{

    var data = '123abc'
    console.log(this.state.account)

    var myContract = this.state.contract
    var account = this.state.account


    myContract.methods.set(data).send({from: account}, function(error, transactionHash){

      console.log(transactionHash)
      this.setState({transaction_hash: transactionHash})
      localStorage.setItem('MyID2_transaction',transactionHash)
      
      
  }.bind(this));
  

  }

  addOnBlockchain = (hash)=>{


    
    var data = hash

    var myContract = this.state.contract
    var account = this.state.account


    myContract.methods.set(data).send({from: account}, function(error, transactionHash){

      console.log(transactionHash)

      this.setState({transaction_hash: transactionHash})
      
      
  }.bind(this))

  }




  

  onSubmitu1 = (event)=>{

    const data = {
      "user" : "u1"

    }

    let options = {
      method: 'POST',
      headers: {
          'Content-Type':
              'application/json'
      },
      body: JSON.stringify(data)
  }

  let fres = fetch('http://localhost:5000/addipfs',options)

  fres.then(res => res.json()).then(d=>{
    console.log(d)
  })

  }

  onSubmitu2 = (event)=>{

    const data = {
      "user" : "u2"

    }

    let options = {
      method: 'POST',
      headers: {
          'Content-Type':
              'application/json'
      },
      body: JSON.stringify(data)
  }

  let fres = fetch('http://localhost:5000/addipfs',options)

  fres.then(res => res.json()).then(d=>{
    console.log(d)
  })

  }

  onSubmitu3 = (event)=>{

    const data = {
      "user" : "u3"

    }

    let options = {
      method: 'POST',
      headers: {
          'Content-Type':
              'application/json'
      },
      body: JSON.stringify(data)
  }

  let fres = fetch('http://localhost:5000/addipfs',options)

  fres.then(res => res.json()).then(d=>{
    console.log(d)
  })

  }

  onSubmitu4 = (event)=>{

    const data = {
      "user" : "u4"

    }

    let options = {
      method: 'POST',
      headers: {
          'Content-Type':
              'application/json'
      },
      body: JSON.stringify(data)
  }

  let fres = fetch('http://localhost:5000/addipfs',options)

  fres.then(res => res.json()).then(d=>{
    console.log(d)
  })

  }


  getHashu1 = (event)=>{

    fetch("http://localhost:5000/gethashu1").then(response => response.json()).then(
  
      data=>{

        this.addOnBlockchain(data['hash'])
        
      }

      )
  }

  getHashu2 = (event)=>{

    fetch("http://localhost:5000/gethashu2").then(response => response.json()).then(
  
      data=>{

        this.addOnBlockchain(data['hash'])
        
      }

      )
  }

  getHashu3 = (event)=>{

    fetch("http://localhost:5000/gethashu3").then(response => response.json()).then(
  
      data=>{

        this.addOnBlockchain(data['hash'])
        
      }

      )
  }

  getHashu4 = (event)=>{

    fetch("http://localhost:5000/gethashu4").then(response => response.json()).then(
  
      data=>{

        this.addOnBlockchain(data['hash'])
        
      }

      )
  }

  // onRequest = (event)=>{


  //   fetch("http://localhost:5000/getRequests").then(response => response.json()).then(

  //     data=>{
      
        
  //       for(const [key,value] of Object.entries(data)){

  //         if(key==="MyID2"){

  //           const arr = value.split(",")
  //           if(arr[3]==="Accepted"){
  //             this.setState({showNotif : true})
  //             this.setState({IPFS_hash: arr[4]})
  //             console.log('done')
  //           }

  //         }

  //       }
        
  //     }

  //     )
  // }

  // transactionHistory = (event)=>{

  //   console.log(this.state.transaction_hash)
  //   console.log(this.state.web3)
  //   const web3 = this.state.web3

  //   web3.eth.getTransaction(this.state.transaction_hash, function(err, result) {
  //     if (result.value) {
  //         // console.log(web3.utils.fromWei(result.value, 'ether'));
  //         console.log(result)
  //     }
  // });

  // }


  render(){
    return (

      <div>
        {/* {this.state.showNotif ? <Alert color='info'
        action={
          <Button size="large" color="primary" variant='outlined' onClick={this.onSubmit}>
            Confirm
          </Button>
          }
        >
        Your KYC request has been approved by the bank! The storage hash for your files is : <h3> {this.state.IPFS_hash}</h3>. Please confirm to add this to the blockchain network.
        </Alert> : <></>} */}

          <p>Logged in Govt Admin : {this.state.account}</p>

          <Paper elevation={3}>

            <Button size="large" color="primary" variant='outlined' onClick={this.onSubmitu1}>
              U1
            </Button>
            <Button size="large" color="primary" variant='outlined' onClick={this.onSubmitu2}>
              U2
            </Button>
            <Button size="large" color="primary" variant='outlined' onClick={this.onSubmitu3}>
              U3
            </Button>
            <Button size="large" color="primary" variant='outlined' onClick={this.onSubmitu4}>
              U4
            </Button>

          </Paper>

          <Paper elevation={3}>

            <Button size="large" color="primary" variant='outlined' onClick={this.getHashu1}>
              B1
            </Button>
            <Button size="large" color="primary" variant='outlined' onClick={this.getHashu2}>
              B2
            </Button>
            <Button size="large" color="primary" variant='outlined' onClick={this.getHashu3}>
              B3
            </Button>
            <Button size="large" color="primary" variant='outlined' onClick={this.getHashu4}>
              B4
            </Button>

          </Paper>


    


        {/* <Button color='primary' onClick={this.onRequest}>Button</Button> */}
        {/* <Button onClick={this.transactionHistory}> Transaction</Button> */}
  
      </div>
  
     
    )
  }

}

export default App2
