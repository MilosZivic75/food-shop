package repositories;

import java.lang.reflect.Type;
import java.time.LocalDateTime;
import java.util.HashMap;

import com.google.gson.reflect.TypeToken;

import beans.Comment;

public class CommentRepository extends Repository<LocalDateTime, Comment>{

	@Override
	protected String getPath() {
		return "static/data/comments.json";
	}

	@Override
	protected Type getType() {
		return new TypeToken<HashMap<String, Comment>>(){}.getType();
	}

	@Override
	protected LocalDateTime getKey(Comment entity) {
		return entity.getTimeOfOccurrence();
	}

	@Override
	protected int getDeleted(Comment entity) {
		// TODO Auto-generated method stub
		return 0;
	}

	@Override
	protected Comment setDeleted(Comment entity) {
		// TODO Auto-generated method stub
		return null;
	}

}
