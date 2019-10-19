const winston = require("winston");

var today = new Date();
var dd = today.getDate();
var mm = today.getMonth() + 1;
var yyyy = today.getFullYear();

//initialing daily log files
var logger = new winston.Logger({
	transports: [
		new winston.transports.Console(),
		new winston.transports.File({
			filename: "logs/pokemon-" + yyyy + "-" + mm + "-" + dd + ".log"
		})
	]
});

module.exports = logger;