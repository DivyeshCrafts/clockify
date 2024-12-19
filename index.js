
let http = require('http')
let express = require('express')
let app = express()
const port = 8000;
app.use(express.json());


let portal_index = require('./routes/webApi/v1/portal/portal_index')
app.use('/', portal_index);

http.createServer(app).listen(port, ()=>{

    console.log(`App Listening on port ${port}`)
})