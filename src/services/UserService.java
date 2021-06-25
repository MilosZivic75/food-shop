package services;

import java.util.Date;
import java.util.HashMap;

import beans.User;
import enumerations.UserRoles;

public class UserService {
	private HashMap<String, User> users = new HashMap<String, User>();
	public UserService() {
		users.put("pera", new User("pera", "pera", "Petar", "Petrovic", "Muski", new Date(1999,1,1), UserRoles.CUSTOMER));
	}
	
	public User userExists(String username, String password) {
		if (!users.containsKey(username)) {
			return null;
		}
		User user = users.get(username);
		if (!user.getPassword().equals(password)) {
			return null;
		}
		return user;
	}
	
	public User registerUser(String name, String lastName, Date birthDate, String sex, String username, String password) {
		if (users.containsKey(username)) {
			return null;
		}
		User user = new User(username, password, name, lastName, sex, birthDate, UserRoles.CUSTOMER);
		users.put(username, user);
		return user;
	}
}
