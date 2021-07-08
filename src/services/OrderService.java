package services;

import beans.Order;
import repositories.IRepository;
import repositories.OrderRepository;

public class OrderService extends Service<String, Order>{
	private OrderRepository orderRepository = new OrderRepository();
	
	public OrderService(IRepository<String, Order> repository) {
		super(repository);
	}
	
	public void updateStatus(Order order) {
		orderRepository.updateStatus(order);
	}
	
	public void updateOrder(String orderID) {
		orderRepository.updateOrder(orderID);
	}
}
