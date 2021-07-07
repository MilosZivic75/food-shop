package services;

import beans.Customer;
import beans.User;
import enumerations.CustomerTypes;
import repositories.CustomerRepository;
import repositories.IRepository;

public class CustomerService extends Service<String, Customer> {

	private CustomerRepository customerRepository = new CustomerRepository();
	public CustomerService(IRepository<String, Customer> repository) {
		super(repository);
	}
	
	public boolean updateUserData(User user) {
		return customerRepository.updateUserData(user);
	}
	
	public void updateCollectedPoints(User user, double points) {
		customerRepository.updateCollectedPoints(user, points);
	}
	
	public void updateType(User user, CustomerTypes type) {
		customerRepository.updateType(user, type);
	}
}
