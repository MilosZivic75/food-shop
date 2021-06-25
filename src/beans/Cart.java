package beans;

import java.util.HashMap;

public class Cart {
	private HashMap<Article, Integer> articles;
	private String customerUsername;
	private double price;
	
	public Cart() {
		super();
	}

	public Cart(HashMap<Article, Integer> articles, String customerUsername, double price) {
		super();
		this.articles = articles;
		this.customerUsername = customerUsername;
		this.price = price;
	}

	public HashMap<Article, Integer> getArticles() {
		return articles;
	}

	public void setArticles(HashMap<Article, Integer> articles) {
		this.articles = articles;
	}

	public String getCustomer() {
		return customerUsername;
	}

	public void setCustomer(String customerName) {
		this.customerUsername = customerName;
	}

	public double getPrice() {
		return price;
	}

	public void setPrice(double price) {
		this.price = price;
	}
}
