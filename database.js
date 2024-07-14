// sequelize: ORM (Object Relational Mapper) for Node.js, it abstracts SQL queries into javascript objects and methods, making it easier to interact with the database

// pg : PostgreSQL client for Node.js, it allows you to connect to a PostgreSQL database and perform queries

let {Sequelize, DataTypes} = require('sequelize');

const sequelize = new Sequelize('database', 'aybiouss', '12345', {
    host: 'localhost',
    dialect: 'postgres',
    logging: false
});

const wallet = sequelize.define('Wallet', {
    userId: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    encryptedPrivateKey: {
        type: DataTypes.STRING,
        allowNull: false
    },
    iv: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

(async() => {
    await sequelize.sync();
    console.log('DataBase & tables created !');
})();

module.exports = {sequelize, wallet};