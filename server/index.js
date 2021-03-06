console.log('index.js started');
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('./file-helper.js');
const bluetooth = require('./bleno-helper.js');

const NotesHelper = fs.NotesHelper;
var notesHelper = new NotesHelper();

const RemindersHelper = fs.RemindersHelper;
var remindersHelper = new RemindersHelper();

const app = express();
const port = 9000;

//encode | decode url
app.use(bodyParser.urlencoded({extended: true}));

//cors config
app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', 'localhost');
	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
	res.header('Access-Control-Allow-Methods', 'GET');
	next();
});

// get /notes/:date
app.get('/notes/:date(\\d{4}-\\d{2}-\\d{2})', (req, res) => {
	var date = req.params.date;
	var note = notesHelper.getNote(date);
	console.log('params', req.params)
	console.log('gets a note', note);
	res.send(note);
});

// get /reminders
app.get('/reminders', (req, res) => {
	var reminders = remindersHelper.getReminders();
	res.send(reminders);
});

app.listen(port, () => {console.log('server listening on', port);});
