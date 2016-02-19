var fs = require('fs');
var obj = JSON.parse(fs.readFileSync('secret', 'utf8'));

module.exports = {
	"facebook": obj,
  "my_bouncer": {
		type: "irc",
		server: "bouncer.example.com",
		port: 6667,
		sasl: true,
		secure: true,
		selfSigned: true,
		certExpired: true,
		nick: "pollock",
		userName: "pollock",
		password: "pollock:hunter2",
		channels: ['#general']
	}
};
