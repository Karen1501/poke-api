import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import Landing from "../components/Landing/index";
import Registro from "../screens/registro";
import Pokemon from "../components/pokemon";
import Equipo from "../screens/equipo";
import Eventos from "../screens/eventos";

function Home() {
  return (
    <div>
      <Router>
        <Switch>
          <Route exact path="/">
            <Landing />
          </Route>
          <Route path="/registro">
            <Registro />
          </Route>
          <Route path="/pokemon">
            <Pokemon />
          </Route>
          <Route path="/equipo">
            <Equipo />
          </Route>
          <Route path="/eventos">
            <Eventos />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default Home;
