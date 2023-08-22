const React = require('react');
const client = require('../client');
const { Link } = require('react-router-dom');

class PageHome extends React.Component {
	constructor(props) {
		super(props);
		//this.state = { instrumentos: [], musicos: [], bandas: [] };
		this.state = {productos: [] };
	}
	componentDidMount() {
		/*client({ method: 'GET', path: '/api/instrumentos' }).done(response => {
			this.setState({ instrumentos: response.entity._embedded.instrumentos });
		});
		client({ method: 'GET', path: '/api/musicos' }).done(response => {
			this.setState({ musicos: response.entity._embedded.musicos });
		});
		*/
		client({ method: 'GET', path: '/api/productos' }).done(response => {
			this.setState({ productos: response.entity._embedded.productos });
		});

	}
	render() {
		return (
			<>
				<h1>Demo App!</h1>

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
		const productos = this.props.producto.map(producto =>
			<Producto key={producto._links.self.href} producto={producto} />
		);
		return (
			<table border="1">
				<tbody>
					<tr>
						<th>Nombre</th>
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
				<td>
					<Link to={`/ver-producto/${id}`}>Ver Producto</Link>
				</td>
			</tr>
		)
	}
}

module.exports = PageHome;