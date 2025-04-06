// import { getGrades } from "../getGrades.ts";
// import { Mock, vi } from "vitest";
// import * as gradesApi from '../getGrades'
import { getAvarageGrade } from "../getAvarageGrade.ts";
import { server } from "../../mocks/node";

beforeAll(() => {
  // перед запуском всех тестов, запускаем сервер для перехвата сетевых запросов
  server.listen();
});

afterAll(() => {
  // выключаем перехват запросов после прохождения всех тестов
  server.close();
});

test("тест расчета средней оценки студента", async () => {
  const averageGrade = await getAvarageGrade(1);

  expect(averageGrade).toBe(5);
});

// test('тест расчета средней оценки студента', async () => {
//     const getGradesMock = vi.spyOn(gradesApi, 'getGrades').mockImplementation(() => Promise.resolve({
//         math: 5,
//         programming: 5,
//         physics: 5
//     }));

//     const averageGrade = await getAvarageGrade(1);

//     expect(getGradesMock).toHaveBeenCalled();
//     expect(averageGrade).toBe(5);
// });

// vi.mock('../getGrades');

// (getGrades as Mock).mockImplementation(() => Promise.resolve({
//     math: 5,
//     programming: 5,
//     physics: 5
// }));

// test('тест расчета средней оценки студента', async () => {

//     const averageGrade = await getAvarageGrade(1);

//     expect(averageGrade).toBe(5);
// });

// test('тест расчета средней оценки студента', async () => {
//     global.fetch = vi.fn(() =>
//         Promise.resolve({
//             json: () => Promise.resolve({
//                 math: 5,
//                 programming: 5,
//                 physics: 5
//             }),
//         })
//     ) as Mock;

//     const averageGrade = await getAvarageGrade(1);

//     expect(averageGrade).toBe(5);
// });
