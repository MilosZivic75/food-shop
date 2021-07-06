package spark;

import static spark.Spark.get;
import static spark.Spark.port;
import static spark.Spark.post;
import static spark.Spark.staticFiles;

import java.io.File;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

import beans.Administrator;
import beans.Article;
import beans.Customer;
import beans.Deliverer;
import beans.Manager;
import beans.Restaurant;
import beans.User;
import controllers.*;
import enumerations.ArticleTypes;
import repositories.*;
import services.*;

public class FoodShopMain {

	private static Gson g = new GsonBuilder().setDateFormat("yyyy-MM-dd").create();
	private static UserController userController = new UserController();
	private static CustomerController customerController = new CustomerController(new CustomerService(new CustomerRepository()));
	private static DelivererController delivererController = new DelivererController(new DelivererService(new DelivererRepository()));
	private static ManagerController managerController = new ManagerController(new ManagerService(new ManagerRepository()));
	private static AdministratorController administratorController = new AdministratorController(new AdministratorService(new AdministratorRepository()));
	private static RestaurantController restaurantController = new RestaurantController(new RestaurantService(new RestaurantRepository()));
	private static CartController cartController = new CartController();
	private static RestaurantRepository restaurantRepository = new RestaurantRepository();
	
	public static void main(String[] args) throws Exception {
		port(8080);
		
		staticFiles.externalLocation(new File("./static").getCanonicalPath());
		
		get("/", (req, res) -> {
			return "SUCCESS";
		});
		
		post("/login", (req, res) -> {
			res.type("application/json");
			User user = g.fromJson(req.body(), User.class);
			User loggedUser = userController.userExists(user.getUsername(), user.getPassword());
			if (loggedUser == null) {
				return "ERROR";
			}
			Session session = req.session();
			if (loggedUser.getUserRole().equals("Kupac")) {
				Customer customer = customerController.read(loggedUser.getUsername());
				cartController.refreshCart();
				session.attribute("user", customer);
				return "SUCCESS/customer";
			} else if (loggedUser.getUserRole().equals("Dostavljač")) {
				Deliverer deliverer = delivererController.read(loggedUser.getUsername());
				session.attribute("user", deliverer);
				return "SUCCESS/deliverer";
			} else if (loggedUser.getUserRole().equals("Menadžer")) {
				Manager manager = managerController.read(loggedUser.getUsername());
				session.attribute("user", manager);
				return "SUCCESS/manager";
			} else {
				Administrator administrator = administratorController.read(loggedUser.getUsername());
				session.attribute("user", administrator);
				return "SUCCESS/administrator";
			}
		});
		
		post("/registration", (req, res) -> {
			res.type("application/json");
			User user = g.fromJson(req.body(), User.class);
			User registratedUser = userController.registerUser(user.getName(), user.getLastName(), user.getBirthDate(), user.getSex(), user.getUsername(), user.getPassword());
			if (registratedUser == null) {
				return "ERROR";
			}
			return "SUCCESS";
		});
		
		get("/loggedUser", (req, res) -> {
			res.type("application/json");	
			Session session = req.session();
			User user = (User) session.attribute("user");
			if (user == null)
				return "ERROR";
			
			if (user.getUserRole().equals("Kupac")) {
				return g.toJson((Customer)user);
			} else if (user.getUserRole().equals("Dostavljač")) {
				return g.toJson((Deliverer)user);
			} else if (user.getUserRole().equals("Menadžer")) {
				return g.toJson((Manager)user);
			} else {
				return g.toJson((Administrator)user);
			}

		});
		
		post("/logout", (req, res) -> {
			req.session().invalidate();
			return "SUCCESS";
		});
		
		post("/updateUser", (req, res) -> {
			User user = g.fromJson(req.body(), User.class);
			
			if (user.getUserRole().equals("Kupac")) {
				customerController.updateUserData(user);
				return "SUCCESS";
			} else if (user.getUserRole().equals("Dostavljač")) {
				delivererController.updateUserData(user);
				return "SUCCESS";
			} else if (user.getUserRole().equals("Menadžer")) {
				managerController.updateUserData(user);
				return "SUCCESS";
			} else {
				administratorController.updateUserData(user);
				return "SUCCESS";
			}
		});
		
		get("/getRestaurants", (req, res) -> {
			res.type("application/json");
			return g.toJson(restaurantController.readAllEntities());
		});
			
		get("/getUsers", (req, res) -> {
			res.type("application/json");
			ArrayList<User> users = new ArrayList<User>();
			users.addAll(administratorController.readAllEntities());
			users.addAll(managerController.readAllEntities());
			users.addAll(delivererController.readAllEntities());
			users.addAll(customerController.readAllEntities());
				
			return g.toJson(users);
		});
		
		post("/addUser", (req, res) -> {
			res.type("application/json");
			User user = g.fromJson(req.body(), User.class);
			User addedUser = userController.addUser(user.getName(), user.getLastName(), user.getBirthDate(), user.getSex(), user.getUsername(), user.getPassword(), user.getUserRole());
			if (addedUser == null) {
				return "ERROR";
			}
			return "SUCCESS";
		});
		
		post("/openedRestaurant", (req, res) -> {
			res.type("application/json");
			Restaurant restaurant = g.fromJson(req.body(), Restaurant.class);
			Session session = req.session();
			session.attribute("openedRestaurant", restaurant);	
			return "SUCCESS";
		});
		
		get("/getOpenedRestaurant", (req, res) -> {
			res.type("application/json");
			
			Session session = req.session();
			Restaurant restaurant = (Restaurant) session.attribute("openedRestaurant");
			if (restaurant == null)
				return "ERROR";
			
			return g.toJson(restaurant);
		});
			
		post("/deleteUser", (req, res) -> {
			res.type("application/json");
			User user = g.fromJson(req.body(), User.class);
			userController.deleteUser(user.getUsername());
			
			return "SUCCESS";
		});
		
		post("/deleteRestaurant", (req, res) -> {
			res.type("application/json");
			Restaurant restaurant = g.fromJson(req.body(), Restaurant.class);
			restaurantController.deleteById(restaurant.getName());

			return "SUCCESS";

		});
		
		get("/getArticles", (req, res) -> {
			res.type("application/json");
			List<Article> articles = new ArrayList<Article>();
			Map<String, Restaurant> restaurants = restaurantRepository.readAll();
			for(String name: cartController.getUserCart().getArticles().keySet()) {
				String articleID = name.split(" ")[0];
				String restaurantID = name.split(" ")[1];		
				Restaurant restaurant = restaurants.get(restaurantID);
				for(Article article: restaurant.getArticles()) {
					if(article.getName().contains(articleID))
						articles.add(article);
				}
			}
			
			return g.toJson(articles);
		});
		
		get("/getQuantity", (req, res) -> {
			res.type("application/json");
			return g.toJson(cartController.getUserCart().getArticles().values());
		});
		
		get("/getPrice", (req, res) -> {
			res.type("application/json");
			return g.toJson(cartController.getUserCart().getPrice());
		});
		
		post("/addToCart", (req, res) -> {
			res.type("application/json");
			String[] request = req.body().split(",");
			String name = request[0].split(":")[1];
			name = name.substring(1, name.length()-1);
			double price = Double.parseDouble(request[1].split(":")[1]);
			ArticleTypes type;
			if(request[2].split(":")[1].equals("FOOD"))
				type = ArticleTypes.FOOD;
			else
				type = ArticleTypes.DRINK;
			String restID = request[3].split(":")[1];
			restID = restID.substring(1, restID.length()-1);
			double amount = Double.parseDouble(request[4].split(":")[1]);
			String description = request[5].split(":")[1];
			String image = request[6].split(":")[1];
			image = image.substring(1, image.length()-1);
			int quantity = Integer.parseInt(request[7].split(":")[1]);
			String username = request[8].split(":")[1].split("}")[0];
			username = username.substring(1, username.length()-1);
			Article article = new Article(name, price, type, restID, amount, description, image);
			cartController.addArticle(article, username, quantity);
			
			return "SUCCESS";
		});
		
		post("/removeFromCart", (req, res) -> {
			res.type("application/json");
			String[] request = req.body().split(",");
			String name = request[0].split(":")[1];
			name = name.substring(1, name.length()-1);
			double price = Double.parseDouble(request[1].split(":")[1]);
			ArticleTypes type;
			if(request[2].split(":")[1].equals("FOOD"))
				type = ArticleTypes.FOOD;
			else
				type = ArticleTypes.DRINK;
			String restID = request[3].split(":")[1];
			restID = restID.substring(1, restID.length()-1);
			double amount = Double.parseDouble(request[4].split(":")[1]);
			String description = request[5].split(":")[1];
			String image = request[6].split(":")[1];
			image = image.substring(1, image.length()-1);
			int quantity = Integer.parseInt(request[7].split(":")[1]);
			Article article = new Article(name, price, type, restID, amount, description, image);
			cartController.removeFromCart(article, quantity);
			
			return "SUCCESS";
		});
	}
}
