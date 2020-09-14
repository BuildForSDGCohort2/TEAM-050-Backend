const express = require("express");
const bodyParser = require("body-parser");
const { PORT, url } = require("./config/default");
require("./config/db")();

const app = express();

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/citizen", require("./api/routes/citizen.route"));
app.use("/api/v1/officer", require("./api/routes/officer.route"));

app.listen(PORT, () => console.log(`Server is running on ${url}:${PORT}`));
