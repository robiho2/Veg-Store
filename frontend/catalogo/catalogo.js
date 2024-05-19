function showProducts(){
    let correo = localStorage.getItem("correo");
    fetch('http://localhost:3000/api/producto/get/'+correo, {
            method: "GET",
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al obtener los datos');
            }
            return response.json();
        })
        .then(data => {
            let cont = document.getElementsByClassName("container-items")[0]
            data.productos.forEach(obj => {
                let mainDiv = document.createElement("DIV");
                mainDiv.innerHTML = '<figure><img src="../imgs/'+obj.nombre.toLowerCase()+'.png" alt="banano"></img>'
                +'<div class="info-product">'
                +'<h2 class="item-title">'+obj.nombre+'</h2>'
                +'<p>₡<span class="price">'+obj.precio+'</span></span></p>'
                +'<p><span class="price">'+obj.cantidad+'</span></span></p>'
                +'</div>'

                cont.appendChild(mainDiv)
            
                console.log(obj.nombre); 
            });

        })
        .catch(error => {
            console.error('Error:', error);
            alert('No se pudo cargar la información.');
        });
}

showProducts()