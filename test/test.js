var testServer = require("..")
    , test = require("testling")

testServer(handleRequest, startTests)

function handleRequest(req, res) {
    if (req.url === "/foo") {
        res.end("foo")
    } else if (req.url === "/bar") {
        res.end("bar")
    }
}

function startTests(request, done) {
    test("call to foo", function (t) {
        request("/foo", function (e, r, body) {
            t.equal(body, "foo", "body is not foo")

            t.end()
        })
    })

    test("call to bar", function (t) {
        request({
            uri: "/bar"
        }, function (e, r, body) {
            t.equal(body, "bar", "body is not bar")

            t.end()
        })
    })

    .on("end", done)
}