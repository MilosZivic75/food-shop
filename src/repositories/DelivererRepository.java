package repositories;

import java.lang.reflect.Type;
import java.util.HashMap;

import com.google.gson.reflect.TypeToken;

import beans.Deliverer;

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

}
