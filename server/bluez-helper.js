const Bluez = require('bluez');
const bluetooth = new Bluez();
const Profile = Bluez.Profile;

//register callback on discovering a new device
bluetooth.on('device', async (addr, props) => {
	console.log('found new device', addr, props);
});

bluetooth.init().then(async () => {
	const adapter = await bluetooth.getAdapter('hci0');
	await adapter.StartDiscovery();
	console.log('discovering');
}).then(async () => {
	//await bluetooth.registerProfile();
});

console.log('Bluez', Bluez);
console.log('bluetooth', bluetooth);
console.log('profile', Profile);
