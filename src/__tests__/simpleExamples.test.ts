describe("Сравнение данных объектов и массивов с ожидаемыми ошибками", () => {
  test("[#1] проверяем равенство объектов (ожидается успех)", () => {
    const can1 = {
      flavor: "grapefruit",
      ounces: 12,
    };
    const can2 = {
      flavor: "grapefruit",
      ounces: 12,
    };
    // Тест проходит, так как объекты полностью совпадают
    expect(can1).toEqual(can2);
  });
  test("[#2] проверяем равенство объектов (ожидается ошибка)", () => {
    const can1 = {
      flavor: "grapefruit",
      ounces: 13,
    };
    const can2 = {
      flavor: "grapefruit",
      ounces: 12,
    };
    // Ожидаем, что проверка равенства выбросит ошибку, т.к. значения ounces различаются
    expect(() => {
      expect(can1).toEqual(can2);
    }).toThrow();
  });
  test("[#3] проверяем равенство объектов (ожидается ошибка)", () => {
    const can1 = {
      flavor: "grapefruit",
      ounces: 12,
      price: 100,
    };
    const can2 = {
      flavor: "grapefruit",
      ounces: 12,
    };
    // Ожидаем, что проверка равенства выбросит ошибку, т.к. в can1 есть дополнительное поле price
    expect(() => {
      expect(can1).toEqual(can2);
    }).toThrow();
  });
  test("[#4] проверяем равенство массивов (ожидается успех)", () => {
    const names1 = ["Alice", "Bob"];
    const names2 = ["Alice", "Bob"];
    // Тест проходит, так как массивы идентичны
    expect(names1).toEqual(names2);
  });
  test("[#5] проверяем равенство массивов (ожидается ошибка)", () => {
    const names1 = ["Alice", "Bob", "Alex"];
    const names2 = ["Alice", "Bob"];
    // Ожидаем, что проверка равенства выбросит ошибку, т.к. names1 содержит дополнительный элемент 'Alex'
    expect(() => {
      expect(names1).toEqual(names2);
    }).toThrow();
  });
});
