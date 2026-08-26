const express = require("express");

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

module.exports = router;