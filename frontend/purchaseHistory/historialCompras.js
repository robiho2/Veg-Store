import React, { useState, useEffect } from "react";
import axios from "axios";

const HistorialCompras = () => {
  const [compras, setCompras] = useState([]);

  useEffect(() => {
    const obtenerCompras = async () => {
      try {
        const respuesta = await axios.get(
          "http://localhost:3000/api/historialco"
        );
        setCompras(respuesta.data);
      } catch (error) {
        console.error("Error al obtener las compras:", error);
      }
    };

    obtenerCompras();
  }, []); // <-- Asegúrate de pasar un array vacío como segundo argumento para que el efecto se ejecute solo una vez al montar el componente

  return (
    <div>
      <h1>Historial de Compras</h1>
      <table id="tablaCompras">
        <thead>
          <tr>
            <th>Producto</th>
            <th>Precio</th>
            <th>Cantidad</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {compras.map((compra) => (
            <tr key={compra.id}>
              <td>{compra.producto}</td>
              <td>{compra.precio}</td>
              <td>{compra.cantidad}</td>
              <td>{compra.total}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default HistorialCompras;
