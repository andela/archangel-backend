require('dotenv').config();
const sendGrid = require('sendgrid').mail;
const sg = require('sendgrid')('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');

export const sendVerificationEmail = (to, token) => {
    const hostUrl = 'http://localhost:5000';
    const request = sg.emptyRequest({
      method: "POST",
      path: "/v3/mail/send",
      body: {
        personalizations: [
          {
            to: [
              {
                email: to
              }
            ],
            subject:"Verify Your Email"
          }
        ],
        from: {
          email: "barefoot.nomad.archangel@gmail.com"
        },
        content: [
      {
        type: 'text/plain',
        value: `Click on this link to verify your email ${hostUrl}/verification?token=${token}&email=${to}`
      }
    ]
      }
    });
    return new Promise((resolve, reject) => {
      sg.API(request, (error, response) => {
        if (error) {
          return reject(error);
        }
        else {
          return resolve(response);
        }
      });
    });
  };
