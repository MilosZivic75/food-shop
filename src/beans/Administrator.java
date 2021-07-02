package beans;

import java.util.Date;

public class Administrator extends User {

	public Administrator() {
		super();
	}

	public Administrator(String username, String password, String name, String lastName, String sex, Date birthDate,
			String userRole) {
		super(username, password, name, lastName, sex, birthDate, userRole);
	}
	
}
