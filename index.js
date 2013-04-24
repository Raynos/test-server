var http = require("http")
var setTimeout = require("timers").setTimeout
var clearTimeout = require("timers").clearTimeout
var extend = require("xtend")

var RequestProxy = require("./request-proxy")

var defaults = {
    port: 3002
    , timeout: 5000
    , protocol: "http"
    , host: "localhost"
}

module.exports = testServer

function testServer(handleRequest, options, callback) {
    if (typeof options === "function") {
        callback = options
        options = {}
    }

    options = extend(defaults, options)

    var server = http.createServer(handleRequest)
    var timer = setTimeout(serverKiller, options.timeout)
    var requestProxy = RequestProxy(options)

    server.listen(options.port, function () {
        callback(requestProxy, serverKiller)
    })

    return server

    function serverKiller() {
        server.close()
        clearTimeout(timer)
    }
}

