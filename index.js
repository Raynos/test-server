var http = require("http")
var setTimeout = require("timers").setTimeout
var clearTimeout = require("timers").clearTimeout
var request = require("request")
var extend = require("xtend")
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

    extend(requestProxy, request)

    server.listen(options.port, function () {
        callback(requestProxy, serverKiller)
    })

    return server

    function requestProxy(uri, callback) {
        if (typeof uri === "string") {
            uri = options.protocol + "://" + options.host + ":" +
                options.port + uri
        } else {
            uri.uri = options.protocol + "://" + options.host + ":" +
                options.port + uri.uri
        }

        request(uri, callback)
    }

    function serverKiller() {
        server.close()
        clearTimeout(timer)
    }
}
