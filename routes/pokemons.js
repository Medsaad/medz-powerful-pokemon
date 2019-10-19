const express = require('express');
const async = require('async');

const Pokemon = require('../includes/pokemon');
const logger = require('../logs/logger');

const router = express.Router();

router.get('/powerful/find', function(req, res, next) {
    logger.info('Initiated request: /powerful/find with query params: ' + JSON.stringify(req.query));
    let pokemons = req.query.pokemons; //comma separated pokemons

    //in case no pokemon was set, return an error
    if(!pokemons){
        let message = 'No pokemons were sent!';
        logger.error(message);
        return res.status(400).json({ message });
    }

    //in case only pokemon was set then he is the winner.
    pokemons_list = pokemons.split(',');
    if(pokemons_list.length == 1){
        let message = 'Only one pokemon was sent. I think we have a winner!';
        logger.info(message);
        return res.status(200).json({ message });
    }

    /* 
    In order to compare between 2 or more pokemons, they need to be added in a list
    by creating pokemon objects and fetching each pokemon's data.
    A misspell in a pokemon name will return an error to the user.
    */
    let pokemons_meta = [];
    async.eachSeries(pokemons_list,  (pokemon, next) => {
        //handling extra commas
        if(pokemon === '') 
            next();

        logger.info("Creating object for pokemon "+ pokemon);
        let p = new Pokemon(pokemon);
        p.loadPokemon().then((item) => {
            logger.info("Pokemon data: " + JSON.stringify(item));
            if(item)
                pokemons_meta.push( p );   
            else
                return res.status(400).json({ message: "Error while getting pokemon data." });

            next();
        });
    }, 
    async (error) => {
        //if the loop is broken due to an error the process need to stop here.
        if(error) {
            logger.info("Error while looping through pokemons", error);
            return res.status(400).json({ message: "Process stopped" });
        }else{
            //If the loop ended successfully, send the list of pokemon objects to 
            //getTheStrongestAmong static method
            let theStrongest = await Pokemon.getTheStrongestAmong(pokemons_meta);
            if(!theStrongest)
                return res.status(400).json({ message: 'Can not determine the most powerful pokemon' });
            else if(theStrongest == 1)
                return res.status(200).json(
                    {
                        message: 'All of the pokemons are equally powerful',
                        data: {}
                    });
            else if(theStrongest == 2){
                return res.status(200).json(
                    {
                        message: 'More than one pokemon are equally powerful',
                        data: {}
                    });
            }
            else
                return res.status(200).json(
                    {
                        message: 'Most powerful Pokemon found',
                        data: {
                            name: theStrongest.getPokemonName(),
                            totalMoves: theStrongest.countMoves()
                            }
                    });
        }
    });
    
    
});

module.exports = router;