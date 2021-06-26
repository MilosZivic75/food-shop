package repositories;

import java.lang.reflect.Type;
import java.util.HashMap;

import com.google.gson.reflect.TypeToken;

import beans.Administrator;

public class AdministratorRepository extends Repository<String, Administrator> {
	
	@Override
	protected String getPath() {
		return "static/data/administratori.json";
	}

	@Override
	protected Type getType() {
		return new TypeToken<HashMap<String, Administrator>>(){}.getType();
	}

	@Override
	protected String getKey(Administrator entity) {
		return entity.getUsername();
	}

}
