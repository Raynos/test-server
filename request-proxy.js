var extend = require("xtend")
var request = require("request")

var defaults = {
    port: 3002,
    protocol: "http",
    host: "localhost"
}

module.exports = RequestProxy

function RequestProxy(options) {
    if (typeof options === "number") {
        options = { port: options }
    }
    options = extend(defaults, options)

    extend(requestProxy, request)

    return requestProxy

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
}
