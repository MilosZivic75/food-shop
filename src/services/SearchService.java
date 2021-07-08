package services;

import java.util.ArrayList;
import java.util.List;

import beans.Restaurant;

public class SearchService {
	List<Restaurant> searchedRestaurants = new ArrayList<Restaurant>();
	
	public SearchService() {}
	
	public List<Restaurant> getRestaurants() {
		return searchedRestaurants;
	}
	
	public void findByTypeAndGrade(String type, String grade, List<Restaurant> restaurants) {
		searchedRestaurants = new ArrayList<Restaurant>();
		int firstGrade = Integer.parseInt(grade.split("-")[0]);
		int secondGrade = Integer.parseInt(grade.split("-")[1]);
		
		for(Restaurant restaurant: restaurants) {
			if(restaurant.getAverageRating() >= firstGrade && restaurant.getAverageRating() <= secondGrade
					&& restaurant.getRestaurantType().equals(type)) {
				searchedRestaurants.add(restaurant);
			}
		}
	}
	
	public void findByGrades(String grade, List<Restaurant> restaurants) {
		searchedRestaurants = new ArrayList<Restaurant>();
		int firstGrade = Integer.parseInt(grade.split("-")[0]);
		int secondGrade = Integer.parseInt(grade.split("-")[1]);
		
		for(Restaurant restaurant: restaurants) {
			if(restaurant.getAverageRating() > firstGrade && restaurant.getAverageRating() < secondGrade)
				searchedRestaurants.add(restaurant);
		}
	}
	
	public void findByType(String type, List<Restaurant> restaurants) {	
		searchedRestaurants = new ArrayList<Restaurant>();
		for(Restaurant restaurant: restaurants) {
			if(restaurant.getRestaurantType().equals(type))
				searchedRestaurants.add(restaurant);
		}
	}
	
	public void findByLocation(String location, List<Restaurant> restaurants) {	
		searchedRestaurants = new ArrayList<Restaurant>();
		for(Restaurant restaurant: restaurants) {
			if(restaurant.getLocation().getAddress().getStreet().equals(location))
				searchedRestaurants.add(restaurant);
		}
	}
	
	public void findByName(String name, List<Restaurant> restaurants) {	
		searchedRestaurants = new ArrayList<Restaurant>();
		for(Restaurant restaurant: restaurants) {
			if(restaurant.getName().equals(name))
				searchedRestaurants.add(restaurant);
		}
	}
	
	public void findByLocationAndType(String location, String type, List<Restaurant> restaurants) {
		searchedRestaurants = new ArrayList<Restaurant>();
		for(Restaurant restaurant: restaurants) {
			if(restaurant.getLocation().getAddress().getStreet().equals(location) && restaurant.getRestaurantType().equals(type))
				searchedRestaurants.add(restaurant);
		}
	}
	
	public void findByLocationAndGrade(String location, String grade, List<Restaurant> restaurants) {
		searchedRestaurants = new ArrayList<Restaurant>();
		int firstGrade = Integer.parseInt(grade.split("-")[0]);
		int secondGrade = Integer.parseInt(grade.split("-")[1]);
		
		for(Restaurant restaurant: restaurants) {
			if(restaurant.getAverageRating() >= firstGrade && restaurant.getAverageRating() <= secondGrade 
					&& restaurant.getLocation().getAddress().getStreet().equals(location))
				searchedRestaurants.add(restaurant);
		}
	}
	
	public void findByLocationGradeAndType(String location, String type, String grade, List<Restaurant> restaurants) {
		searchedRestaurants = new ArrayList<Restaurant>();
		int firstGrade = Integer.parseInt(grade.split("-")[0]);
		int secondGrade = Integer.parseInt(grade.split("-")[1]);
		
		for(Restaurant restaurant: restaurants) {
			if(restaurant.getAverageRating() >= firstGrade && restaurant.getAverageRating() <= secondGrade 
					&& restaurant.getLocation().getAddress().getStreet().equals(location) && restaurant.getRestaurantType().equals(type))
				searchedRestaurants.add(restaurant);
		}
	}
	
