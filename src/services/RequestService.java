package services;

import beans.OrderRequest;
import repositories.IRepository;

public class RequestService extends Service<String, OrderRequest>{

	public RequestService(IRepository<String, OrderRequest> repository) {
		super(repository);
	}

}
