import { sharedState } from "./shared.js";

document.addEventListener('DOMContentLoaded', () => {
    // let { Address, PublicKey, Balance } = getWalletData();
    document.getElementById("walletPublicKey").textContent = `Public Key: ${sharedState.PublicKey}`;
    document.getElementById("walletAddress").textContent = `Address: ${sharedState.Address}`;
    document.getElementById("balance").textContent = `Balance: ${sharedState.Balance}`;
});

// function getWalletData() {
//     return sharedState;
// }