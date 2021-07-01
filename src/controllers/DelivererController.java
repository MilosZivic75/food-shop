package controllers;

import beans.Deliverer;
import beans.User;
import repositories.DelivererRepository;
import services.DelivererService;
import services.IService;

public class DelivererController extends Controller<String, Deliverer> {

	private DelivererService delivererService = new DelivererService(new DelivererRepository());
	public DelivererController(IService<String, Deliverer> service) {
		super(service);
	}
	
	public boolean updateUserData(User user) {
		return delivererService.updateUserData(user);
	}

}
