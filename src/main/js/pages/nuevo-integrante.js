const React = require('react');
const {useState, useEffect} = require('react');
const { Link,useParams } = require('react-router-dom');
const client = require('../client');

const NuevoIntegrantePage = () => {

    let { id } = useParams();
    const [productos, setProductos] = useState([])
    const [idProducto, setIdProducto] = useState('')

    const handleSubmit = (evento)=>{
        evento.preventDefault();
        client({
            method: 'POST',
            path: '/api/integrantes',
            entity: {
                producto: 'http://localhost:8080/api/productos/'+id,
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
            response.entity._embedded.musicos.map(producto => {
                productos2.push({value: producto._links.self.href.split('/').slice(-1), label: producto.nombre})
            })
            setMusicos(productos2)
        })
        client({
            method: 'GET',
            path: '/api/instrumentos'
        }).done(response=>{
            let instrumentos2 = [];
            response.entity._embedded.instrumentos.map(instrumento => {
                instrumentos2.push({value: instrumento._links.self.href.split('/').slice(-1), label: instrumento.nombre})
            })
            setInstrumentos(instrumentos2)
        })

    },[])

    return (
        <>
            <h1>Nuevo Integrante</h1>
            <form onSubmit={handleSubmit}>

                <label htmlFor='musico'>Musico</label>
                <select name="musico" id="musico" onChange={(e)=>{setIdMusico(e.target.value)}}>
                    {musicos.map(musico => {	
                        return (
                            <option key={musico.value} value={musico.value}>{musico.label}</option>
                        )
                    })}
                </select>
                
                <label>Instrumento</label>
                <select name="instrumento" id="instrumento" onChange={(e)=>{setIdInstrumento(e.target.value)}}>
                    {instrumentos.map(instrumento => {	
                        return (
                            <option key={instrumento.value} value={instrumento.value}>{instrumento.label}</option>
                        )
                    })}
                </select>

                <input type="submit" value="Nuevo Integrante" />

            </form>
            <Link to="/">Volver</Link>
        </>
    )
}

module.exports = NuevoIntegrantePage;