package spark;

import static spark.Spark.get;
import static spark.Spark.port;
import static spark.Spark.post;
import static spark.Spark.staticFiles;

import java.awt.image.BufferedImage;
import java.io.ByteArrayInputStream;
import java.io.File;
import java.util.ArrayList;

import javax.imageio.ImageIO;

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
import repositories.*;
import services.*;

public class FoodShopMain {

	private static Gson g = new GsonBuilder().setDateFormat("yyyy-MM-dd").create();
	private static UserController userController = new UserController();
	private static CustomerController customerController = new CustomerController(
			new CustomerService(new CustomerRepository()));
	private static DelivererController delivererController = new DelivererController(
			new DelivererService(new DelivererRepository()));
	private static ManagerController managerController = new ManagerController(
			new ManagerService(new ManagerRepository()));
	private static AdministratorController administratorController = new AdministratorController(
			new AdministratorService(new AdministratorRepository()));
	private static RestaurantController restaurantController = new RestaurantController(
			new RestaurantService(new RestaurantRepository()));

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
	}
}
