import { sharedState } from './shared.js';

document.addEventListener('DOMContentLoaded', () => {
    const test = document.getElementById('t');
    if (test) {
        test.addEventListener('click', () => {
            console.log(sharedState.Address, sharedState.PublicKey, sharedState.Balance);
            setD('rrr', 'rrre', 9999);
            console.log(sharedState.Address, sharedState.PublicKey, sharedState.Balance);
            window.location.href = 'hh.html';
        });
    }

    // Load state from localStorage
    const storedState = localStorage.getItem('sharedState');
    if (storedState) {
        Object.assign(sharedState, JSON.parse(storedState));
    }
});

function setD(address, publicKey, balance) {
    sharedState.Address = address;
    sharedState.PublicKey = publicKey;
    sharedState.Balance = balance;
    localStorage.setItem('sharedState', JSON.stringify(sharedState));
}

// export function getD() {
//     return sharedState;
// }
