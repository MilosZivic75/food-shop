package services;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.util.Date;
import java.util.HashMap;

import com.google.gson.JsonIOException;
import com.google.gson.JsonSyntaxException;

import beans.Administrator;
import beans.Customer;
import beans.User;
import enumerations.UserRoles;
import repositories.AdministratorRepository;
import repositories.CustomerRepository;

public class UserService {
	private HashMap<String, Customer> customers;
	private HashMap<String, Administrator> administrators;
	
	private CustomerRepository customerRepository = new CustomerRepository();
	private AdministratorRepository administratorRepository = new AdministratorRepository();
	
	public UserService() throws JsonSyntaxException, JsonIOException, FileNotFoundException {
		customers = customerRepository.getAllMap();
		administrators = administratorRepository.getAllMap();
	}
	
	public User userExists(String username, String password) {
		if (!customers.containsKey(username) && !administrators.containsKey(username)) {
			return null;
		}
		User user;
		if (customers.containsKey(username))
			user = customers.get(username);
		else
			user = administrators.get(username);
		
		if (!user.getPassword().equals(password)) {
			return null;
		}
		return user;
	}
	
	public User registerUser(String name, String lastName, Date birthDate, String sex, String username, String password) throws JsonSyntaxException, JsonIOException, IOException {
		if (customers.containsKey(username) || administrators.containsKey(username)) {
			return null;
		}
		Customer customer = new Customer(username, password, name, lastName, sex, birthDate, UserRoles.CUSTOMER);
		customers.put(username, customer);
		customerRepository.add(username, customer);
		
		return customer;
	}
}
