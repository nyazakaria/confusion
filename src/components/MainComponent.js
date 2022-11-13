import React, { Component } from "react";
import Home from "./HomeComponent";
import Menu from "./Menu";
import Contact from "./ContactComponent";
import DishDetail from "./DishdetailComponent";
import About from "./AboutComponent ";
import Header from "./HeaderComponent";
import Footer from "./FooterComponent";
import { Switch, Route, Redirect, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import {
  postComment,
  fetchDishes,
  fetchComments,
  fetchPromos,
  fetchLeaders,
} from "../redux/ActionCreators";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { actions } from "react-redux-form";
import "../App.css";
const mapStateToProps = (state) => {
  return {
    dishes: state.dishes,
    comments: state.comments,
    promotions: state.promotions,
    leaders: state.leaders,
  };
};

const mapDispatchToProps = (dispatch) => ({
  postComment: (dishId, rating, author, comment) =>
    dispatch(postComment(dishId, rating, author, comment)),
  fetchLeaders: () => {
    dispatch(fetchLeaders());
  },
  fetchDishes: () => {
    dispatch(fetchDishes());
  },
  fetchComments: () => {
    dispatch(fetchComments());
  },
  fetchPromos: () => {
    dispatch(fetchPromos());
  },

  resetFeedbackForm: () => {
    dispatch(actions.reset("feedback"));
  },
});

class Main extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchDishes();
    this.props.fetchComments();
    this.props.fetchPromos();
    this.props.fetchLeaders();
  }

  render() {
    const HomePage = () => {
      console.log(
        this.props.leaders.leader.filter((leader) => leader.featured)[0]
      );
      return (
        <Home
          dish={this.props.dishes.dishes.filter((dish) => dish.featured)[0]}
          dishesIsLoading={this.props.dishes.isLoading}
          dishesErrMess={this.props.dishes.errMess}
          promotion={
            this.props.promotions.promotions.filter(
              (promotion) => promotion.featured
            )[0]
          }
          promosIsLoading={this.props.promotions.isLoading}
          promosErrMess={this.props.promotions.errMess}
          leader={
            this.props.leaders.leader.filter((leader) => leader.featured)[0]
          }
          leaderIsLoading={this.props.leaders.leaderIsLoading}
          leaderErrMess={this.props.leaders.errMess}
        />
      );
    };

    const DishWithId = ({ match }) => {
      return (
        <DishDetail
          dish={
            this.props.dishes.dishes.filter(
              (dish) => dish.id === parseInt(match.params.dishId, 10)
            )[0]
          }
          isLoading={this.props.dishes.isLoading}
          errMess={this.props.dishes.errMess}
          comments={this.props.comments.comments.filter(
            (comment) => comment.dishId === parseInt(match.params.dishId, 10)
          )}
          commentsErrMess={this.props.comments.errMess}
          postComment={this.props.postComment}
        />
      );
    };

    const AboutUs = () => {
      return (
        <About
          leaders={this.props.leaders.leader}
          isLoading={this.props.leaders.isLoading}
          errMess={this.props.leaders.err}
        />
      );
    };

    return (
      <div>
        {/*  <Navbar dark color="primary">
        <div className='container'>
          <NavbarBrand href="/">Ristorante Con Fusion</NavbarBrand>
        </div>
        </Navbar> 
        
                <Menu dishes={this.props.dishes}  onClick={(dishId) => this.onDishSelect(dishId)} />
        <DishDetail dish={this.props.dishes.filter((dish) =>  dish.id === this.props.selectedDish )[0]} />*/}

        <Header />
        <Switch location={this.props.location}>
          <Route path="/home" component={HomePage} />
          <Route exact path="/aboutus" component={AboutUs} />
          <Route
            exact
            path="/menu"
            component={() => <Menu dishes={this.props.dishes} />}
          />
          <Route path="/menu/:dishId" component={DishWithId} />
          <Route
            exact
            path="/contactus"
            component={() => (
              <Contact resetFeedbackForm={this.props.resetFeedbackForm} />
            )}
          />
          <Redirect to="/home" />
        </Switch>
        <Footer />
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
