package controllers;

import beans.Comment;
import services.IService;

public class CommentController extends Controller<String, Comment>{
	
	public CommentController(IService<String, Comment> service) {
		super(service);
	}
	
}
