const express = require('express')
const app = express()
const PORT = 5001

app.use(express.json())
app.get('/fakeapi', (req, res, next) => {
    res.send("Hello from fake api server")
})

app.get('/bagusapi', (req, res, next) => {
    res.send("Hello from fake api server bagus")
})

app.listen(PORT, () => {
    console.log('Fake server started on port ' + PORT)
})