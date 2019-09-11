/* eslint-disable import/named */
/* eslint-disable require-jsdoc */

class ClientController {
    /**
     * @param {Object} req
     * @param {Object} res
     * @returns {Object} the new user
     * @description register a new client
     */
    static async getClient(req, res) {
        const { user_id } = req.params;

        const message = `<!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>Chat App</title>
        <script src="/socket.io/socket.io.js"></script>
        <script>
          const appendMessage = (message) => {
            const div = document.getElementById('message-container');
            let para = document.createElement('p');
            para.appendChild(document.createTextNode(message));
            div.appendChild(para);
          };
          const socket = io();
          socket.on('travelCreated${user_id}', (data) => { 
            appendMessage(data);
					});
					socket.on('here', (data) => { 
						console.log(data);	
            appendMessage(data);
          });
        </script>
      </head>
      <body>
        <div id="message-container">
          <h3>Notify User Travels</h3>
          
        </div>
        
      </body>
      </html>
      
      `;

        res.send(message);
    }
}

<<
<< << < HEAD: src / controllers / profile.js
export default ProfileController; ===
=== =
export default ClientController; >>>
>>> > edited the entry point and routes to test with postman: src / controllers / client.js