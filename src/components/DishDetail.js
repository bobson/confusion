import React, { Component } from "react";

import { Loading } from "./LoadingComponent";

import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  BreadcrumbItem,
  Breadcrumb,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Label,
  Row,
} from "reactstrap";

import { Control, LocalForm, Errors } from "react-redux-form";

import { Link } from "react-router-dom";

import { baseUrl } from "../shared/baseUrl";

const requared = (val) => val && val.length;
const maxLength = (len) => (val) => !val || val.length <= len;
const minLength = (len) => (val) => val && val.length >= len;

class CommentForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isModalOpen: false,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
  }

  handleSubmit(values) {
    this.props.postComment(
      this.props.dishId,
      values.rating,
      values.author,
      values.comment
    );
  }

  toggleModal() {
    this.setState({ isModalOpen: !this.state.isModalOpen });
  }

  render() {
    return (
      <>
        <Button
          type="submit"
          outline
          color="secondary"
          onClick={this.toggleModal}
        >
          <span className="fa fa-pencil"> Submit Comment</span>
        </Button>
        <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
          <ModalHeader
            isOpen={this.state.isModalOpen}
            toggle={this.toggleModal}
          >
            Submit Comment
          </ModalHeader>
          <ModalBody>
            <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
              <Row className="form-group">
                <Label>Rating</Label>
                <Control.select
                  model=".rating"
                  className="form-control"
                  name="rating"
                >
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                </Control.select>
              </Row>
              <Row className="form-group">
                <Label htmlFor="name">Your Name</Label>
                <Control.text
                  model=".name"
                  className="form-control"
                  id="name"
                  placeholder="Your Name"
                  validators={{
                    requared,
                    minLength: minLength(3),
                    maxLength: maxLength(15),
                  }}
                />
                <Errors
                  className="text-danger"
                  model=".name"
                  show="touched"
                  messages={{
                    requared: "Required",
                    minLength: "Must be greater than 2 characters",
                    maxLength: "Must be 15 characters or less",
                  }}
                />
              </Row>
              <Row className="form-group">
                <Label htmlFor="comment">Comment</Label>
                <Control.textarea
                  model=".comment"
                  className="form-control"
                  id="comment"
                  name="comment"
                  rows="6"
                />
              </Row>
              <Row className="form-group">
                <Button type="submit" color="primary">
                  Submit
                </Button>
              </Row>
            </LocalForm>
          </ModalBody>
        </Modal>
      </>
    );
  }
}

function RenderDish({ dish }) {
  return (
    <div className="col-12 col-md-5 m-1">
      <Card>
        <CardImg top src={baseUrl + dish.image} alt={dish.name} />
        <CardBody>
          <CardTitle>{dish.name}</CardTitle>
          <CardText>{dish.description}</CardText>
        </CardBody>
      </Card>
    </div>
  );
}

function RenderComments({ comments, postComment, dishId }) {
  return (
    <div className="col-12 col-md-5 m-1">
      <h4>Comments</h4>
      {comments.map((comment) => (
        <ul key={comment.id} className="list-unstyled">
          <li>{comment.author}</li>
          <li>
            {comment.comment}{" "}
            {new Date(comment.date).toLocaleString("default", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </li>
        </ul>
      ))}
      <CommentForm dishId={dishId} postComment={postComment} />
    </div>
  );
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
  } else if (props.dish != null)
    return (
      <div className="container">
        <div className="row">
          <Breadcrumb>
            <BreadcrumbItem>
              <Link to="/menu"> Menu </Link>
            </BreadcrumbItem>
            <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
          </Breadcrumb>
          <div className="col-12">
            <h3>{props.dish.name}</h3>
            <hr />
          </div>
        </div>
        <div className="row">
          <RenderDish dish={props.dish} />
          <RenderComments
            comments={props.comments}
            postComment={props.postComment}
            dishId={props.dish.id}
          />
        </div>
      </div>
    );
  else return <div></div>;
};

export default DishDetail;
