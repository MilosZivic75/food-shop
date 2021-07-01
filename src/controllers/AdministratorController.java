package controllers;

import beans.Administrator;
import beans.User;
import repositories.AdministratorRepository;
import services.AdministratorService;
import services.IService;

public class AdministratorController extends Controller<String, Administrator> {

	private AdministratorService administratorService = new AdministratorService(new AdministratorRepository());
	public AdministratorController(IService<String, Administrator> service) {
		super(service);
	}
	
	public boolean updateUserData(User user) {
		return administratorService.updateUserData(user);
	}

}
