// Avaa rekisteröitymisdialogi
document.getElementById("register").addEventListener("click", function() {
    document.getElementById("register-dialog").style.display = "flex";
});

// Sulje rekisteröitymisdialogi
document.getElementById("close-register-dialog").addEventListener("click", function() {
    document.getElementById("register-dialog").style.display = "none";
});

// Avaa kirjautumisdialogi
document.getElementById("login").addEventListener("click", function() {
    document.getElementById("login-dialog").style.display = "flex";
});

// Sulje kirjautumisdialogi
document.getElementById("close-login-dialog").addEventListener("click", function() {
    document.getElementById("login-dialog").style.display = "none";
});
