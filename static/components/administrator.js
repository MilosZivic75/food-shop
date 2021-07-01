Vue.component("administrator", {
    data: function () {
        return {
            user: { username: null, password: null, name: null, lastName: null, birthDate: null, sex: null },
        }
    },
    template: ` 
    <div class="container">
		<div class="row justify-content-between">
			<div class="col-4">
				<h1 style="font-size:50px;">Web food shop</h1>
			</div>
			<div class="dropdown col-3 align-self-end">
				<img src="../images/profile.png" width="30" height="30" style="margin-top: -12px;">
				<b class="dropdown-toggle" type="button" id="dropdownMenu" data-toggle="dropdown" aria-haspopup="true"
					aria-expanded="false" style="font-size: 30px;">
					{{user.name}}
				</b>
				<div class="dropdown-menu" aria-labelledby="dropdownMenu">
					<a class="dropdown-item" v-on:click="showProfile">Profil</a>
					<a class="dropdown-item" v-on:click="logout">Odjavite se</a>
				</div>
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
        logout: function () {
            event.preventDefault();
            router.push('/');
            axios
                .post('/logout');
        }
    }
});