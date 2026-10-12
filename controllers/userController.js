let users = [
    { id: 1, name: 'Rihab', email: 'rihab@gmail.com', role: 'user' },
    { id: 2, name: 'Syrine', email: 'syrine.zmerli@polytechnicien.com', role: 'admin' }
];

let prochainId = 3;

const { estNonVide, estEmailValide } = require('../utils/validators');

const getAllUsers = (req, res) => {
    const { role } = req.query;
    let resultat = users;

    if (role) {
        resultat = users.filter(u => u.role === role);
    }

    res.status(200).json({
        total: resultat.length,
        users: resultat
    });
};

const getUserById = (req, res) => {
    const id = Number(req.params.id);
    const user = users.find(u => u.id === id);

    if (!user) {
        return res.status(404).json({
            error: `Utilisateur ${id} introuvable`
        });
    }

    res.status(200).json(user);
};

const createUser = (req, res) => {
    const { name, email, role } = req.body;

    if (!estNonVide(name) || !estEmailValide(email)) {
        return res.status(400).json({
            error: 'Un nom valide et un email valide sont obligatoires'
        });
    }

    const emailExiste = users.some(
        u => u.email.toLowerCase() === email.trim().toLowerCase()
    );

    if (emailExiste) {
        return res.status(400).json({
            error: 'Cet email existe déjà'
        });
    }

    const nouvelUtilisateur = {
        id: prochainId++,
        name: name.trim(),
        email: email.trim(),
        role: role || 'user'
    };

    users.push(nouvelUtilisateur);

    res.status(201).json({
        message: 'Utilisateur créé',
        user: nouvelUtilisateur
    });
};

const deleteUser = (req, res) => {
    const id = Number(req.params.id);
    const existe = users.some(u => u.id === id);

    if (!existe) {
        return res.status(404).json({
            error: `Utilisateur ${id} introuvable`
        });
    }

    users = users.filter(u => u.id !== id);

    res.status(200).json({
        message: `Utilisateur ${id} supprimé avec succès`
    });
};

module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    deleteUser
};