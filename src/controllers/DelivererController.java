package controllers;

import beans.Deliverer;
import services.IService;

public class DelivererController extends Controller<String, Deliverer> {

	public DelivererController(IService<String, Deliverer> service) {
		super(service);
	}

}
