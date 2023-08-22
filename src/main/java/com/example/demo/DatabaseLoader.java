package com.example.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import com.example.demo.entity.Producto;
import com.example.demo.entity.Vendedor;
import com.example.demo.entity.Venta;
import com.example.demo.entity.VentaDetalle;
import com.example.demo.repository.ProductoRepository;
import com.example.demo.repository.VendedorRepository;
import com.example.demo.repository.VentaDetalleRepository;
import com.example.demo.repository.VentaRepository;

@Component
public class DatabaseLoader implements CommandLineRunner {

	private final ProductoRepository productoRepository;
    private final VendedorRepository vendedorRepository;
    private final VentaRepository ventaRepository;
    private final VentaDetalleRepository ventaDetalleRepository;

	@Autowired
	public DatabaseLoader(
			ProductoRepository productoRepository,
            VendedorRepository vendedorRepository,
            VentaRepository ventaRepository,
            VentaDetalleRepository ventaDetalleRepository) {
		this.productoRepository = productoRepository;
        this.vendedorRepository = vendedorRepository;
        this.ventaRepository = ventaRepository;
        this.ventaDetalleRepository = ventaDetalleRepository;
	}

	@Override
	public void run(String... strings) throws Exception {
		
		Producto producto1 = new Producto("Monitor GAMER FACTORY 19 PULGADAS", 1500.0);
        Producto producto2 = new Producto("Monitor SAMSUN 24 PULGADAS", 1500.0);
        Producto producto3 = new Producto("RTX 4090", 3000.0);

        this.productoRepository.save(producto1);
        this.productoRepository.save(producto2);
        this.productoRepository.save(producto3);


        Vendedor vendedor1 = new Vendedor("David Quispe Caldas");

        this.vendedorRepository.save(vendedor1);

        Venta venta1 = new Venta(1, vendedor1, 6000.0, 1000.0, 5000.0);

        this.ventaRepository.save(venta1);


        VentaDetalle detalle1 = new VentaDetalle(venta1, producto1, 1, 1000.0);


        this.ventaDetalleRepository.save(detalle1);

	}

	
}