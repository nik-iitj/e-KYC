import React, {useState} from "react";
import {Routes, Route, Navigate } from "react-router-dom";
import App from "./App";
import Upload from "./Upload";
import Status from "./Status";
import Login from "./Login";
import App2 from "./App2";
import Pending from './Pending';
import Rejected from './Rejected';

const Routing = () => {
    var [flag, setFlag] = useState(1);

var setFlag2 = (val) => {
  setFlag(val);
}

    return (
        <div className="Routing">
          <Routes>
            <Route
            exact
            path={"/"}
            element={<Navigate replace to="/App" />}
            />
            <Route exact path={"/App"} element={<App flag={flag}/>} />
            <Route exact path={"/Upload"} element={<Upload />} />
            <Route exact path={"/Status"} element={<Status />} />
            <Route exact path={"/Login"} element={<Login setFlag={setFlag2}/>} />
            <Route exact path={"/App2"} element={<App2 />} />
            <Route exact path={"/Pending"} element={<Pending />} />
            <Route exact path={"/Rejected"} element={<Rejected />} />
          </Routes>
        </div>
    )
};

export default Routing;