package controllers;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.util.Date;

import com.google.gson.JsonIOException;
import com.google.gson.JsonSyntaxException;

import beans.User;
import services.UserService;

public class UserController {
	private UserService userService;
	
	public UserController() throws JsonSyntaxException, JsonIOException, FileNotFoundException {
		userService = new UserService();
	}
	
	public User userExists(String username, String password) {
		return userService.userExists(username, password);
	}
	
	public User registerUser(String name, String lastName, Date birthDate, String sex, String username, String password) throws JsonSyntaxException, JsonIOException, IOException {
		return userService.registerUser(name, lastName, birthDate, sex, username, password);
	}
	
}
