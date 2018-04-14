var http = require("http");
var url = require("url");
var querystring = require("querystring");
function start(route, handle) {
    //function onRequest(request, response) {
    //    var urlObj = url.parse(request.url);
    //    var pathname = urlObj.pathname;
    //    var query = urlObj.query;
    //    console.log("Request for " + pathname + " received." + " query: " + query);

    //    route(pathname, query, handle, response);
    //}

    function onRequest(req, res){
        req.setEncoding('utf-8');
        var postData = ""; //POST & GET ： name=zzl&email=zzl@sina.com
        
        req.addListener("data", function (postDataChunk) {
            postData += postDataChunk;
        });
        
        req.addListener("end", function () {
            console.log('数据接收完毕');
            var params = querystring.parse(postData);
            console.log(params);
            console.log(params["name"]);
            res.writeHead(200, {
                "Content-Type": "text/plain;charset=utf-8"
            });
            res.end("数据提交完毕");
        });
    }
    http.createServer(onRequest).listen(4000);
    console.log("Server has started.");
}

exports.start = start;
