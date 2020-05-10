import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css"

import Navbar from "./components/navbar.component";
import accueil from "./components/accueil.component";
import register from "./components/register.component";
import login from "./components/login.component";

function App() {
  return (
    <Router>
    <div className="App">
      <Navbar />
      <header className="App-header">
    <Route path="/" exact component={accueil} />
    <Route path="/register" exact component={register} />
    <Route path="/login" exact component={login} />
      Je suis un poulet content (je suis juste un test ma vie est nul)
      </header>
    </div>
    </Router>
  );
}

export default App;
