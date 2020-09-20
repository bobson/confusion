import React from "react";
import { Card, CardImg, CardText, CardBody, CardTitle } from "reactstrap";

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
  const dish = props.dish;
  return (
    <div className="container">
      <div className="row">
        <RenderDish dish={dish} />
        <RenderComments comments={dish.comments} />
      </div>
    </div>
  );
};

export default DishDetail;
