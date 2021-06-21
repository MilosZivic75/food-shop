package beans;

import enumerations.CustomerTypes;

public class CustomerType {
	private CustomerTypes customerType;
	private double discount;
	private int points;
	
	public CustomerType() {
		super();
	}

	public CustomerType(CustomerTypes customerType, double discount, int points) {
		super();
		this.customerType = customerType;
		this.discount = discount;
		this.points = points;
	}

	public CustomerTypes getCustomerType() {
		return customerType;
	}

	public void setCustomerType(CustomerTypes customerType) {
		this.customerType = customerType;
	}

	public double getDiscount() {
		return discount;
	}

	public void setDiscount(double discount) {
		this.discount = discount;
	}

	public int getPoints() {
		return points;
	}

	public void setPoints(int points) {
		this.points = points;
	}
}
