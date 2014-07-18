(function(notifyController) {
    var logger = require('../utils/logger');

    notifyController.init = function(app) {
        app.post('/api/notify/join', function(req, res) {

            logger.debug('email value: ' + req.body.email);

            req.assert('email', 'Field required').notEmpty();
            req.assert('email', 'Invalid email format').isEmail();

            var errors = req.validationErrors();
            var mappedErrors = req.validationErrors(true);

            if (errors) {
                logger.warn("Wrong request: ", errors);
                res.json(400, errors);
            }

            var MailChimpAPI = require('mailchimp').MailChimpAPI;

            var credentials = require("../config/credentials.js").credentials;

            try {
                var mailChimpAPI = new MailChimpAPI(credentials.mailchimp.key, {
                    version: '2.0'
                });

                mailChimpAPI.lists_subscribe({
                    id: credentials.mailchimp.listId,
                    email: {
                        email:req.body.email
                    }
                }, function(error, data) {
                    if (error) {
                        logger.error("There is an error calling MailChimp: " + error);
                        res.status(500).send("<p class='error'>Something went wrong. Please try again.</p>");
                    } else {
                        logger.debug(data);
                        res.send("<p class='success'>Thanks for signing up!</p>");
                    }
                });

            } catch (error) {
                logger.error(error.message);
            }

            //here need to implement mail-chimp integration
        });


        app.post('/api/contact/', function(req, res) {

            req.assert('name', 'Field required').notEmpty();
            req.assert('message', 'Field required').notEmpty();
            req.assert('email', 'Field required').notEmpty();
            req.assert('email', 'Invalid email format').isEmail();

            var errors = req.validationErrors();
            var mappedErrors = req.validationErrors(true);

            if (errors) {
                logger.warn("Wrong request: ", errors);
                res.json(400, errors);
            }

            app.mailer.send('email/contact', { //Template (it uses the same engine of express)
                to: req.body.email, // REQUIRED. This can be a comma delimited string just like a normal email to field.
                subject: 'Thank you for contacting the Web European Conference', // REQUIRED.
                otherProperty: 'Other Property' // All additional properties are also passed to the template as local variables.
            }, function(err) {
                if (err) {
                    // handle error
                    console.log(err);
                    res.send('There was an error sending the email');
                    return;
                }
                res.send('Email Sent');
            });

            //here the code to send the email, and response with the right status code and info
        });
    };

})(module.exports);
