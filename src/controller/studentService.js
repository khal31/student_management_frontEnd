const axiosAPI = require("../controller/queryHelpers");



async function getAllStudents() {

    return axiosAPI.getAllStudents();
}

async function createStudentWithSubject({
                                            name,
                                            branch,
                                            percentage,
                                            subject,
                                            grade
                                        }) {

    return axiosAPI.createStudentWithSubject(
        name,
        percentage,
        branch,
        subject,
        grade
    );
}


module.exports = {
    createStudentWithSubject, getAllStudents
};