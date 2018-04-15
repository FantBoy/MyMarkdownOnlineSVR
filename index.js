var server = require("./server");
var router = require("./router");
var requestHandlers =require("./requestHandlers");

var handle = {}
handle["/upload/"] = requestHandlers.hello;
handle["/upload/get"] = requestHandlers.get;
handle["/upload/postmd"] = requestHandlers.postmd;
handle["/upload/gethistorydrafts"] = requestHandlers.gethistorydrafts;


server.start(router.route, handle);
