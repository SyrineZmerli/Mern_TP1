const Article = require('../models/articleModel');

const getAllArticles = async (req, res) => {
  try {
    const articles = await Article.find().populate('author', 'name email role');
    res.status(200).json(articles);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getArticleById = async (req, res) => {
  try {
    const article = await Article.findById(req.params.id)
      .populate('author', 'name email role');

    if (!article) {
      return res.status(404).json({ message: 'Article non trouvé' });
    }

    res.status(200).json(article);
  } catch (err) {
    if (err.name === 'CastError') {
      return res.status(400).json({ message: 'Identifiant invalide' });
    }

    res.status(500).json({ message: err.message });
  }
};

const getMyArticles = async (req, res) => {
  try {
    const articles = await Article.find({ author: req.user._id })
      .populate('author', 'name email role');

    res.status(200).json(articles);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const createArticle = async (req, res) => {
  try {
    const { title, content } = req.body;

    if (!title || !content) {
      return res.status(400).json({
        message: 'Titre et contenu obligatoires'
      });
    }

    const newArticle = await Article.create({
      title,
      content,
      author: req.user._id
    });

    const populated = await newArticle.populate(
      'author',
      'name email role'
    );

    res.status(201).json(populated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateArticle = async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);

    if (!article) {
      return res.status(404).json({
        message: 'Article non trouvé'
      });
    }

    if (
      article.author.toString() !== req.user._id.toString() &&
      req.user.role !== 'admin'
    ) {
      return res.status(403).json({
        message: "Action interdite : vous n'êtes pas l'auteur de cet article"
      });
    }

    article.title = req.body.title || article.title;
    article.content = req.body.content || article.content;

    const updated = await article.save();

    const populated = await updated.populate(
      'author',
      'name email role'
    );

    res.status(200).json(populated);
  } catch (err) {
    if (err.name === 'CastError') {
      return res.status(400).json({
        message: 'Identifiant invalide'
      });
    }

    res.status(500).json({ message: err.message });
  }
};

const deleteArticle = async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);

    if (!article) {
      return res.status(404).json({
        message: 'Article non trouvé'
      });
    }

    if (
      article.author.toString() !== req.user._id.toString() &&
      req.user.role !== 'admin'
    ) {
      return res.status(403).json({
        message: "Action interdite : vous n'êtes pas l'auteur de cet article"
      });
    }

    await article.deleteOne();

    res.status(200).json({
      message: 'Article supprimé avec succès',
      id: req.params.id
    });
  } catch (err) {
    if (err.name === 'CastError') {
      return res.status(400).json({
        message: 'Identifiant invalide'
      });
    }

    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getAllArticles,
  getArticleById,
  getMyArticles,
  createArticle,
  updateArticle,
  deleteArticle
};
