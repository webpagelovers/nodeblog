const http = require('http')
const createHandler = require('coding-webhook-handler')
const handler = createHandler({
    path: '/',
    token: '' // 在 coding 上面可以填写一个 token
})

http.createServer((req, res) => {
    handler(req, res, function(err) {
        res.statusCode = 404
        res.end('no such location')
    })
}).listen(80)

handler.on('error', err => {
    console.error('Error:', err.message)
})

const rumCommand = (cmd, args, callback) => {
    const child = spawn(cmd, args)
    let response = ''
    child.stdout.on('data', buffer => response += buffer.toString())
    child.stdout.on('end', () => callback(response))
}

handler.on('push', event => {
    rumCommand('sh', ['./autoBuild.sh'], txt => {
        console.log(txt)
    })
})
