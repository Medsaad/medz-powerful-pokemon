const express = require('express');
const async = require('async');

const Pokemon = require('../includes/pokemon');

const router = express.Router();

router.get('/powerful/find', function(req, res, next) {
    let pokemons = req.query.pokemons; //comma separated pokemons
    console.log("Query Params", req.query);
    if(!pokemons){
        let message = 'No pokemons were sent!';
        return res.status(400).json({ message });
    }
    pokemons_list = pokemons.split(',');
    if(pokemons_list.length == 1){
        let message = 'Only one pokemon was sent. I think we have a winner!';
        return res.status(200).json({ message });
    }
    let pokemon_meta = [];
    let counter = 0;
    let theStrongest = null;
    async.eachSeries(pokemons_list,  (pokemon, next) => {
        let p = new Pokemon(pokemon);
        p.loadPokemon().then((item) => {
            if(item){
                pokemon_meta.push( p );
                if(pokemon_meta.length > 1){
                    console.log("Current Pokemon Obj", pokemon_meta[counter]);
                    if (pokemon_meta[counter].isStrongerThan(pokemon_meta[counter - 1]))
                        theStrongest = pokemon_meta[counter];
                    else
                        theStrongest = pokemon_meta[counter - 1];
                }
                console.log("Current Pokemon", pokemon_meta[counter].getPokemonName());   
            }else{
                return res.status(400).json({ message: "Error while getting pokemon data." });
            }
            counter++; 
            next();
        });
    }, 
    (error) => {
        if(error) console.log(error);
        else{
            return res.status(200).json(
                {
                    message: 'Most powerful Pokemon found',
                    data: {
                        name: theStrongest.getPokemonName(),
                        totalMoves: theStrongest.countMoves(),
                        pokemonMeta: theStrongest.pokemon
                        }
                });
        }
    });
    
    
});

module.exports = router;