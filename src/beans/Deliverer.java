package beans;

import java.util.ArrayList;
import java.util.Date;

public class Deliverer extends User {
	private ArrayList<Order> orders;

	public Deliverer() {
		super();
	}

	public Deliverer(String username, String password, String name, String lastName, String sex, Date birthDate,
			String userRole) {
		super(username, password, name, lastName, sex, birthDate, userRole);
		orders = new ArrayList<Order>();
	}

	public Deliverer(String username, String password, String name, String lastName, String sex, Date birthDate,
			String userRole, ArrayList<Order> orders) {
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
