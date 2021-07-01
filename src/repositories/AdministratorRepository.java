package repositories;

import java.lang.reflect.Type;
import java.util.HashMap;
import java.util.Map;

import com.google.gson.reflect.TypeToken;

import beans.Administrator;
import beans.User;

public class AdministratorRepository extends Repository<String, Administrator> {
	
	@Override
	protected String getPath() {
		return "static/data/administrators.json";
	}

	@Override
	protected Type getType() {
		return new TypeToken<HashMap<String, Administrator>>(){}.getType();
	}

	@Override
	protected String getKey(Administrator entity) {
		return entity.getUsername();
	}
	
	@Override
	protected int getDeleted(Administrator entity) {
		return entity.getDeleted();
	}

	@Override
	protected Administrator setDeleted(Administrator entity) {
		entity.setDeleted(1);
		return entity;
	}
	
	public boolean updateUserData(User user) {
		Map<String, Administrator> entities = readFile();
		if (!entities.containsKey(user.getUsername())) {
			return false;
		}
		Administrator administrator = entities.get(user.getUsername());
		administrator.setName(user.getName());
		administrator.setLastName(user.getLastName());
		administrator.setSex(user.getSex());
		administrator.setBirthDate(user.getBirthDate());
		administrator.setPassword(user.getPassword());
		entities.put(administrator.getUsername(), administrator);
		writeFile(entities);

		return true;
	}

}
