import React from "react";
import { Link } from "react-router-dom";
import Avater from "../../../shared/components/UIElements/Avater/Avater";
import Card from "../../../shared/components/UIElements/Card/Card";
import './UserItem.css';

const UsersItem = props => {
  return (
    <li className="user-item">
      <Card className="user-item__content">
        <Link to={`/${props.id}/places`}>
          <div className="user-item__image">
            <Avater image={`http://localhost:5000/${props.image}`} alt={props.name} />
          </div>
          <div className="user-item__info">
            <h2>{props.name}</h2>
            <h3>{props.placeCount} {props.placeCount === 1 ? 'Place' : 'Places'}</h3>
          </div>
        </Link>
      </Card>
    </li>
  );
};

export default UsersItem;
