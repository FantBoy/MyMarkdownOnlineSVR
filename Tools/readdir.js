var fs = require('fs');
var util = require('util');

function explorer(path)
{
	var articel_dict = [];
    fs.readdir(path, function(err, files){
        if(err)
        {
            console.log('error:\n' + err);
            return [];
        }

        files.forEach(function(file)
        {
            fs.stat(path + '/' + file, function(err, stat){
                if(err)
                {
                    console.log(err);
                    return [];
                }
                if(stat.isDirectory())
                {
                    articel_dict = articel_dict.concat(explorer(path + '/' + file));
                }
                else
                {
					articel_dict.push(file);
                    console.log('文件名:' + path + '/' + file);
					
                }
            });

        });

    });
	return articel_dict;
}

function explorerSync(path)
{
	var articel_dict = [];
    var files = fs.readdirSync(path);
    console.log('start');
    files.forEach(function(file)
    {
        var pathname = path + '/' + file;
        var err, stat = fs.lstatSync(pathname);
        if(err)
        {
            console.log(err);
            return [];
        }
        if(stat.isDirectory())
        {
            articel_dict = articel_dict.concat(explorer(path + '/' + file));
        }
        else
        {
            articel_dict.push(file);
            console.log('文件名:' + path + '/' + file);
					
        }

    },function (err) {
        if (err) throw err;
      // 完成
    });
    console.log('end');
    return articel_dict;
}

//explorer("/data/md_articles/");
exports.explorer = explorer;
exports.explorerSync = explorerSync;
