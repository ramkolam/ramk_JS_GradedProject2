
if (sessionStorage.getItem('loggedIn')) {
    window.location.href = 'resume.html';
}

function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (username === "admin" && password === "admin") {
        window.location.href="resume.html";        
    } else {
        document.getElementById('login-error').textContent = "Invalid username/password";
    }
}
// Prevent back button
window.onpopstate = function (event) {
    if (document.getElementById('resume-page').style.display === 'block') {
        history.pushState(null, null, location.href);
    }
};
