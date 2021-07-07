package controllers;

import java.time.LocalDateTime;

import beans.Comment;
import services.IService;

public class CommentController extends Controller<LocalDateTime, Comment>{
	
	public CommentController(IService<LocalDateTime, Comment> service) {
		super(service);
	}
	
}
