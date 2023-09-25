const express = require("express")
const mongoose = require("mongoose")
const bodyParser = require("body-parser")

const app = express()

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Methods",
    "GET,HEAD,OPTIONS,POST,PUT,DELETE"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "auth-token, Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

const url =
  "mongodb+srv://dbuser:user@cluster0.cqhatu9.mongodb.net/?retryWrites=true&w=majority";
mongoose
  .connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB Connected")
  })
  .catch(err => console.log(err))

app.use(bodyParser.json());

app.get("/", (res, req) => {
  res.send("home page");
});

const TodosRoute = require("./routes/Todos");
app.use("/todos", TodosRoute);

app.listen(3000, () => {
  console.log("Listening at port 3000");
});
