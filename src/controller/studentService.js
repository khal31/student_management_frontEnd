const axiosAPI = require("../controller/queryHelpers");

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
    createStudentWithSubject
};