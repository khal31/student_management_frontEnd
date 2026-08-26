const express = require("express");
const nunjucks = require("nunjucks");

const studentRoutes = require("./routes/studentRoutes");

const app = express();

nunjucks.configure("views", {
    autoescape: true,
    express: app
});


app.set("view engine", "njk");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/", studentRoutes);

app.listen(3000, () => {
    console.log("Frontend running on http://localhost:3000");
});