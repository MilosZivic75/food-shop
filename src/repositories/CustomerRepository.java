package repositories;

import java.lang.reflect.Type;
import java.util.HashMap;
import java.util.Map;

import com.google.gson.reflect.TypeToken;

import beans.Customer;
import beans.User;
import enumerations.CustomerTypes;

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

	@Override
	protected int getDeleted(Customer entity) {
		return entity.getDeleted();
	}

	@Override
	protected Customer setDeleted(Customer entity) {
		entity.setDeleted(1);
		return entity;
	}
	
	public boolean updateUserData(User user) {
		Map<String, Customer> entities = readFile();
		if (!entities.containsKey(user.getUsername())) {
			return false;
		}
		Customer customer = entities.get(user.getUsername());
		customer.setName(user.getName());
		customer.setLastName(user.getLastName());
		customer.setSex(user.getSex());
		customer.setBirthDate(user.getBirthDate());
		customer.setPassword(user.getPassword());
		entities.put(customer.getUsername(), customer);
		writeFile(entities);

		return true;
	}
	
	public void updateCollectedPoints(User user, double points) {
		Map<String, Customer> entities = readFile();
		
		Customer customer = entities.get(user.getUsername());
		customer.setCollectedPoints(points);
		entities.put(customer.getUsername(), customer);
		writeFile(entities);
	}
	
	public void updateType(User user, CustomerTypes type) {
		Map<String, Customer> entities = readFile();
		
		Customer customer = entities.get(user.getUsername());
		customer.setCustomerType(type);
		entities.put(customer.getUsername(), customer);
		writeFile(entities);
	}
}
