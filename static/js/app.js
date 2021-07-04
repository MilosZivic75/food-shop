const Index = { template: '<index></index>' }
const Customer = { template: '<customer></customer>' }
const Deliverer = { template: '<deliverer></deliverer>' }
const Administrator = { template: '<administrator></administrator>' }
const Manager = { template: '<manager></manager>' }
const Profile = { template: '<profile></profile>' }
const Order = { template: '<order></order>' }
const UsersAdministrator = { template: '<usersAdministrator></usersAdministrator>' }
const RestaurantsAdministrator = { template: '<restaurantsAdministrator></restaurantsAdministrator>' }
const RestaurantArticles = { template: '<restaurantArticles></restaurantArticles>' }
const ShoppingCart = { template: '<shopping-cart></shopping-cart>' }

const router = new VueRouter({
	mode: 'hash',

	  routes: [
		{ path: '/', name: 'home', component: Index},
	    { path: '/customer', component: Customer},
	    { path: '/deliverer', component: Deliverer},
	    { path: '/administrator', component: Administrator},
	    { path: '/manager', component: Manager},
		{ path: '/userProfile', component: Profile},
		{ path: '/order', component: Order},
		{ path: '/usersAdministrator', component: UsersAdministrator},
		{ path: '/restaurantsAdministrator', component: RestaurantsAdministrator},
		{ path: '/restaurantArticles', component: RestaurantArticles},
		{ path: '/shoppingCart', component: ShoppingCart}
	  ]
	  
});

var app = new Vue({
	router,
	el: '#index'
});