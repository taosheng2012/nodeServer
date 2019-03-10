var http = require("http")
var https = require("https")
var fs = require("fs")

var handleStatic = require("serve-handler")

var log = console.log

// =============================================================================================
process.chdir("d:/Projects/webVue-develop")


process.title = process.cwd()

// =============================================================================================
var line = "=".repeat(90)

function printDetailList(data) {
    data.forEach(function(item) {
        log(item.label.padEnd(30) + item.detail)
    })
}


log("\n" + line)
log("Node Server\n")

printDetailList([{ label: "Node Version", detail: process.version },
    { label: "Process PID", detail: process.pid },
    { label: "Current Working Directory", detail: process.cwd() },
    { label: "Date", detail: new Date().toLocaleString() }
])

log(line + "\n")

// =============================================================================================
var serverHttp = http.createServer(function(request, response) {
    function send(data) {
        response.setHeader("Content-Type", "application/json; charset=utf8")
        response.end(JSON.stringify(data))
    }

    function handleInterface() {
        var handlerList = {
            "/api/add.do": function() {
                send({ result: "success" })
            }
        }

        var handler = handlerList[requestPath]

        if (handler) {
            handler()
        } else {
            log("\tUnimplemented Interface")

            response.statusCode = 404
            response.end("Yes. This is 404.")
        }


    }

    var requestPath = request.url.split("?")[0]
    var flagInterface = /^\/api\//.test(requestPath)

    log(new Date().toLocaleString().padEnd(20) + request.method.padEnd(6) + (flagInterface ? "Interface" : "File").padEnd(10) + request.url)

    if (flagInterface) handleInterface()
    else handleStatic(request, response)

})

serverHttp.listen(80)