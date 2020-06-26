Module.register("MMM-Reminder",{
	//default module config
	defaults: {
		
	},
	
	reminders:null,

	getDom: function(){
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
	},

	getReminders: function(){
		fetch('http://localhost:9000/reminders')
		.then((res) => {
			console.log(res)
			res.json().then((reminders) => {
				this.reminders = reminders;
				console.log('this.reminders =', this.reminders);
				this.updateDom();
			});
			
		});
	}
});
