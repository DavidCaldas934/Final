package com.example.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DatabaseLoader implements CommandLineRunner {

	private final ProductoRepository repositoryP;
	private final IntegranteRepository repositoryN;

	@Autowired
	public DatabaseLoader(

		 ProductoRepository repositoryP,
		 IntegranteRepository repositoryN) {

		this.repositoryP = repositoryP;
		this.repositoryN = repositoryN;
	}

	@Override
	public void run(String... strings) throws Exception {

		Producto pMonitor = new Producto("Monitor", 1000.00);
		Producto pCpu = new Producto("Cpu", 2000.00);

		this.repositoryP.save(new Producto("Monitor LG",500.00));
		this.repositoryP.save(new Producto("Cpu X2000",1500.00));

		this.repositoryP.save(pMonitor);
		this.repositoryP.save(pCpu);


	}

	
}