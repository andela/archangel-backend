import jwt from 'jsonwebtoken';

var jwtSecret = process.env.JWT_SECRET;

// This function generates a token for the user...
export default {
  generateToken: ({ id }) => {
    //I add the string Bearer to the signed jwt object for the token full string...
    const token = `Bearer ${jwt.sign({ id: id }, jwtSecret, { expiresIn: '5 days'})}`;
    return token;
  }
}
