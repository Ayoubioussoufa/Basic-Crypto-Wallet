document.addEventListener('DOMContentLoaded', () => {
    let logIn = document.getElementById("logIn");
    if (logIn) {
        logIn.addEventListener('submit', async function(event) {
            event.preventDefault();
            let form = new FormData(this);
            // console.log(form.get("logId"));
            // console.log(form.get("password"));
            try {
                let response = await fetch('http://localhost:8080/AllData', {
                    method: 'POST',
                    body: form 
                 });
                // console.log("---------2");
                // console.log("REPONSE : ::: " , response.status);
                // // console.log("REPONSE : ::: " , response.);
                // console.log(response);
                // console.log(response.userId);
                // console.log(response.encryptedPrivateKey);
                // console.log(response.address);
                if (response.redirected) {
                    // Redirected means server responded with a redirect
                    window.location.href = "./account.html"; // Redirect to the new page
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