var select_canales=document.getElementById("lista_canales");


select_canales.addEventListener("change",function(){
        //se ejecuta cuando elegimos una opcion de la lista de canales
        document.getElementById("contenedor_chat").style.display="block";
        var opcion_seleccionada_canal = select_canales.options[select_canales.selectedIndex];

        document.getElementById("enviar_mensaje").addEventListener("click",enviarmensaje);
        document.getElementById("imagen_main_canal").style.display="block";
        let chat_div = document.getElementById("chat");
        while (chat_div.firstChild) {
            chat_div.removeChild(chat_div.firstChild);
        };
        

        //obtiene todos los mensajes de un canal
        nombre_canal= opcion_seleccionada_canal.value;
        localStorage.setItem('canal_seleccionado',nombre_canal);


        const token = localStorage.getItem('jwt-token');
        fetch(`http://127.0.0.1:5000/message/${nombre_canal}`, {
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
                    document.getElementById("descripcion_main_canal").innerHTML = `Descripcion:  ${data.descripcion}`;
                    document.getElementById("titulo_main_canal").innerHTML = `${data.nombre_canal}`;
                    //document.getElementById("fecha_creacion_main_canal").innerHTML = `Fecha de creacion: ${data.fecha_creacion}`;
                });
            } else {
                p=document.createElement("p");
                chat_div.appendChild(p);
                p.innerHTML="-----No hay mensajes-----";
                return response.json().then(data => {
                    document.getElementById("titulo_main_canal").innerHTML = data.nombre_canal;
                    document.getElementById("descripcion_main_canal").innerHTML = data.descripcion;
                
                });
                
            }              
                });
        });


function enviarmensaje(){
        //se envia el mensaje escrito
        const token = localStorage.getItem('jwt-token');
        mensaje=document.getElementById("mensaje_nuevo").value;
        nombre_canal= localStorage.getItem("canal_seleccionado");

        fetch(`http://127.0.0.1:5000/message/${nombre_canal}/${mensaje}`, {
        method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
            },
            credentials: 'include'
        })
        .then(response => {
            if (response.status===200){return response.json().then(data => {
            actualizar_mensajes();
           
            });
        }
            
            });

    document.getElementById("mensaje_nuevo").value=" ";
        

}

function mostrar_mensajes(data){
    //elimina los hijos del div chat, existentes
    let chat_div = document.getElementById("chat");
        while (chat_div.firstChild) {
            chat_div.removeChild(chat_div.firstChild);
        };

    //muestra los mensajes en el chat, se crea un nuevo elemento y se le asigna el id, a cada mensaje
    data.mensajes.forEach(element => {
        let e_mensaje=document.createElement("div");
        e_mensaje.innerHTML=`(${element.hora})<b style="font-size:20px;">${element.username}</b>:${element.mensaje}`;

        //asigna un id al nuevo elemento creado,y añade al div chat, otro elemento
        e_mensaje.id=element.id_mensaje;
        document.getElementById("chat").appendChild(e_mensaje);

        // Crea un nuevo botón con la imagen
        let btn_imagen = document.createElement("button");
        btn_imagen.id = "btn_mensaje_imagen";
        btn_imagen.innerHTML = '<img src="assets/flecha-hacia-abajo-para-navegar.png" width=3px>';

        // Agrega el botón al lado del mensaje
        //e_mensaje.appendChild(btn_imagen);
        
        //coloca la scroll bar al ultimo
        chat_div.scrollTop=chat_div.scrollHeight;
        document.getElementById("mensaje_nuevo").focus();

        //se actualizan los mensajes automaticamente cada 10 segundso
        
    });
}

function actualizar_mensajes(){
    let chat_div = document.getElementById("chat");
        while (chat_div.firstChild) {
            chat_div.removeChild(chat_div.firstChild);
        };
    //actualiza los mensajes de un canal
    
    //obtiene todos los mensajes de un canal
    const token = localStorage.getItem('jwt-token');
    nombre_canal= localStorage.getItem('canal_seleccionado') ;
    fetch(`http://127.0.0.1:5000/message/${nombre_canal}`, {
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

            p=document.createElement("p");
            p.innerHTML="-----No hay mensajes-----";
            chat_div.appendChild(p);
        }
            
            });
    //coloca la scroll bar al ultimo
    chat_div.scrollTop=chat_div.scrollHeight;
    document.getElementById("mensaje_nuevo").focus();
}


setInterval(() => {
    actualizar_mensajes();
    console.log("actualizando...");
    //20segundos
}, 20000);


