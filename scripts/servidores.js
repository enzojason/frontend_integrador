//document.getElementById("contendor_crear_serv").style.display="none";
//document.getElementById("contenedor_unirse_serv").style.display="none";
nombre_usuario =localStorage.getItem('nombre_usuario');
document.getElementById("nombre_usuario").innerHTML = nombre_usuario;
document.getElementById("crear_servidor").addEventListener("click",create_servidor);
document.getElementById("unirse_servidor").addEventListener("click",unirse_servidor);
document.getElementById("buscar_servidor").addEventListener("click",buscar_servidor);
//conseguir los datos del usuario logueando

const token = localStorage.getItem('jwt-token');
    const url = 'http://127.0.0.1:5000/server/my_servers';
    fetch(url, {
        method: 'GET',
        headers:{
            "Content-Type": "application/json",
            'Authorization': 'Bearer ' + token
        }
    })
    .then(response => { 
        if (response.status === 200) {
            return response.json().then(data =>{
                mostrar_servidores(data.servidores);
            }) ;
        } else{
            return response.json().then(data => {
                comprobar_servidores();
            });
        }
    });

let select_servidores=document.getElementById("lista_servidores");

function mostrar_servidores(servidores){
    servidores.forEach(element => {
    let nueva_opcion = document.createElement("option");
    nueva_opcion.text=element ;
    nueva_opcion.value = `value_${element}`;
    select_servidores.add(nueva_opcion);
    });
}

    
window.addEventListener("load", comprobar_servidores);
function comprobar_servidores() {
    //carga al principio de la pagina y verifica si no hay seleccionado
    
    if (select_servidores.selectedIndex === -1) {
        document.getElementById("titulo_main").innerHTML = `Bienvenidx ${nombre_usuario}`
        document.getElementById("mensaje_main").innerHTML = "-------------No hay servidores seleccionados-------------<br><br>------------- cree uno o unase a uno existente-------------";
    }
  }

var selectServidores = document.getElementById("lista_servidores");
selectServidores.addEventListener("change", function() {
    document.getElementById("mensaje_main").style.display ="none";
    //obtener el servidor seleccionado en la lista Servidores 
        let opcionSeleccionada = selectServidores.options[selectServidores.selectedIndex];
        localStorage.setItem('servidor_seleccionado',opcionSeleccionada.text)
    document.getElementById("titulo_main").innerHTML=`Servidor: ${opcionSeleccionada.text}`;

});

function create_servidor() {
    //muestra la seccion de crear servidor
    document.getElementById("contenedor_crear_serv").style.display="block";
    document.getElementById("contenedor_unirse_serv").style.display="none";
    document.getElementById("contenedor_crear_canal").style.display="none";
    document.getElementById("contenedor_buscar_serv").style.display="none";
    document.getElementById("contenido").style.display="none";
    document.getElementById("nombre_servidor").focus();
    document.getElementById("crear_serv").addEventListener("click",crear);
    document.getElementById("cancel_c").addEventListener("click",cancel);
    function cancel(){
        document.getElementById("contenido").style.display="block";
    }
    
}
    function crear(){
        //Crea un servidor, enviando los datos a la Api method POST
        const token = localStorage.getItem('jwt-token');
        nombre_servidor=document.getElementById("nombre_servidor").value;
        fetch(`http://127.0.0.1:5000/server/create/${nombre_servidor}`, {
            method: 'POST',
               headers: {
               'Content-Type': 'application/json',
               'Authorization': `Bearer ${token}`
               },
               credentials: 'include'
           })
           .then(response => {
            if (response.status === 200) {
                return response.json().then(data => {
                window.alert("Servidor Creado con éxito");
                window.location.href = "home.html";
            });
        }
        });
    }

function unirse_servidor() {
    //muestra la seccion de unirse a un servidor
    document.getElementById("contenedor_unirse_serv").style.display="block";
    document.getElementById("contenedor_crear_serv").style.display="none";
    document.getElementById("contenedor_buscar_serv").style.display="none";
    document.getElementById("contenido").style.display="none";
    document.getElementById("contenedor_crear_canal").style.display="none";
    document.getElementById("nombre_servidor_unirse").focus();
    

    document.getElementById("unir_serv").addEventListener("click",unirse);
    document.getElementById("cancel_u").addEventListener("click",cancel);
    function cancel(){
        document.getElementById("contenido").style.display="block";
    }
}
function unirse(){
    //se une a un servidor, enviando los datos a la API method POST
    const token = localStorage.getItem('jwt-token');
    nombre_servidor_unirse=document.getElementById("nombre_servidor_unirse").value;
    fetch(`http://127.0.0.1:5000/server/join/${nombre_servidor_unirse}`, {
        method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
            },
            credentials: 'include'
        })
        .then(response => {
        if (response.status === 200) {
            return response.json().then(data => {
                window.alert("Te has unido con éxito al servidor");
                window.location.href = "home.html"
        })
        
        } else if (response.status === 404) {
            return response.json().then(data => {
            document.getElementById("message_unirse").style.display="block"
            document.getElementById("message_unirse").innerHTML = data.message;
            document.getElementById("nombre_servidor_unirse").value = "";
            document.getElementById("nombre_servidor_unirse").focus();
            
            setTimeout(() => {
                document.getElementById("message_unirse").innerHTML = "";
            }, 5000);
        });
    }
});
}

function buscar_servidor(){
    //muestra la seccion de unirse a un servidor

    document.getElementById("contenedor_buscar_serv").style.display="block";
    document.getElementById("contenedor_unirse_serv").style.display="none";
    document.getElementById("contenedor_crear_serv").style.display="none";
    document.getElementById("contenido").style.display="none";
    document.getElementById("contenedor_crear_canal").style.display="none";
    document.getElementById("nombre_servidor_unirse").focus();
    
    document.getElementById("buscar").addEventListener("click",buscar);
    document.getElementById("cancel_b").addEventListener("click",cancel);


    function cancel(){
        document.getElementById("contenido").style.display="block";
        window.location.href="home.html";
    }
}
function buscar(){
    //busca un servidor segun el nombre previsto en el input
    const token = localStorage.getItem('jwt-token');
    nombre=document.getElementById("nombre_servidor_buscar").value;
    fetch(`http://127.0.0.1:5000/server/search/${nombre}`, {
        method: 'GET',
            headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
            },
            credentials: 'include'
        })
        .then(response => {
        if (response.status === 200) {
            return response.json().then(data => {
                mostrar_resultado(data.servidores);
        })
        
        } else if (response.status === 404) {
            return response.json().then(data => {
                document.getElementById("mensaje_buscar").innerHTML=data.message;
                setTimeout(() => {
                    document.getElementById("mensaje_buscar").innerHTML = "";
                }, 5000);
        });
    }
});
}

function mostrar_resultado(data){
    
    //agrega filas de los resultados a la tabla
    div_resultado=document.getElementById("resultado");
    data.forEach(element => {
        fila = document.getElementById("tabla_servidores").insertRow();
        fila.insertCell(0).innerHTML = element.nombre_servidor;
        fila.insertCell(1).innerHTML = element.cantidad_usuarios;
    });
}

