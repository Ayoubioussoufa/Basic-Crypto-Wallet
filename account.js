import { sharedState } from "./shared.js";

// document.addEventListener('DOMContentLoaded', () => {

//     const storedState = localStorage.getItem('sharedState');
//     if (storedState) {
//         Object.assign(sharedState, JSON.parse(storedState));
//     }

//     // document.getElementById("walletPublicKey").textContent = `Public Key: ${sharedState.PublicKey}`;
//     // document.getElementById("walletPrivateKey").textContent = `Private Key: ${sharedState.PrivateKey}`;
//     // document.getElementById("walletAddress").textContent = `Address: ${sharedState.Address}`;
//     // document.getElementById("balance").textContent = `Balance: ${sharedState.Balance}`;

//     let reveal = document.getElementById('revealPrivateKeyBtn');
//     reveal.addEventListener('click', () => {
//         if (document.getElementById('privateKey').style.display == 'none')
//             document.getElementById('privateKey').style.display = 'block';
//         else
//         document.getElementById('privateKey').style.display = 'none';
//     });
// });


document.addEventListener('DOMContentLoaded', async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const userId = urlParams.get('user_id');
    if (!userId) {
        console.error('No user_id found in the query parameters.');
        return;
    }

    try {
        const response = await fetch(`http://localhost:8080/account?user_id=${userId}`);
        if (!response.ok) {
            throw new Error('Failed to fetch user data');
        }

        const wallet = await response.json();
        document.getElementById("walletPublicKey").textContent = `Public Key: ${wallet.publicKey}`;
        document.getElementById("walletPrivateKey").textContent = `Private Key: ${wallet.encryptedPrivateKey}`;
        document.getElementById("walletAddress").textContent = `Address: ${wallet.address}`;
        document.getElementById("balance").textContent = `Balance: ${wallet.balance}`;
    } catch (error) {
        console.error('Error fetching user data:', error);
    }



    // document.getElementById("walletPublicKey").textContent = `Public Key: ${sharedState.PublicKey}`;
    // document.getElementById("walletPrivateKey").textContent = `Private Key: ${sharedState.PrivateKey}`;
    // document.getElementById("walletAddress").textContent = `Address: ${sharedState.Address}`;
    // document.getElementById("balance").textContent = `Balance: ${sharedState.Balance}`;

    let reveal = document.getElementById('revealPrivateKeyBtn');
    reveal.addEventListener('click', () => {
        if (document.getElementById('privateKey').style.display == 'none')
            document.getElementById('privateKey').style.display = 'block';
        else
        document.getElementById('privateKey').style.display = 'none';
    });
});