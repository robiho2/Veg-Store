function cargarDatos(){
  document.getElementById("nombre1").value = localStorage.getItem("nombre");
  document.getElementById("apellido1").value = localStorage.getItem("nombre-completo").split(" ")[1];
  document.getElementById("cedula1").value = localStorage.getItem("cedula");
  document.getElementById("correo1").value = localStorage.getItem("correo");
  document.getElementById("telefono1").value = localStorage.getItem("telefono");
  document.getElementById("contrasenaActual").value = localStorage.getItem("pass");
}

cargarDatos()

function actualizarPassword(){

  fetch('http://localhost:3000/api/usuario/actualizar/'+localStorage.getItem("correo"), {
            method: "PUT",
            headers:{'content-type': 'application/json'},
            body: JSON.stringify(
                { 
                  password: document.getElementById("contrasenaNueva-vendedor").value,
                }
            ),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al actualizar');
            }
            console.log(response)
            return response.json();
        })
        .then(data => {
            localStorage.setItem('pass', data.usuario.password);
            location.reload();
        })
        .catch(error => {
            console.error('Error:', error);
            alert('No se pudo cargar la información.');
        });
}

function actualizarInfo(){
  let newName = document.getElementById("nombre1").value;
  let newApellido = document.getElementById("apellido1").value;
  let newCedula = document.getElementById("cedula1").value;
  let newCorreo = document.getElementById("correo1").value;
  let newTelefono = document.getElementById("telefono1").value;
  

  fetch('http://localhost:3000/api/usuario/actualizar/'+localStorage.getItem("correo"), {
            method: "PUT",
            headers:{'content-type': 'application/json'},
            body: JSON.stringify(
                { 
                  nombre: newName,
                  cedula: newCedula,
                  nombreCompleto: newName+" "+newApellido,
                  telefono:newTelefono,
                  correo:newCorreo
                }
            ),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al actualizar');
            }
            console.log(response)
            return response.json();
        })
        .then(data => {
            console.log(data)
            localStorage.setItem('nombre', data.usuario.nombre);
            localStorage.setItem('cedula', data.usuario.cedula);
            localStorage.setItem('nombre-completo', data.usuario.nombreCompleto);
            localStorage.setItem('telefono', data.usuario.telefono);
            localStorage.setItem('correo', data.usuario.correo);
            localStorage.setItem('documento', data.usuario.documento);
            localStorage.setItem('tipo', data.usuario.tipo);
            localStorage.setItem('numeroComercio', data.usuario.numeroComercio);
            localStorage.setItem('descripcion', data.usuario.descripcion);
            localStorage.setItem('pass', data.usuario.password);
            location.reload();
        })
        .catch(error => {
            console.error('Error:', error);
            alert('No se pudo cargar la información.');
        });
}


// // Código para el vendedor
// function crearWidgetCloudinaryVendedor() {
//   const botonSubirPhoto = document.getElementById("btn-subir-photo-vendedor");
//   const fotoPerfilElement = document.getElementById("profile-pic-vendedor");

//   // Verificar si hay una URL de imagen guardada en el almacenamiento local
//   const fotoPerfilGuardada = localStorage.getItem("fotoPerfilVendedor");
//   if (fotoPerfilGuardada) {
//     fotoPerfilElement.src = fotoPerfilGuardada;
//   }

//   // Configuración del widget de carga de Cloudinary
//   let cloudinaryWidget = cloudinary.createUploadWidget(
//     {
//       cloudName: "dpebuaadk", // Nombre de tu nube de Cloudinary
//       uploadPreset: "proyecto", // Preset de carga de Cloudinary
//     },
//     (error, result) => {
//       if (!error && result && result.event === "success") {
//         //  resultado exitoso de la carga de la imagen
//         const fotoPerfil = result.info.url;
//         fotoPerfilElement.src = fotoPerfil; 
//         console.log("Imagen subida con éxito:", fotoPerfil);

//         // Guardar la URL de la imagen en el almacenamiento local
//         localStorage.setItem("fotoPerfilVendedor", fotoPerfil);
//       } else {
//         //  errores durante la carga de la imagen
//         console.error("Error al cargar la imagen:", error);
//       }
//     }
//   );

//   // botón de subir foto
//   botonSubirPhoto.addEventListener("click", () => {
//     cloudinaryWidget.open();
//   });
// }

// // Código para el comprador esto es para que no haya un choque entre comprador y vendor o sea que ambas fotos no se vean en ambos lugares
// function crearWidgetCloudinaryComprador() {
//   const botonSubirPhoto = document.getElementById("btn-subir-photo-comprador");
//   const fotoPerfilElement = document.getElementById("profile-pic-comprador");

//   // Verificar almacenamiento local
//   const fotoPerfilGuardada = localStorage.getItem("fotoPerfilComprador");
//   if (fotoPerfilGuardada) {
//     fotoPerfilElement.src = fotoPerfilGuardada;
//   }

