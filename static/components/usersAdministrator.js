Vue.component("usersAdministrator", {
    data: function () {
        return {
            user: { username: null, password: null, name: null, lastName: null, birthDate: null, sex: null },
            newUser: { username: null, password: null, name: null, lastName: null, birthDate: null, sex: null, userRole: null },
            users: [],
            suspiciousUsers: [],
            usersForView: [],
            name: '',
            lastName: '',
            username: '',
            sortParameter: '',
            sort: '',
            role: '',
            userType: ''
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
                        <a class="dropdown-item" v-on:click="showUsers">Korisnici</a>
                        <a class="dropdown-item" v-on:click="showRestaurants">Restorani</a>
                        <a class="dropdown-item" v-on:click="showComments">Komentari</a>
                        <a class="dropdown-item" v-on:click="logout">Odjavite se</a>
                    </div>
                </div>
            </div>
        </div>
        <div class="row justify-content-end" style="margin-top: 50px;">
            <button type="button" class="btn btn-outline-dark col-2" style="margin-right: 20px" data-toggle="modal" data-target="#suspiciousUsersModal">
                Sumnjivi korisnici</button>
            <button type="button" class="btn btn-outline-dark col-2" style="margin-right: 200px" data-toggle="modal" data-target="#addUserModal">
                Dodaj korisnika</button>
        </div>
        <div class="row" style=" margin-top: 50px; margin-left: 50px;">
            <div class="container sports-container col-12" >
                <div class="form-floating" style="display:inline-block">
                    <input type="text" class="form-control" v-model="name" id="name" placeholder="Name">
                    <label for="name">Ime</label>
                </div>
                <div class="form-floating" style="display:inline-block">
                    <input type="text" class="form-control" v-model="lastName" id="lastName" placeholder="LastName">
                    <label for="lastName">Prezime</label>
                </div>
                <div class="form-floating" style="display:inline-block">
                    <input type="text" class="form-control" v-model="username" id="username" placeholder="Username">
                    <label for="username">Korisničko ime</label>
                </div>
                <div class="form-floating" style="display:inline-block;">
                    <select class="form-control" v-model="sortParameter" id="sortParameter" placeholder="SortParameter">
                        <option value="name">Ime</option>
                        <option value="lastName">Prezime</option>
                        <option value="username">Korisničko ime</option>
                        <option value="collectedPoints">Sakupljeni poeni</option>
                    </select>
                    <label for="sortParameter">Parametar</label>
                </div>
                <div class="form-floating" style="display:inline-block">
                    <select class="form-control" v-model="sort" id="sort" placeholder="Sort">
                        <option value="asc">Rastuće</option>
                        <option value="dsc">Opadajuće</option>
                    </select>
                    <label for="sort">Sortiranje</label>
                </div>
                <div class="form-floating" style="display:inline-block">
                    <select class="form-control" v-model="role" id="role" placeholder="Role">
                        <option value="">Svi</option>
                        <option value="Kupac">Kupac</option>
                        <option value="Dostavljač">Dostavljač</option>
                        <option value="Menadžer">Menadžer</option>
                        <option value="Administrator">Administrator</option>
                    </select>
                    <label for="role">Uloga</label>
                </div>
                <div class="form-floating" style="display:inline-block">
                    <select class="form-control" v-model="userType" id="userType" placeholder="UserType">
                        <option value="">Svi</option>
                        <option value="REGULAR">Regularni</option>
                        <option value="BRONSE">Brozani</option>
                        <option value="SILVER">Srebrni</option>
                        <option value="GOLD">Zlatni</option>
                    </select>
                    <label for="userType">Tip</label>
                </div>
                <button class="btn btn-outline-dark btn-lg" style="margin-bottom:15px" v-on:click="findUsers"> Traži </button>
            </div>
        </div>
        <div class="row" style="margin-top: 150px; margin-left: 30px;"> 
			<div class="col-2" v-for="user in usersForView" style="margin-left:30px"> 
				<p style="border:3px; border-style:solid; background-color:#f7f7cb; border-color: #d47400; padding: 1em;">
				Ime: {{user.name}}<br>Prezime: {{user.lastName}}<br> Korisničko ime: {{user.username}}<br> Tip korisnika: {{user.userRole}}
                <br> <button class="btn btn-success btn-sm col-5" v-if="(user.userRole === 'Menadžer' || user.userRole === 'Dostavljač' || user.userRole === 'Kupac') && user.blocked === 1" 
                        v-on:click="unblockUser(user.username)">Odlokiraj</button>
                    <button class="btn btn-warning btn-sm col-5" v-if="(user.userRole === 'Menadžer' || user.userRole === 'Dostavljač' || user.userRole === 'Kupac') && user.blocked === 0" 
                        v-on:click="blockUser(user.username)">Blokiraj</button>
                    <button class="btn btn-danger btn-sm col-5" v-if="user.userRole === 'Menadžer' || user.userRole === 'Dostavljač' || user.userRole === 'Kupac'" 
                        v-on:click="deleteUser(user.username)">Obriši</button></p>
			</div>
		</div>
        <div class="row">
            <div>
                <img src="../images/administrator-main.jpg" style="margin-top: 20px; position:relative; bottom:0" class="header-image"
                    height="300px" width="100%" alt="header image">
            </div>
        </div>
        
        <div class="modal fade" id="addUserModal" tabindex="-1" role="dialog" aria-labelledby="addUserModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="addUserModalLabel">Dodaj novog korisnika</h5>
                        <button type="button" class="btn-close" data-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body align-items-center">
                        <form id="addUserForm">
                            <div class="form-floating m-4 ">
                                <input type="name" class="form-control" v-model="newUser.name" id="addUserName" placeholder="Name">
                                <label for="addUserName">Ime</label>
                            </div>
                            <div class="form-floating m-4">
                                <input type="lastname" class="form-control" v-model="newUser.lastName" id="addUserLastName" placeholder="LastName">
                                <label for="addUserLastName">Prezime</label>
                            </div>
                            <div class="form-floating m-4">
                                <input type="date" class="form-control" v-model="newUser.birthDate" id="addUserBirthDate" placeholDer="BirthDate">
                                <label for="addUserBirthDate">Datum rođenja</label>
                            </div>
                            <div class="form-floating m-4">
                                <select class="form-control" v-model="newUser.sex" id="addUserSex" placeholder="Sex">
                                    <option value="Muški">Muški</option>
                                    <option value="Ženski">Ženski</option>
                                </select>
                                <label for="addUserSex">Pol</label>
                            </div>
                            <div class="form-floating m-4 ">
                                <input type="username" class="form-control" v-model="newUser.username" id="addUserUsername" placeholder="Username">
                                <label for="addUserUsername">Korisničko ime</label>
                            </div>
                            <div class="form-floating m-4">
                                <input type="password" class="form-control" v-model="newUser.password" id="addUserPasswordReg" placeholder="Password">
                                <label for="addUserPasswordReg">Lozinka</label>
                            </div>
                            <div class="form-floating m-4">
                                <select class="form-control" v-model="newUser.userRole" id="addUserRole" placeholder="UserRole">
                                    <option value="Menadžer">Menadžer</option>
                                    <option value="Dostavljač">Dostavljač</option>
                                </select>
                                <label for="addUserRole">Tip korisnika</label>
                            </div>

                            <button class="m-4 btn btn-lg btn-primary" v-on:click="addUser" type="submit" style="width: 90%;">
                                Dodaj</button>
                            <div id="errorAddUser" class="alert alert-danger m-4" role="alert" style="display: none;"></div>
                            <div id="successAddUser" class="alert alert-success m-4" role="alert" style="display: none;"></div>
                            <p class="mt-5 mb-3 text-muted">&copy; 2021</p>
                        </form>
                    </div>
                </div>
            </div>
        </div>

        <div class="modal fade" id="suspiciousUsersModal" role="dialog" aria-labelledby="suspiciousUsersModal" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="address-label">Sumnjivi korisnici</h5>
                        <button type="button" class="btn-close" data-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <table width="100%">
                            <tr>
                                <th>Ime</th>
                                <th>Prezime</th>
                                <th>Korisničko ime</th>
                            </tr>
                            <tr v-for="suspiciousUser in suspiciousUsers">
                                <td>{{suspiciousUser.name}}</td>
                                <td>{{suspiciousUser.lastName}}</td>
                                <td>{{suspiciousUser.username}}</td>
                                <td v-if="suspiciousUser.blocked === 0"><button class="btn btn-warning btn-sm col-10" 
                                    v-on:click="blockUser(suspiciousUser.username)">Blokiraj</button></td>
                                <td v-if="suspiciousUser.blocked === 1"><button class="btn btn-success btn-sm col-10" 
                                    v-on:click="unblockUser(suspiciousUser.username)">Odlokiraj</button></td>
                            </tr>
                        </table>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-primary" data-dismiss="modal"><i
                                class="fa fa-check"></i>OK</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `
    ,
    mounted() {
        this.initSetup();
    },
    methods: {
        initSetup: function () {
            axios
                .get('/loggedUser')
                .then(response => {
                    if (response.data === 'ERROR') {
                        router.push('/');
                        return;
                    }
                    var match = document.cookie.match(new RegExp('(^| )' + 'role' + '=([^;]+)'));
                    if (match)
                        var cookie = match[2];
                    if (cookie !== 'administrator') {
                        router.push('/' + cookie);
                        return;
                    }
                    this.user = response.data;
                });
            axios
                .get('/getUsers')
                .then(response => {
                    this.users = response.data;
                    this.usersForView = response.data;
                });
            axios
                .get('/getSuspiciousUsers')
                .then(response => (this.suspiciousUsers = response.data));
        },
        showProfile: function () {
            event.preventDefault();
            router.push('/userProfile');
        },
        showUsers: function () {
            event.preventDefault();
            router.push('/usersAdministrator');
        },
        showRestaurants: function () {
            event.preventDefault();
            router.push('/restaurantsAdministrator');
        },
        showComments: function () {
            event.preventDefault();
            router.push('/commentsAdministrator');
        },
        logout: function () {
            event.preventDefault();
            router.push('/');
            axios
                .post('/logout');
        },
        addUser: function () {
            event.preventDefault();

            $('#errorAddUser').hide();
            if (this.newUser.name === null || this.newUser.lastName === null || this.newUser.birthDate === null
                || this.newUser.sex === null || this.newUser.username === null || this.newUser.password === null ||
                this.newUser.userRole === null) {
                $('#errorAddUser').text('Molimo popunite sva polja.');
                $('#errorAddUser').show().delay(3000).fadeOut();
                $('#addUserModal').animate({ scrollTop: document.body.scrollHeight }, "fast");
                return;
            }
            if (this.newUser.name.trim() === '' || this.newUser.lastName.trim() === '' || this.newUser.birthDate.trim() === ''
                || this.newUser.sex.trim() === '' || this.newUser.username.trim() === '' || this.newUser.password.trim() === '' ||
                this.newUser.userRole.trim() === '') {
                $('#errorAddUser').text('Molimo popunite sva polja.');
                $('#errorAddUser').show().delay(3000).fadeOut();
                $('#addUserModal').animate({ scrollTop: document.body.scrollHeight }, "fast");
                return;
            }

            axios.post('/addUser', {
                name: this.newUser.name,
                lastName: this.newUser.lastName,
                birthDate: this.newUser.birthDate,
                sex: this.newUser.sex,
                username: this.newUser.username,
                password: this.newUser.password,
                userRole: this.newUser.userRole
            })
                .then(response => {
                    if (response.data === 'SUCCESS') {
                        $('#successAddUser').text('Korisnik je uspesno dodat.');
                        $('#successAddUser').show().delay(3000).fadeOut();
                        $('#addUserModal').animate({ scrollTop: document.body.scrollHeight }, "fast");
                        this.initSetup();

                        $('#addUserModal').hide();
                        $('.modal-backdrop').hide();
                        $('body').removeClass('modal-open');
                    }
                    else {
                        $('#errorAddUser').text('Korisnik sa datim korisničkim imenom već postoji.');
                        $('#errorAddUser').show().delay(3000).fadeOut();
                        $('#addUserModal').animate({ scrollTop: document.body.scrollHeight }, "fast");
                    }
                });
        },
        deleteUser: function (username) {
            event.preventDefault();

            axios.post('/deleteUser', {
                username: username,
            })
                .then(response => (this.initSetup()));
        },
        blockUser: function (username) {
            event.preventDefault();

            axios.post('/blockUser', {
                username: username,
            })
                .then(response => (this.initSetup()));
        },
        unblockUser: function (username) {
            event.preventDefault();

            axios.post('/unblockUser', {
                username: username,
            })
                .then(response => (this.initSetup()));
        },
        findUsers: function () {
            event.preventDefault();

            this.usersForView = [];
            for (let u of this.users) {
                if (u.name.toLowerCase().includes(this.name.toLowerCase()) && u.lastName.toLowerCase().includes(this.lastName.toLowerCase()) && u.username.toLowerCase().includes(this.username.toLowerCase()))
                    this.usersForView.push(u);
            }
            if (this.sortParameter === 'name' && this.sort === 'asc')
                this.usersForView.sort((a, b) => a.name.localeCompare(b.name));
            else if (this.sortParameter === 'name' && this.sort === 'dsc')
                this.usersForView.sort((a, b) => b.name.localeCompare(a.name));
            else if (this.sortParameter === 'lastName' && this.sort === 'asc')
                this.usersForView.sort((a, b) => a.lastName.localeCompare(b.lastName));
            else if (this.sortParameter === 'lastName' && this.sort === 'dsc')
                this.usersForView.sort((a, b) => b.lastName.localeCompare(a.lastName));
            else if (this.sortParameter === 'username' && this.sort === 'asc')
                this.usersForView.sort((a, b) => a.username.localeCompare(b.username));
            else if (this.sortParameter === 'username' && this.sort === 'dsc')
                this.usersForView.sort((a, b) => b.username.localeCompare(a.username));
            else if (this.sortParameter === 'collectedPoints' && this.sort === 'asc')
                this.usersForView.sort((a, b) => this.getCollectedPoints(a).localeCompare(this.getCollectedPoints(b)));
            else if (this.sortParameter === 'collectedPoints' && this.sort === 'dsc')
                this.usersForView.sort((a, b) => this.getCollectedPoints(b).localeCompare(this.getCollectedPoints(a)));
            this.usersForView = this.usersForView.filter(u => (u.userRole.includes(this.role)));
            this.usersForView = this.usersForView.filter(u => (this.getCustomerType(u).includes(this.userType)));

        },
        getCollectedPoints: function(user) {
            if (user.collectedPoints === undefined)
                return '0';
            else
                return user.collectedPoints.toString();
        },
        getCustomerType: function(user) {
            if (user.customerType === undefined)
                return '';
            else
                return user.customerType;
        }
    }
});