package controllers;

import beans.Article;
import beans.Cart;
import services.CartService;

public class CartController{
	private CartService cartService = new CartService();
	
	public CartController() {
		
	}
	
	public void addArticle(Article article, String username, int quantity) {
		cartService.add(article, username, quantity);
	}
	
	public Cart getUserCart() {
		return cartService.getCart();
	}
	
	public void removeFromCart(Article article, int quantity) {
		cartService.remove(article, quantity);
	}
	
	public void refreshCart() {
		cartService.refreshCart();
	}
}
