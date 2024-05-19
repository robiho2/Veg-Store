
function registrarComprador(){
    fetch('http://localhost:3000/api/usuario/crear', {
            method: "POST",
            headers:{'content-type': 'application/json'},
            body: JSON.stringify(
                { 
                    nombre: document.getElementById("nombre").value,
                    tipo: "comprador",
                    descripcion: "",
                    password:  document.getElementById("contrasena").value,
                    cedula: document.getElementById("cedula").value,
                    nombreCompleto: document.getElementById("nombre").value + " " + document.getElementById("Apellido").value,
                    telefono: document.getElementById("Numero-de-telefono").value,
                    correo: document.getElementById("Correo-electronico").value,
                    documento: "",
                    numeroComercio: ""
                }
            ),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al crear vendedor');
            }
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
            alert("Registrado exitosamente!");
            window.location.href = "../homepage/homepage.html";
        })
        .catch(error => {
            console.error('Error:', error);
            alert('No se pudo cargar la información.');
        });
        
  
}