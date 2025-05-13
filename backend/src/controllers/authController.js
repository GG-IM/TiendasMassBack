const bcrypt = require('bcryptjs');
const User = require('../models/user');



exports.getAllUsers = async (req, res) => {
  try {
    const usuarios = await User.findAll();
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.register = async (req, res) => {
  try {
    const { nombre, email, contraseña } = req.body;
    const userExist = await User.findByEmail(email);
    if (userExist) return res.status(400).json({ message: 'El usuario ya existe' });

    const hashedPassword = await bcrypt.hash(contraseña, 10);
    const userId = await User.create({ nombre, email, contraseña: hashedPassword });
    res.status(201).json({ id: userId, nombre, email });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, contraseña } = req.body;
    const user = await User.findByEmail(email);
    if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });

    const isMatch = await bcrypt.compare(contraseña, user.contraseña);
    if (!isMatch) return res.status(401).json({ message: 'Contraseña incorrecta' });

    res.json({ id: user.id, nombre: user.nombre, email: user.email });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
