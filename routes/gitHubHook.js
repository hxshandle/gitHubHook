/**
 * Created by hhuang on 2/6/14.
 */


var exec = require('child_process').exec,
    path = require('path'),
    fs = require('fs');
exports.gitHubHook = function (req, res) {
  var postData = req.param('payload', 'null');
  var data = JSON.parse(postData);
  var repoUrl = data.repository.url.split("/");
  var repoName = repoUrl[repoUrl.length - 1];
  var f = path.join(__dirname, '../config/repos.json');
  fs.readFile(f, {encoding: 'utf8'}, function (err, data) {
    if (err) throw err;
    var cfg = JSON.parse(data);
    console.log('config data :' + data);
    console.log('working dir :' +cfg[repoName]['optDir']);
    exec('git pull', {cwd: cfg[repoName]['optDir']}, function (error, stdout, stderr) {
      console.log('stderr: ' + stderr);
      if (error !== null) {
        console.log('exec error: ' + error);
      }
    });
  });
  console.log("dirname: " + __dirname);

  res.render('gitHubHook', { title: 'Hook', pd: repoName });
};
