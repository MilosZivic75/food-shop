const Index = { template: '<x></x>' }
const Customer = { template: '<customer></customer>' }
const Deliverer = { template: '<deliverer></deliverer>' }
const Administrator = { template: '<administrator></administrator>' }
const Manager = { template: '<manager></manager>' }

const router = new VueRouter({
	mode: 'hash',
	  routes: [
		{ path: '/', name: 'home', component: Index},
	    { path: '/customer', component: Customer},
	    { path: '/deliverer', component: Deliverer},
	    { path: '/administrator', component: Administrator},
	    { path: '/manager', component: Manager}
	  ]
});

var app = new Vue({
	router,
	el: '#index'
});