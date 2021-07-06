package beans;

import java.util.ArrayList;
import java.util.Date;

import enumerations.OrderStatus;

public class Order {
	private String id;
	private ArrayList<Article> articles;
	private String restaurantID;
	private Date date;
	private double price;
	private String customerUsername;
	private OrderStatus orderStatus;
	
	public Order() {
		super();
	}

	public Order(String id, ArrayList<Article> articles, String restaurantID, Date date, double price,
			String customerUsername, OrderStatus orderStatus) {
		super();
		this.id = id;
		this.articles = articles;
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

	public String getRestaurant() {
		return restaurantID;
	}

	public void setRestaurant(String restaurantID) {
		this.restaurantID = restaurantID;
	}

	public Date getDate() {
		return date;
	}

	public void setDate(Date date) {
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
}
