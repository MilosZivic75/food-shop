Vue.component("customer", {
	data: function () {
		return {
			user: { username: null, password: null, name: null, lastName: null, birthDate: null, sex: null,
			 allOrders:null, cart:null, collectedPoints:null, customerType:null },
		}
	},
	template: ` 
    <div class="row">
        <div class="col-md-4">
            <div class="row">
                <div class="col-1" style="margin-top: 70px; margin-left: 100px;">
                    <div class="media">
                        <div class="media-left">
                            <img width="100" height="100" class="media-object" src="../favicon.ico">
                        </div>
                    </div>
                </div>
                <div class="col-7" style="margin-top: 100px; margin-left: 50px;">
                    <h1 class="text-danger" style="font-size:35px; text-align: center; vertical-align: middle;">Web food shop</h1>
                </div>
            </div>
                <div>
                    <div class="col-8" style="margin-left: 150px; margin-top: 120px; font-size: 30px;"> 
                        <p><b>Zdravo {{user.name}}! Želite da naručite hranu?  </b> </p>
                    </div>
                </div>
                <div >
                    <button type="button" style="margin-left: 240px; margin-top: 30px; font-size: 25px;" class="btn btn-warning"> <b> Naruči </b></button>
                </div>
        </div>

        <div class="col-md-8">
            <div class="container">
                <div class="col-md-12 text-right">
                    <div style="display: flex; flex-direction: row; padding: 0px 15px;">
                        <div class="command-button dropdown" style="margin-left: 740px;">
                            <img src="../images/profile.png" width="30" height="30" style="margin: auto; margin-bottom: 5px;">
                            <b class="dropdown-toggle" id="dropdownVisibilidad" style="font-size: 30px;" data-bs-toggle="dropdown" aria-expanded="false">
                                {{user.name}} 
                            </b>
                            <ul class="dropdown-menu" aria-labelledby="dropdownVisibilidad">
                                <li><a class="dropdown-item" href="" style="font-size: 20px;" type="submit" > Profil </a></li>
                                <li><a class="dropdown-item" href="" style="font-size: 20px;" type="submit" > Narudžbine </a></li>
                                <li><a class="dropdown-item" href="../index.html" style="font-size: 20px;" type="submit" > Odjavite se </a></li>
                            </ul>
                        </div>
                    </div> 
                </div>
                <img class="img-fluid" src="../images/customer.jpg" style="width: 100%; height: 100%; ">
            </div>
        </div>
    </div>
`
	,
	mounted() {
		axios
			.get('/loggedUser')
			.then(response => (this.user = response.data))
	},
	methods: {
		
	}
});