package beans;

public class Comment {
	private String customerUsername;
	private String restaurantID;
	private String text;
	private int grade;
	
	public Comment() {
		super();
	}

	public Comment(String customerUsername, String restaurantID, String text, int grade) {
		super();
		this.customerUsername = customerUsername;
		this.restaurantID = restaurantID;
		this.text = text;
		this.grade = grade;
	}

	public String getCustomer() {
		return customerUsername;
	}

	public void setCustomer(String customerUsername) {
		this.customerUsername = customerUsername;
	}

	public String getRestaurant() {
		return restaurantID;
	}

	public void setRestaurant(String restaurantID) {
		this.restaurantID = restaurantID;
	}

	public String getText() {
		return text;
	}

	public void setText(String text) {
		this.text = text;
	}

	public int getGrade() {
		return grade;
	}

	public void setGrade(int grade) {
		this.grade = grade;
	}
}
