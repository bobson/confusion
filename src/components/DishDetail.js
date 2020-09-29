import React from "react";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  BreadcrumbItem,
  Breadcrumb,
} from "reactstrap";
import { Link } from "react-router-dom";

function RenderDish({ dish }) {
  return (
    <div className="col-12 col-md-5 m-1">
      <Card>
        <CardImg width="100%" src={dish.image} alat={dish.name} />
        <CardBody>
          <CardTitle>{dish.name}</CardTitle>
          <CardText>{dish.description}</CardText>
        </CardBody>
      </Card>
    </div>
  );
}

function RenderComments({ comments }) {
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
    </div>
  );
}

const DishDetail = (props) => {
  if (props.dish !== null)
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
          <RenderComments comments={props.comments} />
        </div>
      </div>
    );
  else return <div></div>;
};

export default DishDetail;
