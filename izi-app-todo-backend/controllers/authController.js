const { User } = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  const { name, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const newUser = await User.create({ name, email, password: hashedPassword });
    res.status(201).json(newUser);
  } catch (error) {
    console.error('Error registering user:', error);

    if (error.name === 'SequelizeUniqueConstraintError') {
      res.status(400).json({
        error: `O email ${email} já está em uso. Por favor, escolha outro.`,
      });
    } else {
      res.status(500).json({
        error: 'Ocorreu um erro ao tentar registrar o usuário. Tente novamente.',
        details: error.message,
      });
    }
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const jwt = require('jsonwebtoken');

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ token });
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ error: 'Error logging in' });
  }
};