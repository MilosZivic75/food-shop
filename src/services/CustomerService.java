package services;

import beans.Customer;
import beans.User;
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
}
