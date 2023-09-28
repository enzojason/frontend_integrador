var select_canales=document.getElementById("lista_canales");


select_canales.addEventListener("change",function(){
        //se ejecuta cuando elegimos una opcion de la lista de canales
        document.getElementById("contenedor_chat").style.display="block";

        var opcion_seleccionada_canal = select_canales.options[select_canales.selectedIndex];
        var id_canal= opcion_seleccionada_canal.value;
        window.id_canal = id_canal;

        document.getElementById("enviar_mensaje").addEventListener("click",enviarmensaje);
        
        document.getElementById("imagen_main_canal").style.display="block";
        let chat_div = document.getElementById("chat");
        while (chat_div.firstChild) {
            chat_div.removeChild(chat_div.firstChild);
        };
        

        //obtiene todos los mensajes de un canal
        const token = localStorage.getItem('jwt-token');
        fetch(`http://127.0.0.1:5000/message/${id_canal}`, {
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
    mensaje=document.getElementById("mensaje_nuevo").value;
    id_canal=window.id_canal;
    fetch(`http://127.0.0.1:5000/message/${id_canal}/${mensaje}`, {
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
        e_mensaje.innerHTML=`${element.dia}(${element.hora})    <b style="font-size:20px;">${element.username}</b>:${element.mensaje}`;

        //asigna un id al nuevo elemento creado,y añade al div chat, otro elemento
        e_mensaje.id=element.id_mensaje;
        document.getElementById("chat").appendChild(e_mensaje);

        // Crea un nuevo botón con la imagen
        let btn_imagen = document.createElement("button");
        btn_imagen.className= "btn_mensaje_imagen";
        btn_imagen.innerHTML = '<img src="../assets/editor-lapiz.png" width=10px>';
        btn_imagen.id=`${e_mensaje.id}`
        btn_imagen.style.cursor = "pointer";;
        
        btn_imagen.addEventListener("click",function(){
            const id_elemento = e_mensaje.id;
            config_mensaje(id_elemento,element.mensaje);
        });
        // Agrega el botón al lado del mensaje
        e_mensaje.appendChild(btn_imagen);
        
        //coloca la scroll bar al ultimo
        chat_div.scrollTop=chat_div.scrollHeight;
        document.getElementById("mensaje_nuevo").focus();

        //se actualizan los mensajes automaticamente cada 10 segundso
        
    });
}

function config_mensaje(id_elemento,mensaje){
    //crea y muestra un div, añade los elementos para modificar el mensaje
    div_modificar=document.createElement("div");
    div_modificar.className="div_modificar";

    p=document.createElement("p");
    p.innerHTML="Modificar Mensaje";
    div_modificar.appendChild(p);

    input_mensaje=document.createElement("input");
    input_mensaje.type="text";
    input_mensaje.value=mensaje;
    input_mensaje.className = "input_modificar";
    div_modificar.appendChild(input_mensaje);
    

    boton_enviar=document.createElement("input");
    boton_enviar.type="button";
    boton_enviar.value="Modificar";
    div_modificar.appendChild(boton_enviar);


    boton_cancelar=document.createElement("input");
    boton_cancelar.type="button";
    boton_cancelar.value="Cancelar";
    div_modificar.appendChild(boton_cancelar);

    document.getElementById("contenedor_chat").appendChild(div_modificar);

    //funcion del boton cancelar
    boton_cancelar.addEventListener("click",function(){
        div_modificar.style.display="none";
    });

    //funcion del boton enviar
    boton_enviar.addEventListener("click",function(){
        mensaje_modificar=input_mensaje.value;
        id_mensaje=id_elemento;
        modificar_mensaje(id_mensaje,mensaje_modificar);
    });

    function modificar_mensaje(id_mensaje,mensajenuevo){
        //envia un post con la solicitud del nuevo mensaje
        
        fetch(`http://127.0.0.1:5000/message/modify/${id_mensaje}/${mensajenuevo}`, {
            method: 'POST',
               headers: {
               'Content-Type': 'application/json',
               'Authorization': `Bearer ${token}`
               },
               credentials: 'include'
           })
           .then(response => {
            if (response.status === 200) {
                window.alert("Mensaje Actualizado con éxito");
                div_modificar.style.display="none";
                actualizar_mensajes();
            }
            else if (response.status === 401) {
                return response.json().then(data => {
                window.alert(`ERROR:${data.message}` );
                div_modificar.style.display="none";
                });
            } 
            
        });
    }
}


function actualizar_mensajes(){
    let chat_div = document.getElementById("chat");
        while (chat_div.firstChild) {
            chat_div.removeChild(chat_div.firstChild);
        };
    //actualiza los mensajes de un canal
    
    //obtiene todos los mensajes de un canal
    const token = localStorage.getItem('jwt-token');
    id_canal=window.id_canal;
    fetch(`http://127.0.0.1:5000/message/${id_canal}`, {
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

//sincroniza los mensajes cada 15 segundos
setInterval(() => {
    actualizar_mensajes();
    console.log("actualizando...");
    //15segundos
}, 15000);
