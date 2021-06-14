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
  Redirect,
  useHistory
} from "react-router-dom";
import "./index.css";
import "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import $ from 'jquery';
import Popper from 'popper.js';
import 'bootstrap/dist/js/bootstrap.bundle.min';


function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  const history = useHistory();
  useEffect(() => {
    setLoggedIn(facade.tjekLogin)
  }, []);

  const logOut = () => {
    facade.logout();
    setLoggedIn(false);
    history.push('/');
  };

  const login = (user, pass) => {
    facade.login(user, pass).then((res) => setLoggedIn(true));
  };

  return (
    <>
    {/* <iframe width="560" height="315" src="https://www.youtube.com/embed/pGbIOC83-So" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe> */}

    
      {loggedIn ? (
        <div>
          <HeaderLogo />
          <HeaderNav />
          <Switch>
            <Route path="/home">
              <Home/>
              {/* <LoggedIn path="/"/> */}
            </Route>
            <Route path="/userstory1">
              <US1/>
              </Route>
             <Route path="/logout">{logOut}</Route>
          </Switch>
        </div>
      ) : (
        <Route exact path="/">
          <LogIn login={login} />
        </Route>
      )}
       <div><div className="video-background">
  <iframe className="fullscreen-bg " frameBorder="0" allowtransparency="true" allowFullScreen loop="1"
    src={"https://www.youtube.com/embed/pGbIOC83-So?autoplay=1&mute=1" } /></div>
    </div>
    </>
  );
}

// function Logout(logOut) {
//   return (
//     <div>
//       <h3>Er du sikker på du vil logge af?</h3>
//       <input type="button" id="logoutbutton">Ja</input>
//     </div>
//   );
// }

export function HeaderLogo() {
  function onSubmit(e) {
    e.preventDefault();
  }

  return (
    <div>
      <ul className="header">
        <li className="logout">
          <Link className="active" to="/">
            <button type="button" className={`btn btn-outline-dark`} id="logout" onSubmit={onSubmit}>
              Log af
            </button>
          </Link>
        </li>
        <li className="logo">
          <NavLink to="/home">
            <img src="favicon.ico" width="200vw" />
          </NavLink>
        </li>
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

export function US1() {
  return (
    <>
      <h2>Userstory 1 - here</h2>
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
      <div className="login padimage">
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
