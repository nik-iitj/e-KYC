import React, {useCallback, useEffect} from 'react';
import "./css/App.css";




import { useLocation} from "react-router-dom";
import {useNavigate} from 'react-router-dom';


function App(props) {


//   var [flag, setFlag] = useState(true);

// var setFlag2 = (val) => {
//   setFlag(val);
// }

// const location = useLocation();

const navigate = useNavigate();
const handleLink1 = useCallback(() => navigate('/Login', {replace: true}), [navigate]);
const handleLink2 = useCallback(() => navigate('/Upload', {replace: true}), [navigate]);

useEffect(() => {
  props.flag ? handleLink1(): handleLink2()
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