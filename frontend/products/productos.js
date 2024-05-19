
function agregarCarrito(id){
    let container = document.getElementById(id);
    let title = container.getElementsByClassName("item-title")[0].textContent
    let quantity = window.prompt("Que cantidad desea comprar?","10");
    let correo = localStorage.getItem("correo");
    let price = container.getElementsByClassName("price")[0].textContent

    let compra = localStorage.getItem("compra");
    if(!compra){
        localStorage.setItem("compra",JSON.stringify( [{
            "nombre": title,
            "cantidad":quantity,
            "price": price
        }]));
    }else{
        let letParsed = JSON.parse(compra)
        letParsed.push({
            "nombre": title,
            "cantidad":quantity,
            "price": price
        })
        localStorage.setItem("compra",JSON.stringify(letParsed));
    }

    alert("Se agrego el producto al carrito")
    // console.log(localStorage.getItem("compra"))
}

function agregarCatalogo(id){
    let container = document.getElementById(id);
    let title = container.getElementsByClassName("item-title")[0].textContent
    let price = container.getElementsByClassName("price")[0].textContent
    let quantity = window.prompt("Que cantidad desea vender?","10");
    let correo = localStorage.getItem("correo");

    fetch('http://localhost:3000/api/producto/crear', {
            method: "POST",
            headers:{'content-type': 'application/json'},
            body: JSON.stringify(
                { 
                    nombre: title,
                    precio: price,
                    cantidad: quantity,
                    email: correo
                }
            ),
        })
        .then(response => {
            // if (!response.ok) {
            //     throw new Error('Error al obtener los datos');
            // }
            console.log(response)
            return response.json();
        })
        .then(data => {
            alert("Producto agregado al catalogo")
        })
        .catch(error => {
            console.error('Error:', error);
            alert('No se pudo cargar la información.');
        });

}


function showOptions(){
    let tipo = localStorage.getItem("tipo");
    let buttons = document.getElementsByClassName("option")
    let text = "Agregar al carrito";
    let buttonFunction = agregarCarrito;
    if(tipo === "vendedor"){
        text = "Agregar al catalogo";
        buttonFunction = agregarCatalogo;
    }
    for (let element of buttons) {
        element.textContent = text;
        element.onclick = () => {
            buttonFunction(element.id);
        }
    }
}

showOptions()