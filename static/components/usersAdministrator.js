Vue.component("usersAdministrator", {
    data: function () {
        return {
            user: { username: null, password: null, name: null, lastName: null, birthDate: null, sex: null },
            newUser: { username: null, password: null, name: null, lastName: null, birthDate: null, sex: null, userRole: null },
            users: null
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
            <button type="button" class="btn btn-outline-dark col-2" style="margin-right: 200px" data-toggle="modal" data-target="#addUserModal">
            Dodaj korisnika</button>
        </div>
        <div class="row" style="margin-top: 150px; margin-left: 30px;"> 
			<div class="col-2" v-for="user in users" style="margin-left:30px"> 
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
                    this.user = response.data;
                });
            axios
                .get('/getUsers')
                .then(response => (this.users = response.data));
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
        }
    }
});