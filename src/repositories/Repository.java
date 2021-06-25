package repositories;

import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.util.HashMap;
import java.lang.reflect.Type;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonIOException;
import com.google.gson.JsonSyntaxException;

public class Repository<K,T> {
	protected String path;
	private static Gson g = new GsonBuilder().setPrettyPrinting().setDateFormat("yyyy-MM-dd").create();
	private final Type type;
	
	public Repository(Type type) {
        this.type = type;
	}
	
	public HashMap<K, T> getAllMap() throws JsonSyntaxException, JsonIOException, FileNotFoundException {
		HashMap<K, T> retVal = g.fromJson(new FileReader(path), type);
				
		return retVal;
	}
	
	public void add(K key, T entity) throws JsonSyntaxException, JsonIOException, IOException {
		HashMap<K, T> entities = getAllMap();
		
		entities.put(key, entity);
        FileWriter fileWriter = new FileWriter(path);
		g.toJson(entities, fileWriter);
		fileWriter.flush();
		fileWriter.close();
	}
}
