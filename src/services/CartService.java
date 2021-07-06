package services; 

import java.util.HashMap;

import beans.Article;
import beans.Cart;

public class CartService  {
	private HashMap<String, Integer> articles = new HashMap<String, Integer>();
	private double price = 0;
	private String username;
	
	public CartService() {
		
	}
	
	public void refreshCart() {
		articles = new HashMap<String, Integer>();
		price = 0;
	}

	public void add(Article article, String username, int quantity) {
		if(articles.containsKey(article.getName() + " " + article.getRestaurant())) {
			this.price += article.getPrice() * (quantity - 
					articles.get(article.getName() + " " + article.getRestaurant()));
			articles.put(article.getName() + " " + article.getRestaurant(), quantity);
			
		} else {
			articles.put(article.getName() + " " + article.getRestaurant(), quantity);
			this.price += article.getPrice() * quantity;
		}
		this.username = username;
	}
	
	public Cart getCart() {
		Cart cart = new Cart(articles, username, price);
		return cart;
	}
	
	public void remove(Article article, int quantity) {
		articles.remove(article.getName() + " " + article.getRestaurant());
		this.price -= article.getPrice() * quantity;
	}
}
