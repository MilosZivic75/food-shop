package beans;

import java.awt.Image;

import enumerations.ArticleTypes;

public class Article {
	private String name;
	private double price;
	private ArticleTypes articleType;
	private Restaurant restaurant;
	private double amount;
	private String description;
	private Image image;
	
	public Article() {
		super();
	}

	public Article(String name, double price, ArticleTypes articleType, Restaurant restaurant, double amount,
			String description, Image image) {
		super();
		this.name = name;
		this.price = price;
		this.articleType = articleType;
		this.restaurant = restaurant;
		this.amount = amount;
		this.description = description;
		this.image = image;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public double getPrice() {
		return price;
	}

	public void setPrice(double price) {
		this.price = price;
	}

	public ArticleTypes getArticleType() {
		return articleType;
	}

	public void setArticleType(ArticleTypes articleType) {
		this.articleType = articleType;
	}

	public Restaurant getRestaurant() {
		return restaurant;
	}

	public void setRestaurant(Restaurant restaurant) {
		this.restaurant = restaurant;
	}

	public double getAmount() {
		return amount;
	}

	public void setAmount(double amount) {
		this.amount = amount;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public Image getImage() {
		return image;
	}

	public void setImage(Image image) {
		this.image = image;
	}
}
