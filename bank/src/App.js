import React,{useEffect, useState} from 'react'




import SignIn from './SignIn';
import Verify from './Verify'
import Dashboard from './Dashboard';


function App() {


  var [flag, setFlag] = useState(true);

var setFlag2 = (val) => {
  setFlag(val);
}


  return (
    <div>
    {flag?<SignIn setFlag={setFlag2}/>:<Dashboard/>}
    </div>
    // <div><Dashboard/></div>
  )
}

export default App