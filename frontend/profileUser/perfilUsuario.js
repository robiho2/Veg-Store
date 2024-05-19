let nombreCompleto = localStorage.getItem('nombre-completo');

if(!nombreCompleto){
    window.location.href = "../login/login.html"; 
}


document.getElementById('nombre-completo').textContent = `¡HOLA! ${nombreCompleto}`;
// document.querySelector('img').src = usuario.foto;

function redirectToForm(){
    let userType = localStorage.getItem('tipo');
    if(userType === "vendedor"){
        window.location.href = "../sellerInfo/infoVendedor.html"; 
    }else if(userType === "comprador"){
        window.location.href = "../buyerInfo/infoComprador.html"; 
    }else{
        window.location.href = "../homepage/homepage.html"; 
    }
}

function eliminarCuenta(){
    fetch('http://localhost:3000/api/usuario/eliminar', {
            method: "PUT",
            headers:{'content-type': 'application/json'},
            body: JSON.stringify(
                { 
                    email: localStorage.getItem("correo"),
                }
            ),
        })
        .then(response => {
            // if (!response.ok) {
            //     throw new Error('Error al obtener los datos');
            // }
            return response.json();
        })
        .then(data => {
            console.log(data)
            localStorage.clear();
            alert("Eliminado!")
            window.location.href = "../homepage/homepage.html"; // aca debemos crear la pagina principal para que el vendedor pueda accesar el homepage
        })
        .catch(error => {
            console.error('Error:', error);
            alert('No se pudo cargar la información.');
        });
}