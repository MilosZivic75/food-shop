package spark;

import static spark.Spark.get;
import static spark.Spark.port;
import static spark.Spark.post;
import static spark.Spark.staticFiles;

import java.io.File;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

import beans.User;
import services.UserService;

public class FoodShopMain {

	private static Gson g = new GsonBuilder().setDateFormat("yyyy-MM-dd").create();
	private static UserService loginService = new UserService();
	
	public static void main(String[] args) throws Exception {
		port(8080);

		staticFiles.externalLocation(new File("./static").getCanonicalPath());
		
		get("/", (req, res) -> {
			return "SUCCESS";
		});
		
		post("/login", (req, res) -> {
			res.type("application/json");
			User user = g.fromJson(req.body(), User.class);
			User loggedUser = loginService.userExists(user.getUsername(), user.getPassword());
			if (loggedUser == null) {
				return "ERROR";
			}
			return "SUCCESS";
		});
		
		post("/registration", (req, res) -> {
			res.type("application/json");
			User user = g.fromJson(req.body(), User.class);
			User registratedUser = loginService.registerUser(user.getName(), user.getLastName(), user.getBirthDate(), user.getSex(), user.getUsername(), user.getPassword());
			if (registratedUser == null) {
				return "ERROR";
			}
			return "SUCCESS";
		});
	}
}
