# test-server [![build status][1]][2]

Easy testing of a HTTP server

## Example

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

## Installation

`npm install test-server`

## Tests

`make test`

## Contributors

 - Raynos

## MIT Licenced

  [1]: https://secure.travis-ci.org/Raynos/test-server.png
  [2]: http://travis-ci.org/Raynos/test-server