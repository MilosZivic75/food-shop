package repositories;

import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.lang.reflect.Type;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonIOException;
import com.google.gson.JsonSyntaxException;

public abstract class Repository<K, T> implements IRepository<K, T> {
	private static Gson g = new GsonBuilder().setPrettyPrinting().setDateFormat("yyyy-MM-dd").create();

	protected abstract String getPath();

	protected abstract Type getType();

	protected abstract K getKey(T entity);
	
	protected abstract int getDeleted(T entity);
	
	protected abstract T setDeleted(T entity);

	private Map<K, T> readFile() {
		String path = getPath();
		Type type = getType();

		try {
			Map<K, T> retVal = g.fromJson(new FileReader(path), type);
			if (retVal == null)
				throw new FileNotFoundException();
			retVal.entrySet().removeIf(entry -> getDeleted(entry.getValue()) == 1);
			return retVal;
		} catch (JsonIOException | JsonSyntaxException | FileNotFoundException e) {
			try {
				FileWriter writer = new FileWriter(path);
				writer.write("{}");
				writer.flush();
				writer.close();
			} catch (IOException e1) {
			}
			return new HashMap<K, T>();
		}
	}

	private void writeFile(Map<K, T> entities) {
		String path = getPath();

		FileWriter fileWriter;
		try {
			fileWriter = new FileWriter(path);
			g.toJson(entities, fileWriter);
			fileWriter.flush();
			fileWriter.close();
		} catch (IOException e) {
		}
	}

	@Override
	public boolean create(T entity) {
		Map<K, T> entities = readFile();
		K key = getKey(entity);
		if (entities.containsKey(key)) {
			return false;
		}
		entities.put(key, entity);
		writeFile(entities);

		return true;
	}

	@Override
	public boolean update(T entity) {
		Map<K, T> entities = readFile();
		K key = getKey(entity);
		if (!entities.containsKey(key)) {
			return false;
		}
		entities.put(key, entity);
		writeFile(entities);

		return true;
	}

	@Override
	public T read(K key) {
		Map<K, T> entities = readFile();
		if (!entities.containsKey(key)) {
			return null;
		}
		return entities.get(key);
	}

	@Override
	public boolean delete(T entity) {
		return deleteById(getKey(entity));
	}

	@Override
	public boolean deleteById(K key) {
		Map<K, T> entities = readFile();
		if (!entities.containsKey(key)) {
			return false;
		}
		T entity = setDeleted(entities.get(key));
		entities.put(key, entity);
		//entities.remove(key);
		writeFile(entities);

		return true;
	}

	@Override
	public Map<K, T> readAll() {
		return readFile();
	}

	@Override
	public List<T> readAllEntities() {
		return (List<T>) readFile().values();
	}
}
