package repositories;

import java.lang.reflect.Type;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.google.gson.reflect.TypeToken;

import beans.Comment;
import beans.Restaurant;

public class RestaurantRepository extends Repository<String, Restaurant> {

	@Override
	protected String getPath() {
		return "static/data/restaurants.json";
	}

	@Override
	protected Type getType() {
		return new TypeToken<HashMap<String, Restaurant>>(){}.getType();
	}

	@Override
	protected String getKey(Restaurant entity) {
		return entity.getName();
	}

	@Override
	protected int getDeleted(Restaurant entity) {
		return entity.getDeleted();
	}

	@Override
	protected Restaurant setDeleted(Restaurant entity) {
		entity.setDeleted(1);
		return entity;
	}
	
	public void updateAverage(String restaurantID, List<Comment> comments) {
		
		Map<String, Restaurant> entities = readFile();
		Restaurant restaurant = entities.get(restaurantID);
		double total = 0;
		int divider = 0;
		
		for(Comment comment: comments) {
			if(comment.getRestaurant().equals(restaurantID)) {
				total += comment.getGrade();
				divider++;
			}
		}
		restaurant.setAverageRating(total/divider);
		entities.put(restaurantID, restaurant);
		writeFile(entities); 
	}
}
