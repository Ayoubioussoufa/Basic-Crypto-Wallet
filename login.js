document.addEventListener('DOMContentLoaded', () => {
    let logIn = document.getElementById("logIn");
    if (logIn) {
        logIn.addEventListener('submit', async function(event) {
            event.preventDefault();
            let form = new FormData(this);
            console.log(form.get("logId"));
            console.log(form.get("password"));
            try {
                let response = await fetch('http://localhost:8080/AllData', {
                    method: 'POST',
                    body: form 
                 });
                console.log(response.status);
                if (response.ok){
                    window.location.href = './account.html';
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