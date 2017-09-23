const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

let repoSchema = mongoose.Schema({
  // TODO: your schema here!
  userId: Number,
  ghHandle: String,
  repoId: {type: Number, unique: true},
  repoName: String,
  description: String,
  url: String,
  time : { type : Date, default: Date.now }
});

let Repo = mongoose.model('Repo', repoSchema);

let save = (err, repo) => {
  if (err) return console.error(err);
  console.log('did this work?', repo)
  //this fn is actually not doing anything. it is technically all happeneing in helpers...
}

// Repo.find((err, data) => {
//   console.log('query', data)
// })

module.exports.save = save;
module.exports.Repo = Repo;