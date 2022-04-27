<template>

    <div id="container">
        <div id="container-user">
            <img id="photo-profil" v-if="user.picture != `avatar.png`" v-bind:src="user.picture" :key="user.picture" alt="photo user">
            <img id="photo-profil" v-else src="../assets/avatar.png" alt="photo user">
            <div>{{ user.prenom }} {{ user.nom }}</div>
        </div>
    
        <div id="container-secondaire">
            <div id="modif-and-delete-user">
                <div id="modif-photo">
                    <label for="avatar">
                        <div id="modif-photo-label">
                            <p>Modifier la photo</p>
                            <i class="fas fa-upload"></i>
                        </div>
                    </label>
                    <input type="file" id="avatar" name="avatar" accept="image/png, image/jpg, image/jpeg">
                </div>
                <div id="modif-validation">
                    <p>Valider la biographie</p>
                    <div><i class="fas fa-cog"></i></div>
                </div>
                <div id="delete-user">
                    <p>Supprimer le profil</p>
                    <div><i class="fas fa-trash"></i></div>
                </div>
            </div>
            <div id="bio-user">
                <input v-model="user.bio" type="text">
            </div>
        </div>

                <div>
                    <label for="picture">Photo de profil:</label>
                    <input id="picture" type="file" name="photo_profil" @change="handleFileUpload($event)" required/>
                </div>
                <div>
                  <button v-on:click="sendFile()">Publier la photo</button>
                </div>

            <form @submit.prevent="editProfile">
                <label for="bio">Changer de bio :</label>
                <input type="text" name="bio" v-model="updateUser.bio">
                <input type="submit" value="modifier" @click.prevent="modifyProfile">
            </form>

    </div>

</template>

<script>
const axios = require('axios').default;

export default {
    name: "List-user",
    components: {
        //CommentPost,
        //PreferButton,
        //BlocComment
    },
    data() {
        return {
            
            user: {
                img:true,
                prenom: "",
                nom: "",
                userId: "",
                picture: "",
                bio: ""
            },
            updateUser: {
                bio: "",
            },
            file: '',
            errMsg: null
        }
    },
    mounted() {
        this.userId = JSON.parse(localStorage.getItem("userId"));
        let url = "http://localhost:3000/api/auth/29";
        let options = {
            method: "GET",
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem("token"),
            }
        };
        fetch(url, options)
            .then((res) => {
                res.json().then(data =>{
            this.user=data;
            this.user.picture = data[0].picture;
            this.user.prenom = data[0].prenom;
            this.user.nom = data[0].nom;
            this.user.bio = data[0].bio;             
        })
        })
        .catch(error => console.log(error))
    },
    methods: {
        
        modifyProfile() {            
            let formData = new FormData()
            formData.append('bio', this.updateUser.bio)      

            /* on envoie notre requête */
            if (confirm("êtes vous sûr de vouloir modifier votre profil ?")) {
                axios.put(`http://localhost:3000/api/user/profil/${localStorage.getItem('userId')}`, formData, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                })
                    //.then(location.reload())
                    .catch(error => {error})
            } else {
                location.reload()
            }
        }

    },
}
</script>


