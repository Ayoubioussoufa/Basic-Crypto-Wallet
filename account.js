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


document.addEventListener('DOMContentLoaded', async() => {
    // const urlParams = new URLSearchParams(window.location.search);
    // const username = urlParams.get('username');
    // console.log(username);
    try {
        fetch('http://localhost:8080/account')
        .then(response => response.json())
        .then(wallet => {
            document.getElementById("walletPublicKey").textContent = `Public Key: ${wallet.PublicKey}`;
            document.getElementById("walletPrivateKey").textContent = `Private Key: ${wallet.PrivateKey}`;
            document.getElementById("walletAddress").textContent = `Address: ${wallet.Address}`;
            document.getElementById("balance").textContent = `Balance: ${wallet.Balance}`;
        })
        .catch(error => console.error('Error fetching user data:', error));
    } catch (error) {
        console.error("Error : ", error);
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