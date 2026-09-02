const axios = require("axios");

const queryHelpers =
    require("../../src/controller/queryHelpers");

jest.mock("axios");



describe("queryHelpers", () => {

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test("getAllStudents returns students", async () => {

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

        axios.post.mockResolvedValue({
            data: {
                data: {
                    getAllStudents: students
                }
            }
        });

        const result =
            await queryHelpers.getAllStudents();

        expect(result).toEqual(students);

        expect(
            axios.post
        ).toHaveBeenCalledTimes(1);
    });
});