
const Ajv = require('ajv');
const sequelize = require('../common/database');
const defineLink = require('../common/models/link');
const Link = defineLink(sequelize);

const ajv = new Ajv();
const schema = {
  type: 'object',
  required: ['url'],
  properties: {
    url: { type: 'string' }
  }
};
const validate = ajv.compile(schema);

// creer un code raccourci unique 
const generateShortCode = () => {
  return Math.random().toString(36).substring(2, 8).toUpperCase();
};

exports.createLink = async (req, res) => {
  try {
    const { url } = req.body;

    // Valide l'input
    if (!validate(req.body)) {
      return res.status(400).json({ success: false, error: 'Invalid URL format' });
    }

    // Génère un code raccourci unique
    let shortCode;
    let exists = true;
    while (exists) {
      shortCode = generateShortCode();
      const found = await Link.findOne({ where: { shortCode } });
      exists = !!found;
    }

    // Cree le lien dans la base de données
    const link = await Link.create({
      originalUrl: url,
      shortCode: shortCode,
      userId: req.user?.userId || null
    });

    res.status(201).json({
      success: true,
      shortCode: link.shortCode,
      shortUrl: `/link/${link.shortCode}`,
      originalUrl: link.originalUrl
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

exports.getLink = async (req, res) => {
  try {
    const { code } = req.params;
    const link = await Link.findOne({ where: { shortCode: code.toUpperCase() } });

    if (!link) {
      return res.status(404).json({ success: false, error: 'Link not found' });
    }

    // Incrementer le compteur de clics
    link.clicks += 1;
    await link.save();

    // Rediriger vers l'URL originale
    res.redirect(link.originalUrl);
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

exports.getAllLinks = async (req, res) => {
  try {
    console.log('getAllLinks called - User:', req.user);
    const links = await Link.findAll({ order: [['createdAt', 'DESC']] });
    console.log('Found', links.length, 'links');
    res.status(200).json({ success: true, links });
  } catch (err) {
    console.error('getAllLinks error:', err.message);
    res.status(500).json({ success: false, error: err.message });
  }
};
