/**
    @typedef FleetOrderObj
    @property {Array<Number>} delay
    @property {Array<Number>} star
    @property {Array<shipAction>} action
    @property {Array<Number>} ships
*/
    
/**
    @typedef GameConfig
    @property {number} startingShips
    @property {number} researchCostExperimentation
    @property {number} darkGalaxy
    @property {number} developmentCostIndustry
    @property {number} startingTechHyperspace
    @property {string} starScatter
    @property {number} developmentCostEconomy
    @property {number} startingTechScanning
    @property {number} startingTechTerraforming
    @property {number} mirror
    @property {number} anonymity
    @property {number} startingStars
    @property {number} alliances
    @property {number} researchCostWeapons
    @property {number} researchCostHyperspace
    @property {string} description
    @property {number} researchCostTerraforming
    @property {string} password
    @property {number} starsForVictory
    @property {number} naturalResources
    @property {number} startingTechManufacturing
    @property {number} tradeCost
    @property {number} startingTechExperimentation
    @property {number} startingCash
    @property {number} turnTime
    @property {string} version
    @property {number} startingInfEconomy
    @property {number} buildGates
    @property {number} researchCostScanning
    @property {Array<string>} non_default_settings
    @property {number} startingInfScience
    @property {number} startingInfIndustry
    @property {number} startingTechWeapons
    @property {number} starsPerPlayer
    @property {number} researchCostManufacturing
    @property {number} customStarfield
    @property {number} researchCostBanking
    @property {number} productionTicks
    @property {number} playerType
    @property {number} developmentCostScience
    @property {string} name
    @property {number} tradeScanned
    @property {number} adminUserId
    @property {number} turnJumpTicks
    @property {number} turnBased
    @property {number} tickRate
    @property {number} players
    @property {number} homeStarDistance
    @property {number} randomGates
    @property {number} startingTechBanking
    @property {string} starfield
 */

/**
    @typedef GameStatus
    @property {string} status
    @property {string} name
    @property {string} creator
    @property {boolean} turn_based
    @property {string} number
    @property {number} maxPlayers
    @property {number} players
    @property {string} version
    @property {string} creator
    @property {GameConfig} config
 */

/**
    @typedef PlayerInfo
    @property {Date} subscribed_until
    @property {number} games_in
    @property {Array<GameStatus>} complete_games
    @property {boolean} has_password
    @property {string} user_email
    @property {number} games_third
    @property {string} badges
    @property {Array<GameStatus>} owned_games
    @property {boolean} allow_email
    @property {string} user_id
    @property {number} games_won
    @property {number} games_complete
    @property {Date} nagged
    @property {string} logout_url
    @property {number} score
    @property {Array<GameStatus>} open_games
    @property {number} avatar
    @property {number} credits
    @property {Date} created
    @property {boolean} email_verified
    @property {number} local_account
    @property {string} allias
    @property {number} karma
    @property {number} game_second
    @property {number} dollars_paid
    @property {string} referring_campaign
 */

/**
	@typedef TShipAction
	@property {number} DO_NOTHING
	@property {number} COLLECT_ALL_SHIPS
	@property {number} DROP_ALL_SHIPS
	@property {number} COLLECT_SHIPS
	@property {number} DROP_SHIPS
	@property {number} DROP_ALL_BUT
	@property {number} GARRISON_STAR
*/

/**
  @typedef TechnologyStats
  @property {number} value
  @property {number} level
  @property {number} [sv] - Only for your self
  @property {number} [research] - Only for your self
  @property {number} [bv] - Only for your self
  @property {number} [brr] - Only for your self
*/

/**
  @typedef Technology
  @property {TechnologyStats} scanning
  @property {TechnologyStats} propulsion
  @property {TechnologyStats} terraforming
  @property {TechnologyStats} research
  @property {TechnologyStats} weapons
  @property {TechnologyStats} banking
  @property {TechnologyStats} manufacturing
*/

/**
  @typedef PlayerReport
  @property {number} total_industry - Industry Count
  @property {number} regard
  @property {number} total_science - Science Count
  @property {number} uid - User ID
  @property {boolean} ai - User AI Status
  @property {number} huid
  @property {number} total_stars - Star Count
  @property {number} total_fleets - Collector Count
  @property {number} total_strength - Strength Count
  @property {string} alias - Player Name
  @property {Technology} tech - detailed Player Technology Level
  @property {number} avatar 
  @property {number} conceded
  @property {boolean} ready
  @property {number} total_economy
  @property {number} missed_turns
  @property {number} karma_to_give
  @property {string} [researching] - Own Current Research
  @property {Map<string, number>} [war] - Own War Status
  @property {number} [stars_abandoned] - Stars Abandoned
  @property {number} [cash] - Own current Cash
  @property {string} [researching] - Own Next Research
  @property {Map<string, number>} [countdown_to_war] - War Countdown
  @property {number} [missed_turns] - Own Missed Turns
*/

/**
  @typedef IronhelmetReport
  @property {Map<string, any>} report
*/

/**
  @typedef NPPlayerInfoReport
  @property {IronhelmetReport} report
 */

/**
  @typedef IronhelmetResult
  @type {Array}
  @property {string} 0 - state string
  @property {IronhelmetReport} 1 - any Game Object
 */

/**
  @typedef InitPlayerCallback
  @type {Array}
  @property {string} 0 - state string
  @property {NPPlayerInfoReport} 1 - Player Info Object
*/