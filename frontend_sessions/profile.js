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
    .then(function(response) {
        return response.json();
    }).then(function(){
        document.getElementById("username").innerText = data.username;
                document.getElementById("email").innerText = data.email;
                document.getElementById("first_name").innerText = data.nombre_usuario;
                document.getElementById("last_name").innerText = data.apellido_usuario;
    });
        

    fetch('http://127.0.0.1:5000/auth/load_imagen',{
            method: 'GET',
            headers:{
                "Content-Type": "application/json",
                'Authorization': 'Bearer ' + token
            }
    })
    .then(response => {
    if (response.ok) {
        
      return response.blob();
      
    } else{
        console.log("error en la solicitud de imagen");
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
    window.location.href = ("home.html");
}

document.getElementById("actualizar").addEventListener("click",updateProfile);
function updateProfile(){
    document.getElementById("titulo").innerHTML="Actualizar Datos";
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

        const nueva_imagen = document.getElementById("nueva_imagen");
        const file_imagen=nueva_imagen.files[0];
        if (file_imagen){
            const blob = new Blob([file_imagen], { type: file_imagen.type });
            fetch("http://127.0.0.1:5000/auth/update_imagen", {
             method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
                },
                body:blob,
                credentials: 'include'
            })
        }

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