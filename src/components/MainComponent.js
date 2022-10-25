import React, { Component } from 'react';
import Home from './HomeComponent';
import Menu from './Menu'
import {DISHES} from '../shared/dishes'
import {COMMENTS} from '../shared/comments'
import {LEADERS} from '../shared/leaders'
import {PROMOTIONS} from '../shared/promotions'
import Contact from './ContactComponent'
import DishDetail from "./DishdetailComponent"
import Header from './HeaderComponent'
import Footer from './FooterComponent'
import { Switch, Route, Redirect } from 'react-router-dom'

class Main extends Component {
  constructor(props) {
    super(props)
    this.state = {
      dishes : DISHES,
      comments: COMMENTS,
      leaders: LEADERS,
      promotion: PROMOTIONS 
    }
  }

  render() {

    const HomePage = () => {
      return( <Home 
                dish={this.state.dishes.filter( (dish) => dish.featured)[0]}
                promotion={this.state.promotion.filter((promotion) => promotion.featured)[0]}
                leader={this.state.leaders.filter( (leader) => leader.featured)[0]} />)
  
    }

    const DishWithId = ({match}) => {
      return (
        <DishDetail dish={this.state.dishes.filter((dish) => dish.id === parseInt(match.params.dishId, 10))[0]}  
        comments={ this.state.comments.filter( (comment) => comment.dishId === parseInt(match.params.dishId, 10) ) }
        />
      )
    }
 
    return (
      <div>
       {/*  <Navbar dark color="primary">
        <div className='container'>
          <NavbarBrand href="/">Ristorante Con Fusion</NavbarBrand>
        </div>
        </Navbar> 
        
                <Menu dishes={this.state.dishes}  onClick={(dishId) => this.onDishSelect(dishId)} />
        <DishDetail dish={this.state.dishes.filter((dish) =>  dish.id === this.state.selectedDish )[0]} />*/}

        <Header />
        <Switch>
              <Route path='/home' component={HomePage} />
              <Route exact path='/menu' component={() => <Menu dishes={this.state.dishes} />} />
              <Route path="/menu/:dishId" component={DishWithId}  />
              <Route exact path="/contactus" component={Contact} />
              <Redirect to="/home" />
          </Switch>
        <Footer />
        
      </div>
    )
  }
}

export default Main;
