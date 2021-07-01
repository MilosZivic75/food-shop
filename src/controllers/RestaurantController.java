package controllers;

import beans.Restaurant;
import services.IService;

public class RestaurantController extends Controller<String, Restaurant> {

	public RestaurantController(IService<String, Restaurant> service) {
		super(service);
	}

}
