
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

// Generate a random short code
const generateShortCode = () => {
  return Math.random().toString(36).substring(2, 8).toUpperCase();
};

exports.createLink = async (req, res) => {
  try {
    const { url } = req.body;

    // Validate input
    if (!validate(req.body)) {
      return res.status(400).json({ success: false, error: 'Invalid URL format' });
    }

    // Generate unique short code
    let shortCode;
    let exists = true;
    while (exists) {
      shortCode = generateShortCode();
      const found = await Link.findOne({ where: { shortCode } });
      exists = !!found;
    }

    // Create the link
    const link = await Link.create({
      originalUrl: url,
      shortCode: shortCode,
      userId: req.user?.userId || null
    });

    res.status(201).json({
      success: true,
      shortCode: link.shortCode,
      shortUrl: `http://localhost:3000/link/${link.shortCode}`,
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

    // Increment click count
    link.clicks += 1;
    await link.save();

    // Redirect to original URL
    res.redirect(link.originalUrl);
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};
