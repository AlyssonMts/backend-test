const User = require('../models/user');
const bcrypt = require('bcrypt');

const registerUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Verifica se o usuário já existe
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(409).json({ message: 'Username already exists' });
    }

    // Cria um novo usuário
    const newUser = new User({
      username,
      password,
    });

    // Salva o usuário no banco de dados
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('register error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = { registerUser };