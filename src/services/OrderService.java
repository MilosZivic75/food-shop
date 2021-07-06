package services;

import beans.Order;
import repositories.IRepository;

public class OrderService extends Service<String, Order>{

	public OrderService(IRepository<String, Order> repository) {
		super(repository);
	}

}
