package beans;

import java.util.Date;

import enumerations.UserRoles;

public class Administrator extends User {

	public Administrator() {
		super();
	}

	public Administrator(String username, String password, String name, String lastName, String sex, Date birthDate,
			UserRoles userRole) {
		super(username, password, name, lastName, sex, birthDate, userRole);
	}
	
}
