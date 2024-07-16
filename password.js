// import { getWalletData } from "./shared.js";
// import { tt } from "./browser.js";

document.addEventListener('DOMContentLoaded', () => {
    // let { Address, PublicKey, Balance } = getWalletData();
    // console.log(Address, PublicKey, Balance);
    // console.log('Setting wallet data:', tt.Address, tt.PublicKey, tt.Balance);
    let userName = document.getElementById('LoginID');
    let firstPassword = document.getElementById('password1');
    let secondPassword = document.getElementById('password2');
    let submit = document.getElementById('passwordForm');
    if (submit) { //3mrt l form daba, khass nsiftm, endpoint on3mr
        submit.addEventListener('submit', async function(event) {
            event.preventDefault(); // Prevent the form from submitting and reloading the page
            let form = new FormData(this);
            console.log(form.get('LoginID'));
            console.log(form.get('password'));
            console.log(form);
            // setTimeout(() => {}, 5000);
            if (firstPassword.value === secondPassword.value) {
                let response = await fetch('http://127.0.0.1:8080/UserInfo', {
                    method: 'POST',
                    // headers: {
                    //     'Content-Type' : 'application/json'
                    // }, //not needed when using FormData that is a builtin
                    body: form
                });
                if (response.ok) {
                    window.location.href = './account.html';
                }
            }
            else {
                alert('Passwords do not match. Please try again.');
            }
            console.log('wwwwwwwwwwwwwwwww');
        });
    }
});
