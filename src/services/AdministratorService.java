package services;

import beans.Administrator;
import repositories.IRepository;

public class AdministratorService extends Service<String, Administrator> {
	public AdministratorService(IRepository<String, Administrator> repository) {
		super(repository);
	}
}
