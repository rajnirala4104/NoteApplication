const {createServer} = require('http')
const app = require('./app')

const port = 5000
const server = createServer(app)


server.listen(port, (err, data)=>{
    console.log(`Server has started at http://127.0.0.1:${port}`)
})