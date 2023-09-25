
let perfilButton = document.getElementById('perfilButton');
perfilButton.addEventListener('click', function() {
    window.location.href = 'profile.html'; 
});

//obtiene la imagen del usuario para asi mostrarla
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
    document.getElementById('imagen_perfil_columna_derecha').src = url;
    
  })
  .catch(error => console.error(error));

//obtiene los datos del usuario
fetch('http://127.0.0.1:5000/auth/profile', {
    method: 'GET',
    headers:{
        "Content-Type": "application/json",
        
        'Authorization': 'Bearer ' + token
    }
})
.then(response => {
    if (response.status === 200) {
        return response.json().then(data =>{
            document.getElementById("username_columna_derecha").innerText = data.username;
            document.getElementById("nombre_columna_derecha").innerText = data.nombre_usuario;
            document.getElementById("apellido_columna_derecha").innerText =data.apellido_usuario ;
            document.getElementById("email_columna_derecha").innerText = data.email;
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