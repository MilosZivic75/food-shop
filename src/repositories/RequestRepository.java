package repositories;

import java.lang.reflect.Type;
import java.util.HashMap;

import com.google.gson.reflect.TypeToken;

import beans.OrderRequest;

public class RequestRepository extends Repository<String, OrderRequest>{

	@Override
	protected String getPath() {
		return "static/data/requests.json";
	}

	@Override
	protected Type getType() {
		return new TypeToken<HashMap<String, OrderRequest>>(){}.getType();
	}

	@Override
	protected String getKey(OrderRequest entity) {
		return entity.getRequestID();
	}

	@Override
	protected int getDeleted(OrderRequest entity) {
		// TODO Auto-generated method stub
		return 0;
	}

	@Override
	protected OrderRequest setDeleted(OrderRequest entity) {
		// TODO Auto-generated method stub
		return null;
	}

}
