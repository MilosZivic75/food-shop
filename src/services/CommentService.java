package services;

import beans.Comment;
import repositories.IRepository;

public class CommentService extends Service<String, Comment>{
	
	public CommentService(IRepository<String, Comment> repository) {
		super(repository);
	}
	
}
