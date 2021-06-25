package repositories;

import java.util.HashMap;

import com.google.gson.reflect.TypeToken;

import beans.Administrator;

public class AdministratorRepository extends Repository<String, Administrator> {

	public AdministratorRepository() {
		super(new TypeToken<HashMap<String, Administrator>>(){}.getType());
		path = "static/data/administratori.json";
	}

}
