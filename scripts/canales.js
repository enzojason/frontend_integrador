var selectServidores = document.getElementById("lista_servidores");
var select_canales=document.getElementById("lista_canales");

selectServidores.addEventListener("change", function() {
    //se ejecuta cuando seleccionamos una opcion de servidores
    while (select_canales.firstChild) {
            select_canales.removeChild(select_canales.firstChild);
        }
    document.getElementById("mensaje_main").style.display ="none";
    document.getElementById("mensaje_main_canal").style.display="block";
    document.getElementById("contenedor_unirse_serv").style.display="none";
    document.getElementById("contenedor_crear_serv").style.display="none";
    document.getElementById("contenedor_buscar_serv").style.display="none";
    document.getElementById("contenido").style.display="block";
    //obtener el servidor seleccionado en la lista Servidores 
    var opcionSeleccionada = selectServidores.options[selectServidores.selectedIndex];
    document.getElementById("seccion_canales").style.display="block";

    document.getElementById("agregar_canal").addEventListener("click",agregar_canal)
    

    function agregar_canal(){
        //muestra la seccion de agregar canal en el main
        document.getElementById("mensaje_main_canal").style.display="none";
        document.getElementById("contenedor_crear_canal").style.display="block";
        document.getElementById("contenido").style.display="none";
        document.getElementById("contenedor_crear_serv").style.display="none";
        document.getElementById("contenedor_unirse_serv").style.display="none";
        document.getElementById("contenedor_buscar_serv").style.display="none";

        document.getElementById("nombre_canal").focus();
        document.getElementById("crear_canal").addEventListener("click",create_canal);
        document.getElementById("cancel_canal").addEventListener("click",function(){
        document.getElementById("contenido").style.display="block";
                
                
        });
        
    }

    function create_canal(){
        let data = {}
        //se une a un servidor, enviando los datos a la API method POST
        const token = localStorage.getItem('jwt-token');
        
        nombre_canal=document.getElementById("nombre_canal").value;
        descripcion_canal=document.getElementById("descripcion_canal").value;

        data.nombre_servidor=opcionSeleccionada.text;
        data.descripcion= descripcion_canal;
        fetch(`http://127.0.0.1:5000/canal/create/${nombre_canal}`, {
            method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(data),
                credentials: 'include'
            })
            .then(response => {
            if (response.status === 200) {
                return response.json().then(data => {
                    window.alert("Canal creado con exito");
                    document.getElementById("contenedor_crear_canal").style.display="none";
                    document.getElementById("contenido").style.display="block";
                    window.location.href="home.html";

            });
            } else {
                return response.json().then(data => {

                    window.alert(data.message);
                    document.getElementById("contenedor_crear_canal").style.display="none";
                    document.getElementById("contenido").style.display="block";
            
            });
            }

        });
    }


    
    if (select_canales.selectedIndex === -1 || select_canales.selectedIndex==='') {
        document.getElementById("mensaje_main_canal").innerHTML = "-------------No hay canales seleccionados-------------";
    }

    let data = {}
    const token = localStorage.getItem('jwt-token');
    nombre_servidor=opcionSeleccionada.text;
    //obtiene los canales de un servidor
    fetch(`http://127.0.0.1:5000/canal/${nombre_servidor}`, {
        method: 'GET',
            headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
            },
            credentials: 'include'
        })
        .then(response=>{
            if(response.status===200){
                return response.json().then(data=>{
                    mostrar_canales(data.canales);

                });
            }
        });


    function mostrar_canales(canales){
        //los canales obteneidos, crea un elemento html y los agrega a la lista
        canales.forEach(element => {
        let nueva_opcion = document.createElement("option");
        nueva_opcion.text= `#${element.nombre_canal}`;
        nueva_opcion.value = element.id_canal;
        select_canales.add(nueva_opcion);
    });
}

    select_canales.addEventListener("change",function(){
        //se ejecuta cuando elegimos una opcion de la lista de canales
        document.getElementById("mensaje_main_canal").style.display="none";
        let opcion_seleccionada = select_canales.options[select_canales.selectedIndex];

        canal_seleccionado=opcion_seleccionada.value;

        
        
    });


});


