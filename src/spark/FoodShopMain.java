package spark;

import static spark.Spark.get;
import static spark.Spark.port;
import static spark.Spark.post;
import static spark.Spark.staticFiles;

import java.awt.image.BufferedImage;
import java.io.ByteArrayInputStream;
import java.io.File;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Random;

import javax.imageio.ImageIO;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

import beans.Administrator;
import beans.Article;
import beans.Comment;
import beans.Customer;
import beans.Deliverer;
import beans.Manager;
import beans.Order;
import beans.OrderRequest;
import beans.Restaurant;
import beans.User;
import controllers.*;
import enumerations.ArticleTypes;
import enumerations.CustomerTypes;
import enumerations.OrderStatus;
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
	private static OrderController orderController = new OrderController(new OrderService(new OrderRepository()));
	private static CommentController commentController = new CommentController(new CommentService(new CommentRepository()));
	private static RequestController requestController = new RequestController(new RequestService(new RequestRepository()));
	private static String loggedUserUsername = "";
	private static String restaurantID = "";
	private static Order specificOrder = new Order();

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
			loggedUserUsername = user.getUsername();
			if (loggedUser == null) {
				return "ERROR";
			}
			Session session = req.session();
			if (loggedUser.getUserRole().equals("Kupac")) {
				Customer customer = customerController.read(loggedUser.getUsername());
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
			User registratedUser = userController.registerUser(user.getName(), user.getLastName(), user.getBirthDate(),
					user.getSex(), user.getUsername(), user.getPassword());
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
				return g.toJson((Customer) user);
			} else if (user.getUserRole().equals("Dostavljač")) {
				return g.toJson((Deliverer) user);
			} else if (user.getUserRole().equals("Menadžer")) {
				return g.toJson((Manager) user);
			} else {
				return g.toJson((Administrator) user);
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
			cartController.refreshCart();
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
			User addedUser = userController.addUser(user.getName(), user.getLastName(), user.getBirthDate(),
					user.getSex(), user.getUsername(), user.getPassword(), user.getUserRole());
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
			Map<String, Restaurant> restaurants = restaurantController.readAll();
			for (String name : cartController.getUserCart().getArticles().keySet()) {
				String articleID = name.split(" ")[0];
				String restaurantID = name.split(" ")[1];
				Restaurant restaurant = restaurants.get(restaurantID);
				for (Article article : restaurant.getArticles()) {
					if (article.getName().contains(articleID))
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
			name = name.substring(1, name.length() - 1);
			double price = Double.parseDouble(request[1].split(":")[1]);
			ArticleTypes type;
			if (request[2].split(":")[1].equals("FOOD"))
				type = ArticleTypes.FOOD;
			else
				type = ArticleTypes.DRINK;
			String restID = request[3].split(":")[1];
			restID = restID.substring(1, restID.length() - 1);
			double amount = Double.parseDouble(request[4].split(":")[1]);
			String description = request[5].split(":")[1];
			String image = request[6].split(":")[1];
			image = image.substring(1, image.length() - 1);
			int quantity = Integer.parseInt(request[7].split(":")[1]);
			String username = request[8].split(":")[1].split("}")[0];
			username = username.substring(1, username.length() - 1);
			Article article = new Article(name, price, type, restID, amount, description, image);
			cartController.addArticle(article, username, quantity);

			return "SUCCESS";
		});

		post("/removeFromCart", (req, res) -> {
			res.type("application/json");
			String[] request = req.body().split(",");
			String name = request[0].split(":")[1];
			name = name.substring(1, name.length() - 1);
			double price = Double.parseDouble(request[1].split(":")[1]);
			ArticleTypes type;
			if (request[2].split(":")[1].equals("FOOD"))
				type = ArticleTypes.FOOD;
			else
				type = ArticleTypes.DRINK;
			String restID = request[3].split(":")[1];
			restID = restID.substring(1, restID.length() - 1);
			double amount = Double.parseDouble(request[4].split(":")[1]);
			String description = request[5].split(":")[1];
			String image = request[6].split(":")[1];
			image = image.substring(1, image.length() - 1);
			int quantity = Integer.parseInt(request[7].split(":")[1]);
			Article article = new Article(name, price, type, restID, amount, description, image);
			cartController.removeFromCart(article, quantity);

			return "SUCCESS";
		});

		post("/uploadLogo", (req, res) -> {
			res.type("application/json");

			byte[] data = req.bodyAsBytes();
			ByteArrayInputStream bis = new ByteArrayInputStream(data);
			BufferedImage bImage = ImageIO.read(bis);

			int restaurantsNumber = 1;
			while (new File("static/images/restaurantLogo" + restaurantsNumber + ".png").exists()) {
				restaurantsNumber++;
			}
			String path = "static/images/restaurantLogo" + restaurantsNumber + ".png";

			ImageIO.write(bImage, "png", new File(path));

			return path.substring(6);
		});

		post("/addRestaurant", (req, res) -> {
			res.type("application/json");
			Restaurant restaurant = g.fromJson(req.body(), Restaurant.class);
			restaurant.setArticles(new ArrayList<Article>());
			if (restaurantController.create(restaurant)) {
				return "SUCCESS";
			}

			return "ERROR";
		});

		get("/getFreeManagers", (req, res) -> {
			res.type("application/json");
			ArrayList<Manager> managers = (ArrayList<Manager>) managerController.readAllEntities();
			managers.removeIf(manager -> !manager.getRestaurantId().equals(""));
			return g.toJson(managers);
		});

		post("/addRestaurantToManager", (req, res) -> {
			res.type("application/json");
			Manager manager = g.fromJson(req.body(), Manager.class);
			Manager managerToUpdate = managerController.read(manager.getUsername());
			managerToUpdate.setRestaurantId(manager.getRestaurantId());
			managerController.update(managerToUpdate);

			return "SUCCESS";
		});

		get("/getRestaurantFromManager", (req, res) -> {
			res.type("application/json");

			Manager manager = managerController.read(req.queryParams("username"));
			Restaurant restaurant = restaurantController.read(manager.getRestaurantId());
			if (restaurant == null)
				return "ERROR";
			restaurant.getArticles().removeIf(article -> article.getDeleted() == 1);

			return g.toJson(restaurant);
		});

		post("/addArticle", (req, res) -> {
			res.type("application/json");
			Article article = g.fromJson(req.body(), Article.class);
			Manager manager = managerController.read(((User) req.session().attribute("user")).getUsername());
			Restaurant restaurant = restaurantController.read(manager.getRestaurantId());

			for (Article a : restaurant.getArticles()) {
				if (a.getName().equals(article.getName()))
					return "ERROR";
			}
			restaurant.getArticles().add(article);
			restaurantController.update(restaurant);
			return "SUCCESS";
		});

		post("/updateArticle", (req, res) -> {
			res.type("application/json");
			Article article = g.fromJson(req.body(), Article.class);
			Manager manager = managerController.read(((User) req.session().attribute("user")).getUsername());
			Restaurant restaurant = restaurantController.read(manager.getRestaurantId());

			for (Article a : restaurant.getArticles()) {
				if (a.getName().equals(article.getName())) {
					a.setArticleType(article.getArticleType());
					a.setPrice(article.getPrice());
					a.setAmount(article.getAmount());
					a.setDescription(article.getDescription());
					if (!article.getImage().equals("") && article.getImage() != null)
						a.setImage(article.getImage());
					restaurantController.update(restaurant);
					return "SUCCESS";
				}
			}

			return "ERROR";
		});

		post("/uploadArticleImage", (req, res) -> {
			res.type("application/json");

			byte[] data = req.bodyAsBytes();
			ByteArrayInputStream bis = new ByteArrayInputStream(data);
			BufferedImage bImage = ImageIO.read(bis);

			int articlesNumber = 1;
			while (new File("static/images/article" + articlesNumber + ".png").exists()) {
				articlesNumber++;
			}
			String path = "static/images/article" + articlesNumber + ".png";

			ImageIO.write(bImage, "png", new File(path));

			return path.substring(6);
		});

		post("/deleteArticle", (req, res) -> {
			res.type("application/json");

			Article article = g.fromJson(req.body(), Article.class);
			Manager manager = managerController.read(((User) req.session().attribute("user")).getUsername());
			Restaurant restaurant = restaurantController.read(manager.getRestaurantId());

			for (Article a : restaurant.getArticles()) {
				if (a.getName().equals(article.getName())) {
					a.setDeleted(1);
					restaurantController.update(restaurant);
					return "SUCCESS";
				}
			}
			return "ERROR";
		});

		post("/addOrder", (req, res) -> {

			if (req.body().split("]")[2].split(",")[1].split(":")[1].equals("0"))
				return "ERROR";

			String[] listArticles = req.body().split("]")[0].split("\\[")[1].split("\\{");

			String[] listQuantity = req.body().split("]")[1].split("\\[")[1].split(",");
			ArrayList<Article> articles = new ArrayList<Article>();
			ArrayList<Integer> quantity = new ArrayList<Integer>();
			String restID = "";
			for (int i = 1; i < listArticles.length; i++) {
				String article = listArticles[i].split("}")[0];
				String name = article.split(",")[0].split(":")[1];
				name = name.substring(1, name.length() - 1);
				double price = Double.parseDouble(article.split(",")[1].split(":")[1]);
				ArticleTypes type;
				if (article.split(",")[2].split(":")[1].equals("FOOD"))
					type = ArticleTypes.FOOD;
				else
					type = ArticleTypes.DRINK;
				restID = article.split(",")[3].split(":")[1];
				restID = restID.substring(1, restID.length() - 1);
				double amount = Double.parseDouble(article.split(",")[4].split(":")[1]);
				String description = article.split(",")[5].split(":")[1];
				description = description.substring(1, description.length() - 1);
				String image = article.split(",")[6].split(":")[1];
				image = image.substring(1, image.length() - 1);

				Article articleFromCart = new Article(name, price, type, restID, amount, description, image);
				articles.add(articleFromCart);
			}

			for (String q : listQuantity) {
				quantity.add(Integer.parseInt(q));
			}

			double price = Double.parseDouble(req.body().split("]")[2].split(",")[1].split(":")[1]);
			String username = req.body().split("]")[2].split(",")[2].split(":")[1].split("}")[0];
			username = username.substring(1, username.length() - 1);

			Random random = new Random();
			String idOrder = "";
			for (int i = 0; i < 10; i++) {
				idOrder = idOrder + Integer.toString(random.nextInt(10));
			}

			Order order = new Order(idOrder, articles, quantity, restID, LocalDateTime.now(), price, username,
					OrderStatus.PROCESSING);

			Customer customer = customerController.read(username);
			customerController.updateCollectedPoints(customer, customer.getCollectedPoints() + price * 133 / 1000);
			Customer updatedCustomer = customerController.read(username);

			if (updatedCustomer.getCollectedPoints() > 2000 && updatedCustomer.getCollectedPoints() <= 4000)
				customerController.updateType(updatedCustomer, CustomerTypes.BRONSE);
			else if (updatedCustomer.getCollectedPoints() > 4000 && updatedCustomer.getCollectedPoints() <= 6000)
				customerController.updateType(updatedCustomer, CustomerTypes.SILVER);
			else if (updatedCustomer.getCollectedPoints() > 6000)
				customerController.updateType(updatedCustomer, CustomerTypes.GOLD);

			while (!orderController.create(order)) {
				idOrder = "";
				for (int i = 0; i < 10; i++) {
					idOrder = idOrder + Integer.toString(random.nextInt(10));
				}
				order.setId(idOrder);
			}

			return "SUCCESS";
		});

		get("/getOrders", (req, res) -> {
			res.type("application/json");
			List<Order> orders = orderController.readAllEntities();
			List<Order> userOrders = new ArrayList<Order>();
			for (Order order : orders) {
				if (order.getCustomer().equals(loggedUserUsername))
					userOrders.add(order);
			}

			return g.toJson(userOrders);
		});

		post("/cancelOrder", (req, res) -> {
			String id = req.body().split("}")[0].split(":")[1].split(",")[0];
			id = id.substring(1, id.length() - 1);
			String username = req.body().split("}")[0].split(":")[2].split(",")[0];
			username = username.substring(1, username.length() - 1);
			double price = Double.parseDouble(req.body().split("}")[0].split(":")[3]);
			orderController.updateStatus(orderController.readAll().get(id));		

			Customer customer = customerController.read(username);
			customerController.updateCollectedPoints(customer, customer.getCollectedPoints() - price * 133 * 4 / 1000);
			Customer updatedCustomer = customerController.read(username);

			if (updatedCustomer.getCollectedPoints() > 2000 && updatedCustomer.getCollectedPoints() <= 4000)
				customerController.updateType(updatedCustomer, CustomerTypes.BRONSE);
			else if (updatedCustomer.getCollectedPoints() > 4000 && updatedCustomer.getCollectedPoints() <= 6000)
				customerController.updateType(updatedCustomer, CustomerTypes.SILVER);
			else if (updatedCustomer.getCollectedPoints() <= 2000)
				customerController.updateType(updatedCustomer, CustomerTypes.REGULAR);

			return "SUCCESS";
		});

		get("/getOrdersByRestaurant", (req, res) -> {
			res.type("application/json");

			User user = (User) req.session().attribute("user");
			if (user == null)
				return null;
			Manager manager = managerController.read(user.getUsername());
			ArrayList<Order> orders = (ArrayList<Order>) orderController.readAllEntities();
			orders.removeIf(order -> !order.getRestaurant().equals(manager.getRestaurantId()));

			return g.toJson(orders);
		});

		get("/getCustomersByRestaurant", (req, res) -> {
			res.type("application/json");

			User user = (User) req.session().attribute("user");
			if (user == null)
				return null;
			Manager manager = managerController.read(user.getUsername());
			ArrayList<Order> orders = (ArrayList<Order>) orderController.readAllEntities();
			orders.removeIf(order -> !order.getRestaurant().equals(manager.getRestaurantId()));

			ArrayList<Customer> customers = new ArrayList<Customer>();
			for (Order order : orders) {
				customers.add(customerController.read(order.getCustomer()));
			}
			return g.toJson(customers);
		});

		post("/updateOrder", (req, res) -> {
			res.type("application/json");

			Order order = g.fromJson(req.body(), Order.class);
			orderController.update(order);

			return "SUCCESS";
		});

		post("/addComment", (req, res) -> {
			restaurantID = req.body().split("}")[0].split(":")[1];
			restaurantID = restaurantID.substring(1, restaurantID.length() - 1);

			return "SUCCESS";
		});

		get("/ratingRestaurant", (req, res) -> {
			Map<String, Restaurant> restaurants = restaurantController.readAll();
			Restaurant restaurant = restaurants.get(restaurantID);
			return g.toJson(restaurant);
		});

		post("/addRate", (req, res) -> {
			Comment comment = g.fromJson(req.body(), Comment.class);
			//comment.setApproved(false);
			comment.setTimeOfOccurrence(LocalDateTime.now());
			commentController.create(comment);

			return "SUCCESS";
		});

		get("/getRestaurantComments", (req, res) -> {
			res.type("application/json");
			Session session = req.session();
			Restaurant restaurant = (Restaurant) session.attribute("openedRestaurant");

			List<Comment> comments = commentController.readAllEntities();
			List<Comment> restaurantComments = new ArrayList<Comment>();

			for (Comment comment : comments) {
				if (comment.getRestaurant().equals(restaurant.getName()) && comment.getApproved() != null && comment.getApproved() != false)
					restaurantComments.add(comment);
			}

			return g.toJson(restaurantComments);
		});

		get("/getAllComments", (req, res) -> {
			res.type("application/json");

			return g.toJson(commentController.readAllEntities());
		});

		get("/getCommentsByRestaurant", (req, res) -> {
			res.type("application/json");
			User user = (User) req.session().attribute("user");
			if (user == null)
				return null;
			Manager manager = managerController.read(user.getUsername());

			ArrayList<Comment> comments = (ArrayList<Comment>) commentController.readAllEntities();
			comments.removeIf(comment -> !comment.getRestaurant().equals(manager.getRestaurantId()));

			return g.toJson(comments);
		});

		post("/updateComment", (req, res) -> {
			res.type("application/json");
			Comment comment = g.fromJson(req.body(), Comment.class);

			commentController.update(comment);
			return "SUCCESS";
		});
		
		get("/waitingDeliveryOrders", (req, res) -> {
			res.type("application/json");
			List<Order> orders = orderController.readAllEntities();
			List<Order> waitingDelivererOrders = new ArrayList<Order>();
			
			for(Order order: orders) {
				if(order.getOrderStatus().equals(OrderStatus.WAITING_FOR_DELIVERY)) 
					waitingDelivererOrders.add(order);
			}
			
			return g.toJson(waitingDelivererOrders);
		});
		
		post("/showOrder", (req, res) -> {
			specificOrder = g.fromJson(req.body(), Order.class);
			return "SUCCESS";
		});
		
		get("/getSpecificOrder", (req, res) -> {
			res.type("application/json");
			return g.toJson(specificOrder);
		});
		
		get("/getArticlesFromSpecificOrder", (req, res) -> {
			res.type("application/json");
			List<Article> articles = orderController.readAll().get(specificOrder.getId()).getArticles();
			return g.toJson(articles);
		});
		
		get("/getQuantityFromSpecificOrder", (req, res) -> {
			res.type("application/json");
			
			List<Integer> quantity = orderController.readAll().get(specificOrder.getId()).getQuantity();
			return g.toJson(quantity);
		});
		
		post("/addRequest", (req, res) -> {
			res.type("application/json");
			OrderRequest orderRequest = g.fromJson(req.body(), OrderRequest.class);
			orderRequest.setRequestID(orderRequest.getDelivererID() + " " + orderRequest.getOrderID());
			requestController.create(orderRequest);
			
			return "SUCCESS";
		});
	}
}
