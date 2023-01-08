import React, {useCallback} from 'react';
import {useNavigate} from 'react-router-dom';


const appStyle = {
    height: '250px',
    display: 'flex',
    flexDirection: 'column',
    padding: '20px'
};

const formStyle = {
    margin: 'auto',
    padding: '10px',
    border: '1px solid #c9c9c9',
    borderRadius: '5px',
    background: '#f5f5f5',
    width: '220px',
    display: 'block'
};

const labelStyle = {
    margin: '10px 0 5px 0',
    fontFamily: 'Arial, Helvetica, sans-serif',
    fontSize: '15px',
};

const inputStyle = {
    margin: '5px 0 10px 0',
    padding: '5px', 
    border: '1px solid #bfbfbf',
    borderRadius: '3px',
    boxSizing: 'border-box',
    width: '100%'
};

const submitStyle = {
    margin: '10px 0 0 0',
    padding: '7px 10px',
    border: '1px solid #efffff',
    borderRadius: '3px',
    background: '#3085d6',
    width: '100%', 
    fontSize: '15px',
    color: 'white',
    display: 'block'
};

const h1Style = {
  textAlign: 'center',
  color: '#fff',
  textTransform: 'uppercase',
  marginBottom: '20px'
};

const Field = React.forwardRef(({label, type}, ref) => {
    return (
      <div>
        <label style={labelStyle} >{label}</label>
        <input ref={ref} type={type} style={inputStyle} />
      </div>
    );
});

const Form = ({onSubmit}) => {
    const usernameRef = React.useRef();
    const passwordRef = React.useRef();
    const handleSubmit = e => {
        e.preventDefault();
        const data = {
            username: usernameRef.current.value,
            password: passwordRef.current.value
        };
        onSubmit(data);
    };
    return (
      <form style={formStyle} onSubmit={handleSubmit} >
        <Field ref={usernameRef} label="Username:" type="text" />
        <Field ref={passwordRef} label="Password:" type="password" />
        <div>
          <button style={submitStyle} type="submit">Submit</button>
        </div>
      </form>
    );
};

// Usage example:

const Login = (props) => {
  const navigate = useNavigate();
  const handleLink1 = useCallback(() => navigate('/App', {replace: true}), [navigate]);

  async function check(){

    var flag=0;

    await fetch("http://localhost:5000/getRequests").then(response => response.json()).then(

      data=>{

        console.log(data)

        for (const [key, value] of Object.entries(data)) {


          const arr = value.split(",")

          if(key==='54321'){
            const s = arr[3]

            if(s==='Accepted'){
              flag=1;

            }
            else if(s==='Rejected'){
              flag = 2;

            }
            else{

              flag=3;
            }

                    
          }

        }
      
        
    
      }

      )


      if(flag===1)props.setFlag(3);
      else if(flag===0) props.setFlag(2);
      else if(flag===2) props.setFlag(4);
      else props.setFlag(5)
      handleLink1();


  }

    const handleSubmit = data => {

      if(data.username==='user1' || data.username==='user2'){

        check()

        }

    };
    return (
      <div style={appStyle}>
        <h1 style={h1Style}>User Login</h1>
        <Form onSubmit={handleSubmit} />
      </div>
    );
};

export default Login;