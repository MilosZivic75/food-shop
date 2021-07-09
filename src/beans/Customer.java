package beans;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;

import enumerations.CustomerTypes;

public class Customer extends User {
	private ArrayList<Order> allOrders;
	private Cart cart;
	private double collectedPoints;
	private CustomerTypes customerType;
	private boolean suspicious;
	
	public Customer() {
		super();
	}
	public Customer(String username, String password, String name, String lastName, String sex, Date birthDate,
			String userRole) {
		super(username, password, name, lastName, sex, birthDate, userRole);
		allOrders = new ArrayList<Order>();
		cart = new Cart(new HashMap<String, Integer>(), this.getUsername(), 0);
		collectedPoints = 0;
		customerType = CustomerTypes.REGULAR;
		suspicious = false;
	}
	
	public Customer(String username, String password, String name, String lastName, String sex, Date birthDate,
			String userRole, ArrayList<Order> allOrders, Cart cart, double collectedPoints, CustomerTypes customerType) {
		super(username, password, name, lastName, sex, birthDate, userRole);
		this.allOrders = allOrders;
		this.cart = cart;
		this.collectedPoints = collectedPoints;
		this.customerType = customerType;
	}
	
	public ArrayList<Order> getAllOrders() {
		return allOrders;
	}
	public void setAllOrders(ArrayList<Order> allOrders) {
		this.allOrders = allOrders;
	}
	public Cart getCart() {
		return cart;
	}
	public void setCart(Cart cart) {
		this.cart = cart;
	}
	public double getCollectedPoints() {
		return collectedPoints;
	}
	public void setCollectedPoints(double collectedPoints) {
		this.collectedPoints = collectedPoints;
	}
	public CustomerTypes getCustomerType() {
		return customerType;
	}
	public void setCustomerType(CustomerTypes customerType) {
		this.customerType = customerType;
	}
	public boolean isSuspicious() {
		return suspicious;
	}
	public void setSuspicious(boolean suspicious) {
		this.suspicious = suspicious;
	}
}
