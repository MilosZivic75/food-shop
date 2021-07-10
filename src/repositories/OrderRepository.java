package repositories;

import java.lang.reflect.Type;
import java.util.HashMap;
import java.util.Map;

import com.google.gson.reflect.TypeToken;

import beans.Order;
import enumerations.OrderStatus;

public class OrderRepository extends Repository<String, Order>{

	@Override
	protected String getPath() {
		return "static/data/orders.json";
	}

	@Override
	protected Type getType() {
		return new TypeToken<HashMap<String, Order>>(){}.getType();
	}

	@Override
	protected String getKey(Order entity) {
		return entity.getId();
	}

	@Override
	protected int getDeleted(Order entity) {
		// TODO Auto-generated method stub
		return 0;
	}

	@Override
	protected Order setDeleted(Order entity) {
		// TODO Auto-generated method stub
		return null;
	}
	
	public void updateStatus(Order order) {
		Map<String, Order> entities = readFile();
		
		order.setOrderStatus(OrderStatus.CANCELED);
		entities.put(order.getId(), order);
		writeFile(entities);
	}

	public void updateOrder(String orderID) {
		Map<String, Order> entities = readFile();
		
		for(Order order: entities.values()) {
			if(order.getId().equals(orderID)) {
				order.setOrderStatus(OrderStatus.DELIVERED);
				entities.put(order.getId(), order);
			}
		}
		
		writeFile(entities);
	}
	
	public void updateOrderRate(String orderID) {
		Map<String, Order> entities = readFile();
		
		for(Order order: entities.values()) {
			if(order.getId().equals(orderID)) {
				order.setRated(true);
				entities.put(order.getId(), order);
			}
		}
		
		writeFile(entities);
	}
}
