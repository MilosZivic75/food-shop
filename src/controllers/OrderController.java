package controllers;

import beans.Order;
import repositories.OrderRepository;
import services.IService;
import services.OrderService;


public class OrderController extends Controller<String, Order>{
	private OrderService orderService = new OrderService(new OrderRepository());
	
	public OrderController(IService<String, Order> service) {
		super(service);
	}
	
	public void updateStatus(Order order) {
		orderService.updateStatus(order);
	}
}
