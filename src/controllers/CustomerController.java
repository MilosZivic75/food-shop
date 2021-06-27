package controllers;

import beans.Customer;
import services.IService;

public class CustomerController extends Controller<String, Customer> {

	public CustomerController(IService<String, Customer> service) {
		super(service);
	}

}
