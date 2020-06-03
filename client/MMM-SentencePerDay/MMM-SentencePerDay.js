Module.register("MMM-SentencePerDay",{
	//default module config
	defaults: {
		text: 'sentence everyday!',
		count: 0
	},
	
	note:null,

	getDom: function(){
		Log.log('MMM-sentencePerDay getDom');
		var wrapper = document.createElement("div");
		if(this.note === null) return wrapper;
		wrapper.innerHTML = this.note;
		return wrapper;
	},

	init: function(){
		Log.log('MMM-SentencePerDay get instantiated');
	},

	getHeader: function(){
		Log.log('MMM-SentencePerDay getHeader');
		return 'SPD';
	},

	start: function(){
		Log.log('MMM-SentencePerDay start');
		setInterval(() => {
			//this.config.count=this.config.count+1;
			this.getNote();
			//this.updateDom();
		},1000);
	},

	getNote: function(){
		fetch('http://localhost:9000/notes/'+ this.getDateString())
		.then((res) => {
			console.log(res)
			res.json().then((note) => {
				this.note = note;
				console.log('this.note =', this.note.note);
				this.UpdateDom();
			});
			
		});
	},

	//get date string in yyyy-MM-dd format
	getDateString: function(){
		var date = new Date();
		var str = date.getFullYear() + '-';
		if(date.getMonth() < 9){
			str += '0';
		}
		str += (date.getMonth() + 1) + '-';
		if(date.getDate() < 10){
			str += '0';
		}
		str += date.getDate();
		return str;
	},

	getScripts: function(){
		return [
			this.file('date-utils.js')
		];
	}
});
