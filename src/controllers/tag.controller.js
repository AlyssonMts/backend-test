const Tag = require("../models/tag");

// Criar tag
const createTag = async (req, res) => {
  try {
    const tag = new Tag({ ...req.body, user: req.userId });
    await tag.save();
    res.status(201).json(tag);
  } catch (error) {
    res.status(400).json({ message: "Error creating tag", error: error.message });
  }
};

// Listar tags
const getTags = async (req, res) => {
  try {
    const tags = await Tag.find({ user: req.userId });
    res.json(tags);
  } catch (error) {
    res.status(500).json({ message: 'Error searching tags', error: error.message });
  }
};

// Atualizar tag
const updateTag = async (req, res) => {
  try {
    const tag = await Tag.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!tag) return res.status(404).json({ message: 'Tag not found' });
    res.json(tag);
  } catch (error) {
    res.status(400).json({ message: 'Error updating tag', error: error.message });
  }
};

// Deletar tag
const deleteTag = async (req, res) => {
  try {
    const tag = await Tag.findByIdAndDelete(req.params.id);
    if (!tag) return res.status(404).json({ message: 'Tag not found' });
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ message: 'Error deleting tag', error: error.message });
  }
};

module.exports = { createTag, getTags, updateTag, deleteTag };