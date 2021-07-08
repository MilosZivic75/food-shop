package controllers;

import java.util.List;

import beans.Comment;
import beans.Restaurant;
import repositories.RestaurantRepository;
import services.IService;
import services.RestaurantService;

public class RestaurantController extends Controller<String, Restaurant> {
	private RestaurantService restaurantService = new RestaurantService(new RestaurantRepository());
	
	public RestaurantController(IService<String, Restaurant> service) {
		super(service);
	}
	
	public void updateAverage(String restaurantID, List<Comment> comments) {
		restaurantService.updateAverage(restaurantID, comments);
	}
}
