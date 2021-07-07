package services;

import java.time.LocalDateTime;

import beans.Comment;
import repositories.IRepository;

public class CommentService extends Service<LocalDateTime, Comment>{
	
	public CommentService(IRepository<LocalDateTime, Comment> repository) {
		super(repository);
	}
	
}
