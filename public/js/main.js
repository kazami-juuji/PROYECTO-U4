const mensaje_error = (respuesta)=> {
    Swal.fire({
        title: "Oh no...",
        text: respuesta,
        imageUrl: "https://th.bing.com/th/id/OIP.nV7yYnlkRaJC-0aPMLCaJwHaHa?rs=1&pid=ImgDetMain",
        imageWidth: 600,
        imageHeight: 300,
        imageAlt: "Custom image"
      });
}

const mensaje_exito = (respuesta)=> {
    Swal.fire({
        title: "Felicidades shinji",
        text: respuesta,
        imageUrl: "https://mediaformasi.com/content/images/2022/11/Screenshot--76-.png",
        imageWidth: 400,
        imageHeight: 200,
        imageAlt: "Custom image"
      });
}

const consulta = () =>{
    let data = new FormData();
    data.append("metodo","obtener_datos");
    fetch("./app/controller/Productos.php",{
        method:"POST",
        body:data
    }).then(respuesta => respuesta.json())
    .then(respuesta => {
        let contenido = ``, i = 1;
        respuesta.map(producto => {
            contenido += `
                <tr>
                    <th>${i++}</th>
                    <td>${producto['producto']}</td>
                    <td>${producto['precio']}</td>
                    <td>${producto['unidades']}</td>
                    <td>
                        <button type="button" class="btn btn-warning" onclick="precargar(${producto['id_producto']})"><i class="fa-solid fa-pen-to-square"></i></button>
                        <button type="button" class="btn btn-danger" onclick="eliminar(${producto['id_producto']})"><i class="fa-solid fa-trash-can"></i></button>
                    </td>
                </tr>
            `;
        });
        $("#contenido_producto").html(contenido);
        $('#myTable').DataTable();
    });
}

const precargar = (id) =>{
    let data = new FormData();
    data.append("id_producto",id);
    data.append("metodo","precargar_datos");
    fetch("./app/controller/Productos.php",{
        method:"POST",
        body:data
    }).then(respuesta => respuesta.json())
    .then(respuesta => {   
        $("#edit_producto").val(respuesta['producto']);
        $("#edit_precio").val(respuesta['precio']);
        $("#edit_unidades").val(respuesta['unidades']);
        $("#id_prodcuto_act").val(respuesta['id_producto']);
        $("#editarModal").modal('show');
    });
}

consulta();

const actualizar = () =>{
    let data = new FormData();
    data.append("id_producto",$("#id_prodcuto_act").val());
    data.append("producto",$("#edit_producto").val());
    data.append("precio",$("#edit_precio").val());
    data.append("unidades",$("#edit_unidades").val());
    data.append("metodo","actualizar_datos");
    fetch("./app/controller/Productos.php",{
        method:"POST",
        body:data
    }).then(respuesta => respuesta.json())
    .then(respuesta => { 
        if(respuesta[0] == 1){
            mensaje_exito(respuesta[1]);
            consulta();
            $("#editarModal").modal('hide');
        }else{
            mensaje_error(respuesta[1]);
        }
    });
}

const agregar = () =>{
    let data = new FormData();
    data.append("producto",$("#producto").val());
    data.append("precio",$("#precio").val());
    data.append("unidades",$("#unidades").val());
    data.append("metodo","insertar_datos");
    fetch("./app/controller/Productos.php",{
        method:"POST",
        body:data
    }).then(respuesta => respuesta.json())
    .then(respuesta => { 
        if(respuesta[0] == 1){
            mensaje_exito(respuesta[1]);
            consulta();
            $("#agregarModal").modal('hide');
        }else{
            mensaje_error(respuesta[1]);
        }
    });
}

const eliminar = (id) =>{
    let accion = confirm("Quieres eliminar el producto?");
    if(accion){ 
        let data = new FormData();
        data.append("id_producto",id);
        data.append("metodo","eliminar_datos");
        fetch("./app/controller/Productos.php",{
            method:"POST",
            body:data
        }).then(respuesta => respuesta.json())
        .then(respuesta => { 
            if(respuesta[0] == 1){
                consulta();
            }else{
                mensaje_error(respuesta[1]);
            }
        });
    }
}

$('#btn_actualizar').on('click',() => {
    actualizar();
});

$('#btn_agregar').on('click',() => {
    agregar();
});