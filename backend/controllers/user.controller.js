const User = require("../models/user.model");

async function getUsers(req, res) {
    try {

        const users = await User.getAllUsers();

        res.status(200).json(users);

    } catch (err) {
    console.error(err);

    res.status(500).json({
        message: err.message
    });
}
}

module.exports = {
    getUsers
};