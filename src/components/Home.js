import React from "react";
import {
  Card,
  CardBody,
  CardText,
  CardTitle,
  CardImg,
  CardSubtitle,
} from "reactstrap";

const RenderCard = ({ item }) => (
  <Card>
    <CardImg src={item.image} />
    <CardBody>
      <CardTitle>{item.name}</CardTitle>
      {item.designation && <CardSubtitle>{item.designation}</CardSubtitle>}
      <CardText>{item.description}</CardText>
    </CardBody>
  </Card>
);

const Home = (props) => (
  <div className="container">
    <div className="row align-items-start">
      <div className="col-12 col-md m-1">
        <RenderCard item={props.dish} />
      </div>
      <div className="col-12 col-md m-1">
        <RenderCard item={props.promotion} />
      </div>
      <div className="col-12 col-md m-1">
        <RenderCard item={props.leader} />
      </div>
    </div>
  </div>
);

export default Home;
