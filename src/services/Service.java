package services;

import java.util.List;
import java.util.Map;

import repositories.IRepository;

public abstract class Service<K, T> implements IService<K, T> {
	private IRepository<K, T> repository;

	public Service(IRepository<K, T> repository) {
		this.repository = repository;
	}
	
	public boolean create(T entity) {
		return repository.create(entity);
	}

	public boolean update(T entity) {
		return repository.update(entity);
	}

	public T read(K key) {
		return repository.read(key);
	}

	public boolean delete(T entity) {
		return repository.delete(entity);
	}

	public boolean deleteById(K key) {
		return repository.deleteById(key);
	}

	public Map<K, T> readAll() {
		return repository.readAll();
	}

	public List<T> readAllEntities() {
		return repository.readAllEntities();
	}
}
