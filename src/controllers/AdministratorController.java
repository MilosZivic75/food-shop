package controllers;

import beans.Administrator;
import services.IService;

public class AdministratorController extends Controller<String, Administrator> {

	public AdministratorController(IService<String, Administrator> service) {
		super(service);
	}

}
