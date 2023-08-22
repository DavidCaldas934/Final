package com.example.demo;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(collectionResourceRel = "detallesventas", path = "detallesventas")
public interface DetalleVentaRepository extends CrudRepository<DetalleVenta, Long> {

}