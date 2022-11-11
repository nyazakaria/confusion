import React from "react";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  Breadcrumb,
  BreadcrumbItem,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Label,
  Row,
  Col,
} from "reactstrap";
import { LocalForm, Control, Errors } from "react-redux-form";
import { Link } from "react-router-dom";
import { Loading } from "./Loading";
import { baseUrl } from "../shared/baseUrl";

const styleCard = {
  padding: 0,
};

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !val || val.length <= len;
const minLength = (len) => (val) => val && val.length >= len;

class CommentForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isNewComment: false,
    };

    this.toggleNewComment = this.toggleNewComment.bind(this);
  }

  toggleNewComment() {
    this.setState({
      isNewComment: !this.state.isNewComment,
    });
  }

  addComment(comment) {
    this.toggleNewComment();

    this.props.addComment(
      this.props.dishId,
      comment.rating,
      comment.author,
      comment.comment
    );
  }

  render() {
    return (
      <div>
        <Button
          onClick={this.toggleNewComment}
          outline
          color="secondary"
          className="float-left"
        >
          <span className="fa fa-pencil"></span> Submit Comment
        </Button>
        <Modal isOpen={this.state.isNewComment} toggle={this.toggleNewComment}>
          <ModalHeader toggle={this.toggleNewComment}>
            Submit Comment
          </ModalHeader>
          <ModalBody>
            <LocalForm onSubmit={(value) => this.addComment(value)}>
              <Row className="form-group">
                <Label htmlFor="rating" md={12}>
                  Rating
                </Label>
                <br />
                <Col md={12}>
                  <Control.select
                    model=".rating"
                    className="form-control"
                    id="rating"
                    name="rating"
                  >
                    <option value="1">1</option>
                    <option value="2">²</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                  </Control.select>
                </Col>
              </Row>
              <Row className="form-group">
                <Label htmlFor="author" md={12}>
                  Your Name
                </Label>
                <br />
                <Col md={12}>
                  <Control.text
                    model=".author"
                    className="form-control"
                    id="author"
                    name="author"
                    validators={{
                      required,
                      maxLength: maxLength(15),
                      minLength: minLength(3),
                    }}
                  />
                  <Errors
                    className="text-danger"
                    model=".author"
                    show="touched"
                    messages={{
                      required: "Required ",
                      minLength: "Must be greater than 2 characters",
                      maxLength: "Must be 15 characters or less",
                    }}
                  />
                </Col>
              </Row>
              <Row className="form-group">
                <Label htmlFor="comment" md={12}>
                  Comment
                </Label>
                <Col md={12}>
                  <Control.textarea
                    id="comment"
                    name="comment"
                    rows="6"
                    model=".comment"
                    className="form-control"
                  />
                </Col>
              </Row>
              <Row className="form-group">
                <Col md={10}>
                  <Button type="submit" color="primary">
                    Submit
                  </Button>
                </Col>
              </Row>
            </LocalForm>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

function RenderDish({ dish }) {
  return (
    <div style={styleCard}>
      <Card>
        <CardImg width="100%" src={baseUrl + dish.image} alt={dish.name} />
        <CardBody>
          <CardTitle> {dish.name}</CardTitle>
          <CardText>{dish.description}</CardText>
        </CardBody>
      </Card>
    </div>
  );
}

function RenderComments({ comments, addComment, dish }) {

  if (dish != null) {
    return comments.map((com) => {
      let formatedDate = new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "short",
        day: "2-digit",
      }).format(new Date(Date.parse(com.date)));
      return (
        <>
          <li key={com.id} className="text-left font-weight-normal">
            <p> {com.comment} </p>
            <p>
              -- {com.author}, {formatedDate}{" "}
            </p>
          </li>
        </>
      );
    });
  } else {
    return <div></div>;
  }
}

const DishDetail = (props) => {
  if (props.isLoading) {
    return (
      <div className="container">
        <div className="row">
          <Loading />
        </div>
      </div>
    );
  } else if (props.errMess) {
    return (
      <div className="container">
        <div className="row">
          <h4>{props.errMess}</h4>
        </div>
      </div>
    );
  } else if (props.dish != null) {
    return (
      <div className="container">
        <div className="row">
          <Breadcrumb>
            <BreadcrumbItem>
              <Link to="/menu">Menu</Link>
            </BreadcrumbItem>
            <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
          </Breadcrumb>
          <div className="col-12">
            <h3>{props.dish.name} </h3>
            <hr />
          </div>
        </div>
        <div className="row">
          <div className="col-12 col-md-5 m-1">
            <RenderDish dish={props.dish} />
          </div>
          <div className="col-12 col-md-5 m-1">
            <RenderComments
              comments={props.comments}
              addComment={props.addComment}
              dish={props.dish.id}
            />
            <CommentForm dishId={props.dish.id} addComment={props.addComment} />{" "}
          </div>
        </div>
      </div>
    );
  }
};

export default DishDetail;
