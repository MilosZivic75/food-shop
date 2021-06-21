package beans;

public class CustomerType {
	private String name;
	private double discount;
	private int points;
	
	public CustomerType() {
		super();
	}

	public CustomerType(String name, double discount, int points) {
		super();
		this.name = name;
		this.discount = discount;
		this.points = points;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
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
