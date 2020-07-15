Module.register("MMM-Reminder",{
	//default module config
	defaults: {
		
	},
	
	reminders:null,
	currentIndex: -1,

	getDom: function(){
		Log.log('MMM-Reminder getDom');
		//this.currentIndex = -1;
		var wrapper = document.createElement("div");
		if(this.reminders === null) return wrapper;
		let innerHtml = '';
		innerHtml = '<div class="carousel"><div class="carousel-content"></div></div>'
		wrapper.innerHTML = innerHtml;
		
		return wrapper;
	},

	scroll: function(){
		Log.log('scroll');
		if(!this.reminders || this.reminders.length <= 0){
			Log.log('return');
			return;
		}
		this.currentIndex = (this.currentIndex + 1) % this.reminders.length;
		let content = '<div class="reminder-item">' + '<span class="reminder-date">' + this.reminders[this.currentIndex].date + '</span>' + '<span class="reminder-content">' + this.reminders[this.currentIndex].reminder + '</span>' + '</div>';
		document.getElementsByClassName("carousel-content")[0].innerHTML = content;
	},

	getDom1: function(){
		Log.log('MMM-Reminder getDom');
		var wrapper = document.createElement("div");
		if(this.reminders === null) return wrapper;
		let innerHtml = '';
		for(let i=0; i<this.reminders.length; i++){
			let item = '<div class="reminder-item">' + '<span class="reminder-date">' + this.reminders[i].date + '</span>' + '<span class="reminder-content">' + this.reminders[i].reminder + '</span>' + '</div>';
			innerHtml += item;
		}
		wrapper.innerHTML = innerHtml;
		return wrapper;
	},

	init: function(){
		Log.log('MMM-Reminder get instantiated');
	},

	getHeader: function(){
		Log.log('MMM-Reminder getHeader');
		return 'SPD';
	},

	start: function(){
		Log.log('MMM-Reminder start');
		setInterval(() => {
			this.getReminders();

		}, 10000);
		this.getReminders();
		this.updateDom();
		setInterval(() => {
			this.scroll();
		}, 2000);
	},

	getReminders: function(){
		fetch('http://localhost:9000/reminders')
		.then((res) => {
			console.log(res)
			res.json().then((reminders) => {
				this.reminders = reminders;
				console.log('this.reminders =', this.reminders);
				//this.updateDom();
			});
			
		});
	},

	getRemindersAsync: function(){
		return new Promise((resolve, reject) => {
			fetch('http://localhost:9000/reminders')
			.then((res) => {
				console.log(res)
				res.json().then((reminders) => {
					this.reminders = reminders;
					console.log('this.reminders =', this.reminders);
					//this.updateDom();
				});
			resolve();
			});
		});
	}
});
