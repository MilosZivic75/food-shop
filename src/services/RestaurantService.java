package services;

import java.util.List;

import beans.Comment;
import beans.Restaurant;
import repositories.IRepository;
import repositories.RestaurantRepository;

public class RestaurantService extends Service<String, Restaurant> {
	private RestaurantRepository restaurantRepository = new RestaurantRepository();
	
	public RestaurantService(IRepository<String, Restaurant> repository) {
		super(repository);
	}
	
	public void updateAverage(String restaurantID, List<Comment> comments) {
		restaurantRepository.updateAverage(restaurantID, comments);
	}
}
