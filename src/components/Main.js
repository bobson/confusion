import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import { DISHES } from "../shared/dishes";
import { COMMENTS } from "../shared/comments";
import { PROMOTIONS } from "../shared/promotions";
import { LEADERS } from "../shared/leaders";
import Header from "./Header";
import Home from "./Home";
import About from "./About";
import Menu from "./Menu";
import Contact from "./Contact";
import DishDetail from "./DishDetail";
import Footer from "./Footer";

class Main extends Component {
  state = {
    dishes: DISHES,
    comments: COMMENTS,
    promotions: PROMOTIONS,
    leaders: LEADERS,
  };

  render() {
    const HomePage = () => (
      <Home
        dish={this.state.dishes.filter((dish) => dish.featured)[0]}
        promotion={
          this.state.promotions.filter((promotion) => promotion.featured)[0]
        }
        leader={this.state.leaders.filter((leader) => leader.featured)[0]}
      />
    );

    const DishWithId = ({ match }) => {
      return (
        <DishDetail
          dish={
            this.state.dishes.filter(
              (dish) => dish.id === parseInt(match.params.dishId, 10)
            )[0]
          }
          comments={this.state.comments.filter(
            (comment) => comment.dishId === parseInt(match.params.dishId, 10)
          )}
        />
      );
    };

    return (
      <div>
        <Header />
        <Switch>
          <Route path="/home" component={HomePage} />
          <Route
            path="/aboutus"
            component={() => <About leaders={this.state.leaders} />}
          />
          <Route
            exact
            path="/menu"
            component={() => <Menu dishes={this.state.dishes} />}
          />
          <Route path="/menu/:dishId" component={DishWithId} />
          <Route exact path="/contacus" component={Contact} />
          <Redirect to="/home" />
        </Switch>
        <Footer />
      </div>
    );
  }
}

export default Main;
