require('dotenv').config();
const sendGrid = require('sendgrid').mail;
const sg = require('sendgrid')(process.env.SENDGRID_API);


let hostUrl;
const devHostUrl = 'http://localhost:5000';
const prodHostUrl = 'https://archangel-backend-staging.herokuapp.com/';
const sendVerificationEmail = (to) => {
	if (process.env.NODE_ENV === 'development') {
    hostUrl = devHostUrl;
	} else {
		hostUrl = prodHostUrl;
	}
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
        value: `Click on this link to verify your email ${hostUrl}`
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
export default sendVerificationEmail;
