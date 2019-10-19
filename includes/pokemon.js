const async = require('async');
const rp = require('request-promise');

const logger = require('../logs/logger');

class Pokemon{

    constructor(name) {
        this.name = name;
        this.base_url = 'https://pokeapi.co/api/v2/';
        this.pokemon = {};
        this.EQUALLY_POWERFUL = 1;
        this.MORE_THAN_ONE_POWERFUL = 2;
    }

    /**
     * returns pokemon name
     * @returns {String}
     */
    getPokemonName(){
        return this.pokemon.name;
    }

    /**
     * returns pokemon number of moves
     * @returns {Number}
     */
    countMoves(){
        return this.pokemon.moves;
    }

    /**
     * fetches pokemon data from API and stores the important part
     * @returns {Number}
     */
    async loadPokemon(){
        try{
            //setting the request options
            let url = this.base_url + 'pokemon/' + this.name;
            let options = {
                uri: url,
                method: 'GET',
                json: true
            };
            logger.info("fetching data for pokemon: "+ this.name + " | url: " + url);
            let res = await rp(options);
            logger.info("fetching data successful ..");
            //returning the pokemon's id, name and number of moves
            this.pokemon = {
                id: res.id,
                name: res.name,
                moves: res.moves.length,
            };
            return this.pokemon; 
        }catch(error) {
            //in case of request error
            logger.info("fetching data failed", error);
            return false;
        };
    }

    /**
     * finds the most powerful pokemon within a list of Pokemon objects
     * @param {Array}
     * @returns {Object}
     */
    static getTheStrongestAmong(pokemons){
        let pokemonMoves = [];
        let thePokemon;

        //separate pokemon moves to make calculations
        pokemons.forEach(pokemon => {
            pokemonMoves.push(pokemon.countMoves());
        });

        //extract the highest number of moves
        let maxMoves = Math.max(...pokemonMoves);

        //extract occurances of the highest number of moves
        let multiMax = pokemonMoves.filter((moves) => maxMoves == moves);

        //check if they all equally powerful
        if(pokemons.length == multiMax.length) 
            thePokemon = this.EQUALLY_POWERFUL;

        //check if there are more than one champion
        else if(multiMax.length > 1) 
            thePokemon = this.MORE_THAN_ONE_POWERFUL;
        //extract and return the winner
        else 
            thePokemon = pokemons[pokemonMoves.indexOf(maxMoves)];

        return thePokemon;
    }

    
}

module.exports = Pokemon