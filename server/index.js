console.log('index.js started');
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('./file-helper.js');

fs.load();

const app = express();
const port = 9000;

app.use(bodyParser.urlencoded({extended: true}));

// get /notes/:date
app.get('/notes/:date(\\d{4}-\\d{2}-\\d{2})', (req, res) => {
	var date = req.params.date;
	var note = fs.getNote(date);
	console.log('params', req.params)
	console.log('gets a note', note);
	res.send('today\'s wisdom ' + note.note);
});

app.listen(port, () => {console.log('server listening on', port);});
