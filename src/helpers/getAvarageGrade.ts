import { getGrades } from "./getGrades";

export async function getAvarageGrade(studentId: number): Promise<number> {
  const gradesMap = await getGrades(studentId);

  const grades: number[] = Object.values(gradesMap);
  const sumOfGrades = grades.reduce((acc, value) => acc + value, 0);
  const result = sumOfGrades / grades.length;
  return result;
}
