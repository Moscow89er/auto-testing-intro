import { FC, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store";
import { fetchUsers } from "../../store/thunkUsers";
import classes from "./UsersList.module.css";
import React from "react";

const UsersList: FC = () => {
  const dispatch = useAppDispatch();
  const { users, isLoading, error } = useAppSelector(
    (state) => state.userReducer,
  );

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  return (
    <main className={classes.usersList}>
      <h2>Список друзей</h2>
      {isLoading && <h1>Идет загрузка...</h1>}
      {error && <h1>{error}</h1>}
      <div>
        {users.map((user) => (
          <div key={user.id} className={classes.user}>
            <h3>{user.name}</h3>
            <p>{user.email}</p>
          </div>
        ))}
      </div>
    </main>
  );
};

export default UsersList;
