import React, { useState, useEffect } from "react";
import facade from "./apiFacade";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
  useRouteMatch,
  NavLink,
} from "react-router-dom";
import "./index.css";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => setLoggedIn(facade.tjekLogin), []);

  const logOut = () => {
    facade.logout().then(() => setLoggedIn(false));
  };

  const login = (user, pass) => {
    facade.login(user, pass).then((res) => setLoggedIn(true));
  };

  return (
    <>
      {loggedIn ? (
        <div>
          <HeaderLogo />
          <HeaderNav/>
          <Switch>
            <Route exact path="/">
              <Home />
              {/* <LoggedIn path="/"/> */}
            </Route>
            <Route path="/logout">
              <Logout logout={logOut} />
            </Route>
          </Switch>
        </div>
      ) : (
        <Route exact path="/">
          <LogIn login={login} />
        </Route>
      )}
    </>
  );
}

export function Logout(logout) {
  return (
    <div>
      <h3>Er du sikker på du vil logge af?</h3>
      <button onClick={logout}>Ja</button>
    </div>
  );
}

export function HeaderLogo() {
  return (
    <div>
      <ul className="header">
        <li>
          <NavLink activeClassName="active" to="/logout">
            Log af
          </NavLink>
        </li>
      <NavLink  to="/">
        <img src="favicon.ico" width="200vw" />
      </NavLink>
    </ul>
    </div>
  );
}

export function HeaderNav() {
  return (
    <div>
      <ul className="headernav">
        <li>
          <NavLink activeClassName="active" to="/userstory1">
            User Story 1
          </NavLink>
        </li>
    </ul>
    </div>
  );
}

export function Home() {
  return (
    <>
      <h2>Home is here</h2>
    </>
  );
}

function LogIn({ login }) {
  const init = { username: "", password: "" };
  const [loginCredentials, setLoginCredentials] = useState(init);

  const performLogin = (evt) => {
    evt.preventDefault();
    login(loginCredentials.username, loginCredentials.password);
  };
  const onChange = (evt) => {
    setLoginCredentials({
      ...loginCredentials,
      [evt.target.id]: evt.target.value,
    });
  };

  return (
    <>
      <div class="login padimage">
        <img src="favicon.ico" width="400vw" />
        <h2>Login</h2>
        <form onChange={onChange}>
          <input placeholder="User Name" id="username" />
          <input placeholder="Password" id="password" />
          <button onClick={performLogin}>Login</button>
        </form>
      </div>
    </>
  );
}
function LoggedIn() {
  const [dataFromServer, setDataFromServer] = useState("Loading...");

  useEffect(() => {
    facade
      .fetchData()
      .then((data) => setDataFromServer(data.msg))
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <h2>Data Received from server</h2>
      <h3>{dataFromServer}</h3>
    </div>
  );
}

export default App;
