const React = require('react');
const {useState, useEffect} = require('react');
const { Link,useParams } = require('react-router-dom');
const client = require('../client');

const PageNuevoDetalleVenta = () => {

    let { id } = useParams();
    const [productos, setProductos] = useState([])
    const [idProducto, setIdProducto] = useState('')

    const handleSubmit = (evento)=>{
        evento.preventDefault();
        client({
            method: 'POST',
            path: '/api/productos',
            entity: {
                venta: venta,
                producto: 'http://localhost:8080/api/productos/'+idProducto,
                cantidad : cantidad
            },
            headers: {'Content-Type': 'application/json'}
        }).done(()=>{
           window.location = '/';
        })
    }

    useEffect(() => {
        client({
            method: 'GET',
            path: '/api/productos'
        }).done(response=>{
            let productos2 = [];
            response.entity._embedded.productos.map(producto => {
                productos2.push({value: producto._links.self.href.split('/').slice(-1), label: producto.nombre})
            })
            setProductos(productos2)
        })


    },[])

    return (
        <>
            <h1>Nuevo Detalle de Venta</h1>
            <form onSubmit={handleSubmit}>

            <label htmlFor='venta'>Venta</label>
                <input type="number" id="venta" name="venta" onChange={(e)=>setVenta(e.target.value)} />
                <br />
                
                <label>Producto</label>
                <select name="producto" id="producto" onChange={(e)=>{setIdProducto(e.target.value)}}>
                    {productos.map(producto => {	
                        return (
                            <option key={producto.value} value={producto.value}>{producto.label}</option>
                        )
                    })}
                </select>
                <label htmlFor='cantidad'>Cantidad</label>
                <input type="number" id="cantidad" name="cantidad" onChange={(e)=>setCantidad(e.target.value)} />
                <br />

                <input type="submit" value="Nuevo Detalle de Venta" />

            </form>
            <Link to="/">Volver</Link>
        </>
    )
}

module.exports = PageNuevoDetalleVenta;