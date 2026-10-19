require("dotenv").config();
const express = require("express");
const cors = require("cors");
const login = require("./controllers/login");
const students = require("./controllers/students");
const newMentor = require("./controllers/newMentor");
const formId = require("./controllers/formId");
const formValue = require("./controllers/formValue");
const deleteMenti = require("./controllers/deleteMenti");

const app = express();

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const MongoClient = require("mongodb").MongoClient;

const url = process.env.MONGO_URL;
const client = new MongoClient(url);

async function run() {
    try {
        await client.connect().then(console.log("DB is OK"));
    } catch (err) {
        console.log(err);
    }
}
run().catch(console.error);

const handleError = (err, response) => {
    console.log(err);
    response.status(500).json({ message: "Server error" });
};

app.post("/login", (request, response) => {
    login(request, response, client).catch((err) => handleError(err, response));
});

app.post("/new-mentor", (request, response) => {
    newMentor(request, response, client).catch((err) => handleError(err, response));
});

app.post("/delete-menti", (request, response) => {
    deleteMenti(request, response, client).catch((err) => handleError(err, response));
});

app.get("/students-info", (request, response) => {
    students(request, response, client).catch((err) => handleError(err, response));
});

app.post("/form-id", (request, response) => {
    formId(request, response, client).catch((err) => handleError(err, response));
});

app.post("/form-value", (request, response) => {
    formValue(request, response, client).catch((err) => handleError(err, response));
});

app.listen(PORT, () => {
    console.log(`Server is listening on port: ${PORT}`);
});
