const axiosAPI =
    require("../../src/controller/queryHelpers");

const studentService =
    require("../../src/controller/studentService");

jest.mock("../../src/controller/queryHelpers");

describe("studentService", () => {

    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe("getAllStudents", () => {

        test("returns all students", async () => {

            const students = [
                {
                    rollNo: 1,
                    name: "Ali",
                    percentage: 85.5,
                    branch: "Computer Science"
                }
            ];

            axiosAPI.getAllStudents
                .mockResolvedValue(students);

            const result =
                await studentService.getAllStudents();

            expect(
                axiosAPI.getAllStudents
            ).toHaveBeenCalledTimes(1);

            expect(result).toEqual(students);
        });
    });


    describe("createStudentWithSubject", () => {

        test("creates student with subject", async () => {

            const createdStudent = {
                rollNo: 1,
                name: "Ali",
                percentage: 85.5,
                branch: "Computer Science"
            };

            axiosAPI.createStudentWithSubject
                .mockResolvedValue(createdStudent);

            const result =
                await studentService.createStudentWithSubject({
                    name: "Ali",
                    branch: "Computer Science",
                    percentage: 85.5,
                    subject: "Maths",
                    grade: 90
                });

            expect(
                axiosAPI.createStudentWithSubject
            ).toHaveBeenCalledWith(
                "Ali",
                85.5,
                "Computer Science",
                "Maths",
                90
            );

            expect(result).toEqual(createdStudent);
        });
    });
});