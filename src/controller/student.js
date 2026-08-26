const axios = require("axios");
const axiosApi = require("./queryHelpers")

const GRAPHQL_URL = "http://localhost:8080/graphql";

async function getAllStudents() {
    const query = `
    query {
      getAllStudents {
        rollNo
        name
        percentage
        branch
        subjects {
          id
          grade
          subject {
            id
            name
          }
        }
      }
    }
  `;

    const response = await axios.post(GRAPHQL_URL, {
        query
    });

    if (response.data.errors) {
        throw new Error(response.data.errors[0].message);
    }

    return response.data.data.getAllStudents;
}

async function createStudent(req, res) {
    try {
        const {
            name,
            branch,
            percentage,
            subjectId,
            grade
        } = req.body;

        // 1. Create the student
        const student = await axiosApi.createStudent(
            name,
            Number(percentage),
            branch
        );

        // 2. Add the selected subject + grade
        await axiosApi.addSubjectToStudent(
            student.rollNo,
            Number(subjectId),
            Number(grade)
        );

        // 3. Go back to the student list
        res.redirect("/students");

    } catch (error) {
        console.error(error);

        res.status(500).send(
            "Unable to create student"
        );
    }
}

module.exports = {
    getAllStudents, createStudent
};