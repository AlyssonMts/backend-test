const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const SECRET_KEY = process.env.SECRET_KEY || 'default_secret_key'; // Utilize variáveis de ambiente para maior segurança


const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

   
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ message: 'password or username invalid' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'password or username invalid' });
    }


    const token = jwt.sign({ id: user._id }, SECRET_KEY, { expiresIn: 3600 });
    res.status(200).json({ token });
  } catch (error) {
    console.error('login error:', error);
    res.status(500).json({ message: 'error server' });
  }
};

// Middleware de autenticação para proteger rotas
const authMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ message: 'token not found' });
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, SECRET_KEY);

    req.userId = decoded.id;
    next();
  } catch (error) {
    console.error('token error verification:', error);
    res.status(401).json({ message: 'invaled token or not found' });
  }
};

module.exports = { loginUser, authMiddleware };
