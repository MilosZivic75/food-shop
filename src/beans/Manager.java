package beans;

import java.util.Date;

public class Manager extends User {
	private String restaurantId;

	public Manager() {
		super();
	}

	public Manager(String username, String password, String name, String lastName, String sex, Date birthDate,
			String userRole) {
		super(username, password, name, lastName, sex, birthDate, userRole);
		restaurantId = "";
	}

	public Manager(String username, String password, String name, String lastName, String sex, Date birthDate,
			String userRole, String restaurantId) {
		super(username, password, name, lastName, sex, birthDate, userRole);
		this.restaurantId = restaurantId;
	}

	public String getRestaurantId() {
		return restaurantId;
	}

	public void setRestaurantId(String restaurantId) {
		this.restaurantId = restaurantId;
	}
}
