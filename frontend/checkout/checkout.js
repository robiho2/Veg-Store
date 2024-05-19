function loadCompra(){
    let compra = localStorage.getItem("compra");
    let letParsed = JSON.parse(compra);
    let cont = document.getElementById("compra")

    let cantidad = letParsed.length
    document.getElementById("cantidad").textContent = cantidad

    let total = 0

    letParsed.forEach(element => {
        let newItem = document.createElement("P");
        newItem.innerHTML = element.cantidad + ' ' + element.nombre + ': ' + element.price + " por unidad"
        cont.appendChild(newItem)

        total += element.cantidad * element.price
    });

    document.getElementById("total").textContent = total
}

loadCompra()

function realizarCompra(){
    alert("Compra realizada con exitos");
    localStorage.setItem("compra",JSON.stringify( []));
    window.location.href = "../homepage/homepage.html";
}