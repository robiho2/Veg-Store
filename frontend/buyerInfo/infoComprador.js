function mostrarDatos() {
  document.getElementById("nombre").value = localStorage.getItem("nombre");
  document.getElementById("apellido").value = localStorage.getItem("nombre-completo").split(" ")[1];
  document.getElementById("cedula").value = localStorage.getItem("cedula");
  document.getElementById("correo").value = localStorage.getItem("correo");
  document.getElementById("telefono").value = localStorage.getItem("telefono");
  document.getElementById("nombreTitular").value = localStorage.getItem("nombre-completo");

}
mostrarDatos()


//foto//
////ESte es el de la imagen este codigo lo actualize un poco para que la foto que se suba quede fija y si uno le da f5 queda la foto que se ha agregado, este codigo es igual al del profe solo que tiene esa modificacion

function crearWidgetCloudinary() {
  const botonSubirArchivo = document.getElementById("btn-subir-archivo");
  const fotoPerfilElement = document.getElementById("profile-pic-comprador");


  const fotoPerfilGuardada = localStorage.getItem("fotoPerfil");
  if (fotoPerfilGuardada) {
    fotoPerfilElement.src = fotoPerfilGuardada;
  }

  // Configuración del widget de carga de Cloudinary
  let cloudinaryWidget = cloudinary.createUploadWidget(
    {
      cloudName: "dpebuaadk",
      uploadPreset: "proyecto",
    },
    (error, result) => {
      if (!error && result && result.event === "success") {
        // resultado exitoso de la carga de la imagen
        const fotoPerfil = result.info.url;
        fotoPerfilElement.src = fotoPerfil;
        console.log("Imagen subida con éxito:", fotoPerfil);

        // Guardar la URL de la imagen en el almacenamiento local
        localStorage.setItem("fotoPerfil", fotoPerfil);
      } else {
        // errores durante la carga de la imagen
        console.error("Error al cargar la imagen:", error);
      }
    }
  );

  botonSubirArchivo.addEventListener("click", () => {
    cloudinaryWidget.open();
  });
}

crearWidgetCloudinary();

////fin de la imagen



//inicio password
document
  .getElementById("password-change-form-comprador")
  .addEventListener("submit", async function (event) {
    event.preventDefault();

    // Obtener valor del campo de la nueva contraseña
    const newPassword = document.getElementById(
      "contrasenaNueva-comprador"
    ).value;



    // esta es la solicitud del POST al backend para cambiar la contraseña
    try {
      const response = await fetch("http://localhost:3000/api/passwords", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          newPassword,
        }),
      });

      if (response.ok) {
        // mostrar mensaje de éxito
        document.getElementById("password-message-comprador").textContent =
          "Contraseña cambiada exitosamente";
      } else {
        // mostrar el mensaje de error del servidor
        const responseData = await response.json();
        document.getElementById("password-error-comprador").textContent =
          responseData.error;
      }
    } catch (error) {
      // Ocurrió un error al realizar la solicitud
      console.error("Error:", error);
      document.getElementById("password-error-comprador").textContent =
        "Error al procesar la solicitud";
    }
  });


//fin del password change//

//metodo de pago
document
  .getElementById("payment-form")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Evita que el formulario se envíe por defecto

    const nombreTitular = document.getElementById("nombreTitular").value;
    const numeroIBAN = document.getElementById("numeroIBAN").value;

    fetch("http://localhost:3000/api/pagos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ nombreTitular, numeroIBAN }),
    })
      .then((response) => response.json())
      .then((data) => {
        document.getElementById("payment-message").innerText =
          "Método de pago actualizado correctamente";
      })
      .catch((error) => {
        console.error("Error:", error);
        document.getElementById("payment-message").innerText =
          "Ha ocurrido un error al actualizar el método de pago";
      });
  });


//////////////////formulario/////////////////
function guardarInfoComprador() {

    // Obtener los valores de los campos del formulario
    const nombre = document.getElementById("nombre").value;
    const apellido = document.getElementById("apellido").value;
    const cedula = document.getElementById("cedula").value;
    const correo = document.getElementById("correo").value;
    const telefono = document.getElementById("telefono").value;

    // Validar los campos
    if (!validarCorreo(correo)) {
      alert("El correo electrónico no es válido.");
      return;
    }
    if (!validarTelefono(telefono)) {
      alert("El número de teléfono debe tener 8 dígitos.");
      return;
    }
    if (!validarCedula(cedula)) {
      alert("El número de cédula debe tener 9 dígitos.");
      return;
    }

    // objeto
    const formData = {
      nombre,
      apellido,
      cedula,
      correo,
      telefono,
    };

    // Enviar los datos al backend
    fetch("http://localhost:3000/api/registroComprador", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Respuesta del servidor:", data);
        document.getElementById("personal-message").textContent =
          "Información guardada correctamente";
      })
      .catch((error) => {
        console.error("Error al enviar la solicitud:", error);
        document.getElementById("personal-message").textContent =
          "Error al enviar la información";
        document.getElementById("personal-message").style.color = "red";
      });
  };

// Funciones de validación
function validarCorreo(correo) {
  const regex = /\S+@\S+\.\S+/;
  return regex.test(correo);
}

function validarTelefono(telefono) {
  return telefono.length === 8 && !isNaN(telefono);
}

function validarCedula(cedula) {
  return cedula.length === 9 && !isNaN(cedula);
}


////eliminar cuenta///

///document
/// .getElementById("eliminar-cuenta-btn")
/// .addEventListener("click", async function () {
///  try {
///    const userId = getUserIdFromLocalStorage(); // Obtener el ID del usuario, por ejemplo, desde el almacenamiento local

///  const confirmacion = await Swal.fire({
///    title: "¿Estás seguro?",
///    text: "¿Deseas eliminar tu cuenta permanentemente?",
///    icon: "warning",
///    showCancelButton: true,
///    confirmButtonColor: "#3085d6",
///     cancelButtonColor: "#d33",
///    confirmButtonText: "Sí, eliminar cuenta",
///     cancelButtonText: "Cancelar",
///   });

///   if (confirmacion.isConfirmed) {
///     // Enviar solicitud al backend para eliminar la cuenta
///     const response = await fetch(
///        `URL_DEL_BACKEND/eliminar-cuenta/${userId}`,
///    {
///         method: "DELETE",
///         headers: {
///          "Content-Type": "application/json",
///           // Puedes incluir cualquier otra cabecera necesaria
///         },
///        }
///      );
///
///      if (response.ok) {
// Eliminación exitosa, redirigir al usuario al homepage u otra página
///       window.location.href = "homepage.html";
///     } else {
///     // Manejar errores de eliminación de cuenta
///       const responseData = await response.json();
// Mostrar mensaje de error
///      Swal.fire({
///        icon: "error",
///        title: "Error al eliminar la cuenta",
///        text: responseData.error,
///      });
///     }
///    }
///  } catch (error) {
// Manejar errores generales
///     console.error("Error al eliminar la cuenta:", error);
///    Swal.fire({
///       icon: "error",
///       title: "Error al eliminar la cuenta",
///      text: "Ocurrió un error al procesar tu solicitud",
///      });
///    }
///  });
