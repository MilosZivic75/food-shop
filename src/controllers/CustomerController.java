package controllers;

import beans.Customer;
import beans.User;
import enumerations.CustomerTypes;
import repositories.CustomerRepository;
import services.CustomerService;
import services.IService;

public class CustomerController extends Controller<String, Customer> {

	private CustomerService customerService = new CustomerService(new CustomerRepository());

	public CustomerController(IService<String, Customer> service) {
		super(service);
	}
	
	public boolean updateUserData(User user) {
		return customerService.updateUserData(user);
	}
	
	public void updateCollectedPoints(User user, double points) {
		customerService.updateCollectedPoints(user, points);
	}
	
	public void updateType(User user, CustomerTypes type) {
		customerService.updateType(user, type);
	}
}
