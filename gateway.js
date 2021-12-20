const express = require('express')
const app = express()
const routes = require('./routes')
const PORT = 5000

app.use(express.json())
app.use('/', routes)


app.listen(PORT, () => {
    console.log('Gateway has started on port ' + PORT)
})