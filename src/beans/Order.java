package beans;

import java.time.LocalDateTime;
import java.util.ArrayList;

import enumerations.OrderStatus;

public class Order {
	private String id;
	private ArrayList<Article> articles;
	private ArrayList<Integer> quantity;
	private String restaurantID;
	private LocalDateTime date;
	private double price;
	private String customerUsername;
	private OrderStatus orderStatus;
	private Boolean requested;
	
	public Order() {
		super();
	}

	public Order(String id, ArrayList<Article> articles, ArrayList<Integer> quantity, String restaurantID, LocalDateTime date, double price,
			String customerUsername, OrderStatus orderStatus) {
		super();
		this.id = id;
		this.articles = articles;
		this.quantity = quantity;
		this.restaurantID = restaurantID;
		this.date = date;
		this.price = price;
		this.customerUsername = customerUsername;
		this.orderStatus = orderStatus;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public ArrayList<Article> getArticles() {
		return articles;
	}

	public void setArticles(ArrayList<Article> articles) {
		this.articles = articles;
	}
	
	public ArrayList<Integer> getQuantity() {
		return quantity;
	}

	public void setQuantity(ArrayList<Integer> quantity) {
		this.quantity = quantity;
	}
	
	public String getRestaurant() {
		return restaurantID;
	}

	public void setRestaurant(String restaurantID) {
		this.restaurantID = restaurantID;
	}

	public LocalDateTime getDate() {
		return date;
	}

	public void setDate(LocalDateTime date) {
		this.date = date;
	}

	public double getPrice() {
		return price;
	}

	public void setPrice(double price) {
		this.price = price;
	}

	public String getCustomer() {
		return customerUsername;
	}

	public void setCustomer(String customerUsername) {
		this.customerUsername = customerUsername;
	}

	public OrderStatus getOrderStatus() {
		return orderStatus;
	}

	public void setOrderStatus(OrderStatus orderStatus) {
		this.orderStatus = orderStatus;
	}
	
	public Boolean getRequested() {
		return requested;
	}
	
	public void setRequested(Boolean requested) {
		this.requested = requested;
	}
}
