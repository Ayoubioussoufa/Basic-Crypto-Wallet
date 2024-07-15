import { sharedState } from "./shared.js";

document.addEventListener('DOMContentLoaded', () => {
    let createButton = document.getElementById("creation");
    if (createButton) {
        createButton.addEventListener('click', async (event) => {
            event.preventDefault();
            try{
                const response =  await fetch('http://127.0.0.1:8080/create-wallet', {
                    method: 'POST',
                    headers: {
                        'Content-type': 'application/json'
                    },
                    body: JSON.stringify({ action: 'create_wallet' })
                });
                if (response.ok) {
                    // window.location.href = 'password.html';
                    const walletData = await response.json();
                    console.log("Response Success", walletData);
                    // Display the wallet data
                    // Address = `Address: ${walletData.address}`;
                    // PublicKey = `Public Key: ${walletData.publicKey}`;
                    // document.getElementById('walletPrivateKey').textContent = `Private Key: ${walletData.privateKey}`;
                    const address = walletData.address;
                    try {
                        const response2 = await fetch(`http://127.0.0.1:8080/api/balance/${address}`);
                        const data = await response2.json();
                        console.log(data.balance);
                        // const balanceResult = document.getElementById('balance');
                        const number = parseFloat(data.balance);
                        // Balance = `Balance: ${number} ETH`;
                        // console.log(typeof number, typeof walletData.address, typeof walletData.publicKey);
                        const publicKey = walletData.publicKey;
                        setWalletData(address, publicKey, number);
                        console.log('Data set successfully in browser.js');
                        setTimeout(() => { window.location.href = 'password.html' }, 5000);
                    } catch (error) {
                        console.error('Error fetching balance:', error);
                        const balanceResult = document.getElementById('balanceResult');
                        balanceResult.textContent = 'Error fetching balance';
                    }
                } else {
                    console.error('response not OK', response);
                }
            }
            catch(e){
                console.log(e);
            }
        });
    } else {
        console.error('Element with ID "creation" not found.');
    }
});

function setWalletData(address, publicKey, balance) {
    console.log('Setting wallet data:', address, publicKey, balance);
    sharedState.Address = address;
    sharedState.PublicKey = publicKey;
    sharedState.Balance = balance;
    console.log('NMIIIIIIIIIIIIIIICE:', sharedState.Address, sharedState.PublicKey, sharedState.Balance);
}
