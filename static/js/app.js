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
const ManagerRestaurant = { template: '<managerRestaurant></managerRestaurant>'}
const ManagerOrders = { template: '<managerOrders></managerOrders>'}
const UserOrders = { template: '<user-orders></user-orders>' }
const RateRestaurant = { template: '<rateRestaurant></rateRestaurant>' }
const CommentsAdministrator = { template: '<commentsAdministrator></commentsAdministrator>' }
const ManagerComments = { template: '<managerComments></ManagerComments>' }
const DelivererOrders = { template: '<delivererOrders></delivererOrders>' }
const SpecificOrder = { template: '<specificOrder></specificOrder>' }

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
		{ path: '/shoppingCart', component: ShoppingCart},
		{ path: '/managerRestaurant', component: ManagerRestaurant},
		{ path: '/managerOrders', component: ManagerOrders},
		{ path: '/myOrders', component: UserOrders},
		{ path: '/rateRestaurant', component: RateRestaurant},
		{ path: '/commentsAdministrator', component: CommentsAdministrator},
		{ path: '/managerComments', component: ManagerComments},
		{ path: '/delivererOrders', component: DelivererOrders},
		{ path: '/specificOrder', component: SpecificOrder}
	  ]
	  
});

var app = new Vue({
	router,
	el: '#index'
});