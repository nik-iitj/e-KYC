import React, {useCallback, useEffect} from 'react';
import "./css/App.css";


import {useNavigate} from 'react-router-dom';


function App(props) {


const navigate = useNavigate();
const handleLink1 = useCallback(() => navigate('/Login', {replace: true}), [navigate]);
const handleLink2 = useCallback(() => navigate('/Upload', {replace: true}), [navigate]);
const handleLink3 = useCallback(() => navigate('/Status', {replace: true}), [navigate]);
const handleLink4 = useCallback(() => navigate('/Rejected', {replace: true}), [navigate]);
const handleLink5 = useCallback(() => navigate('/Pending', {replace: true}), [navigate]);


useEffect(() => {

  if(props.flag===1)handleLink1();
  else if(props.flag===2) handleLink2();
  else if(props.flag===3)handleLink3();
  else if(props.flag===4)handleLink4();
  else handleLink5();

})

  return (
    <div>
      {/* {props.flag ? window.history.replaceState(null, "", location.pathname.substring(
                    -1, location.pathname.lastIndexOf("/")
                )  + "Login")
                :
                window.history.replaceState(null, "", location.pathname.substring(
                  -1, location.pathname.lastIndexOf("/") 
              ) + "App2")} */}
    {/* {flag?<Login setFlag={setFlag2}/>:<App2/>} */}
    {/* {props.flag? () => handleLink1(): () => handleLink2()} */}
    </div>
  )
}

export default App