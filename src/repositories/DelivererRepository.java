package repositories;

import java.lang.reflect.Type;
import java.util.HashMap;
import java.util.Map;

import com.google.gson.reflect.TypeToken;

import beans.Deliverer;
import beans.User;

public class DelivererRepository extends Repository<String, Deliverer> {

	@Override
	protected String getPath() {
		return "static/data/deliverers.json";
	}

	@Override
	protected Type getType() {
		return new TypeToken<HashMap<String, Deliverer>>(){}.getType();
	}

	@Override
	protected String getKey(Deliverer entity) {
		return entity.getUsername();
	}

	@Override
	protected int getDeleted(Deliverer entity) {
		return entity.getDeleted();
	}

	@Override
	protected Deliverer setDeleted(Deliverer entity) {
		entity.setDeleted(1);
		return entity;
	}
	
	public boolean updateUserData(User user) {
		Map<String, Deliverer> entities = readFile();
		if (!entities.containsKey(user.getUsername())) {
			return false;
		}
		Deliverer deliverer = entities.get(user.getUsername());
		deliverer.setName(user.getName());
		deliverer.setLastName(user.getLastName());
		deliverer.setSex(user.getSex());
		deliverer.setBirthDate(user.getBirthDate());
		deliverer.setPassword(user.getPassword());
		entities.put(deliverer.getUsername(), deliverer);
		writeFile(entities);

		return true;
	}

}
