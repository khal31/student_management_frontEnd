const request = require("supertest");

const app = require("../../src/app");

const studentService =
    require("../../src/controller/studentService");

jest.mock("../../src/controller/studentService");

describe("Student routes", () => {

    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe("GET /students", () => {

        test("returns 200 and displays students", async () => {

            const students = [
                {
                    rollNo: 1,
                    name: "Ali",
                    percentage: 85.5,
                    branch: "Computer Science",
                    subjects: [
                        {
                            id: 1,
                            grade: 90,
                            subject: {
                                id: 1,
                                name: "Maths"
                            }
                        }
                    ]
                }
            ];

            studentService.getAllStudents
                .mockResolvedValue(students);

            const response =
                await request(app)
                    .get("/students");
            expect(response.status)
                .toBe(200);

            expect(
                studentService.getAllStudents
            ).toHaveBeenCalledTimes(1);

        });
    });

    test("returns 500 when students cannot be retrieved", async () => {

        studentService.getAllStudents
            .mockRejectedValue(
                new Error("Backend failed")
            );

        const response =
            await request(app)
                .get("/students");

        expect(response.status)
            .toBe(500);

        expect(response.text)
            .toBe(
                "Unable to retrieve students"
            );
    });

    describe("POST /students", () => {

        test("creates student with correct details", async () => {

            studentService.createStudentWithSubject
                .mockResolvedValue({
                    rollNo: 1,
                    name: "Ali",
                    branch: "Computer Science",
                    percentage: 85.5,
                    subject: "Maths",
                    grade: 90
                });

            const response = await request(app)
                .post("/students")
                .type("form")
                .send({
                    name: "Ali",
                    branch: "Computer Science",
                    percentage: "85.5",
                    subject: "Maths",
                    grade: "90"
                });

            expect(response.status).toBe(302);

            expect(
                studentService.createStudentWithSubject
            ).toHaveBeenCalledWith({
                name: "Ali",
                branch: "Computer Science",
                percentage: 85.5,
                subject: "Maths",
                grade: 90
            });
        });

    });

    describe("Bad URL", () => {

        test("returns 404 when route does not exist", async () => {

            const response = await request(app)
                .post("/bxxurl")
                .type("form")
                .send({
                    name: "Ali",
                    branch: "Computer Science",
                    percentage: "85.5",
                    subject: "Maths",
                    grade: "90"
                });

            expect(response.status).toBe(404);
        });

    });
});