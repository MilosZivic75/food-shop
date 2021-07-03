package beans;

import java.util.Date;

public class Manager extends User {
	private Restaurant restaurant;

	public Manager() {
		super();
	}

	public Manager(String username, String password, String name, String lastName, String sex, Date birthDate,
			String userRole) {
		super(username, password, name, lastName, sex, birthDate, userRole);
		restaurant = new Restaurant();
	}

	public Manager(String username, String password, String name, String lastName, String sex, Date birthDate,
			String userRole, Restaurant restaurant) {
		super(username, password, name, lastName, sex, birthDate, userRole);
		this.restaurant = restaurant;
	}

	public Restaurant getRestaurant() {
		return restaurant;
	}

	public void setRestaurant(Restaurant restaurant) {
		this.restaurant = restaurant;
	}
}
