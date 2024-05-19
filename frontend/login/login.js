function validateForm(email, password) {
    var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
        var errorSpan = document.getElementById("emailError");
        errorSpan.innerText = "Por favor, ingresa una dirección de correo electrónico válida.";
        return false;
    }

    if (password === "") {
        alert("Por favor, ingresa una contraseña.");
        return false;
    }

    return true;
}

function getPassword(){
    var email = document.getElementById("email").value;
    var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    var errorSpan = document.getElementById("emailError");

    if (email === "") {
        alert("Por favor, ingrese su correo electronico para poder buscar su contraseña.");
        return false;
    }

    if (!emailPattern.test(email)) {
        errorSpan.innerText = "Por favor, ingresa una dirección de correo electrónico válida.";
        return false;
    }

    fetch('http://localhost:3000/api/usuario/getPassword', {
            method: "POST",
            headers:{'content-type': 'application/json'},
            body: JSON.stringify(
                { 
                    email: email
                }
            ),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al obtener los datos');
            }
            return response.json();
        })
        .then(data => {
            alert("Su contraseña es '"+data.usuario.password+"'")
            console.log(data)
        })
        .catch(error => {
            console.error('Error:', error);
            alert('No se pudo cargar la información.');
        });
}

function redirectToHomePage() {
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;

    if (validateForm(email, password)) {
        fetch('http://localhost:3000/api/usuario/login', {
            method: "POST",
            headers:{'content-type': 'application/json'},
            body: JSON.stringify(
                { 
                    email: email,
                    password: password
                }
            ),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al obtener los datos');
            }
            return response.json();
        })
        .then(data => {
            // console.log(data)
            localStorage.setItem('nombre', data.nombre);
            localStorage.setItem('cedula', data.cedula);
            localStorage.setItem('nombre-completo', data.nombreCompleto);
            localStorage.setItem('telefono', data.telefono);
            localStorage.setItem('correo', data.correo);
            localStorage.setItem('documento', data.documento);
            localStorage.setItem('tipo', data.tipo);
            localStorage.setItem('numeroComercio', data.numeroComercio);
            localStorage.setItem('descripcion', data.descripcion);
            localStorage.setItem('pass', data.password);
            window.location.href = "../homepage/homepage.html"; // aca debemos crear la pagina principal para que el vendedor pueda accesar el homepage
        })
        .catch(error => {
            console.error('Error:', error);
            alert('No se pudo cargar la información.');
        });
        
        
    }
}
