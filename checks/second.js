// import { getD } from './first.js';
import { sharedState } from './shared.js';

document.addEventListener('DOMContentLoaded', () => {
    console.log(sharedState.Address, sharedState.PublicKey, sharedState.Balance);
    
    // const g = getD();
    // document.getElementById("walletPublicKey").textContent = `Public Key: ${sharedState.PublicKey}`;
    // document.getElementById("walletAddress").textContent = `Address: ${sharedState.Address}`;
    // document.getElementById("balance").textContent = `Balance: ${sharedState.Balance}`;

    // Load state from localStorage
    const storedState = localStorage.getItem('sharedState');
    if (storedState) {
        Object.assign(sharedState, JSON.parse(storedState));
    }
    document.getElementById("walletPublicKey").textContent = `Public Key: ${sharedState.PublicKey}`;
    document.getElementById("walletAddress").textContent = `Address: ${sharedState.Address}`;
    document.getElementById("balance").textContent = `Balance: ${sharedState.Balance}`;
});
