`npm i -S git+https://github.com/MikeRohsoft/neptunespride-node-adapter.git`

```
const NeptunesPride = require('neptunespride');

client = new NeptunesPride();

const Games = {};

const changesMonitor = [
	{ text: 'Stars Changed', value: 'total_stars', },
	{ text: 'Fleets Changed', value: 'total_fleets', },
	{ text: 'Industry Changed', value: 'total_industry', },
	{ text: 'Economy Changed', value: 'total_economy', },
	{ text: 'Science Changed', value: 'total_science', },
];

const waifus = [
	'Usagi', 'Tsubaki', 'Maka', 'Chibiusa', 'Asuka',
	'Ikaruga', 'Katsuragi', 'Yagyou', 'Hibari', 'Kiriya',
	'Daidouji', 'Hanzou', 'Homura', 'Yomi', 'Hikage',
	'Mirai', 'Haruka', 'Rin', 'Miyabi', 'Murasaki',
	'Imu', 'Ryoubi', 'Ryouna', 'Yumi', 'Murakumo',
	'Yozakura', 'Shiki', 'Minori', 'Dougen', 'Naraku',
	'Kagura', 'Murasame', 'Ryouki', 'Renka', 'Hanabi',
	'Kafuru', 'Sayuri', 'Makoto', 'Minako', 'Rei',
	'Ami', 'Setsuna', 'Haruka', 'Michiru', 'Hotaru',
];

const whatIDid = {};
function onTick(e) {
	const p = e || client.getPlayerInfo();

	p.open_games.forEach(a => {
		const myGame = a.number;
		const myGameName = a.name;

		if (!whatIDid[myGame]) {
			whatIDid[myGame] = {};
		}

		let rank = [];
		const checkForChangeHandler = v => {
			const entry = rank.find(x => x.uid === v.uid);
			const checkChangesForMonitorValue = z => {
				if (entry[z.value] !== v[z.value]) {
					console.log(`[${myGameName}] ${v.alias} ${z.text} ${v[z.value]} -> ${entry[z.value]}`);
				}
			};
			if (!!entry) {
				changesMonitor.forEach(checkChangesForMonitorValue);
			}
		};
		const gameInfoHandler = v => {
			rank = v.getRank();
			if (Games[myGame]) {
				Games[myGame].forEach(checkForChangeHandler);
			}
			Games[myGame] = rank;
			const stars = v.getStarsFromPlayer();
			for (let i = 0, v; v = stars[i]; i++) {
				let index = waifus.findIndex(x => x === v.n);
				whatIDid[myGame][v.n] = true;
				if (index !== -1) {
					continue;
				}
				do {
					index = Math.floor(Math.random() * (waifus.length - 1)); 
				} while(whatIDid[myGame][waifus[index]]);
				client.changeStarName(myGame, v.uid, waifus[index])
					.then(() => {
						console.log(`renamed star ${v.n} to ${waifus[index]}`);
					})
					.catch(() => {
						console.log(`cant rename star ${v.n} to ${waifus[index]}`);
						whatIDid[myGame][waifus[index]] = false;
					});
			}
		};
		client.getGame(myGame)
			.then(gameInfoHandler)
			.catch();
	});
	thread();
}

function thread() {
	setTimeout(onTick, 30000);
};

client.on('ready', e => {
	onTick(e);
});

client.login('Username', 'Password');
```
