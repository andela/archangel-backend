import jwt from 'jsonwebtoken';
import bcrypt from "bcryptjs"
import userServices from '../services/userServices';
import {
    transporter,
    getPasswordResetURL,
    usePasswordHashToMakeToken,
    resetPasswordTemplate
  } from "../modules/email"
const {
  queryByEmail,
  queryById,
  updatePassword
  } = userServices;

  /**
     * Send user reset password on the application
     * @static
     * @param {object} req - The request object
     * @param {object} res - The response object
     * @return {object} JSON object representing success
  */



  const sendPasswordResetEmail = async (req, res) => {

    const {email} = req.body;
    let result;
    try {
      result = await queryByEmail(email)
    } catch (error) {
  
      return res.status(500).json({
        status: 500,
        error: error.message
      });
    }
    
        const user = result;
        
        const token = usePasswordHashToMakeToken(user)

        const url = getPasswordResetURL(user, token)
  
        const emailTemplate = resetPasswordTemplate(user, url)
        
        const sendmail = () =>{ transporter.sendMail(emailTemplate, (err) => {
        if (err) {
          
          return res.status(500).json({"Error sending email":err})
        }
        return res.status(200).json({"success":"Mail successfully sent to your inbox."})
      })
      sendmail()
    }
    
  }


  /**
     * Update user reset password on the application
     * @static
     * @param {object} req - The request object
     * @param {object} res - The response object
     * @return {object} JSON object representing success
  */

 const receiveNewPassword = async(req, res) =>{
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

  export default {
    sendPasswordResetEmail,
    receiveNewPassword
  }

