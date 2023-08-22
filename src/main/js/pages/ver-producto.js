const React = require('react');
const client = require('../client');
const { Link, useParams, } = require('react-router-dom');
const {useState, useEffect} = require('react');



const PageVerProducto = () => {

    let { id } = useParams();
    const [producto, setProducto] = useState({});
    const [integrantes, setIntegrantes] = useState([]);


    useEffect(() => {
        url_producto = '/api/productos/' + id

        client({
            method: 'GET',
            path: url_producto
        }).done(response => setProducto(response.entity));

        client({
            method: 'GET',
            path: url_producto + '/formacion'
        }).done(response => setIntegrantes(response.entity))
        
    }, []);


    return (
        <>
            <h1>Producto</h1>
            <table border="1">
                <tbody>
                    <tr>
                        <th>Nombre</th>
                        <td>{producto.nombre}</td>
                        <td>{producto.precio}</td>
                    </tr>
                </tbody>
            </table>

            <hr />

            <h2>integrantes</h2>
            <table border="1">
                <thead>
                    <tr>
                        <th>Producto</th>
                        <th>Instrumento</th>
                    </tr>
                </thead>
                <tbody>

                    {integrantes.map(integrante => {

                        return (
                            <tr key={integrante.ID}>
                                <td>{integrante.PRODUCTO}</td>
                            </tr>
                        )

                    })}

                </tbody>
            </table>
            <hr />
            <Link to={`/ver-producto/${id}`}>Agregar Producto</Link> |  
            <Link to="/">Volver</Link>
        </>
    )
}

module.exports = PageVerProducto;