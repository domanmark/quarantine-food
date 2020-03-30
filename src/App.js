import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";


import AddIngredient from "./components/add-ingredient.component";
import EditIngredient from "./components/edit-ingredient.component";
import IngredientsList from "./components/ingredients-list.component";
import DeleteIngredient from "./components/delete-ingredient.component";

import logo from "./logo.png";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="container">
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <a class="navbar-brand" href="https://target.com" target="_blank">
              <img src={logo} width="30" height="30" alt="Target.com" />
            </a>
            <Link to="/" className="navbar-brand">Alicia and Mark's Pantry</Link>
            <div className="collpase navbar-collapse">
              <ul className="navbar-nav mr-auto">
                <li className="navbar-item">
                  <Link to="/" className="nav-link">Ingredients</Link>
                </li>
                <li className="navbar-item">
                  <Link to="/create" className="nav-link">Add Ingredient</Link>
                </li>
              </ul>
            </div>
          </nav>
          <br/>
          <Route path="/" exact component={IngredientsList} />
          <Route path="/edit/:id" component={EditIngredient} />
          <Route path="/delete/:id" component={DeleteIngredient} />
          <Route path="/create" component={AddIngredient} />
        </div>
      </Router>
    );
  }
}

export default App;