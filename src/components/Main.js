import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import { DISHES } from "../shared/dishes";
import Home from "./Home";
import Menu from "./Menu";
import DishDetail from "./DishDetail";
import Header from "./Header";
import Footer from "./Footer";

class Main extends Component {
  state = {
    dishes: DISHES,
  };

  render() {
    const HomePage = () => <Home />;
    return (
      <div>
        <Header />
        <Switch>
          <Route path="/home" component={HomePage} />
          <Route
            exact
            path="/menu"
            component={() => <Menu dishes={this.state.dishes} />}
          />
          <Redirect to="/home" />
        </Switch>
        <Footer />
      </div>
    );
  }
}

export default Main;
