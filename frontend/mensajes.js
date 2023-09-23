var select_canales=document.getElementById("lista_canales");

select_canales.addEventListener("change",function(){
        //se ejecuta cuando elegimos una opcion de la lista de canales
        document.getElementById("contenedor_chat").style.display="block";
        document.getElementById("mensaje_main_chat").style.display="none";
        var opcion_seleccionada_canal = select_canales.options[select_canales.selectedIndex];
        console.log("canal:", opcion_seleccionada_canal.text);
        document.getElementById("enviar_mensaje").addEventListener("click",enviarmensaje);

        //obtiene todos los mensajes de un canal
        const token = localStorage.getItem('jwt-token');
        nombre_canal= opcion_seleccionada_canal.text;
        fetch(`http://127.0.0.1:5000/canal/${nombre_canal}`, {
                method: 'GET',
                    headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                    },
                    credentials: 'include'
        })
        .then(response => {
                if (response.status===200){return response.json().then(data => {
                mostrar_mensajes(data);
                });
            } else {
                console.log("NO HAY MENSAJES")
                document.getElementById("mensaje_main_chat").style.display="block";
                document.getElementById("mensaje_main_chat").innerHTML = data.message;
            }
                
                });
            
        });


function enviarmensaje(){
        //se envia el mensaje escrito
        const token = localStorage.getItem('jwt-token');
        mensaje=document.getElementById("mensaje_nuevo").value;
        nombre_canal= opcion_seleccionada_canal.text;

        fetch(`http://127.0.0.1:5000/canal/${nombre_canal}/${mensaje}`, {
        method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
            },
            credentials: 'include'
        });     

}

function mostrar_mensajes(data){
    //muestra los mensajes en el chat, se crea un nuevo elemento y se le asigna el id, a cada mensaje
    data.forEach(element => {
        console.log("ELEMENT ",element.mensaje);
        let e_mensaje=document.createElement("div");
        e_mensaje.innerHTML=`(${element.hora})<b style="font-size:20px;">${element.username}</b>:${element.mensaje}`;

        //asigna un id al nuevo elemento creado
        e_mensaje.id=element.id_mensaje;
        console.log("ID MENSJAE ",element.id_mensaje);
        document.getElementById("chat").appendChild(e_mensaje);

        // Crea un nuevo botón con la imagen
        let btn_imagen = document.createElement("button");
        btn_imagen.id = "btn_mensaje_imagen";
        btn_imagen.innerHTML = '<img src="assets/flecha-hacia-abajo-para-navegar.png" width=3px>';

        // Agrega el botón al lado del mensaje
        e_mensaje.appendChild(btn_imagen);
        
    });
}