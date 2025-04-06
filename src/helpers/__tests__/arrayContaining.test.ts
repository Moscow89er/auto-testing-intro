describe("arrayContaining для проверки цветов", () => {
  const palette1 = ["red", "green", "blue", "yellow"];
  const palette2 = ["green", "blue"];
  const requiredColors = ["red", "green"];

  test("Проверяем, что palette1 содержит все необходимые цвета", () => {
    // тест пройдет, так как palette1 содержит 'red' и 'green'
    expect(palette1).toEqual(expect.arrayContaining(requiredColors));
  });

  test("Проверяем, что palette2 не содержит все необходимые цвета", () => {
    // тест пройдет, так как palette2 отсутствует 'red'
    expect(palette2).not.toEqual(expect.arrayContaining(requiredColors));
  });
});
