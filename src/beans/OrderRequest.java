package beans;

public class OrderRequest {
	
	private String requestID;
	private String delivererID;
	private String orderID;
	
	public OrderRequest() {}

	public OrderRequest(String requestID, String delivererID, String orderID) {
		super();
		this.requestID = requestID;
		this.delivererID = delivererID;
		this.orderID = orderID;
	}

	public String getRequestID() {
		return requestID;
	}

	public void setRequestID(String requestID) {
		this.requestID = requestID;
	}

	public String getDelivererID() {
		return delivererID;
	}

	public void setDelivererID(String delivererID) {
		this.delivererID = delivererID;
	}

	public String getOrderID() {
		return orderID;
	}

	public void setOrderID(String orderID) {
		this.orderID = orderID;
	}
	
}
