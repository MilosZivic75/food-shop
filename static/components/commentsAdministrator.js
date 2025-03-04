Vue.component("commentsAdministrator", {
    data: function () {
        return {
            user: { username: null, password: null, name: null, lastName: null, birthDate: null, sex: null },
            comments: []
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
        <div class="row" style="margin-top: 150px; margin-left: 30px;"> 
			<div class="col-11" v-for="comment in comments" style="margin-left:30px"> 
				<p style="border:3px; border-style:solid; background-color:#f7f7cb; border-color: #d47400; padding: 1em;">
				Korisnik: {{comment.customerUsername}}<br>Restoran: {{comment.restaurantID}}<br> Datum: {{getDate(comment.timeOfOccurrence)}}
                    <br> Tekst: {{comment.text}}<br> Ocena: {{comment.grade}}<br> {{getApproved(comment.approved)}}</p>
			</div>
		</div>
        <div class="row">
            <div>
                <img src="../images/administrator-main.jpg" style="margin-top: 20px; position:relative; bottom:0" class="header-image"
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
        axios
            .get('getAllComments')
            .then(response => {
                for (let comment of response.data) {
                    this.comments.push({timeOfOccurrence: comment.timeOfOccurrence, customerUsername: comment.customerUsername,
                        restaurantID: comment.restaurantID, text: comment.text, grade: comment.grade, approved: comment.approved});
                }
            });
    },
    methods: {
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
        getDate: function (date) {
            let day = (date.date.day < 10) ? '0' + date.date.day : date.date.day;
            let month = (date.date.month < 10) ? '0' + date.date.month : date.date.month;
            let hour = (date.time.hour < 10) ? '0' + date.time.hour : date.time.hour;
            let minute = (date.time.minute < 10) ? '0' + date.time.minute : date.time.minute;
            return day + '.' + month + '.' + date.date.year + '.' + ' ' + hour + ':' + minute;
        },
        getApproved: function (approved) {
            if (approved === undefined)
                return 'Čeka na odobrenje'
            if (approved)
                return 'Odobren';
            else
                return 'Odbijen';
        }
    }
});