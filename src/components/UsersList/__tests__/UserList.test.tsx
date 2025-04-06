import { vi } from "vitest";
import userReducer, { selectLikedUsers, toggleLike } from "../../../store/user";
import { configureStore } from "@reduxjs/toolkit";
import { fetchUsers } from "../../../store/thunkUsers";
import { fireEvent, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import UsersList from "../UserList";

describe("Тесты синхронных экшенов userSlice", () => {
  // Начальное состояние, которое будем изменять в тестах
  const initialUserState = {
    users: [
      {
        id: 1,
        name: "John Doe",
        email: "john@example.com",
        isLiked: false,
      },
      {
        id: 2,
        name: "Jane Doe",
        email: "jane@example.com",
        isLiked: true,
      },
    ],
    isLoading: false,
    error: "",
  };

  test("поставить лайк пользователю", () => {
    // Применяем экшен toggleLike для пользователя с id: 1
    const newState = userReducer(initialUserState, toggleLike(1));
    // Проверяем, что состояние изменилось ожидаемым образом
    expect(newState.users).toEqual([
      {
        id: 1,
        name: "John Doe",
        email: "john@example.com",
        isLiked: true,
      },
      {
        id: 2,
        name: "Jane Doe",
        email: "jane@example.com",
        isLiked: true,
      },
    ]);
  });

  test("снять лайк у пользователя", () => {
    // Применяем экшен toggleLike для пользователя с id: 2
    const newState = userReducer(initialUserState, toggleLike(2));
    // Проверяем, что состояние изменилось ожидаемым образом
    expect(newState.users).toEqual([
      {
        id: 1,
        name: "John Doe",
        email: "john@example.com",
        isLiked: false,
      },
      {
        id: 2,
        name: "Jane Doe",
        email: "jane@example.com",
        isLiked: false,
      },
    ]);
  });
});

describe("Тест асинхронных экшенов userSlice", () => {
  it("тест загрузки пользователей", async () => {
    const expectedResult = [
      {
        id: 1,
        name: "John Doe",
        email: "john@example.com",
        isLiked: false,
      },
      {
        id: 2,
        name: "Jane Doe",
        email: "jane@example.com",
        isLiked: true,
      },
    ];

    // Мокаем fetch так, чтобы он возвращал ожидаемые данные
    global.fetch = vi.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(expectedResult),
      }),
    ) as unknown as typeof fetch;

    // Создаем стор, в который будут помещаться данные, полученные через fetchUsers
    const store = configureStore({ reducer: { userReducer } });
    type AppDispatch = typeof store.dispatch;
    // Ожидаем выполнения асинхронного экшена fetchUsers
    await store.dispatch(fetchUsers() as AppDispatch);
    // Получаем состояние стора
    const { users } = store.getState().userReducer;

    // Проверяем, что данные в сторе соответствуют ожидаемому результату с добавленным полем likes: 0
    expect(users).toEqual(
      expectedResult.map((user) => ({ ...user, likes: 0 })),
    );
  });
});

describe("Тесты селекторов userSlice", () => {
  it("получение лайкнутых пользователей", () => {
    // Создаем стор с предустановленным состоянием, где 2 из 3 пользователей имеют лайк
    const store = configureStore({
      reducer: {
        userReducer: userReducer,
      },
      preloadedState: {
        userReducer: {
          users: [
            {
              id: 1,
              name: "John Doe",
              email: "john@example.com",
              isLiked: false,
              likes: 0,
            },
            {
              id: 2,
              name: "Jane Doe",
              email: "jane@example.com",
              isLiked: true,
              likes: 0,
            },
            {
              id: 3,
              name: "Alex Smith",
              email: "alex@example.com",
              isLiked: true,
              likes: 0,
            },
          ],
          isLoading: false,
          error: "",
        },
      },
    });

    // Получаем лайкнутых пользователей с помощью селектора
    const likedUsers = selectLikedUsers(store.getState());

    // Проверяем, что селектор возвращает только пользователей с isLiked === true
    expect(likedUsers).toEqual([
      {
        id: 2,
        name: "Jane Doe",
        email: "jane@example.com",
        isLiked: true,
        likes: 0,
      },
      {
        id: 3,
        name: "Alex Smith",
        email: "alex@example.com",
        isLiked: true,
        likes: 0,
      },
    ]);
  });
});

describe("Снапшот-тест компонента UsersList", () => {
  it("отображается корректно и соответствует сохранённому снапшоту", () => {
    // Задаем предустановленное состояние для редьюсера userReducer
    const preloadedState = {
      userReducer: {
        users: [
          {
            id: 1,
            name: "John Doe",
            email: "john@example.com",
            isLiked: false,
            likes: 0,
          },
          {
            id: 2,
            name: "Jane Doe",
            email: "jane@example.com",
            isLiked: true,
            likes: 0,
          },
        ],
        isLoading: false,
        error: "",
      },
    };

    // Создаем тестовый стор с помощью configureStore
    const store = configureStore({
      reducer: { userReducer },
      preloadedState,
    });

    // Рендерим компонент, оборачивая его в Provider с нашим тестовым стором
    const { asFragment } = render(
      <Provider store={store}>
        <UsersList />
      </Provider>,
    );

    // Сравниваем сгенерированный фрагмент DOM с сохраненным снапшотом
    expect(asFragment()).toMatchSnapshot();
  });
});

// Мокаем асинхронный экшен fetchUsers, чтобы он не перезаписывал наше предустановленное состояние в тесте
vi.mock("../../store/thunkUsers", () => ({
  fetchUsers: () => () => {},
}));

describe("Тест обработчика клика в компоненте UsersList", () => {
  it("должен переключать статус лайка при клике на кнопку", () => {
    // Задаем предустановленное состояние: один пользователь без лайка
    const preloadedState = {
      userReducer: {
        users: [
          {
            id: 1,
            name: "John Doe",
            email: "john@example.com",
            isLiked: false,
            likes: 0,
          },
        ],
        isLoading: false,
        error: "",
      },
    };

    // Создаем тестовый стор с предустановленным состоянием
    const store = configureStore({
      reducer: { userReducer },
      preloadedState,
    });

    // Рендерим компонент, оборачивая его в Provider с нашим тестовым стором
    render(
      <Provider store={store}>
        <UsersList />
      </Provider>,
    );

    // Находим кнопку по её тексту, который отображается для не лайкнутого пользователя
    const likeButton = screen.getByRole("button", {
      name: /Кликни, чтобы поставить лайк/i,
    });
    expect(likeButton).toBeInTheDocument();

    // Имитируем клик по кнопке
    fireEvent.click(likeButton);

    // После клика текст кнопки должен измениться, так как статус лайка изменился
    expect(
      screen.getByRole("button", { name: /Лайк \(кликни, чтобы убрать\)/i }),
    ).toBeInTheDocument();
  });
});
