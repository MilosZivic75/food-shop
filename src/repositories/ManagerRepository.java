package repositories;

import java.lang.reflect.Type;
import java.util.HashMap;
import java.util.Map;

import com.google.gson.reflect.TypeToken;

import beans.Manager;
import beans.User;

public class ManagerRepository extends Repository<String, Manager> {

	@Override
	protected String getPath() {
		return "static/data/managers.json";
	}

	@Override
	protected Type getType() {
		return new TypeToken<HashMap<String, Manager>>(){}.getType();
	}

	@Override
	protected String getKey(Manager entity) {
		return entity.getUsername();
	}

	@Override
	protected int getDeleted(Manager entity) {
		return entity.getDeleted();
	}

	@Override
	protected Manager setDeleted(Manager entity) {
		entity.setDeleted(1);
		return entity;
	}
	
	public boolean updateUserData(User user) {
		Map<String, Manager> entities = readFile();
		if (!entities.containsKey(user.getUsername())) {
			return false;
		}
		Manager manager = entities.get(user.getUsername());
		manager.setName(user.getName());
		manager.setLastName(user.getLastName());
		manager.setSex(user.getSex());
		manager.setBirthDate(user.getBirthDate());
		manager.setPassword(user.getPassword());
		entities.put(manager.getUsername(), manager);
		writeFile(entities);

		return true;
	}

}
