package services;

import beans.Customer;
import repositories.IRepository;

public class CustomerService extends Service<String, Customer> {

	public CustomerService(IRepository<String, Customer> repository) {
		super(repository);
	}
	/*private CustomerRepository customerRepository = new CustomerRepository();

	public boolean create(Customer customer) {
		return customerRepository.create(customer);
	}

	public boolean update(Customer customer) {
		return customerRepository.update(customer);
	}

	public Customer read(String key) {
		return customerRepository.read(key);
	}

	public boolean delete(Customer customer) {
		return customerRepository.delete(customer);
	}

	public boolean deleteById(String key) {
		return customerRepository.deleteById(key);
	}

	public Map<String, Customer> readAll() {
		return customerRepository.readAll();
	}

	public List<Customer> readAllCustomers() {
		return customerRepository.readAllEntities();
	}*/
}
