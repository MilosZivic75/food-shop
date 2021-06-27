package controllers;

import java.util.List;
import java.util.Map;

public interface IController<K, T> {
	public boolean create(T entity);
	public boolean update(T entity);
	public T read(K key);
	public boolean delete(T entity);
	public boolean deleteById(K key);
	
	public Map<K, T> readAll();
	public List<T> readAllEntities();
}
