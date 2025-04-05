import { Fragment } from "react";
import Header from "./components/Header/Header";
import Auth from "./components/Auth/Auth";
import Counter from "./components/Counter/Counter";
import UserProfile from "./components/UserProfile/UserProfile";
import UsersList from "./components/UsersList/UserList";
import { useAppSelector } from "./store";

function App() {
  const isAuth = useAppSelector((state) => state.authReducer.isAuthenticated);

  return (
    <Fragment>
      <Header />
      {!isAuth && <Auth />}
      {isAuth && <UserProfile />}
      {isAuth && <UsersList />}
      {/* <Counter /> */}
    </Fragment>
  );
}

export default App;
