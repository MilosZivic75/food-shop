package controllers;

import java.util.Date;

import beans.User;
import services.UserService;

public class UserController {
	private UserService userService;
	
	public UserController() {
		userService = new UserService();
	}
	
	public User userExists(String username, String password) {
		return userService.userExists(username, password);
	}
	
	public User registerUser(String name, String lastName, Date birthDate, String sex, String username, String password) {
		return userService.registerUser(name, lastName, birthDate, sex, username, password);
	}
	
}
