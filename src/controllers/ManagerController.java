package controllers;

import beans.Manager;
import services.IService;

public class ManagerController extends Controller<String, Manager> {

	public ManagerController(IService<String, Manager> service) {
		super(service);
	}

}
