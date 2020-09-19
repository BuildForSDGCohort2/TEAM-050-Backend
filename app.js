const express = require("express");
const bodyParser = require("body-parser");
const { PORT, url } = require("./config/default");
const AppError = require('./api/util/appError')
const globalErrorHandler = require('./api/middleware/globalErrorHelper')
require("./config/db")();

const app = express();

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/citizen", require("./api/routes/citizen.route"));
app.use("/api/v1/officer", require("./api/routes/officer.route"));
app.use("/api/v1/offense", require("./api/routes/offense.route"));

//Page not found Error handler
app.all('*', (req, res, next) => {
    next(new AppError('Page not Found', 404))
})

app.use(globalErrorHandler)
app.listen(PORT, () => console.log(`Server is running on ${url}:${PORT}`));
