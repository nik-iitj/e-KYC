import React,{Component} from 'react'
import Web3 from 'web3'
import StorageHash from './abis/StorageHash.json'
import Button from '@material-ui/core/Button';
import Alert from '@material-ui/lab/Alert';
import TextField from '@material-ui/core/TextField';


class Verify extends Component {


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
      account: '',
      transaction_hash:'',
      data:'',
      flag:false
    }

    this.onInputChange = this.onInputChange.bind(this);
    this.submit = this.submit.bind(this)
    this.onCheck=this.onCheck.bind(this)
  }


  //chrome-extension://nkbihfbeogaeaoehlefnkodbefgpgknn/home.html#


  

  submit(event){

    event.preventDefault()
    console.log(this.state.data);
    var data = this.state.data

    this.transactionHistory(data)

  }
  

//0x6f2675a116e506b1d8e90589053582d0d84192c60c649cc81bb94ab189a5e262

  transactionHistory = (hash)=>{


    const web3 = this.state.web3

    web3.eth.getTransaction(hash, function(err, result) {
      if(result===null){
        console.log('incorrect')
      }
      else if (result.value) {
      
          localStorage.setItem('data',JSON.stringify(result))
    
      }
  });

  }

  onInputChange(event) {
    this.setState({data:event.target.value})
  
  }

  retrive(event){
    
    console.log(localStorage.getItem('data'))
  
  
  }

  onCheck(event){
    event.preventDefault()
    this.setState({data:'0x46e701f25d6f174347c8395c62bbe332768f18b22eee20b7674b7bc779ae548d'})
    // console.log(localStorage.getItem('MyID2_transaction'))

  }


  render(){
    return (

      <div>



        <form noValidate autoComplete="off" onSubmit={this.submit}>
    
    <TextField id="outlined-basic" label="Outlined" variant="outlined" onChange={this.onInputChange} defaultValue={this.state.flag?(this.state.data):''}/>
    <Button
                      type="submit"
                      
                  
                  >
                      Login
                  </Button>
    </form>

    <Button onClick={this.retrive}>Button</Button>
    {/* <h5>{typeof(localStorage.getItem('data'))}</h5> */}
  
      </div>
  
     
    )
  }

}

export default Verify
