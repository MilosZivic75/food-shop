package beans;

import java.time.LocalDateTime;

public class Comment {
	private LocalDateTime timeOfOccurrence;
	private String customerUsername;
	private String restaurantID;
	private String text;
	private int grade;
	private Boolean approved;
	
	public Comment() {
		super();
	}

	public Comment(LocalDateTime timeOfOccurrence, String customerUsername, String restaurantID, String text, int grade, Boolean approved) {
		super();
		this.timeOfOccurrence = timeOfOccurrence;
		this.customerUsername = customerUsername;
		this.restaurantID = restaurantID;
		this.text = text;
		this.grade = grade;
		this.approved = approved;
	}
	
	public LocalDateTime getTimeOfOccurrence() {
		return timeOfOccurrence;
	}
	
	public void setTimeOfOccurrence(LocalDateTime timeOfOccurrence) {
		this.timeOfOccurrence = timeOfOccurrence;
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
	
	public Boolean getApproved() {
		return approved;
	}
	
	public void setApproved(Boolean approved) {
		this.approved = approved;
	}
}
