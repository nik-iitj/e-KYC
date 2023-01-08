import React from 'react';
// import Input from "./Input";
// import Button from '@material-ui/core/Button';
// import { Link } from "react-router-dom";
import {useNavigate} from 'react-router-dom';
import AES from 'crypto-js/aes';


class DoUpload extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: "",
            userPassword: "",
            currentDate: "",
            documentLink: "",
            userData: []
        }

    }

    handleChange(event) {
        const {id , value} = event.target;
        if(id === "userName"){
            this.setState({userName: value});
        }
        if(id === "userPassword"){
            this.setState({userPassword: value});
        }
        if(id === "documentLink"){
            this.setState({documentLink: value});
        }
    }

    

    async sendData(){

        var data = this.state.userData;

        var id = data[0].userPassword;
        var name = data[0].userName;
        var date = data[0].currentDate;
        var link = data[0].documentLink;
        var status = "pending"
        
        const user = {

            "id":id,
            "name":name,
            "date":date,
            "link":link,
            "status":status
        }
        var ciphertext = AES.encrypt(JSON.stringify(user), 'secret key 123');
        let options = {
        method: 'POST',
        headers: {
            'Content-Type':
                'application/json'
        },
        body: JSON.stringify(user)
        }


        let fres = fetch('http://localhost:5000/do',options)

        fres.then(res => res.json()).then(d=>{
            console.log(d)
        })



    }

    navigateToStatus() {
        this.props.navigate('/Login', {replace: true});
    }

    async handleSubmit(event) {
        event.preventDefault();

        const currentDate =await new Date().toDateString();
        this.setState({currentDate: currentDate});

        const user = {
            userName: this.state.userName,
            userPassword: this.state.userPassword,
            documentLink: this.state.documentLink,
            currentDate: this.state.currentDate   
        }

        this.setState({userData: [...this.state.userData, user]});

        await this.sendData()

        this.navigateToStatus();


        console.log("user", this.state.userData[0].userPassword);

    }

    // doc link -> Aadhar number
    // password -> transaction hash

    render(){
        return (
            <div className='Upload'>            
                <form onSubmit={this.handleSubmit}>
                    <label>
                        <br />
                        <input className='input' id="userName" type="text" value={this.state.userName} onChange={this.handleChange.bind(this)} placeholder="Name"/>
                    </label>
                    <br />
                    <label>
                        <br />
                        <input className='input' id="userPassword" type="password" value={this.state.userPassword} onChange={this.handleChange.bind(this)} placeholder="Unique ID"/>
                    </label>
                    <br />
                    <label>
                        <br />
                        <input className='input' id="documentLink" type="number" value={this.state.documentLink} onChange={this.handleChange.bind(this)} placeholder="Aadhar Number"/>
                    </label>
                    <br />
                    <br />
                    <input className='button' type="submit" value="Submit" onClick={this.handleSubmit.bind(this)}/>
                </form>
            </div>
        )
    }
}

// export default Upload;

export default function Upload() {
    const navigate = useNavigate();

    return (
        <DoUpload navigate={navigate}/>
    );
} 