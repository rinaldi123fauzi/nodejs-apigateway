const express = require('express')
const app = express()
const axios = require('axios')
const HOST = 'http://localhost'
const PORT = 5001

app.use(express.json())
app.get('/fakeapi', (req, res, next) => {
    res.send("Hello from fake api server")
})

app.get('/bagusapi', (req, res, next) => {
    res.send("Hello from fake api server bagus")
})

app.listen(PORT, () => {
    axios({
        method: 'POST',
        url: 'http://localhost:5000/register',
        headers: {'Content-Type': 'application/json'},
        data: {
            apiName:"registryTest",
            protocol: "http",
            host: HOST,
            port: PORT,
        }
    }).then((response) => {
        console.log(response.data)
    })
    console.log('Fake server started on port ' + PORT)
})