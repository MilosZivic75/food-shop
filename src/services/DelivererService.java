package services;

import beans.Deliverer;
import repositories.IRepository;

public class DelivererService extends Service<String, Deliverer> {

	public DelivererService(IRepository<String, Deliverer> repository) {
		super(repository);
	}
	/*private DelivererRepository delivererRepository = new DelivererRepository();

	public boolean create(Deliverer deliverer) {
		return delivererRepository.create(deliverer);
	}

	public boolean update(Deliverer deliverer) {
		return delivererRepository.update(deliverer);
	}

	public Deliverer read(String key) {
		return delivererRepository.read(key);
	}

	public boolean delete(Deliverer deliverer) {
		return delivererRepository.delete(deliverer);
	}

	public boolean deleteById(String key) {
		return delivererRepository.deleteById(key);
	}

	public Map<String, Deliverer> readAll() {
		return delivererRepository.readAll();
	}

	public List<Deliverer> readAllDeliverers() {
		return delivererRepository.readAllEntities();
	}*/
}
