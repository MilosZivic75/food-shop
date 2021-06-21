package beans;

import java.awt.Image;
import java.util.ArrayList;

import enumerations.RestaurantTypes;
import enumerations.RestaurantStatus;

public class Restaurant {
	private String name;
	private RestaurantTypes restaurantType;
	private ArrayList<Article> articles;
	private RestaurantStatus status;
	private Location location;
	private Image logo;
	
	public Restaurant() {
		super();
	}

	public Restaurant(String name, RestaurantTypes restaurantType, ArrayList<Article> articles, RestaurantStatus status,
			Location location, Image logo) {
		super();
		this.name = name;
		this.restaurantType = restaurantType;
		this.articles = articles;
		this.status = status;
		this.location = location;
		this.logo = logo;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public RestaurantTypes getRestaurantType() {
		return restaurantType;
	}

	public void setRestaurantType(RestaurantTypes restaurantType) {
		this.restaurantType = restaurantType;
	}

	public ArrayList<Article> getArticles() {
		return articles;
	}

	public void setArticles(ArrayList<Article> articles) {
		this.articles = articles;
	}

	public RestaurantStatus getStatus() {
		return status;
	}

	public void setStatus(RestaurantStatus status) {
		this.status = status;
	}

	public Location getLocation() {
		return location;
	}

	public void setLocation(Location location) {
		this.location = location;
	}

	public Image getLogo() {
		return logo;
	}

	public void setLogo(Image logo) {
		this.logo = logo;
	}
}
