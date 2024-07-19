var { Web3 } = require("web3");
const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const ethUtil = require('ethereumjs-util');
const crypto = require('crypto');
const passPhrase = '123456789+Ayoub';
const multer = require('multer');
const upload = multer();
const app = express();

app.use(upload.none());
app.use(bodyParser.json());
app.use(cors());
app.set('view engine', 'ejs');

const sequelize = require('./config/database');
const Users = require('./modules/Users');
const Wallets = require('./modules/Wallets');
const { INTEGER } = require("sequelize");

// Define associations
Users.hasOne(Wallets, {
  foreignKey: 'userId',
  sourceKey: 'user_id',
  as: 'wallet'
});

Wallets.belongsTo(Users, {
  foreignKey: 'userId',
  targetKey: 'user_id',
  as: 'user'
});

// Sync all models
(async () => {
  try {
    // console.log('Attempting to authenticate...');
    // await sequelize.authenticate();
    // console.log('Connection has been established successfully.');
    
    console.log('Attempting to sync Users model...');
    await Users.sync();
    console.log('Users model was synchronized successfully.');
    
    console.log('Attempting to sync Wallets model...');
    await Wallets.sync();
    console.log('Wallets model was synchronized successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();

var provider = "https://sepolia.infura.io/v3/6483579a38ee4626b9a67d15ca7fef2d";
// var web3Provider = new Web3(provider);
var web3 = new Web3(provider);

app.get('/api/balance/:address', async (req, res) => {
    const { address } = req.params;
    try {
        let balance = await web3.eth.getBalance(address);
        let b = web3.utils.fromWei(balance, 'ether');
        res.json({
            balance: b
        });
    } catch (error) {
        console.error('Error fetching balance:', error);
        res.status(500).json({ error: 'Failed to fetch balance' });
    }
});

app.get('/account', async (req, res) => {
    const user_Id = req.query.user_id;
    try {
        let wallet = await Wallets.findAll({
            where: {
                userId: user_Id
            }
        });
        if (wallet.length > 0) {
            res.json(wallet[0]);
        } else {
            res.status(404).json({ error: 'No wallet found for the given user_id' });
        }
    } catch (error) {
        console.error('Error fetching wallet:', error);
        res.status(500).json({ error: 'Failed to fetch wallet' });
    }
});

app.post('/AllData', async (req, res) => {
    try {
        let user = await Users.findAll({
            where: {
                username: req.body.logId,
                password_hash: req.body.password
            }
        });
        if (user.length > 0) {
            res.redirect(`/account?user_id=${user[0].user_id}`);
        }
        else
            res.status(404).json({ message: 'User not found' });
    } catch (error) {
        console.error("Error occurred: ", error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

app.post('/create-wallet', async(req, res) => {
    if (req.body.action === 'create_wallet') {
        const account = web3.eth.accounts.create();
        const privateKeyBuffer = Buffer.from(account.privateKey.slice(2), 'hex');
        const publicKey = ethUtil.privateToPublic(privateKeyBuffer).toString('hex');
        storeEncryptedPrivateKey(account.privateKey, account.address, publicKey);
            res.json({
                address: account.address,
                publicKey: publicKey,
                privateKey: account.privateKey
            });
    }
    else {
        res.status(400).json({ error: 'Invalid action' });
    }
});

app.post('/UserInfo', async(req, res) => {
    try {
        let newUser = await Users.create({
            username: req.body.LoginID,
            password_hash: req.body.password
        });
        console.log(newUser.user_id);
        console.log('Transaction committed successfully.000000000000000000000000000000000000000000');
        updateWalletWithUserId(newUser.user_id);
        res.redirect(`/account?user_id=${newUser.user_id}`);
    } catch (error) {
        console.error("Error creating user: ", error);
    }
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});

let wallet;

// Store encrypted private key in a file
async function storeEncryptedPrivateKey(encryptedPrivateKey, address, publicKey) {
    const key = crypto.scryptSync(passPhrase, 'salt', 32); // Derive key from passphrase (replace 'salt' with a unique value)
    const iv = crypto.randomBytes(16); // Generate IV (Initialization Vector)
    
    const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
    let encryptedData = cipher.update(encryptedPrivateKey, 'utf8', 'hex');
    encryptedData += cipher.final('hex');
    
    try {
        wallet = await Wallets.create({
            userId: 9999,
            encryptedPrivateKey: encryptedData,
            iv: iv.toString('hex'),
            address: address,
            publicKey: publicKey,
            balance: 0
        });
    } catch (error) {
        console.error("Couldn't create wallet", error);
    }

}

// Retrieve encrypted private key from file
async function getEncryptedPrivateKey(userId) {
    const wallet = await Wallets.findOne({where: {userId: userId}});
    if (wallet)
    {
        const iv = Buffer.from(wallet.iv, 'hex');
        const key = crypto.scryptSync(passPhrase, 'salt', 32); // Derive key from passphrase (replace 'salt' with a unique value)
        const encryptedData = wallet.encryptedPrivateKey;

        const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);
        let decryptedPrivateKey = decipher.update(encryptedData, 'hex', 'utf8');
        decryptedPrivateKey += decipher.final('utf8');

        return decryptedPrivateKey;
    }
    return null;
}

async function updateWalletWithUserId(userId) {
    try {
        wallet.update({userId: userId});
        await wallet.save();
        // console.log('Wallet updated with user ID:', wallet.toJSON());
    } catch (error) {
        console.error('Error updating wallet with user ID:', error);
        throw error;
    }
}

// WHEN I ADD LINE 38 THE BROWSER RELOADS ......................