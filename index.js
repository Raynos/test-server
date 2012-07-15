var http = require("http")
    , request = require("request")
    , extend = require("xtend")
    , partial = require("ap").partial
    , defaults = {
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
        , timer = setTimeout(serverKiller, options.timeout)

    server.listen(options.port,
        partial(callback, requestProxy, serverKiller))

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