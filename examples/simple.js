var testServer = require("..")
    , assert = require("assert")

testServer(function (req, res) {
    res.end("beep")
}, function (request, done) {
    request("/", function (err, res, body) {
        assert.equal(body, "beep")
        console.log("done")
        done()
    })
})