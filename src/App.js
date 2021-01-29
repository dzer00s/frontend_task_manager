import React, { useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css";
import Header from "./components/Header.js/Header";
import MainTask from "./components/Main/MainTask";
import Registration from "./components/auth/Registration";
import Login from "./components/auth/Login";
import { useDispatch, useSelector } from "react-redux";
import { authUser } from "./actions/user";

function App() {
  const isAuth = useSelector(state => state.user.isAuth)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(authUser())
  }, [])

  return (
    <BrowserRouter>
      <Header />
      {!isAuth &&
        <Switch>
          <Route path="/registration" component={Registration} />
          <Route path="/login" component={Login} />
        </Switch>
      }
      {!!isAuth &&
        <Switch>
          <Route path="/" component={MainTask} />
        </Switch>
      }
    </BrowserRouter>
  );
}

export default App;
