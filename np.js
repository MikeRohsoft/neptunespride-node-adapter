const Ironhelmet = require('ironhelmet');
const Game = require('./game');

class NeptunesPride extends Ironhelmet {
	    /**
     * The NeptunesPride Objects handles Parameters for us
     * @returns {NeptunesPride}
     */
    constructor() {
        super('np');
        this.player = {};
		this.events = {};

		this.shipAction = {
			DO_NOTHING: 0,
			COLLECT_ALL_SHIPS: 1,
			DROP_ALL_SHIPS: 2,
			COLLECT_SHIPS: 3,
			DROP_SHIPS: 4,
			COLLECT_ALL_BUT: 5,
			DROP_ALL_BUT: 6,
			GARRISON_STAR: 7,
		};
		this.scanningOptions = {
			SCANNING: 'scanning',	
			HYPER_SPACE_RANGE: 'propulsion',				
			TERRAFORMING: 'terraforming',				
			EXPERIMENTATION: 'research',			
			WEAPONS: 'weapons',
			BANKING: 'banking',
			MANUFACTURING: 'manufacturing',
        };
        /**
         * Get fired on load
         * @param {boolean} b
         */
        const loadHandler = b => {
            if (!b) {
                return;
            }
            /**
             * @param {InitPlayerCallback} v
             * @fires ready
             */
            const promiseHandle = (v) => {
                this.player = v[1];
                this.fire('ready', this.player);
            };
            this.initPlayer().then(promiseHandle); 
        };
        this.on('load', loadHandler);
    }
    /**
		@desc Returns the Player Object by Name
		@param {string} name - Name of a Player
		@returns {GameStatus}
	*/
	getGameByName(name) {
		const search = name.toLowerCase();
		return this.player.open_games[i].find(v => v.name.toLowerCase() === search);
    };
    /**	@returns {PlayerInfo} Returns the Client Player Info */
	getPlayerInfo() {
		return this.player;
	};
    /**
		@desc Init the Player, this happens immidiatly after login
		@param {function(InitPlayerCallback): void} [callback] - return Promise if omitted
		@returns {Promise<InitPlayerCallback> | void}
	*/
	initPlayer(callback) {
		const url = `${this.url}/mrequest/init_player`;
		const parameters = {
			type: 'init_player',
		};
		return this.returnFunc(url, parameters, callback);
	};
	/**
		@desc It gives you the Universe Report
		@param {string} gameNumber - the game Number
		@param {function(Object): void} [callback] - return Promise if omitted
		@returns {Promise<Object> | void}
	*/
	fullUniverseReport(gameNumber, callback) {
		if (!gameNumber) {
			return;
		}
		return this.order(gameNumber, 'full_universe_report', callback);
	};
	/**
		@desc fetch the Player Archievement Report
		@param {string} gameNumber - the game Number
		@param {function(Object): void} [callback] - return Promise if omitted
		@returns {Promise<Object> | void}
	*/
	fetchPlayerAchievements(gameNumber, callback) {
		if (!gameNumber) {
			return;
		}
		const url = `${this.url}/trequest/fetch_player_achievements`;
		const parameters = {
			game_number: gameNumber,
			type: 'fetch_player_achievements',
			version: '',
		};
		return this.returnFunc(url, parameters, callback);		
	};
	/**
		@desc Returns how many unread Events you got
		@param {string} gameNumber - the game Number
		@param {function(Object): void} [callback] - return Promise if omitted
		@returns {Promise<Object> | void}
	*/
	fetchUnreadCount(gameNumber, callback) {
		if (!gameNumber) {
			return;
		}
		const url = `${this.url}/trequest/fetch_unread_count`;
		const parameters = {
			game_number: gameNumber,
			type: 'fetch_unread_count',
			version: '',
		};
		return this.returnFunc(url, parameters, callback);		
	};
	/**
		@desc fetch the game Messages
		@param {string} gameNumber - the game Number
		@param {string} group - game_event | game_diplomacy
		@param {function(Object): void} [callback] - return Promise if omitted
		@returns {Promise<Object> | void}
	*/
	fetchgameMessages(gameNumber, group, offset, callback) {
		if (!gameNumber || !group) {
			return;
		}
		const url = `${this.url}/trequest/fetch_game_messages`;
		const parameters = {
			game_number: gameNumber,
			group: group,
			offset: offset,
			count: 10,
			type: 'fetch_unread_count',
			version: '',
		};
		return this.returnFunc(url, parameters, callback);		
	};
	/**
		@desc mark all Events as read
		@param {string} gameNumber - the game Number
		@param {string} group - game_event | game_diplomacy
		@param {function(Object): void} [callback] - return Promise if omitted
		@returns {Promise<Object> | void}
	*/
	markAllRead(gameNumber, group, callback) {
		if (!gameNumber || !group) {
			return;
		}
		const url = `${this.url}/trequest/fetch_game_messages`;
		const parameters = {
			game_number: gameNumber,
			group: group,
			type: 'fetch_unread_count',
			version: '',
		};
		return this.returnFunc(url, parameters, callback);		
	};
	/**
		@desc Change the current research
		@param {string} gameNumber - the game Number
		@param {string} research - see the examples
		@param {function(Object): void} [callback] - return Promise if omitted
		@returns {Promise<Object> | void}
	*/
	changeResearch(gameNumber, research, callback) {
		return this.order(gameNumber, [ 'change_research', research ], callback);		
	};
	/**
		@desc Change the next research
		@param {string} gameNumber - the game Number
		@param {string} research - see the examples
		@param {function(Object): void} [callback] - return Promise if omitted
		@returns {Promise<Object> | void}
	*/
	researchNext(gameNumber, research, callback) {
		return this.order(gameNumber, [ 'change_research_next', research ], callback);	
	};
	/**
		@desc Creates a new game Info Instance
		@param {string} gameNumber - the game Number
		@returns {Promise<game>} {@link game}
	*/
	getGame(gameNumber) {
		if (!gameNumber) {
			return;
		}
		const id = gameNumber;
		const promiseHandler = (res) => {
			let archivement;
			const universeReportHandler = v => {
				res(new Game(archivement, v));
			};
			const playerArchievementHandler = v => {
				archivement = v;
				this.fullUniverseReport(id)
					.then(universeReportHandler)
					.catch(e => console.error(e));
			};
			this.fetchPlayerAchievements(id)
				.then(playerArchievementHandler)
				.catch(e => console.error(e));
		};
		return new Promise(promiseHandler);
	};
	/**
		@desc Receives the Intel Data
		@param {string} gameNumber - the game Number
		@param {function(Object): void} callback
		@returns {Promise<Object>} 
	*/
	intelData(gameNumber, callback) {
		if (!gameNumber) {
			return;
		}
		const url = `${this.url}/trequest/intel_data`;
		const parameters = {
			game_number: gameNumber,
			group: group,
			type: 'fetch_unread_count',
			version: '',
		};
		return this.returnFunc(url, parameters, callback);		
	};
	/**
		@desc Let a Fleet Loops
		@param {string} gameNumber - the game Number
		@param {number} fleetNumber - the Fleet Number
		@param {boolean} toggle - Looping Waypoint
		@param {function(Object): void} [callback] - return Promise if omitted
		@returns {Promise<Object>}
	*/
	setLoopingForFleet(gameNumber, fleetNumber, toggle, callback) {
		return this.order(gameNumber, [ 'loop_fleet_orders', fleetNumber, toggle ], callback);	
	};
	/**
		@desc Transfer Ships to a Fleet
		@param {string} gameNumber - the game Number
		@param {number} fleetNumber - the Fleet Number
		@param {number} [ships] - Ship Count
		@param {function(Object): void} [callback] - return Promise if omitted
		@returns {Promise<Object> | void}
	*/
	shipTransfer(gameNumber, fleetNumber, ships, callback) {
		return this.order(gameNumber, [ 'ship_transfer', fleetNumber, (ships || 0) ], callback);	
	};
	/**
		@typedef Waypoint
		@property {number} delay
		@property {number} star
		@property {TShipAction} action
		@property {number} ship
	*/
	/**
		@desc it interprets the Fleet Order Parameter for 'addFleetOrders'
		@param {Array<Waypoint>} orders - example included 
		@returns {FleetOrderObj} returns what was excepted
	*/
	generateFleetOrderObj(orders) {
		let fleetOrders = {
			delay: 	[],
			star: 	[],
			action: [],
			ships: 	[],
		};
		const orderType = typeof orders;
		if (orderType === 'string' || orderType === 'number') {
			fleetOrders.star.push(orders);
			return fleetOrders;
		} else if (orderType !== 'object' || !!orders.length || orders.length <= 0) {
			return;
		}
		for (let i = 0, l = orders.length; i < l; i++) {
			const orderObjType = typeof orders[i];
			if (orderObjType === 'string' || orderObjType === 'number') {
				fleetOrders.star.push(orders[i]);
				continue;
			} else if (orderObjType !== 'object') {
				continue;
			}
			for (let k in orders[i]) {
				if (!fleetOrders[k]) {
					continue;
				}
				fleetOrders[k].push(orders[i][k] || 0);
			}
		}
		return fleetOrders;
    };
    /**
		@desc gives a Carrier a Job
		@param {string} gameNumber - the game Number
		@param {number} fleetNumber - the id of your fleet
		@param {Array<Waypoint>} orders - example included 
		@param {boolean} loop - loop this Waypoints
		@param {function(Object): void} [callback] - return Promise if omitted
		@returns {Promise<Object> | void}
		@example
		*const fleetOrders = [
		*	{ 
		*		delay: 0, 
		*		star: 206, 
		*		action: NeptunePrideAPI.shipAction.DO_NOTHING, 
		*		ships: 0, 
		*	},
		*	{ 
		*		delay: 0, 
		*		star: 202, 
		*		action: NeptunePrideAPI.shipAction.COLLECT_ALL_SHIPS, 
		*		ships: 0, 
		*	},
		*];
		*NeptunePride.setWaypoint(gameNumber, fleetNumber, fleetOrders, false);
	*/
	setWaypoint(gameNumber, fleetNumber, orders, loop, callback) {
		if (!orders) {
			return;
		}
		const fleetOrders = this.generateFleetOrderObj(orders);
		const parameters = [ 'add_fleet_orders', fleetNumber ];
		const paramOrder = [ 'delay', 'star', 'action', 'ships' ];
		for (let i = 0, e; e = paramOrder[i]; i++) {
			parameters.push(fleetOrders[e].join('_'));
		}
		parameters.push(loop || 0);
		return this.order(gameNumber, parameters, callback);	
	};
	/**
		@desc it clears all Orders for a Fleet
		@param {string} gameNumber - The game Number
		@param {number} fleetNumber - the Fleet Number
		@param {function(any): void} [callback] - return Promise if omitted
		@returns {Promise<any> | void}
	*/
	clearWaypoints(gameNumber, fleetNumber, callback) {
		return this.order(gameNumber, [ 'clear_fleet_orders', fleetNumber ], callback);	
    };
    /**
        @param {string | number} gameNumber 
        @param {number} starNumber 
        @param {string} newName 
        @param {function(any): void} [callback]
        @returns {Promise<any> | void} 
     */
	changeStarName(gameNumber, starNumber, newName, callback) {
		return this.order(gameNumber, [ 'rename_star', starNumber, newName ], callback);
    };
    /**
        @param {string | number} gameNumber 
        @param {number} fleetNumber 
        @param {string} newName 
        @param {function(any): void} [callback]
        @returns {Promise<any> | void} 
     */    
	changeFleetName(gameNumber, fleetNumber, newName, callback) {
		return this.order(gameNumber, [ 'rename_fleet', fleetNumber, newName ], callback);
	};
}

module.exports = NeptunesPride;