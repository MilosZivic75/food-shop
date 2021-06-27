package repositories;

import java.lang.reflect.Type;
import java.util.HashMap;

import com.google.gson.reflect.TypeToken;

import beans.Customer;

public class CustomerRepository extends Repository<String, Customer> {
	
	@Override
	protected String getPath() {
		return "static/data/customers.json";
	}

	@Override
	protected Type getType() {
		return new TypeToken<HashMap<String, Customer>>(){}.getType();
	}

	@Override
	protected String getKey(Customer entity) {
		return entity.getUsername();
	}

}
