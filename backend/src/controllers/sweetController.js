const Sweet = require('../models/Sweet');

exports.addSweet = async (req, res) => {
  try {
    const { name, category, price, quantity, description, imageUrl } = req.body;

    const sweet = new Sweet({
      name,
      category,
      price,
      quantity,
      description,
      imageUrl
    });

    await sweet.save();
    res.status(201).json({ message: 'Sweet added successfully', sweet });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.getAllSweets = async (req, res) => {
  try {
    const sweets = await Sweet.find();
    res.json({ sweets, count: sweets.length });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};


exports.searchSweets = async (req, res) => {
  try {
    const { name, category, minPrice, maxPrice } = req.query;
    
    let query = {};

    if (name) {
      query.name = { $regex: name, $options: 'i' };
    }

    if (category) {
      query.category = { $regex: category, $options: 'i' };
    }

    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = parseFloat(minPrice);
      if (maxPrice) query.price.$lte = parseFloat(maxPrice);
    }

    const sweets = await Sweet.find(query);
    res.json({ sweets, count: sweets.length });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.updateSweet = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const sweet = await Sweet.findByIdAndUpdate(id, updates, { 
      new: true, 
      runValidators: true 
    });

    if (!sweet) {
      return res.status(404).json({ message: 'Sweet not found' });
    }

    res.json({ message: 'Sweet updated successfully', sweet });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.deleteSweet = async (req, res) => {
  try {
    const { id } = req.params;

    const sweet = await Sweet.findByIdAndDelete(id);

    if (!sweet) {
      return res.status(404).json({ message: 'Sweet not found' });
    }

    res.json({ message: 'Sweet deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.purchaseSweet = async (req, res) => {
  try {
    const { id } = req.params;
    const { quantity } = req.body;

    if (!quantity || quantity < 1) {
      return res.status(400).json({ message: 'Invalid quantity' });
    }

    const sweet = await Sweet.findById(id);

    if (!sweet) {
      return res.status(404).json({ message: 'Sweet not found' });
    }

    if (sweet.quantity < quantity) {
      return res.status(400).json({ 
        message: 'Insufficient stock',
        available: sweet.quantity
      });
    }

    sweet.quantity -= quantity;
    await sweet.save();

    res.json({ 
      message: 'Purchase successful', 
      sweet,
      purchased: quantity
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.restockSweet = async (req, res) => {
  try {
    const { id } = req.params;
    const { quantity } = req.body;

    if (!quantity || quantity < 1) {
      return res.status(400).json({ message: 'Invalid quantity' });
    }

    const sweet = await Sweet.findById(id);

    if (!sweet) {
      return res.status(404).json({ message: 'Sweet not found' });
    }

    sweet.quantity += quantity;
    await sweet.save();

    res.json({ 
      message: 'Restock successful', 
      sweet,
      restocked: quantity
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};