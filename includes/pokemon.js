const async = require('async');
const rp = require('request-promise');

module.exports = class Pokemon{
    
    constructor(name) {
        this.name = name;
        this.base_url = 'https://pokeapi.co/api/v2/';
        this.pokemon = {};
    }

    getPokemonName(){
        return this.pokemon.name;
    }

    countMoves(){
        return this.pokemon.moves.length;
    }

    async loadPokemon(){
        try {
            var options = {
                uri: this.base_url + 'pokemon/' + this.name,
                method: 'GET',
                headers: { "User-Agent": "Request-Promise" },
                json: true
            };
            this.pokemon = await rp(options);
            return this.pokemon;
        }catch(error){
            console.log(error);
            return false;
        }
    }

    isStrongerThan(other_pokemon){
        if(this.countMoves() > other_pokemon.countMoves()) return true;
        else false;
    }

    
}