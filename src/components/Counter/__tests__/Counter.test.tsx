import { configureStore } from "@reduxjs/toolkit";
import Counter from "../Counter";
import counterReducer from "../../../store/counter";
import { fireEvent, render, getByTestId } from "@testing-library/react";
import { Provider } from "react-redux";

test("Плюс и минус в счетчике работают без ошибок", () => {
  // Создаем тестовый стор
  const store = configureStore({
    reducer: { counterReducer },
  });

  // Рендерим компонент, оборачивая его в Provider с тестовым стором
  const { container } = render(
    <Provider store={store}>
      <Counter />
    </Provider>,
  );

  const countValue = getByTestId(container, "count");
  const increment = getByTestId(container, "increment");
  const decrement = getByTestId(container, "decrement");

  expect(countValue.textContent).toBe("0");

  fireEvent.click(increment);
  expect(countValue.textContent).toBe("1");

  fireEvent.click(decrement);
  expect(countValue.textContent).toBe("0");
});
