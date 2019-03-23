var config = require('../../config');
var mailgun = require('mailgun-js')({ apiKey: config.mailgun.apikey, domain: config.mailgun.domain });

exports.SendEmail = function (subject, message) {
    var data = {

        from: 'Azeem Sarwar <azeem.sarwar@gmail.com>',
        to: 'asarwar.dummy@gmail.com',
        subject: subject,
        text: message
    };

    mailgun.messages().send(data, function (error, body) {
        console.log('body', body);
    })
};
