document.getElementById("registerForm").style.display="none";
document.getElementById("username").focus();
document.getElementById("btn_cancel").addEventListener("click",cancelar);

function cancelar(){
    window.location.href="login.html"
}

document.getElementById("loginForm").addEventListener("submit", function (event) {
    event.preventDefault();
    login();
});

function login() {
    let data = { 
        username: document.getElementById("username").value,
        contrasena: document.getElementById("password").value,
    };

    fetch("http://127.0.0.1:5000/auth/login", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },  
        body: JSON.stringify(data),
        credentials: 'include'
    })
    .then(response => {
        if (response.status === 200) {
            return response.json().then(data => {
            localStorage.setItem('jwt-token', data.token);
            localStorage.setItem('nombre_usuario',document.getElementById("username").value);
            console.log('token ',data.token)
            console.log('Inicio de sesión exitoso');
            window.location.href = "home.html";
        });
    } else {
        return response.json().then(data => {
            document.getElementById("message").innerHTML = data.message;
        });
        }
    })
    .catch(error => {
        document.getElementById("message").innerHTML = "An error occurred.";
    });
}

document.getElementById("register").addEventListener("click", register);


function register(){
    
    document.getElementById("loginForm").style.display="none";
    document.getElementById("registerForm").style.display="block";
    document.getElementById("titulo").textContent="Register";
    button=document.getElementById('btn');
    
    button.addEventListener("click",register_user)

    function register_user(){
    let data = {
        username: document.getElementById("username_").value,
        contrasena: document.getElementById("contrasena_").value,
        email: document.getElementById("email").value,
        nombre: document.getElementById("nombre").value,
        apellido: document.getElementById("apellido").value
    };

    fetch("http://127.0.0.1:5000/auth/register", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
        credentials: 'include'
    })
    .then(response =>{
        if (response.status === 201) {
            return response.json().then(data => {
                window.alert("Usuario creado");
                window.location.href = "login.html";
        });
        }
        
    } )
    .catch(error => {
        document.getElementById("message").innerHTML = "An error occurred.";
    });
    
    }
}
document.querySelector('.pelota').addEventListener('click', function() {
    this.style.animation = 'none';
    setTimeout(() => {
        this.style.animation = 'rebote 15s infinite';
    }, 0);
});