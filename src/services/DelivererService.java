package services;

import beans.Deliverer;
import beans.User;
import repositories.DelivererRepository;
import repositories.IRepository;

public class DelivererService extends Service<String, Deliverer> {

	private DelivererRepository delivererRepository = new DelivererRepository();
	public DelivererService(IRepository<String, Deliverer> repository) {
		super(repository);
	}
	
	public boolean updateUserData(User user) {
		return delivererRepository.updateUserData(user);
	}
	
	public void updateDelivererOrders(String orderID, String delivererID) {
		delivererRepository.updateDelivererOrders(orderID, delivererID);
	}
}
