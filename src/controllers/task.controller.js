const Tag = require("../models/tag");

const createTag = async (req, res) => {
  try {
    const tag = new Tag({ ...req.body, user: req.userId });
    await tag.save();
    res.status(201).json(tag);
  } catch (error) {
    console.error('Erro ao criar tag:', error);
    res.status(400).json({ message: "error creating tag", error: error.message });
  }
};

const getTags = async (req, res) => {
  try {
    const tags = await Tag.find({ user: req.userId });
    res.json(tags);
  } catch (error) {
    console.error('Erro ao buscar tags:', error);
    res.status(500).json({ message: 'error searching tags', error: error.message });
  }
};


const updateTag = async (req, res) => {
  try {
    const tag = await Tag.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!tag) return res.status(404).json({ message: 'tag not found' });
    res.json(tag);
  } catch (error) {
    console.error('Erro ao atualizar tag:', error);
    res.status(400).json({ message: 'error updating tag', error: error.message });
  }
};

const deleteTag = async (req, res) => {
  try {
    const tag = await Tag.findByIdAndDelete(req.params.id);
    if (!tag) return res.status(404).json({ message: 'Tag not found' });
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting tag:', error);
    res.status(400).json({ message: 'Error deleting tag', error: error.message });
  }
};

module.exports = { createTag, getTags, updateTag, deleteTag };