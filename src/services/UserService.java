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
	/*
	 * private Map<String, Customer> customers; private Map<String, Administrator>
	 * administrators; private Map<String, Manager> managers; private Map<String,
	 * Deliverer> deliverers;
	 */

	private CustomerRepository customerRepository = new CustomerRepository();
	private AdministratorRepository administratorRepository = new AdministratorRepository();
	private ManagerRepository managerRepository = new ManagerRepository();
	private DelivererRepository delivererRepository = new DelivererRepository();

	public UserService() {
		/*
		 * customers = customerRepository.readAll(); administrators =
		 * administratorRepository.readAll(); managers = managerRepository.readAll();
		 * deliverers = delivererRepository.readAll();
		 */

	}

	public User userExists(String username, String password) {
		if (!customerRepository.readAll().containsKey(username)
				&& !administratorRepository.readAll().containsKey(username)
				&& !managerRepository.readAll().containsKey(username)
				&& !delivererRepository.readAll().containsKey(username)) {
			return null;
		}
		User user;
		if (customerRepository.readAll().containsKey(username))
			user = customerRepository.read(username);
		else if (managerRepository.readAll().containsKey(username))
			user = managerRepository.read(username);
		else if (delivererRepository.readAll().containsKey(username))
			user = delivererRepository.read(username);
		else
			user = administratorRepository.read(username);

		if (!user.getPassword().equals(password)) {
			return null;
		}
		return user;
	}

	public User registerUser(String name, String lastName, Date birthDate, String sex, String username,
			String password) {
		if (customerRepository.readAll().containsKey(username)
				|| administratorRepository.readAll().containsKey(username)
				|| managerRepository.readAll().containsKey(username)
				|| delivererRepository.readAll().containsKey(username)) {
			return null;
		}
		Customer customer = new Customer(username, password, name, lastName, sex, birthDate, "Kupac");
		customerRepository.create(customer);

		return customer;
	}

	public User addUser(String name, String lastName, Date birthDate, String sex, String username, String password,
			String userRole) {
		if (customerRepository.readAll().containsKey(username)
				|| administratorRepository.readAll().containsKey(username)
				|| managerRepository.readAll().containsKey(username)
				|| delivererRepository.readAll().containsKey(username)) {
			return null;
		}
		if (userRole.equals("Menadžer")) {
			Manager manager = new Manager(username, password, name, lastName, sex, birthDate, userRole);
			managerRepository.create(manager);

			return manager;
		} else if (userRole.equals("Dostavljač")) {
			Deliverer deliverer = new Deliverer(username, password, name, lastName, sex, birthDate, userRole);
			delivererRepository.create(deliverer);

			return deliverer;
		}

		return null;
	}

	public void deleteUser(String username) {
		if (customerRepository.readAll().containsKey(username))
			customerRepository.deleteById(username);
		else if (managerRepository.readAll().containsKey(username))
			managerRepository.deleteById(username);
		else if (delivererRepository.readAll().containsKey(username))
			delivererRepository.deleteById(username);
	}

	public void blockUser(String username) {
		if (customerRepository.readAll().containsKey(username)) {
			Customer customer = customerRepository.read(username);
			customer.setBlocked(1);
			customerRepository.update(customer);
		}

		else if (managerRepository.readAll().containsKey(username)) {
			Manager manager = managerRepository.read(username);
			manager.setBlocked(1);
			managerRepository.update(manager);
		}

		else if (delivererRepository.readAll().containsKey(username)) {
			Deliverer deliverer = delivererRepository.read(username);
			deliverer.setBlocked(1);
			delivererRepository.update(deliverer);
		}
	}

	public void unblockUser(String username) {
		if (customerRepository.readAll().containsKey(username)) {
			Customer customer = customerRepository.read(username);
			customer.setBlocked(0);
			customerRepository.update(customer);
		}

		else if (managerRepository.readAll().containsKey(username)) {
			Manager manager = managerRepository.read(username);
			manager.setBlocked(0);
			managerRepository.update(manager);
		}

		else if (delivererRepository.readAll().containsKey(username)) {
			Deliverer deliverer = delivererRepository.read(username);
			deliverer.setBlocked(0);
			delivererRepository.update(deliverer);
		}
	}
}
