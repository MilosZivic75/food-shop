package controllers;

import java.util.List;

import beans.Restaurant;
import services.SearchService;

public class SearchController {
	private SearchService searchService = new SearchService();
	
	public List<Restaurant> getRestaurants(){
		return searchService.getRestaurants();
	}
	
	public void findByName(String name, String location, String type, String grade, List<Restaurant> restaurants) {
		if((location.equals("Lokacija restorana") && type.equals("Tip restorana") && grade.equals("Izaberi ocenu"))
				|| location.equals("") && type.equals("Tip restorana") && grade.equals("Izaberi ocenu")) {
			searchService.findByName(name, restaurants);
			
		} else if((!location.equals("Lokacija restorana") && type.equals("Tip restorana") && grade.equals("Izaberi ocenu"))
				|| (!location.equals("") && type.equals("Tip restorana") && grade.equals("Izaberi ocenu"))) {
			searchService.findByNameAndLocation(name, location, restaurants);
			
		} else if((location.equals("Lokacija restorana") && !type.equals("Tip restorana") && grade.equals("Izaberi ocenu"))
				|| (location.equals("") && !type.equals("Tip restorana") && grade.equals("Izaberi ocenu"))) {
			searchService.findByNameAndType(name, type, restaurants);
			
		} else if((location.equals("Lokacija restorana") && type.equals("Tip restorana") && !grade.equals("Izaberi ocenu"))
				|| (location.equals("") && type.equals("Tip restorana") && !grade.equals("Izaberi ocenu"))) {
			searchService.findByNameAndGrade(name, grade, restaurants);
			
		} else if((!location.equals("Lokacija restorana") && !type.equals("Tip restorana") && grade.equals("Izaberi ocenu"))
				|| (!location.equals("") && !type.equals("Tip restorana") && grade.equals("Izaberi ocenu"))) {
			searchService.findByNameLocationAndType(name, location, type, restaurants);
			
		} else if((!location.equals("Lokacija restorana") && type.equals("Tip restorana") && !grade.equals("Izaberi ocenu"))
				|| (!location.equals("") && type.equals("Tip restorana") && !grade.equals("Izaberi ocenu"))) {
			searchService.findByNameLocationAndGrade(name, location, grade, restaurants);
			
		} else if((location.equals("Lokacija restorana") && !type.equals("Tip restorana") && !grade.equals("Izaberi ocenu"))
				|| (location.equals("") && !type.equals("Tip restorana") && !grade.equals("Izaberi ocenu"))) {
			searchService.findByNameTypeAndGrade(name, type, grade, restaurants);
			
		} else if((!location.equals("Lokacija restorana") && !type.equals("Tip restorana") && !grade.equals("Izaberi ocenu"))
				|| (!location.equals("") && !type.equals("Tip restorana") && !grade.equals("Izaberi ocenu"))) {
			searchService.findByAll(name, location, type, grade, restaurants);
			
		}
	}
	
	public void findByLocation(String location, String type, String grade, List<Restaurant> restaurants) {
		if(type.equals("Tip restorana") && grade.equals("Izaberi ocenu")) {
			searchService.findByLocation(location, restaurants);
		} else if(!type.equals("Tip restorana") && grade.endsWith("Izaberi ocenu")) {
			searchService.findByLocationAndType(location, type, restaurants);
		} else if(type.equals("Tip restorana") && !grade.endsWith("Izaberi ocenu")) {
			searchService.findByLocationAndGrade(location, grade, restaurants);
		} else if(!type.equals("Tip restorana") && !grade.endsWith("Izaberi ocenu")) {
			searchService.findByLocationGradeAndType(location, type, grade, restaurants);
		} 
	}
	
	public void findByType(String type, String grade, List<Restaurant> restaurants) {
		
		if(grade.equals("Izaberi ocenu")) {
			searchService.findByType(type, restaurants);
		} else {
			searchService.findByTypeAndGrade(type, grade, restaurants);
		}
	}
	
	public void findByGrades(String grade, List<Restaurant> restaurants) {
		searchService.findByGrades(grade, restaurants);
	}
}
