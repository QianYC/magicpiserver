var bleno = require('bleno');
var BlenoPrimaryService = bleno.PrimaryService;

const fs = require('./file-helper');
const RemindersHelper = fs.RemindersHelper;

console.log('bleno-helper.js');

const SERVICEID = 'ab9e4c06-6b08-4a9a-aa2e-dad08c0aa722';
const CHARACTERISTICID = 'e290639a-b6ee-4ee7-9805-fd48407b5b17';

class RemindersCharacteristic extends bleno.Characteristic{
	constructor(){
		console.log('new RemindersCharacteristic');
		super({
			uuid: CHARACTERISTICID,
			properties: ['write'],
			value: null
		});
		this.reminders = new RemindersHelper();
	}

	onWriteRequest(data, offset, withoutResponse, callback){
		console.log('ReminderCharacteristic - onWriteRequest:', data);
		this.reminders.writeReminder(data);
		callback(this.RESULT_SUCCESS);
	}
}

bleno.on('stateChange', (state) => {
	console.log('on -> stateChange: ' + state);

  	if (state === 'poweredOn') {
	    bleno.startAdvertising('pi-server', [SERVICEID]);
	} else {
	    bleno.stopAdvertising();
	}
});

bleno.on('advertisingStart', (error) => {
	console.log('on -> advertisingStart:', error);

	if(!error){
		bleno.setServices([
			new BlenoPrimaryService({
				uuid: SERVICEID,
				characteristics: [
					new RemindersCharacteristic()
				]
			})
		]);
	}
});

bleno.on('servicesSet', (error) => {
	console.log('on -> servicesSet:', error);
});

bleno.on('accept', (addr) => {
	console.log('on -> accept, client:', addr);
});

bleno.on('disconnect', (addr) => {
	console.log('on -> disconnect, client:', addr);
});
