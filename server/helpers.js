var request = require('request');
var auth = require('../config');
var db = require('../database');
var Promise = require("bluebird");

module.exports = {

  getRepos: (req, res, next) => {

    var options = {
      url: 'https://api.github.com/users/' + req.body.handle + '/repos',
      headers: {
        'User-Agent': 'request',
        'Authorization': 'token ' + auth.TOKEN
      }
    };

    //in cb we want to save response in new Repo
    var cb = (error, response, body) => {
      if (!error && response.statusCode == 200) {
        var info = JSON.parse(body);
        console.log(info.length);

        for(var i = 0; i < info.length; i++) {
          module.exports.saveRepo(info[i]);
        }

        Promise.all(info)
        .then(function() {

          console.log("all the repos were saved");
          next();
        })

        .catch((err) => {
          console.log('wtf is going on?')
        })

      } else {

        console.log('request error', error);
      }
    };

    request(options, cb);
  },

  saveRepo: (data) => {

    var entry = {
      userId: data.owner.id,
      ghHandle: data.owner.login,
      repoId: data.id,
      repoName: data.name,
      description: data.description,
      url: data.html_url
    };

    var newRepo = new db.Repo(entry);
    console.log('saving newRepo', newRepo)
    newRepo.save()
    // .then(() => {console.log('saving done')})
    // .catch((err) => {console.log('ERROR', err)})
  },

  sendPostResponse: (req, res, next) => {
    console.log('request received!', req.body)
    db.Repo.find({ghHandle: req.body.handle})
    .limit(25)
    .exec((err, data) => {
      console.log('query', data)
      //send response here w/data
      res.send(JSON.stringify(data));
    });
  },

  sendGetResponse: (req, res, next) => {
    console.log('get received!', req.body)
    db.Repo.find()
    .limit(25)
    .exec((err, data) => {
      console.log('query', data)
      //send response here w/data
    });
    res.send('done')
  }

};

//query github
//save responses
//redirect to get