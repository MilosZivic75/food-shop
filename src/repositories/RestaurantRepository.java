package repositories;

import java.lang.reflect.Type;
import java.util.HashMap;

import com.google.gson.reflect.TypeToken;

import beans.Restaurant;

public class RestaurantRepository extends Repository<String, Restaurant> {

	@Override
	protected String getPath() {
		return "/static/data/restaurants.json";
	}

	@Override
	protected Type getType() {
		return new TypeToken<HashMap<String, Restaurant>>(){}.getType();
	}

	@Override
	protected String getKey(Restaurant entity) {
		return entity.getName();
	}

	@Override
	protected int getDeleted(Restaurant entity) {
		return entity.getDeleted();
	}

	@Override
	protected Restaurant setDeleted(Restaurant entity) {
		entity.setDeleted(1);
		return entity;
	}

}