//   // Configuración del widget de carga de Cloudinary
//   let cloudinaryWidget = cloudinary.createUploadWidget(
//     {
//       cloudName: "dpebuaadk", // lo que ya tenemos de Cloudinary
//       uploadPreset: "proyecto", // same as above 
//     },
//     (error, result) => {
//       if (!error && result && result.event === "success") {
//         // Manejar el resultado exitoso de la carga de la imagen
//         const fotoPerfil = result.info.url;
//         fotoPerfilElement.src = fotoPerfil; // Asignar la URL de la imagen al atributo src
//         console.log("Imagen subida con éxito:", fotoPerfil);

//         // Guardar la URL de la imagen en el almacenamiento local
//         localStorage.setItem("fotoPerfilComprador", fotoPerfil);
//       } else {
//         // Manejar errores durante la carga de la imagen
//         console.error("Error al cargar la imagen:", error);
//       }
//     }
//   );

//   // Agregar evento de clic al botón de subir foto
//   botonSubirPhoto.addEventListener("click", () => {
//     cloudinaryWidget.open();
//   });
// }

// // Llamar a las funciones de carga de Cloudinary cuando el DOM esté completamente cargado
// document.addEventListener("DOMContentLoaded", function () {
//   crearWidgetCloudinaryVendedor(); // Para el vendedor
//   crearWidgetCloudinaryComprador(); // Para el comprador
// });


// ///////////////////////////////////////////////forumulario//////////////////////////////////
// document
//   .getElementById("info-personal")
//   .addEventListener("submit", function (event) {
//     event.preventDefault(); // Evitar que el formulario se envíe automáticamente

//     // Obtener los valores de los campos del formulario
//     const nombre1 = document.getElementById("nombre1").value;
//     const apellido1 = document.getElementById("apellido1").value;
//     const cedula1 = document.getElementById("cedula1").value;
//     const correo1 = document.getElementById("correo1").value;
//     const telefono1 = document.getElementById("telefono1").value;

//     // Validar los campos
//     if (!validarCorreo(correo1)) {
//       alert("El correo electrónico no es válido.");
//       return;
//     }
//     if (!validarTelefono(telefono1)) {
//       alert("El número de teléfono debe tener 8 dígitos.");
//       return;
//     }
//     if (!validarCedula(cedula1)) {
//       alert("El número de cédula debe tener 9 dígitos.");
//       return;
//     }

//     // objeto
//     const formData = {
//       nombre1,
//       apellido1,
//       cedula1,
//       correo1,
//       telefono1,
//     };

//     // Enviar los datos al backend
//     fetch("http://localhost:3000/api/reigstrovendedor", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(formData),
//     })
//       .then((response) => response.json())
//       .then((data) => {
//         console.log("Respuesta del servidor:", data);
//         document.getElementById("personal-message").textContent =
//           "Información guardada correctamente";
//       })
//       .catch((error) => {
//         console.error("Error al enviar la solicitud:", error);
//         document.getElementById("personal-message").textContent =
//           "Error al enviar la información";
//         document.getElementById("personal-message").style.color = "red";
//       });
//   });

// // Funciones de validación
// function validarCorreo(correo1) {
//   const regex = /\S+@\S+\.\S+/;
//   return regex.test(correo1);
// }

// function validarTelefono(telefono1) {
//   return telefono1.length === 8 && !isNaN(telefono1);
// }

// function validarCedula(cedula1) {
//   return cedula1.length === 9 && !isNaN(cedula1);
// }

// //////////////////////////////Fin del forumulario/////////////////////////////////////////












/////////////contrase;a///////inicio password
// document
//   .getElementById("password-change-form-vendedor")
//   .addEventListener("submit", async function (event) {
//     event.preventDefault(); // Evita que el formulario se envíe automáticamente

//     // Obtener valor del campo de la nueva contraseña
//     const newPassword = document.getElementById(
//       "contrasenaNueva-vendedor"
//     ).value;



//     // esta es la solicitud del POST al backend para cambiar la contraseña
//     try {
//       const response = await fetch("http://localhost:3000/api/vendecontra", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           newPassword,
//         }),
//       });

//       if (response.ok) {
//         // La solicitud fue exitosa, mostrar mensaje de éxito
//         document.getElementById("password-message-vendedor").textContent =
//           "Contraseña cambiada exitosamente";
//       } else {
//         // La solicitud falló, obtener y mostrar el mensaje de error del servidor
//         const responseData = await response.json();
//         document.getElementById("password-error-vendedor").textContent =
//           responseData.error;
//       }
//     } catch (error) {
//       // Ocurrió un error al realizar la solicitud
//       console.error("Error:", error);
//       document.getElementById("password-error-vendedor").textContent =
//         "Error al procesar la solicitud";
//     }
//   });

  ////fin de la contrasena//////




