package controllers;

import beans.Customer;
import beans.User;
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

}
