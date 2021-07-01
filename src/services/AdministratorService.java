package services;

import beans.Administrator;
import beans.User;
import repositories.AdministratorRepository;
import repositories.IRepository;

public class AdministratorService extends Service<String, Administrator> {
	private AdministratorRepository administratorRepository = new AdministratorRepository();
	public AdministratorService(IRepository<String, Administrator> repository) {
		super(repository);
	}
	
	public boolean updateUserData(User user) {
		return administratorRepository.updateUserData(user);
	}
}
