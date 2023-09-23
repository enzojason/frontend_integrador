window.addEventListener('load', function () {
    getProfile();
});

//document.getElementById("logout").addEventListener("click", logout);

function getProfile() {
    document.getElementById("mostrar_datos").style.display="none";
    const token = localStorage.getItem('jwt-token');
    const url = 'http://127.0.0.1:5000/auth/profile';
    fetch(url, {
        method: 'GET',
        headers:{
            "Content-Type": "application/json",
            
            'Authorization': 'Bearer ' + token
        }
    })
    .then(response => {
        if (response.status === 200) {
            console.log("RESPUESTA OPTIMA")
            return response.json().then(data =>{
                document.getElementById("username").innerText = data.username;
                document.getElementById("email").innerText = data.email;
                document.getElementById("first_name").innerText = data.nombre_usuario;
                document.getElementById("last_name").innerText = data.apellido_usuario;
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

    fetch('http://127.0.0.1:5000/static/foto_de_perfil.png')
  .then(response => {
    if (response.ok) {
      return response.blob();
    } else {
      throw new Error('No se pudo obtener la imagen de perfil');
    }
  })
  .then(blob => {
    const url = URL.createObjectURL(blob);
    document.getElementById('imagenPerfil').src = url; 
    
  })
  .catch(error => console.error(error));
}
document.getElementById("logout").addEventListener("click",logout);

function logout() {
    /*
    const url = "http://127.0.0.1:5000/auth/logout";
    const token = localStorage.getItem('jwt-token');
    fetch(url, {
        method: 'POST',
        credentials: 'include',
        headers:{
            "Content-Type": "application/json",
            
            'Authorization': 'Bearer ' + token
        }
    })
    .then(response => {
        if (response.status === 200) {
            return response.json().then(data => {
                localStorage.removeItem('jwt-token');
                window.location.href = "login.html";
            });
        } else {
            return response.json().then(data => {
                document.getElementById("message").innerHTML = data.message;
            });
        }
    })
    .catch(error => {
        document.getElementById("message").innerHTML = "An error occurred.";
    });*/
    window.location.href = ("login.html");
}

document.getElementById("actualizar").addEventListener("click",updateProfile);
function updateProfile(){
    document.getElementById("mostrar_perfil").style.display="none";
    document.getElementById("mostrar_datos").style.display="block";

    document.getElementById("save").addEventListener("click",saveProfile);

    document.getElementById("cancel").addEventListener("click",volver);
    function volver(){
        window.location.href = "profile.html";
    };
    function saveProfile(){
        let data = {};
        const token = localStorage.getItem('jwt-token');
        
        //verifica si hay que hacer cambios en username
        const inputUsername=document.getElementById('username_nuevo').value;
        if (inputUsername==''){

        } else {    
            data.username=inputUsername;
        };

        //verifica si hay que hacer cambios en  contrasena
        const inputContrasena=document.getElementById('contrasena_nueva').value;
        if (inputContrasena==''){
            
        } else {
            data.contrasena=inputContrasena;
        };
        //verifica si hay que hacer cambios en nombre nuevo
        const inputNombrenuevo=document.getElementById('nombre_nuevo').value;
        if (inputNombrenuevo==''){
            
        } else {
            data.nombre_usuario=inputNombrenuevo;
        };

        //verifica si hay que hacer cambios en apellido
        const inputApellidonuevo=document.getElementById('apellido_nuevo').value;
        if (inputApellidonuevo==''){

        } else {
            data.apellido_usuario=inputApellidonuevo;
        };

        //verifica si hay que hacer cambios en apellido
        const inputEmailnuevo=document.getElementById('email_nuevo').value;
        if (inputEmailnuevo==''){

        } else {
            data.email=inputEmailnuevo;
        };
        if (Object.keys(data).length !== 0){
            console.log("DATA ",data);
            fetch("http://127.0.0.1:5000/auth/update", {
             method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(data),
                credentials: 'include'
            })
            .then(response =>{
                console.log(data);
                window.alert("Datos de Usuario Actualizados");
                window.location.href = "home.html";
            } )
            .catch(error => {
                document.getElementById("message").innerHTML = "An error occurred.";
            });
            
        } else {
            document.getElementById("message_ad").innerHTML = "Hay campos vacios.";
        }
}}