import React from "react";
import UsersList from "../components/UsersList/UsersList";

const Users = () => {
  const USERS = [
    {
      id: 'u1',
      name: 'Mohamed Atef',
      image: 
        'https://media.istockphoto.com/id/1307615661/photo/smiling-indian-business-man-working-on-laptop-at-home-office-young-indian-student-or-remote.jpg?s=2048x2048&w=is&k=20&c=RhX9wQ_Krg1V6FszP_F_Xbs6F89eXvPYeyyyFHuX9Cs=',
      places: 3
    }
  ];

  return (
    <UsersList items={USERS} />
  );
};

export default Users;
