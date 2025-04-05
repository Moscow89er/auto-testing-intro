import classes from "./UserProfile.module.css";
import { useAppSelector } from "../../store";
import React from "react";

const UserProfile = () => {
  const { users, isLoading, error } = useAppSelector(
    (state) => state.userReducer,
  );
  const me = users[0];

  return (
    <main className={classes.profile}>
      <h2>Мой профиль</h2>
      {isLoading && <h1>Идет загрузка...</h1>}
      {error && <h1>{error}</h1>}
      {me && (
        <div>
          <div key={me.id} className={classes.user}>
            <h3>{me.name}</h3>
            <p>{me.email}</p>
          </div>
        </div>
      )}
    </main>
  );
};

export default UserProfile;
