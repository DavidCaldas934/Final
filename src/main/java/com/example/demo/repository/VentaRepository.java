package com.example.demo.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import com.example.demo.entity.Venta;

@RepositoryRestResource(collectionResourceRel = "ventas", path = "ventas")
public interface VentaRepository extends CrudRepository<Venta,Long> {
    
}
