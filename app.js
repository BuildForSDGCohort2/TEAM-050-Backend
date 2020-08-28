const express = require('express')
const { PORT, url } = require('./config/default')

const app = express()

app.listen(PORT, () => console.log(`Server is running on ${url}:${PORT}`))