package services;

import java.util.Date;
import java.util.Map;

import beans.Administrator;
import beans.Customer;
import beans.Deliverer;
import beans.Manager;
import beans.User;
import repositories.AdministratorRepository;
import repositories.CustomerRepository;
import repositories.DelivererRepository;
import repositories.ManagerRepository;

public class UserService {
	private Map<String, Customer> customers;
	private Map<String, Administrator> administrators;
	private Map<String, Manager> managers;
	private Map<String, Deliverer> deliverers;
	
	private CustomerRepository customerRepository = new CustomerRepository();
	private AdministratorRepository administratorRepository = new AdministratorRepository();
	private ManagerRepository managerRepository = new ManagerRepository();
	private DelivererRepository delivererRepository = new DelivererRepository();
	
	public UserService() {
		customers = customerRepository.readAll();
		administrators = administratorRepository.readAll();
		managers = managerRepository.readAll();
		deliverers = delivererRepository.readAll();
		
	}
	
	public User userExists(String username, String password) {
		if (!customers.containsKey(username) && !administrators.containsKey(username) && 
				!managers.containsKey(username) && !deliverers.containsKey(username)) {
			return null;
		}
		User user;
		if (customers.containsKey(username))
			user = customers.get(username);
		else if (managers.containsKey(username))
			user = managers.get(username);
		else if (deliverers.containsKey(username))
			user = deliverers.get(username);
		else
			user = administrators.get(username);
		
		if (!user.getPassword().equals(password)) {
			return null;
		}
		return user;
	}
	
	public User registerUser(String name, String lastName, Date birthDate, String sex, String username, String password) {
		if (customers.containsKey(username) || administrators.containsKey(username) || 
				managers.containsKey(username) || deliverers.containsKey(username)) {
			return null;
		}
		Customer customer = new Customer(username, password, name, lastName, sex, birthDate, "Kupac");
		customers.put(username, customer);
		customerRepository.create(customer);
		
		return customer;
	}
	
	public User addUser(String name, String lastName, Date birthDate, String sex, String username, String password, String userRole) {
		if (customers.containsKey(username) || administrators.containsKey(username) || 
				managers.containsKey(username) || deliverers.containsKey(username)) {
			return null;
		}
		if (userRole.equals("Menadžer")) {
			Manager manager = new Manager(username, password, name, lastName, sex, birthDate, userRole);
			managers.put(manager.getUsername(), manager);
			managerRepository.create(manager);
			
			return manager;
		}
		else if (userRole.equals("Dostavljač")) {
			Deliverer deliverer = new Deliverer(username, password, name, lastName, sex, birthDate, userRole);
			deliverers.put(deliverer.getUsername(), deliverer);
			delivererRepository.create(deliverer);
			
			return deliverer;
		}
		
		return null;
	}
	
	public void deleteUser(String username) {
		if (customers.containsKey(username))
			customerRepository.deleteById(username);
		else if (managers.containsKey(username))
			managerRepository.deleteById(username);
		else if (deliverers.containsKey(username))
			delivererRepository.deleteById(username);
		else
			administratorRepository.deleteById(username);
	}
}
