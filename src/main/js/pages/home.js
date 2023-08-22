const React = require('react');
const client = require('../client');
const { Link } = require('react-router-dom');

class PageHome extends React.Component {
	constructor(props) {
		super(props);
		//this.state = { instrumentos: [], musicos: [], bandas: [] };
		this.state = {productos: [], ventas: [] };
	}
	componentDidMount() {
		/*client({ method: 'GET', path: '/api/instrumentos' }).done(response => {
			this.setState({ instrumentos: response.entity._embedded.instrumentos });
		});
		client({ method: 'GET', path: '/api/musicos' }).done(response => {
			this.setState({ musicos: response.entity._embedded.musicos });
		});
		*/
		client({ method: 'GET', path: '/api/ventas' }).done(response => {
			this.setState({ ventas: response.entity._embedded.ventas });
		});
		client({ method: 'GET', path: '/api/productos' }).done(response => {
			this.setState({ productos: response.entity._embedded.productos });
		});

	}
	render() {
		return (
			<>
				<h1>Demo App!</h1>

				<div style={{"width": "calc(100% / 2)"}}>
						<Titulo entidad="Detalle de Ventas" emoji="🎸" />
						<VentaList ventas={this.state.ventas} />
						<Link to={`/nuevo-detalle-venta`}>Agregar Detalle Venta</Link> |  
						
				</div>

				<div style={{"width": "100%", "display": "flex"}}>
					
					<div style={{"width": "calc(100% / 2)"}}>
						<Titulo entidad="Producto" emoji="👩🏼‍🎤" />
						<ProductoList producto={this.state.productos} />
						<Link to="/nueva-producto">Nueva Detalle Venta</Link>
					</div>
				</div>




			</>
		)
	}
}

const Titulo = (props) => {
	return (
		<>
			<hr />
			<h2>{props.emoji} - {props.entidad}</h2>
			<span>Listado completo de {props.entidad.toLowerCase()}:</span>
			<hr />
		</>
	);
}


class ProductoList extends React.Component {
	render() {
		const productos = this.props.productos.map(producto =>
			<Producto key={producto._links.self.href} producto={producto} />
		);
		return (
			<table border="1">
				<tbody>
					<tr>
						<th>Nombre</th>
						<th>Precio</th>
						<th>Acciones</th>
					</tr>
					{productos}
				</tbody>
			</table>
		)
	}
}


class Producto extends React.Component {
	render() {
		const id = this.props.producto._links.self.href.split("/").slice(-1);
		return (
			<tr>
				<td>{this.props.producto.nombre}</td>
				<td>{this.props.producto.precio}</td>
				<td>
					<Link to={`/ver-producto/${id}`}>Ver</Link> | 
					<Link to={`/editar-producto/${id}`}>Editar</Link>
				</td>
			</tr>
		)
	}
}

class VentaList extends React.Component {
	render() {
		const ventas = this.props.ventas.map(venta =>
			<Venta key={venta._links.self.href} venta={venta} />
		);
		return (
			<table border="1">
				<tbody>
					<tr>
						<th>TOTAL</th>
						<th>Acciones</th>
					</tr>
					{ventas}
				</tbody>
			</table>
		)
	}
}
class Venta extends React.Component {
	render() {
		const id = this.props.venta._links.self.href.split("/").slice(-1);
		return (
			<tr>
				<td>{this.props.venta.total}</td>
				<td>
					<Link to={`/ver-total/${id}`}>Ver</Link> | 
				</td>
			</tr>
		)
	}
}


module.exports = PageHome;