package repositories;

import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.util.HashMap;
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

	/*
	 * public HashMap<K, T> getAllMap() throws JsonSyntaxException, JsonIOException,
	 * FileNotFoundException { String path = getPath(); Type type = getType();
	 * 
	 * return g.fromJson(new FileReader(path), type); }
	 * 
	 * public void add(K key, T entity) throws JsonSyntaxException, JsonIOException,
	 * IOException { String path = getPath();
	 * 
	 * HashMap<K, T> entities = getAllMap();
	 * 
	 * entities.put(key, entity); FileWriter fileWriter = new FileWriter(path);
	 * g.toJson(entities, fileWriter); fileWriter.flush(); fileWriter.close(); }
	 */

	private Map<K, T> readFile() {
		String path = getPath();
		Type type = getType();

		try {
			Map<K, T> retVal = g.fromJson(new FileReader(path), type);
			if (retVal == null)
				throw new FileNotFoundException();
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
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public T read(K key) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public boolean delete(T entity) {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public boolean deleteById(K key) {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public Map<K, T> readAll() {
		return readFile();
	}

}