<style>
    #modif-photo {
            cursor: pointer;
        }

        #modif-photo-label {
            display: flex;
            align-items: center;
            text-align: center;
        }

        input[type="file"] {
            border: 1px solid red;
            display: none;
        }

        #bio-user input {
            padding: 10px;
            background-color: white;
            border: 1px solid grey;
            border-radius: 5px;
        }

        * {
            margin: 0px;
            padding: 0px;
            box-sizing: border-box;
            font-family: Verdana, Geneva, Tahoma, sans-serif;
        }

        i, a {
            cursor: pointer;
            color: black;
            text-decoration: none;
        }

        a {
            height: 100%;
            display: flex;
            align-items: center;
        }

        body {
            background-color: #EFEFEF;
        }
    
        nav {
            display: flex;
            justify-content: space-between;
            align-items: center;
            background-color: white;
            padding: 15px 30px;
            border: 1px solid grey;
            position: fixed;
            width: 100%;
            z-index: 1;
        }

        h1 {
            color: red;
        }

        nav #logo-groupomania {
            display: none;
        }

        #search {
            border: 1px solid grey;
            background-color: #EFEFEF;
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 5px;
            border-radius: 5px;
            width: 300px;
            height: 30px;
        }

        input {
            background-color: #EFEFEF;
            border: none;
            width: 100%;
            height: 100%;
            padding: 5px 10px;
        }

        #nav-droite {
            display: flex;
            justify-content: center;
            align-items: center;
        }

        #nav-droite i {
            margin: 10px;
        }

        #photo-profil-nav {
            width: 20px;
            height: 20px;
            margin: 10px;
        }

        #photo-profil-nav img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            border-radius: 200px;
        }

        #container {
            display: flex;
            width: 1000px;
            margin: auto;
            padding-top: 100px;
        }

        #container-user {
            display: flex;
            flex-direction: column;
            align-items: center;
            margin: 20px;
            font-weight: bold;
        }

        #photo-profil {
            width: 200px;
            height: 200px;
            margin-bottom: 10px;
            object-fit: cover;
            border-radius: 200px;
            border: 2px solid grey;
        }

        #container-secondaire {
            margin: 20px;
            width: 700px;
            display: flex;
            flex-direction: column;
        }

        #modif-and-delete-user {
            display: flex;
            justify-content: center;
            margin: 10px 0px 40px 0px;
            cursor: pointer;
            text-align: center;
        }

        #modif-and-delete-user > div {
            display: flex;
            align-items: center;
            border: 1px solid grey;
            border-radius: 5px;
            padding: 10px;
            justify-content: space-between;
            background-color: white;
            font-weight: bold;
            margin: 0px 10px;
        }

        #modif-and-delete-user i {
            margin-left: 10px;
        }

        #bio-user div {
            padding: 10px;
            background-color: white;
            border: 1px solid grey;
            border-radius: 5px;
        }

        #container-post {
            display: flex;
            flex-wrap: wrap;
            width: 1000px;
            margin: auto;
        }

        #post {
            border: 2px solid grey;
            width: 450px;
            flex-wrap: wrap;
            margin: 24px;
        }

        #post:hover {
            box-shadow: 0px 0px 10px black;;
        }

        #first-line {
            border: 1px solid grey;
            display: flex;
            height: 50px;
            align-items: center;
            padding: 5px;
            position: relative;
            font-weight: bold;
        }

        #user-info {
            display: flex;
            align-items: center;
            height: 100%;
        }

        #user-info img {
            height: 100%;
            margin-right: 5px;
        }

        #trash {
            position: absolute;
            right: 15px;
        }

        #photo-post {
            width: 100%;
            height: 400px;
            border: 2px solid grey;
        }

        #photo-post img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }

        

        footer {
            position: absolute;
            bottom: 0px;
            display: block;
            width: 100%;
        }

        #container-bas {
            display: flex;
            justify-content: center;
        }

        #container-bas div {
            margin: 20px;
        }

        

        @media screen and (max-width: 1050px) {
            #container {
                width: 800px;
            }

            #container-secondaire {
                width: 500px;
            }
        }

        @media screen and (max-width: 850px) {
            
            #container {
                width: 700px;
            }

            #container-secondaire {
                width: 400px;
            }

        }

        @media screen and (max-width: 700px) {
            
            #container {
                flex-direction: column;
                align-items: center;
                justify-content: center;
                width: 500px;
            }

        }



        @media screen and (max-width: 500px) {
            #container {
                width: 300px;
            }

            #container-secondaire {
                width: 300px;
            }

            #modif-and-delete-user {
                display: flex;
                flex-wrap: wrap;
            }

            #modif-photo-label {
                display: flex;
                justify-content: space-between;
            }

            label {
                width: 100%;
            }

            #modif-and-delete-user > div {
                width: 300px;
                margin-top: 10px;
            }

        }

        @media screen and (max-width: 400px) {
            #bio-user {
                width: 250px;
                margin: auto;
            }
        }
</style>
