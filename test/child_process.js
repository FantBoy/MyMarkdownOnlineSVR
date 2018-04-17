var exec = require('child_process').exec; 
var cmdStr = 'curl http://www.weather.com.cn/data/sk/101010100.html';
cmdStr = './run.sh';
exec(cmdStr, function(err,stdout,stderr){
    if(err) {
        console.log('get weather api error:'+stderr);
    } else {
        console.log(stdout);
        //var data = JSON.parse(stdout);
        //console.log(data);
    }
});
