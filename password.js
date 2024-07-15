// import { getWalletData } from "./shared.js";
// import { tt } from "./browser.js";

document.addEventListener('DOMContentLoaded', () => {
    // let { Address, PublicKey, Balance } = getWalletData();
    // console.log(Address, PublicKey, Balance);
    // console.log('Setting wallet data:', tt.Address, tt.PublicKey, tt.Balance);
    let firstPassword = document.getElementById('password1');
    let secondPassword = document.getElementById('password2');
    let submit = document.getElementById('submit');
    if (submit) {
        submit.addEventListener('click', (event) => {
            event.preventDefault(); // Prevent the form from submitting and reloading the page
            console.log(firstPassword.value === secondPassword.value);
            if (firstPassword.value === secondPassword.value) {
                window.location.href = './account.html';
            }
            else {
                alert('Passwords do not match. Please try again.');
            }
            console.log('wwwwwwwwwwwwwwwww');
        });
    }
});
