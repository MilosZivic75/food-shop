package services;

import beans.Manager;
import beans.User;
import repositories.IRepository;
import repositories.ManagerRepository;

public class ManagerService extends Service<String, Manager> {

	private ManagerRepository managerRepository = new ManagerRepository();
	public ManagerService(IRepository<String, Manager> repository) {
		super(repository);
	}

	public boolean updateUserData(User user) {
		return managerRepository.updateUserData(user);
	}
}
