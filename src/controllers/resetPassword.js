import jwt from 'jsonwebtoken';
import bcrypt from "bcryptjs"
import emailServices from '../services/emailServices';
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
} = emailServices;

/**
 * Send user reset password on the application
 * @static
 * @param {object} req - The request object
 * @param {object} res - The response object
 * @return {object} JSON object representing success
 */


const sendPasswordResetEmail = async(req, res) => {
    const { email } = req.body
    let user
    try {
        user = await queryByEmail(email)
    } catch (err) {
        res.status(404).json("No user with that email")
    }
    const token = usePasswordHashToMakeToken(user)
    const url = getPasswordResetURL(user, token)
    const emailTemplate = resetPasswordTemplate(user, url)
    transporter(emailTemplate, res)

}


/**
 * Update user reset password on the application
 * @static
 * @param {object} req - The request object
 * @param {object} res - The response object
 * @return {object} JSON object representing success
 */

const receiveNewPassword = (req, res) => {
    const { userId, token } = req.params
    const { password } = req.body

    queryById(userId)

    .then(user => {
        const secret = user.password + "-" + user.createdAt
        const payload = jwt.decode(token, secret)
        if (payload.userId === user.id) {
            bcrypt.genSalt(10, function(err, salt) {
                if (err) return
                bcrypt.hash(password, salt, function(err, hash) {
                    if (err) return
                    updatePassword(hash, userId)
                        .then(() => res.status(202).json("Password changed accepted"))
                        .catch(err => res.status(500).json(err))
                })
            })
        }
    })

    .catch(() => {
        res.status(404).json("Invalid user")
    })
}
export default {
    sendPasswordResetEmail,
    receiveNewPassword
}
