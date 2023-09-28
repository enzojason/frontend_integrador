
let perfilButton = document.getElementById('perfilButton');
perfilButton.addEventListener('click', function() {
    window.location.href = 'profile.html'; 
});

document.getElementById('cerrar_sesion').addEventListener("click",function(){
      window.location.href="login.html";
});


//obtiene la imagen del usuario para asi mostrarla
fetch('http://127.0.0.1:5000/user/load_imagen',{
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

