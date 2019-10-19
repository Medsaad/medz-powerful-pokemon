# Most Powerful Pokemon

This is an API where you can send a list of pokemons and get which one is the most powerful.

## Getting Started

To install this API, follow the steps below:

- First, simply clone this repository.
- Make sure that you have [docker](https://www.docker.com/) and [docker compose](https://docs.docker.com/compose/) installed on your machine.
- Go to project root directory and type the command: `docker-compose up`
- In the first time you run this command, it will install necessary dependencies but after that it will run the app directly.
- Now the API is up and running

## API Request

If you running this API from your machine then the base url to the API will be  `http://localhost:3000/api/v1/` 

Currently there are only one API endpoint.

- `/powerful/find` it accept one query parameter `pokemons=[comma separated pokemon names]` .
- Sample Request: `http://localhost:3000/api/v1/powerful/find?pokemons=ditto,butterfree,bulbasaur,ivysaur,venusaur`
- Sample Response: 
{
"message": "Most powerful Pokemon found",
"data": {
      "name": "bulbasaur",
   "totalMoves": 78
   }
}
