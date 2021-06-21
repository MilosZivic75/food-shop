package beans;

import java.util.ArrayList;
import java.util.Date;

import enumerations.OrderStatus;

public class Order {
	private String id;
	private ArrayList<Article> articles;
	private Restaurant restaurant;
	private Date date;
	private double price;
	private Customer customer;
	private OrderStatus orderStatus;
	
	public Order() {
		super();
	}

	public Order(String id, ArrayList<Article> articles, Restaurant restaurant, Date date, double price,
			Customer customer, OrderStatus orderStatus) {
		super();
		this.id = id;
		this.articles = articles;
		this.restaurant = restaurant;
		this.date = date;
		this.price = price;
		this.customer = customer;
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

	public Restaurant getRestaurant() {
		return restaurant;
	}

	public void setRestaurant(Restaurant restaurant) {
		this.restaurant = restaurant;
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

	public Customer getCustomer() {
		return customer;
	}

	public void setCustomer(Customer customer) {
		this.customer = customer;
	}

	public OrderStatus getOrderStatus() {
		return orderStatus;
	}

	public void setOrderStatus(OrderStatus orderStatus) {
		this.orderStatus = orderStatus;
	}
}
