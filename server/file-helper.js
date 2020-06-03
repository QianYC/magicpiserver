const fs = require('fs');
const filename = 'notes.txt';

//store the file data
var notes = [];

module.exports = {
	test: () => {console.log('test');},

	//load data from local file
	load: () => {
		console.log('load data from file');
		if(!fs.existsSync(filename)){
			console.log('file not exist! creat it!', filename)
			fs.writeFile(filename, '', {encoding: 'utf8'}, (err) => {if(err) throw err;});
		}
		fs.readFile(filename, {encoding: 'utf8'}, (err, data) => {
			if(err) throw err;
			//console.log('file-helper.load', data);
			notes = data.trim()
					.split(';')
					.filter((x) => x.length > 0)
					.map((x) => JSON.parse(x));
			console.log(notes);
		});
	},
	
	//get note by date
	getNote: (date) => {
		if(date){
			return notes.filter((x) => x.date === date)[0];
		} else {
			return null;
		}
	}	
};
