package services;

import beans.Manager;
import repositories.IRepository;

public class ManagerService extends Service<String, Manager> {

	public ManagerService(IRepository<String, Manager> repository) {
		super(repository);
	}
	/*private ManagerRepository managerRepository = new ManagerRepository();

	public boolean create(Manager manager) {
		return managerRepository.create(manager);
	}

	public boolean update(Manager manager) {
		return managerRepository.update(manager);
	}

	public Manager read(String key) {
		return managerRepository.read(key);
	}

	public boolean delete(Manager manager) {
		return managerRepository.delete(manager);
	}

	public boolean deleteById(String key) {
		return managerRepository.deleteById(key);
	}

	public Map<String, Manager> readAll() {
		return managerRepository.readAll();
	}

	public List<Manager> readAllManagers() {
		return managerRepository.readAllEntities();
	}*/
}
