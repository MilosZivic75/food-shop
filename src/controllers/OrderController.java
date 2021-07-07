package controllers;

import beans.Order;
import services.IService;

public class OrderController extends Controller<String, Order>{

	public OrderController(IService<String, Order> service) {
		super(service);
	}

}
