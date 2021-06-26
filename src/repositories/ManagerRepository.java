package repositories;

import java.lang.reflect.Type;
import java.util.HashMap;

import com.google.gson.reflect.TypeToken;

import beans.Manager;

public class ManagerRepository extends Repository<String, Manager> {

	@Override
	protected String getPath() {
		return "static/data/menadzeri.json";
	}

	@Override
	protected Type getType() {
		return new TypeToken<HashMap<String, Manager>>(){}.getType();
	}

	@Override
	protected String getKey(Manager entity) {
		return entity.getUsername();
	}

}
