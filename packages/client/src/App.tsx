import React from "react";
import "./App.css";
import * as Shared from "@pcr/shared";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import MainPage from "./components/MainPage/MainPage";
// import AreaPage from "./components/AreaPage/AreaPage";
import MyNavbar from "./components/MyNavbar";

function App() {
  return (
    <Router>
      <div className="App">
        <MyNavbar className="mb-3" />

        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={true}
          newestOnTop={true}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          // draggable
          pauseOnHover
        />

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/areas">{/* <AreaPage /> */}</Route>
          <Route path="/">
            <MainPage />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
