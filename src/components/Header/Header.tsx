import classes from "./Header.module.css";
import { authActions } from "../../store/auth";
import { useAppDispatch, useAppSelector } from "../../store";
import React, { FC } from "react";

const Header: FC = () => {
  const dispatch = useAppDispatch();
  const isAuth = useAppSelector((state) => state.authReducer.isAuthenticated);

  const logoutHandler = () => {
    dispatch(authActions.logout());
  };

  return (
    <header className={classes.header}>
      <h1>6Seniors | Nick_89er</h1>
      {isAuth && (
        <nav>
          <ul>
            <li>
              <button onClick={logoutHandler}>Logout</button>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
};

export default Header;
