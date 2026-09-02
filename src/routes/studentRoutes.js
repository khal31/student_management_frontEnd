const express = require("express");
const axiosApiQuery = require("../controller/queryHelpers")

const {
    getAllStudents
} = require("../controller/student");
const {addSubjectToStudent} = require("../controller/queryHelpers");
const studentService = require("../controller/studentService");

const router = express.Router();

router.get("/students", async (req, res) => {

    try {

        const students = await getAllStudents();

        res.render("students", {
            students
        });

    } catch (error) {
        console.error(error);

        res.status(500).send("Unable to retrieve students");
    }
});

router.get("/students/add", async (req, res) => {
    res.render("addStudent.njk");
});

router.post("/students", async (req, res) => {

    try {

        const {
            name,
            branch,
            percentage,
            subject,
            grade
        } = req.body;

        console.log("Form data:", req.body);
        await studentService.createStudentWithSubject({
            name,
            branch,
            percentage: Number(percentage),
            subject,
            grade: Number(grade)
        });
        res.redirect("/students");

    } catch (error) {

        console.error(error);

        res.status(500).send(
            "Unable to create student"
        );
    }
});




module.exports = router;