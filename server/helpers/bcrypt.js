const bcrypt = require('bcryptjs');
const { Model } = require('sequelize');

const hashPassword = (password => {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    return hash
})

const comparePassword = (password, hash) => {
    return bcrypt.compareSync(password, hash)
}

module.exports = {hashPassword, comparePassword}
