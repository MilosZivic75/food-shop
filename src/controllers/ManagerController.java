package controllers;

import beans.Manager;
import beans.User;
import repositories.ManagerRepository;
import services.IService;
import services.ManagerService;

public class ManagerController extends Controller<String, Manager> {

	private ManagerService managerService = new ManagerService(new ManagerRepository());
	public ManagerController(IService<String, Manager> service) {
		super(service);
	}
	
	public boolean updateUserData(User user) {
		return managerService.updateUserData(user);
	}

}
