package repositories;

import java.util.HashMap;

import com.google.gson.reflect.TypeToken;

import beans.Customer;

public class CustomerRepository extends Repository<String, Customer> {

	public CustomerRepository() {
		super(new TypeToken<HashMap<String, Customer>>(){}.getType());
		path = "static/data/kupci.json";
	}

}
