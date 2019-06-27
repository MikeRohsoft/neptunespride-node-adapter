class Game {
	/**
		@classdesc
		Its a merge from playerInfo and GameInfo
		@constructor
		@param {{ report: PlayerReport }} playerInfo
		@param {{ report: any }} info
	*/
    constructor(playerInfo, info) {
        if (!info.report || !playerInfo.report) {
            throw 'No valid Game Report';
        }
        this.events = {};
        this.game = {};
        this.players = playerInfo.report;
        for (let k in info.report) {
			this.game[k] = info.report[k];
            if (typeof this.game[k] !== 'object') {
                continue;
			}
			for (let e in this.game[k]) {
				const id = this.game[k][e].puid;
				if (!id || !this.players[id]) {
					continue;
				}
				this.game[k][e].player = this.players[id];
			}
        }
	};
	/**
		@desc filters a specific array object with a playerId
		@param {string} - uid | undefined = playerId
		@return {Array}
	*/
	filterArrayByUID(uid, obj){
		uid |= this.game.player_uid;
		let out = [];
		if (!this.game[obj]) {
			return out;
		}
		for (let k in this.game[obj]) {
			if (this.game[obj][k].puid && uid === this.game[obj][k].puid) {
				out.push(this.game[obj][k]);
			}
		}
		return out;
	};
	/**
		@desc filters the 'stars' array object with a playerId
		@param {string} - uid | undefined = playerId
		@return {Array}
	*/	
	getStarsFromPlayer(uid) {
		return this.filterArrayByUID(uid, 'stars');
	};
	/**
		@desc filters the 'fleets' array object with a playerId
		@param {string} - uid | undefined = playerId
		@return {Array}
	*/	
	getFleetFromPlayer(uid) {
		return this.filterArrayByUID(uid, 'fleets');
	};
	/**
		@param {string} - uid | undefined = playerId
		@return {Array}
	*/	
	getAllShipsOnStars(uid) {
		let stars = this.getStarsFromPlayer(uid);
		let fleet = this.getFleetFromPlayer(uid);
		let out = [];
		const pushBackFunc = v => {
			if (v.x === s.x && v.y === s.y) {
				out.push(v);
			}
		};
		for (let i = 0, s; s = stars[i]; i++) {
			fleet.forEach(pushBackFunc);
		}
		return out;
	};
	/**
		@desc returns the Rank List | not 100% correct
		@return {Array<PlayerReport>}
	*/	
	getRank() {
		let players = [];
		const rankSortFunc = (a, b) => {
			let ap = a.total_industry + a.total_economy + a.total_science;
			let bp = b.total_industry + b.total_economy + b.total_science;
			const spaghetti = 
				(a.total_stars > b.total_stars) ? 
					-1 :
				(a.total_stars < b.total_stars) ?
					1  :
				(ap < bp) ? 
					-1 :
				(ap > bp) ? 
					1  :
					0;
			return spaghetti;
		};
		for (let k in this.game.players) {
			players.push(this.game.players[k]);
		}
		players.sort(rankSortFunc);
		return players;
	};
	/**
		@private
		@desc this should be called only by the Object
		@param {string} evt 
		@param {any} params - The Parameter of the Event Depends on the Events
	*/
	fire(evt, params) {
		if (!this.events[evt]) {
			return;
		}
		for (let i = 0, l = this.events[evt].length; i < l; i++) {
			this.events[evt][i](params);
		}
	};
	/**
		@desc add a listener to an Event
		@param {string} evt
		@param {function(Object)} callback
	*/
	on(evt, eventFunc) {
		if (!this.events[evt]) {
			this.events[evt] = [];
		}
		this.events[evt].push(eventFunc);
	};
}

module.exports = Game;