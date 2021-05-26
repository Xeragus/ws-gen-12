const mailgun = require("mailgun-js");
const DOMAIN = "sandbox72058639b9c7438293d2246a5a55ce69.mailgun.org";
const mg = mailgun({apiKey: "14039d8c90266f1a41978262dee5a5fc-fa6e84b7-16c45266", domain: DOMAIN});

module.exports = data => {
	mg.messages().send(data, (error, body) => {
		console.log(body);
	});
}
