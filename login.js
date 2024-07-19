document.addEventListener('DOMContentLoaded', () => {
    let logIn = document.getElementById("logIn");
    if (logIn) {
        logIn.addEventListener('submit', async function(event) {
            event.preventDefault();
            let form = new FormData(this);
            try {
                let response = await fetch('http://localhost:8080/AllData', {
                    method: 'POST',
                    body: form 
                 });
                 let r = await response.json();
                // console.log(r);
                if (response.redirected) {
                    // Redirected means server responded with a redirect
                    window.location.href = `./account.html?user_id=${r.userId}`; // Redirect to the new page
                }
                else
                    alert("Your account is not in our database, please create an account");
                console.log(response.status);
            } catch (error) {
                console.error("Error : ", error);
            }
        });
    }
});