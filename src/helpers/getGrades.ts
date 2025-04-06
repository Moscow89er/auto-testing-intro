export interface Grades {
  math: number;
  programming: number;
  physics: number;
}

export async function getGrades(studentId: number): Promise<Grades> {
  const response = await fetch(
    `https://school-api/get-grades?studentId=${studentId}`,
  );
  const grades: Grades = await response.json();
  return grades;
}
