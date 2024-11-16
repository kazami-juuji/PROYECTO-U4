const mensaje_error = ()=> {
    Swal.fire({
        title: "Oh no...",
        text: "Error de credenciales",
        imageUrl: "https://th.bing.com/th/id/OIP.nV7yYnlkRaJC-0aPMLCaJwHaHa?rs=1&pid=ImgDetMain",
        imageWidth: 600,
        imageHeight: 300,
        imageAlt: "Custom image"
      });
}

const mensaje_exito = ()=> {
    Swal.fire({
        title: "Felicidades shinji",
        text: "Haz entrado a tu sesion",
        imageUrl: "https://mediaformasi.com/content/images/2022/11/Screenshot--76-.png",
        imageWidth: 400,
        imageHeight: 200,
        imageAlt: "Custom image"
      });
}

const iniciar_sesion = () => {
    let data = new FormData();
    data.append("usuario", $("#usuario").val());
    data.append("password", $("#password").val());
    data.append("metodo", "iniciar_sesion");

    fetch("./app/controller/Login.php", {
        method: "POST",
        body: data
    }).then(respuesta => respuesta.json())
    .then(respuesta => {
        if (respuesta[0] == 1) {
            mensaje_exito(respuesta[1]); // Muestra el mensaje de éxito
            setTimeout(() => { // Retraso para permitir que el usuario vea el mensaje antes de redirigir
                window.location = "inicio";
            }, 2000); // Cambia el tiempo si deseas una duración diferente
        } else {
            mensaje_error(respuesta[1]); // Muestra el mensaje de error
        }
    });
}

$("#btn_iniciar").on('click', () => {
    iniciar_sesion();
});
