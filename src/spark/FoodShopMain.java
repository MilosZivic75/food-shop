package spark;

import static spark.Spark.get;
import static spark.Spark.port;
import static spark.Spark.post;
import static spark.Spark.staticFiles;

import java.io.File;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

import beans.Administrator;
import beans.Customer;
import beans.Deliverer;
import beans.Manager;
import beans.User;
import controllers.AdministratorController;
import controllers.CustomerController;
import controllers.DelivererController;
import controllers.ManagerController;
import controllers.UserController;
import enumerations.UserRoles;
import repositories.AdministratorRepository;
import repositories.CustomerRepository;
import repositories.DelivererRepository;
import repositories.ManagerRepository;
import services.AdministratorService;
import services.CustomerService;
import services.DelivererService;
import services.IService;
import services.ManagerService;

public class FoodShopMain {

	private static Gson g = new GsonBuilder().setDateFormat("yyyy-MM-dd").create();
	private static UserController userController;
	
	public static void main(String[] args) throws Exception {
		System.out.println("Working Directory = " + System.getProperty("user.dir"));
		port(8080);
		
		userController = new UserController();
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
			if (user.getUserRole() == UserRoles.CUSTOMER) {
				Customer customer = new CustomerController(new CustomerService(new CustomerRepository())).read(user.getUsername());
				return "SUCCESS/customer";
			} else if (user.getUserRole() == UserRoles.DELIVERER) {
				Deliverer deliverer = new DelivererController(new DelivererService(new DelivererRepository())).read(user.getUsername());
				return "SUCCESS/deliverer";
			} else if (user.getUserRole() == UserRoles.MANAGER) {
				Manager manager = new ManagerController(new ManagerService(new ManagerRepository())).read(user.getUsername());
				return "SUCCESS/deliverer";
			} else {
				Administrator administrator = new AdministratorController(new AdministratorService(new AdministratorRepository())).read(user.getUsername()); 
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
	}
}
