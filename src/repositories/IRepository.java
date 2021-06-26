package repositories;

import java.util.Map;

public interface IRepository<K, T> {
	public boolean create(T entity);
	public boolean update(T entity);
	public T read(K key);
	public boolean delete(T entity);
	public boolean deleteById(K key);
	
	public Map<K, T> readAll();
}
