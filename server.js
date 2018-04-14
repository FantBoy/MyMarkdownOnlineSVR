var http = require("http");
var url = require("url");
function start(route, handle) 
{
    //function onRequest(request, response) {
    //    var urlObj = url.parse(request.url);
    //    var pathname = urlObj.pathname;
    //    var query = urlObj.query;
    //    console.log("Request for " + pathname + " received." + " query: " + query);

    //    route(pathname, query, handle, response);
    //}

    function onRequest(request, response)
    {
        request.setEncoding('utf-8');
        var postData = ""; //POST & GET ： name=zzl&email=zzl@sina.com
        
        request.addListener("data", function (postDataChunk) 
        {
            postData += postDataChunk;
        });
        
        request.addListener("end", function () {
            console.log('数据接收完毕');
	        var urlObj = url.parse(request.url);
            var pathname = urlObj.pathname;
            var query = urlObj.query;
            console.log(pathname);
            console.log(query);
            
            if(pathname == '/upload/postmd')
            {
                route(pathname, postData, handle, response);
            }
            else
            {

                route(pathname, query, handle, response);
            }
        });
    }
    http.createServer(onRequest).listen(4000);
    console.log("Server has started.");
}

exports.start = start;
