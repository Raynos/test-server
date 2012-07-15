# test-server [![build status][1]][2]

Easy testing of a HTTP server

## Example

testServer will create a HTTP server for you on a port. It will use the first function you pass as the request handler and fire the second function when the server is done listening.

The second version is passed a version of mikeal's request that turns "/foo" into "http://localhost:PORT/foo". It's also passed a done function to call when you are done testing and want to kill the HTTP server

    var testServer = require("test-server")
        , assert = require("assert")

    testServer(function (req, res) {
        res.end("beep")
    }, function (request, done) {
        request("/", function (err, res, body) {
            assert.equal(body, "beep")
            done()
        })
    })

### testServer(requestHandler[, options], callback)

The options are 

    {
        port: Number
        , timeout: Number
        , protocol: "http" || "https"
        , host: someString
    }

 - port is the port the server will listen on and defaults to 3002
 - timeout is the number of milliseconds before the server auto-shutsdown. This defaults to 5000 and is useful to timeout your tests
 - protocol is the protocol for calls, the default is http
 - host is the domain host to call. It defaults to localhost

## Installation

`npm install test-server`

## Tests

`make test`

## Contributors

 - Raynos

## MIT Licenced

  [1]: https://secure.travis-ci.org/Raynos/test-server.png
  [2]: http://travis-ci.org/Raynos/test-server