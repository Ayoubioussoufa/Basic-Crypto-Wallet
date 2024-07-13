document.addEventListener('DOMContentLoaded', () => {
    let createButton = document.getElementById("creation");
    
    if (createButton) {
        createButton.addEventListener('click', async () => {
            // event.preventDefault();
            try{
                const response =  await fetch('http://127.0.0.1:8080/create-wallet', {
                    method: 'POST',
                    headers: {
                        'Content-type': 'application/json'
                    },
                    body: JSON.stringify({ action: 'create_wallet' })
                });
                if (response.ok) {
                    const walletData = await response.json();
                    console.log("Response Success", walletData);
                    // Display the wallet data
                    document.getElementById('walletAddress').textContent = `Address: ${walletData.address}`;
                    document.getElementById('walletPublicKey').textContent = `Public Key: ${walletData.publicKey}`;
                    document.getElementById('walletPrivateKey').textContent = `Private Key: ${walletData.privateKey}`;
                    const address = walletData.address;
                    try {
                        const response2 = await fetch(`http://127.0.0.1:8080/api/balance/${address}`);
                        const data = await response2.json();
                        console.log(data.balance);
                        const balanceResult = document.getElementById('balance');
                        let number = parseFloat(data.balance);
                        balanceResult.textContent = `Balance: ${number} ETH`;
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
        console.error('Element with ID "create" not found.');
    }
});