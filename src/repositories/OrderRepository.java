package repositories;

import java.lang.reflect.Type;
import java.util.HashMap;

import com.google.gson.reflect.TypeToken;

import beans.Order;

public class OrderRepository extends Repository<String, Order>{

	@Override
	protected String getPath() {
		return "static/data/orders.json";
	}

	@Override
	protected Type getType() {
		return new TypeToken<HashMap<String, Order>>(){}.getType();
	}

	@Override
	protected String getKey(Order entity) {
		return entity.getId();
	}

	@Override
	protected int getDeleted(Order entity) {
		// TODO Auto-generated method stub
		return 0;
	}

	@Override
	protected Order setDeleted(Order entity) {
		// TODO Auto-generated method stub
		return null;
	}

}
