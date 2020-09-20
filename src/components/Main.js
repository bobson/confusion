import React, { Component } from "react";

import { DISHES } from "../shared/dishes";
import Menu from "./Menu";
import DishDetail from "./DishDetail";
import Header from "./Header";
import Footer from "./Footer";

class Main extends Component {
  state = {
    dishes: DISHES,
    selectedDish: null,
  };

  onDishSelect(dishId) {
    this.setState({ selectedDish: dishId });
  }

  render() {
    return (
      <div>
        <Header />
        <Menu
          dishes={this.state.dishes}
          onClick={(dishId) => this.onDishSelect(dishId)}
        />
        {this.state.selectedDish && (
          <DishDetail
            dish={
              this.state.dishes.filter(
                (dish) => dish.id === this.state.selectedDish
              )[0]
            }
          />
        )}
        <Footer />
      </div>
    );
  }
}

export default Main;
