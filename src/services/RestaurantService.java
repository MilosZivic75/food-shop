package services;

import beans.Restaurant;
import repositories.IRepository;

public class RestaurantService extends Service<String, Restaurant> {

	public RestaurantService(IRepository<String, Restaurant> repository) {
		super(repository);
	}

}
