Vue.component("managerOrders", {
    data: function () {
        return {
            user: { username: null, password: null, name: null, lastName: null, birthDate: null, sex: null },
        }
    },
    template: ` 
    <div>
    <div class="container">
		<div class="row justify-content-between">
			<div class="col-1 align-self-end">
				<img width="80" height="80" src="../favicon.ico">
			</div>
			<div class="col-5 align-self-end">
				<h1 style="font-size:40px; margin-left: -100%;">Web food shop</h1>
			</div>


			<div class="dropdown col-3 align-self-end">
				<img src="../images/profile.png" width="30"
					height="30" style="margin-top: -12px;">
				<b class="dropdown-toggle" type="button" id="dropdownMenu" data-toggle="dropdown" aria-haspopup="true"
					aria-expanded="false" style="font-size: 30px;">
					{{user.name}}
				</b>
				<div class="dropdown-menu" aria-labelledby="dropdownMenu">
					<a class="dropdown-item" v-on:click="showProfile">Profil</a>
                    <a class="dropdown-item" v-on:click="showRestaurant">Moj restoran</a>
                    <a class="dropdown-item" v-on:click="showOrders">Porudžbine</a>
					<a class="dropdown-item" v-on:click="logout">Odjavite se</a>
				</div>
			</div>
		</div>
	</div>
	<div class="row">
		<div>
			<img src="../images/administrator-main.jpg" style="margin-top: 20px; position:absolute; bottom:0" class="header-image"
				height="300px" width="100%" alt="header image">
		</div>
	</div>
    </div>
    `
    ,
    mounted() {
        axios
            .get('/loggedUser')
            .then(response => {
                if (response.data === 'ERROR') {
                    router.push('/');
                    return;
                } 
                this.user = response.data;
            });
    },
    methods: {
        showProfile: function () {
            event.preventDefault();
            router.push('/userProfile');
        },
        showRestaurant: function() {
            event.preventDefault();
            router.push('/managerRestaurant');
        },
        showOrders: function() {
            event.preventDefault();
            router.push('/managerOrders');
        },
        logout: function () {
            event.preventDefault();
            router.push('/');
            axios
                .post('/logout');
        }
    }
});