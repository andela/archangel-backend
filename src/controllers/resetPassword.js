import Sequelize from 'sequelize';
// import User from '../sequelize';
const Op = Sequelize.Op;

const getPassToken = (app) => {
        app.get('/reset', async (req, res) => {
        try{
          let user = User.findOne({
            where: {
              resetPasswordToken: req.query.resetPasswordToken,
              resetPasswordExpires: {
                [Op.gt]: Date.now(),
              },
            },
          })
          if (user == null) {
            console.error('password reset link is invalid or has expired');
            res.status(403).send('password reset link is invalid or has expired');
          } else {
            res.status(200).send({
              username: user.username,
              message: 'password reset link a-ok',
            });
          }

        } catch(e){
    //this will eventually be handled by your error handling middleware
            console.log(e)
            //  next(e) 
        }
    })
}

export default getPassToken;