const express = require('express')
const router = express.Router()
const axios = require('axios')
const { response } = require('express')
const registry = require('./registry.json')
const fs = require('fs')

router.all('/:apiName/:path', (req,res) => {
    console.log(req.params.apiName)
    // res.send(req.params.apiName + '\n')
    if(registry.services[req.params.apiName]){
        axios({
            method: req.method,
            url: registry.services[req.params.apiName].url + req.params.path,
            headers: req.headers,
            data: req.body
        }).then((response) => {
            res.send(response.data)
        })
    }else{
        res.send("API Name doesn't exists")
    }
})

router.post('/register', (req, res) => {
    const registrationInfo = req.body

    registrationInfo.url = registrationInfo.protocol + "://" + registrationInfo.host + 
    ":" + registrationInfo.port + "/"
    registry.services[registrationInfo.apiName] = {...registrationInfo}

    fs.writeFile('./routes/registry.json', JSON.stringify(registry), (error) => {
        if(error){
            res.send("Could not register " + registrationInfo.apiName + "\n" + error)
        }else{
            res.send("Successfully registration " + registrationInfo.apiName + "\n")
        }
    })
})

module.exports = router


// curl -X POST -d '{"apiName": "registryTest","host": "http://localhost", "port": "5001","url": "http://localhost:5001/"}' -H 'Content-Type: application/json' http://localhost:5000/register
