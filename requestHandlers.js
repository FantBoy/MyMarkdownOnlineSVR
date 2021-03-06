var readdirtool = require('./Tools/readdir');
var querystring = require("querystring");
var fs = require("fs");
var moment = require('moment');
var path=require('path');
var releasearticletool=require('./Tools/release_article');

function getText(response) {
    var text = "Winnie the Witch";
    console.log(text);
    response.writeHead(200, {"Content-Type": "text/plain"});
    response.write(text);
    response.end();
}

function getImage(response) {
    console.log("getImage");
    fs.readFile("./images/abracadabra.jpg", "binary", function(error, file) {
        if(error) {
          response.writeHead(500, {"Content-Type": "text/plain"});
          response.write(error + "\n");
          response.end();
        } else {
          response.writeHead(200, {"Content-Type": "image/jpg"});
          response.write(file, "binary");
          response.end();
        }
    });
}

function getBigImage(response) {
    console.log("getBigImage");
    fs.readFile("./images/view.jpg", "binary", function(error, file) {
        if(error) {
          response.writeHead(500, {"Content-Type": "text/plain"});
          response.write(error + "\n");
          response.end();
        } else {
          response.writeHead(200, {"Content-Type": "image/jpg"});
          response.write(file, "binary");
          response.end();
        }
    });
}

function get(query, response) {
    console.log("query: " + query);
    var queryObj = querystring.parse(query);
    for (key in queryObj) {
        console.log("key: " + key + ", value: " + queryObj[key]);
    }
    var type = queryObj["type"];
    switch(type) {
        case "text":
            getText(response);
        break;

        case "image":
            getImage(response);
        break;

        case "bigimage":
            getBigImage(response);
        break;

        default:
            var text = "type " + type + " is unknown.";
            console.log(text);
            response.writeHead(200, {"Content-Type": "text/plain"});
            response.write(text);
            response.end();
        break;
    }
}

function hello(query, response) {
    console.log("Hello World");
    response.writeHead(200, {"Content-Type": "text/plain"});
    response.write("Hello World");
    response.end();
}

function postmd(query, response)
{
    var result = {ret:0, msg:''};
    var params = querystring.parse(query);
    console.log(params);
    var site_type = params['site_type'];
    var article_type = params['article_type'];
    var article_name = params['article_name'];
    var post_type = params['post_type'];
    var md_data = params['md_data'];
    var filename_match = params['md_data'].match(/filename: (.*)/);
    if(filename_match)
    {
        filename = filename_match[1];
        if(!filename || 0 == filename.length)
	{
	    result = {ret: -1, msg: 'filename is not edit!'};
	}
	else
	{
	    while(filename[0] == ' ')
		filename = filename.substring(1);
	    //异步方法
	    //fs.writeFile('/data/message.txt', '这是第一行',function(err){
	    //    if(err) 
	    //        result['msg'] = '写文件操作失败';
	    //    else
	    //        result['msg'] = '写文件操作成功';
	    //});
	                                     
	    //同步方法
	    var _today = moment();
	    var date = _today.format("YYYY-MM-DD-");
	    var datetime =  _today.format("YYYY-MM-DD HH:mm:ss");
	    //var filepath = '/data/md_articles/' + date + filename + '.md';
	    if('' == article_name)
	        var filepath = path.join('/usr/share/nginx/markdown/editor.md/md_articles/', site_type, article_type, date + filename + '.md');
            else
		var filepath = path.join('/usr/share/nginx/markdown/editor.md/', article_name); 
	    console.log(filepath);
            md_data = md_data.replace('{datetime}', datetime);
	    fs.writeFileSync(filepath, md_data);
   	    filename = path.basename(filepath); 
    	    if(post_type == 1)
	    {
		releasearticletool.ReleaseArticle(site_type, article_type, filename);
	    }
	    else if(post_type == 0)
	    {
		;
	    }
	}
        

    }
    else
    {
        result = {ret: -1, msg: 'filename is not edit!'};
    }
    console.log(filename);
    response.writeHead(200, {
        "Content-Type": "text/plain"
    });
    response.end(JSON.stringify(result));
}

function gethistorydrafts(query, response)
{
    var result = {ret:0, msg:''};
    var params = querystring.parse(query);
    var site_type = params['site_type'];
    var article_type = params['article_type'];
    var rd = require('rd');
    //if(0 == type)
    //{
    //    result['drafts'] = {
    //        BLOG: rd.readFileSync('/data/md_articles/BLOG/POST').concat(rd.readFileSync('/data/md_articles/BLOG/DRAFT')),
    //        WIKI: rd.readFileSync('/data/md_articles/WIKI/POST').concat(rd.readFileSync('/data/md_articles/WIKI/DRAFT')),
    //    }
    //}
    //else if(1 == type)
    //{
    //    result['drafts'] = {
    //        BLOG: rd.readFileSync('/data/md_articles/BLOG/'),
    //        WIKI: rd.readFileSync('/data/md_articles/WIKI/DRAFT'),
    //    }
    //}
    //else if(2 == type)
    //{
    //    result['drafts'] = {
    //        BLOG: rd.readFileSync('/data/md_articles/BLOG/DRAFT'),
    //        WIKI: rd.readFileSync('/data/md_articles/WIKI/DRAFT'),
    //    }
    //}
    var filepath = '/usr/share/nginx/markdown/editor.md/md_articles/' + site_type + '/' + article_type;
    result['articles'] = rd.readFileSync(filepath);
    result['articles'].forEach(function(item,index)
    {
        result['articles'][index] = item.replace('/usr/share/nginx/markdown/editor.md/', '');
    });
    response.writeHead(200, {
        "Content-Type": "text/plain"
    });
    response.end(JSON.stringify(result));
}

function gitalkcallback(query, response)
{
    var params = querystring.parse(query);
    console.log(params);    
}

exports.get = get;
exports.hello = hello;
exports.postmd = postmd;

exports.gethistorydrafts = gethistorydrafts;

exports.gitalkcallback = gitalkcallback;
