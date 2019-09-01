import jwt from 'jsonwebtoken';
import bcrypt from "bcryptjs"
import {
    transporter,
    getPasswordResetURL,
    usePasswordHashToMakeToken,
    resetPasswordTemplate
  } from "../modules/email"
import {
  queryByEmail,
  queryById,
  updatePassword
  } from '../services/userServices';

/**
 * Class representing resetPasswordController
 * @class resetPasswordController
 */
export class resetPasswordController {
  /**
     * Reset user password on the application
     * @static
     * @param {object} req - The request object
     * @param {object} res - The response object
     * @return {object} JSON object representing success
     * @memeberof resetPasswordController
  */



 static async sendPasswordResetEmail (req, res) {
    
    const {email} = req.body;


    try {
      const result = await queryByEmail(email)

      if (result) {
        const user = result;
        const token = usePasswordHashToMakeToken(user)
        const url = getPasswordResetURL(user, token)
        const emailTemplate = resetPasswordTemplate(user, url)
  
        const sendEmail = () => {
        transporter.sendMail(emailTemplate, (err, info) => {
        if (err) {
          res.status(500).json({"Error sending email":err})
        }
        res.status(200).json({"success":"Mail successfully sent to your inbox."})
      })
    }
    sendEmail()
}
    } catch (error) {
      return res.status(500).json({
        status: 500,
        error: error.message
      });
    }
    
  }

static async receiveNewPassword (req, res) {
    const { userId, token } = req.params
    const { password } = req.body
  
    try {
        const result = await queryById(userId)
        if (result) {
        const user = result
        const secret = user.password + "-" + user.createdAt
        const payload = jwt.decode(token, secret)
        if (payload.userId === user.id) {
          bcrypt.genSalt(10, function(err, salt) {
           bcrypt.hash(password, salt, null, async function(err, hash) {
            try{
              const result = await updatePassword(hash,userId);
              if(result){
              return res.status(200).json({
                status: 200,
                data: 'Password reset successfully'
              });
            }
          }catch(error){
            return res.status(500).json({
              status: 500,
              error: error.message
            });
          }
            })
          })
        }
      }
    }catch (error) {
        return res.status(500).json({
          status: 500,
          error: error.message
        });
      }
  }
}

