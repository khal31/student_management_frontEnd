const axios = require("axios");
const GRAPHQL_URL = "http://localhost:8080/graphql";

async function createStudent(name, percentage, branch) {



    const mutation = `
        mutation CreateStudent(
            $name: String!
            $percentage: Float!
            $branch: String!
        ) {
            createStudent(
                name: $name
                percentage: $percentage
                branch: $branch
            ) {
                rollNo
                name
                percentage
                branch
            }
        }
    `;

    const response = await axios.post(GRAPHQL_URL, {
        query: mutation,
        variables: {
            name,
            percentage,
            branch
        }
    });

    if (response.data.errors) {
        throw new Error(
            response.data.errors[0].message
        );
    }

    return response.data.data.createStudent;
}

async function createSubject(name) {

    const mutation = `
        mutation CreateSubject($name: String!) {
            createSubject(name: $name) {
                id
                name
            }
        }
    `;

    const response = await axios.post(
        GRAPHQL_URL,
        {
            query: mutation,
            variables: {
                name
            }
        }
    );

    if (response.data.errors) {
        throw new Error(
            response.data.errors[0].message
        );
    }

    return response.data.data.createSubject;
}

async function addSubjectToStudent(
    studentId,
    subjectId,
    grade
) {

    const mutation = `
        mutation AddSubjectToStudent(
            $studentId: ID!
            $subjectId: ID!
            $grade: Float!
        ) {
            addSubjectToStudent(
                studentId: $studentId
                subjectId: $subjectId
                grade: $grade
            ) {
                id
                grade
                subject {
                    id
                    name
                }
            }
        }
    `;

    const response = await axios.post(GRAPHQL_URL, {
        query: mutation,
        variables: {
            studentId,
            subjectId,
            grade
        }
    });

    if (response.data.errors) {
        throw new Error(
            response.data.errors[0].message
        );
    }

    return response.data.data.addSubjectToStudent;
}

module.exports = {
    createStudent,addSubjectToStudent, createSubject
}