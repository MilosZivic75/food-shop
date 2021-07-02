package beans;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;

import enumerations.CustomerTypes;

public class Customer extends User {
	private ArrayList<Order> allOrders;
	private Cart cart;
	private int collectedPoints;
	private CustomerType customerType;
	
	public Customer() {
		super();
	}
	public Customer(String username, String password, String name, String lastName, String sex, Date birthDate,
			String userRole) {
		super(username, password, name, lastName, sex, birthDate, userRole);
		allOrders = new ArrayList<Order>();
		cart = new Cart(new HashMap<Article, Integer>(), this.getUsername(), 0);
		collectedPoints = 0;
		customerType = new CustomerType(CustomerTypes.REGULAR, 0, 0);
	}
	
	public Customer(String username, String password, String name, String lastName, String sex, Date birthDate,
			String userRole, ArrayList<Order> allOrders, Cart cart, int collectedPoints, CustomerType customerType) {
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
	public int getCollectedPoints() {
		return collectedPoints;
	}
	public void setCollectedPoints(int collectedPoints) {
		this.collectedPoints = collectedPoints;
	}
	public CustomerType getCustomerType() {
		return customerType;
	}
	public void setCustomerType(CustomerType customerType) {
		this.customerType = customerType;
	}
}
