package controllers;

import beans.OrderRequest;
import services.IService;

public class RequestController extends Controller<String, OrderRequest>{

	public RequestController(IService<String, OrderRequest> service) {
		super(service);
	}
	
}
