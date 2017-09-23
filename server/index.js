const express = require('express');
const bodyParser = require('body-parser');
const helpers = require('./helpers');
let app = express();

app.use(express.static(__dirname + '/../client/dist'));
app.use(bodyParser.json());

app.post('/repos', helpers.getRepos, helpers.sendPostResponse);

app.get('/repos', helpers.sendGetResponse);

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

