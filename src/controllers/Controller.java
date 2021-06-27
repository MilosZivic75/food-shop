package controllers;

import java.util.List;
import java.util.Map;

import services.IService;

public class Controller<K, T> {
	IService<K, T> service;
	public Controller(IService<K, T> service) {
		this.service = service;
	}

	public boolean create(T entity) {
		return service.create(entity);
	}

	public boolean update(T entity) {
		return service.update(entity);
	}

	public T read(K key) {
		return service.read(key);
	}

	public boolean delete(T entity) {
		return service.delete(entity);
	}

	public boolean deleteById(K key) {
		return service.deleteById(key);
	}

	public Map<K, T> readAll() {
		return service.readAll();
	}

	public List<T> readAllEntities() {
		return service.readAllEntities();
	}
}
