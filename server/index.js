const express = require('express')
const cors = require('cors')
const axios = require('axios')
const https = require('https')

const app = express()
const port = 3000
app.use(cors())

const agent = new https.Agent({
  rejectUnauthorized: false
})

let data = ''

axios.get('https://opendata.epa.gov.tw/webapi/api/rest/datastore/355000000I-000259/?format=json&token=KFlCelSRdEqJCGptkr21cA', {httpsAgent: agent})
.then(res => {
  data = res.data.result
})
.catch(err => {
  console.log(err)
})

app.get('/', (req, res)=>{
  res.setHeader('Content-Type', 'application/json')
  res.send(JSON.stringify({data:data}))
})

app.listen(port, () => console.log(`server started at port ${port}`))