import { render, screen } from "@testing-library/react";
import Header from "../Header";
import { Provider } from "react-redux";
import store from "../../../store";

test("Отображается заголовок", () => {
  render(
    <Provider store={store}>
      <Header />
    </Provider>,
  );
  const headerElement = screen.getByText(/6Seniors | Nick_89er/);
  expect(headerElement).toBeInTheDocument();
});
