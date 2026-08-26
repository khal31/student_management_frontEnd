const axios = require("axios");

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

module.exports = {
    getAllStudents
};