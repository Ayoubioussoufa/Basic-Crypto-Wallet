var { Web3 } = require("web3");
const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const ethUtil = require('ethereumjs-util');
const fs = require('fs');
const crypto = require('crypto');

const filePath = './encrypted.txt';
const passPhrase = '123456789+Ayoub';

const app = express();

app.use(bodyParser.json());
app.use(cors());

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

app.post('/create-wallet', async(req, res) => {
    if (req.body.action === 'create_wallet') {
        const account = web3.eth.accounts.create();
        // walletData = {
            //     address: account.address,
            //     privateKey: account.privateKey
            // };
            const privateKeyBuffer = Buffer.from(account.privateKey.slice(2), 'hex');
            const publicKey = ethUtil.privateToPublic(privateKeyBuffer).toString('hex');
            // privateKey = await storeEncryptedPrivateKey(account.privateKey);
            res.json({
                address: account.address,
                publicKey: publicKey,
                privateKey: account.privateKey
            });
            // console.log(account.privateKey);
            // console.log("PRIVATE KEY :", getEncryptedPrivateKey());
        // res.send(walletData);
    }
    else {
        res.status(400).json({ error: 'Invalid action' });
    }
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});

// Store encrypted private key in a file
async function storeEncryptedPrivateKey(encryptedPrivateKey) {
    const key = crypto.scryptSync(passPhrase, 'salt', 32); // Derive key from passphrase (replace 'salt' with a unique value)
    const iv = crypto.randomBytes(16); // Generate IV (Initialization Vector)
    
    const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
    let encryptedData = cipher.update(encryptedPrivateKey, 'utf8', 'hex');
    encryptedData += cipher.final('hex');
    
    fs.writeFileSync(filePath, `${iv.toString('hex')}:${encryptedData}`);
    return { encryptedPrivateKey: encryptedPrivateKey };
}

// Retrieve encrypted private key from file
async function getEncryptedPrivateKey() {
    if (fs.existsSync(filePath)) {
        const data = fs.readFileSync(filePath, 'utf8');
        const parts = data.split(':');
        const iv = Buffer.from(parts[0], 'hex');
        const encryptedData = parts[1];

        const key = crypto.scryptSync(passPhrase, 'salt', 32); // Derive key from passphrase (replace 'salt' with a unique value)
        const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);
        let decryptedPrivateKey = decipher.update(encryptedData, 'hex', 'utf8');
        decryptedPrivateKey += decipher.final('utf8');

        return decryptedPrivateKey;
    }
    return null;
}