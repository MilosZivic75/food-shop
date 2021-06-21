package beans;

import java.util.HashMap;

public class Cart {
	private HashMap<Article, Integer> articles;
	private Customer customer;
	private double price;
	
	public Cart() {
		super();
	}

	public Cart(HashMap<Article, Integer> articles, Customer customer, double price) {
		super();
		this.articles = articles;
		this.customer = customer;
		this.price = price;
	}

	public HashMap<Article, Integer> getArticles() {
		return articles;
	}

	public void setArticles(HashMap<Article, Integer> articles) {
		this.articles = articles;
	}

	public Customer getCustomer() {
		return customer;
	}

	public void setCustomer(Customer customer) {
		this.customer = customer;
	}

	public double getPrice() {
		return price;
	}

	public void setPrice(double price) {
		this.price = price;
	}
}
