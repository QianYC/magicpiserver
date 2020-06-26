const fs = require('fs');

class FileHelper{
	constructor(filename){
		console.log('new FileHelper:', filename);
		this.filename = filename;
		this.data = [];
	}

	load(){
		console.log('load data from file:', this.filename);
		if(!fs.existsSync(this.filename)){
			console.log('file not exist! creat it!', this.filename);
			fs.writeFile(this.filename, '', {encoding: 'utf8'}, (err) => {if(err) throw err;});
		}
		fs.readFile(this.filename, {encoding: 'utf8'}, (err, data) => {
			if(err) throw err;
			//console.log('file-helper.load', data);
			this.data = data.trim()
					.split(';')
					.filter((x) => x.length > 0)
					.map((x) => JSON.parse(x));
			console.log(this.data);
		});
	}

	getData(){
		return this.data;
	}

	writeData(data){
		console.log('write data to file:', this.filename, data);
		fs.writeFile(this.filename, new Uint8Array(data), {encoding: 'utf8'}, (err) => {if(err) throw err;});
		this.load();
	}
}

class NotesHelper{
	constructor(filename = 'notes.txt'){
		this.fs = new FileHelper(filename);
		this.fs.load();
	}

	getNote(date){
		if(date){
			return this.fs.getData().filter((x) => x.date === date)[0];
		} else {
			return null;
		}
	}
}

class RemindersHelper{
	constructor(filename = 'reminders.txt'){
		this.fs = new FileHelper(filename);
		this.fs.load();
	}

	getReminders(){
		return this.fs.getData();
	}

	writeReminder(data){
		this.fs.writeData(data);
	}
}

module.exports = {
	NotesHelper: NotesHelper,
	RemindersHelper: RemindersHelper
};
