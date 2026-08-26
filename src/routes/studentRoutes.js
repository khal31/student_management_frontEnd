const express = require("express");
const axiosAPI = require("../controller/queryHelpers")

const {
    getAllStudents
} = require("../controller/student");

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

        // 1. Create the student
        const student = await axiosAPI.createStudent(
            name,
            Number(percentage),
            branch
        );

        // 2. Create the subject
        const createdSubject = await axiosAPI.createSubject(
            subject
        );

        // 3. Link the subject to the student
        await axiosAPI.addSubjectToStudent(
            student.rollNo,
            createdSubject.id,
            Number(grade)
        );

        res.redirect("/students");

    } catch (error) {

        console.error(error);

        res.status(500).send(
            "Unable to create student"
        );
    }
});




module.exports = router;