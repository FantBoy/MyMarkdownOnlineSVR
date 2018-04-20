var exec = require('child_process').exec;
var path = require('path');
function ReleaseArticle(site_type, article_type, filename)
{
    work_path = process.cwd();
    cmdStr = work_path + '/Tools/run.sh ' + site_type + ' ' + article_type + ' ' + filename;
    exec(cmdStr, function(err,stdout,stderr){
    if(err) {
        console.log('get weather api error:'+stderr);
    } else {
        console.log(stdout);
        //var data = JSON.parse(stdout);
        //console.log(data);
       }
   });
    
}
exports.ReleaseArticle = ReleaseArticle;
