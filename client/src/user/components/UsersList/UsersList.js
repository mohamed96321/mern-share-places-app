import React from "react";
import UsersItem from "../UsersItem/UserItem";
import './UsersList.css';

const UsersList = props => {
  if (props.items.length === 0) {
    return (
    <div className="centered">
      <h2>No Users Found.</h2>
    </div>
    );
  }

  return (
    <ul className="users-list">
      {props.items.map(user => (
        <UsersItem 
          key={user.id} 
          id={user.id} 
          image={user.image} 
          name={user.name}
          placeCount={user.places}
        />
      ))}
    </ul>
  );

};

export default UsersList;
