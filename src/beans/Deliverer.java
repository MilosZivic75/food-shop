package beans;

import java.util.ArrayList;
import java.util.Date;

import enumerations.UserRoles;

public class Deliverer extends User {
	private ArrayList<Order> orders;

	public Deliverer() {
		super();
	}

	public Deliverer(String username, String password, String name, String lastName, String sex, Date birthDate,
			UserRoles userRole) {
		super(username, password, name, lastName, sex, birthDate, userRole);
	}

	public Deliverer(String username, String password, String name, String lastName, String sex, Date birthDate,
			UserRoles userRole, ArrayList<Order> orders) {
		super(username, password, name, lastName, sex, birthDate, userRole);
		this.orders = orders;
	}

	public ArrayList<Order> getOrders() {
		return orders;
	}

	public void setOrders(ArrayList<Order> orders) {
		this.orders = orders;
	}
}