	public void findByNameAndLocation(String name, String location, List<Restaurant> restaurants) {
		searchedRestaurants = new ArrayList<Restaurant>();
		
		for(Restaurant restaurant: restaurants) {
			if(restaurant.getName().equals(name)
					&& restaurant.getLocation().getAddress().getStreet().equals(location))
				searchedRestaurants.add(restaurant);
		}
	}
	
	public void findByNameAndType(String name, String type, List<Restaurant> restaurants) {
		searchedRestaurants = new ArrayList<Restaurant>();
		
		for(Restaurant restaurant: restaurants) {
			if(restaurant.getName().equals(name) && restaurant.getRestaurantType().equals(type))
				searchedRestaurants.add(restaurant);
		}
	} 
	
	public void findByNameAndGrade(String name, String grade, List<Restaurant> restaurants) {
		searchedRestaurants = new ArrayList<Restaurant>();
		int firstGrade = Integer.parseInt(grade.split("-")[0]);
		int secondGrade = Integer.parseInt(grade.split("-")[1]);
		
		for(Restaurant restaurant: restaurants) {
			if(restaurant.getAverageRating() >= firstGrade && restaurant.getAverageRating() <= secondGrade 
					&& restaurant.getName().equals(name))
				searchedRestaurants.add(restaurant);
		}
	}
	
	public void findByNameLocationAndType(String name, String location, String type, List<Restaurant> restaurants) {
		searchedRestaurants = new ArrayList<Restaurant>();
		
		for(Restaurant restaurant: restaurants) {
			if(restaurant.getName().equals(name) && restaurant.getRestaurantType().equals(type)
					&& restaurant.getLocation().getAddress().getStreet().equals(location))
				searchedRestaurants.add(restaurant);
		}
	}
	
	public void findByNameLocationAndGrade(String name, String location, String grade, List<Restaurant> restaurants) {
		searchedRestaurants = new ArrayList<Restaurant>();
		int firstGrade = Integer.parseInt(grade.split("-")[0]);
		int secondGrade = Integer.parseInt(grade.split("-")[1]);
		
		for(Restaurant restaurant: restaurants) {
			if(restaurant.getAverageRating() >= firstGrade && restaurant.getAverageRating() <= secondGrade 
					&& restaurant.getName().equals(name)
					&& restaurant.getLocation().getAddress().getStreet().equals(location))
				searchedRestaurants.add(restaurant);
		}
	}
	
	public void findByNameTypeAndGrade(String name, String type, String grade, List<Restaurant> restaurants) {
		searchedRestaurants = new ArrayList<Restaurant>();
		int firstGrade = Integer.parseInt(grade.split("-")[0]);
		int secondGrade = Integer.parseInt(grade.split("-")[1]);
		
		for(Restaurant restaurant: restaurants) {
			if(restaurant.getAverageRating() >= firstGrade && restaurant.getAverageRating() <= secondGrade 
					&& restaurant.getName().equals(name) && restaurant.getRestaurantType().equals(type))
				searchedRestaurants.add(restaurant);
		}
	}
	
	public void findByAll(String name, String location, String type, String grade, List<Restaurant> restaurants) {
		searchedRestaurants = new ArrayList<Restaurant>();
		int firstGrade = Integer.parseInt(grade.split("-")[0]);
		int secondGrade = Integer.parseInt(grade.split("-")[1]);
		
		for(Restaurant restaurant: restaurants) {
			if(restaurant.getAverageRating() >= firstGrade && restaurant.getAverageRating() <= secondGrade 
					&& restaurant.getName().equals(name) && restaurant.getRestaurantType().equals(type)
					&& restaurant.getLocation().getAddress().getStreet().equals(location))
				searchedRestaurants.add(restaurant);
		}
	}
}
