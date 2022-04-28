
<template>
    <div id="container-post-other" class="bloc">

    <!-- Liste des posts -->   
        <div v-for="post in post" :key="post.id" id="post">
            <div id="first-line">
                <div id="user-info">
                    <!-- <img src="../assets/IDphoto.png" alt="photo user"> -->
                    <!-- <div>{{ post.posterId }}</div> -->
                    <Pseudo :parentPost="post.posterId"/>
                </div>
                <!-- <button v-if="post.posterId == this.userId || user.isAdmin == 1" type="button" @click="modifPost(post.id)" class="accountbutton" id="modifPost"><i class="fas fa-cog"></i></button> -->
                <button v-if="post.posterId == this.userId || user.isAdmin == 1" type="button" @click="deleteMessage(post.id)" id="trash" class="accountbutton"><i class="fas fa-trash"></i></button>
            </div>
            <div id="photo-post" v-if="post.picturePost != null">
                <a href="">
                    <img v-if="post.picturePost != null" :src="post.picturePost" :key="post.picturePost" alt="post user">
                </a>
            </div>
            <div v-if="post.message != 'null'" id="texte-post">{{ post.message }}</div>
            
            <Likes :parentPost="post.id"/>
            <Comments :parentPost="post.id"/>
            <AddComment :parentPost="post.id"/>
        </div>   
    </div>
</template>

<script>
    // Importation des composants Pseudo, Likes, Comments, AddComment
    import Pseudo from '../components/Pseudo.vue'
    import Likes from '../components/Likes.vue'
    import Comments from '../components/Comments.vue'
    import AddComment from '../components/AddComment.vue'

    export default {
        name: "ListPost",
        components: {
            Pseudo,
            Likes,
            Comments,
            AddComment
        },
        data() {
            return {
                post: {
                    img:true,
                    surname: "",
                    name: "",
                    userId: "",
                    content: "",
                    posterId: ""
                },
                user: {
                    userId: "",
                    isAdmin: "",
                    id: "",
                    prenom: "",
                    nom: ""
                }
            }
        },
        beforeCreate() {
            // Récupération des informations de l'utilisateur connecté pour savoir si il est administrateur
            this.userId = JSON.parse(localStorage.getItem("userId"));
            let urlUser = `http://localhost:3000/api/auth/${this.userId}`;
            let optionsUser = {
                method: "GET",
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem("token"),
                }
            };
            fetch(urlUser, optionsUser)
                .then((res) => {
                    res.json().then(data =>{
                        this.user = data[0];
                        this.user.id = data[0].isAdmin;
                    })
                })
                .catch(error => console.log(error)) 
        },
        mounted() {
            // Récupération des posts d'un utilisateur
            this.userId = JSON.parse(localStorage.getItem("userId"));
            const parsedUrl = new URL(window.location.href)
            const userPageId = parsedUrl.pathname.split('/user/')[1]
            let url = `http://localhost:3000/api/post/user/${userPageId}`;
            let options = {
                method: "GET",
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem("token"),
                }
            };
            fetch(url, options)
                .then((res) => {
                    res.json().then(data =>{
                        this.post=data;   
                        //this.post.posterId = data[0].posterId;     
                    })
                })
                .catch(error => console.log(error))
        },
        methods: {
            // Fonction pour supprimer une publication
            deleteMessage(id_post) {
                this.userId = JSON.parse(localStorage.getItem("userId"));
                let url = "http://localhost:3000/api/post/" + id_post;
                let options = {
                    method: "DELETE",
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem("token"),
                    }
                };
                // Confirmation de suppression d'une publication
                if (confirm("Êtes vous sûr de vouloir supprimer ce post ?")) {
                    fetch(url, options)
                        .then((response) => {
                            console.log(response);
                            window.location.reload();
                        })
                        .catch(error => console.log(error))
                }
            },
        },
    }
</script>

<style>
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
    }

    #photo-profil img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 200px;
    }

    #modif-and-delete-user {
        display: flex;
        justify-content: center;
        margin: 10px 0px 40px 0px;
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

    #container-post-other {
        display: flex;
        flex-wrap: wrap;
        width: 1000px;
        margin: auto;
    }

    #container-post-other #post {
        border: 2px solid grey;
        border-radius: 10px;
        width: 450px;
        flex-wrap: wrap;
        margin: 15px;
        height: min-content;
        background-color: white;
    }

    #container-post-other #post:hover {
        box-shadow: 0px 0px 10px black;;
    }

    #container-post-other #first-line {
        display: flex;
        height: 50px;
        align-items: center;
        padding: 5px 10px 5px 5px;
        position: relative;
        font-weight: bold;
        justify-content: space-between;
    }

    #container-post-other #user-info {
        display: flex;
        align-items: center;
        
        height: 100%;
    }

    #container-post-other #user-info img {
        height: 100%;
        max-width: 40px;
        margin-right: 5px;
        object-fit: cover;
    }

    #container-post-other #modifPost {
        position: absolute;
        right: 35px;
        display: flex;
        align-items: center;
    }

    #container-post-other #modifPost i {
        position: relative;
        top: 1px;
    }

    #container-post-other .accountbutton {
        border: none;
    }

    #container-post-other #trash {
        position: absolute;
        right: 15px;
    }

    #container-post-other #trash i {
        position: relative;
        top: 1px;
    }

    #container-post-other #photo-post {
        width: 100%;
        height: 300px;
        border-top: 1px solid grey;
        border-bottom: 1px solid grey;
    }

    #container-post-other #photo-post img {
        width: 100%;
        height: 100%;
        object-fit: contain;
    }

    #container-post-other #texte-post {
        padding: 10px;
        border-top: 1px solid grey;
        border-bottom: 1px solid grey;
    }

    #container-post-other #second-line {
        display: flex;
        justify-content: space-between;
        padding: 5px 15px;
        border-top: 1px solid grey;
        border-bottom: 1px solid grey;
        font-weight: bold;
    }

    #container-post-other #heart-count {
        display: flex;
        align-items: center;
    }

    #container-post-other #heart-count i {
        margin-right: 5px;
    }

    #container-post-other #comment {
        border-top: 1px solid grey;
        border-bottom: 1px solid grey;
        display: flex;
        align-items: center;
        padding: 5px;
    }

    #container-post-other #user-comment {
        display: flex;
        align-items: center;
        height: 50px;
        border: 1px solid grey;
        border-radius: 0px 5px 5px 0px;
        margin-right: 10px;
        margin-bottom: 5px;
        padding-right: 5px;
        font-weight: bold;
    }

    #container-post-other #user-comment img {
        height: 100%;
        max-width: 40px;
        margin-right: 5px;
        object-fit: cover;
    }

    #container-post-other #texte-comment {
        padding: 5px;
    }

    #container-post-other #add-comment {
        display: flex;
        justify-content: space-between;
        padding: 5px 10px;
    }

    #container-post-other #add-comment input {
        background-color: white;
        width: 85%;
        border: none;
    }

    #container-post-other #add-comment button {
        padding: 5px;
        background-color: #EFEFEF;
        border: 1px solid grey;
        border-radius: 5px;
        font-weight: bold;
        cursor: pointer;
    }

    #container-post-other #zeroLike {
        display: none;
    }

    #container-post-other #zeroLikeSmall {
        display: block;
    }

    #container-post-other #comment {
        flex-direction: column;
        align-items: flex-start;
        padding: 10px;
        position: relative;
    }

    #container-post-other #commentPseudo {
        width: 150px;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    
    @media screen and (max-width: 1050px) {
        #container-post-other {
            width: 850px;
        }

        #container-post-other #post {
            width: 370px;
        }

        #container-post-other #postPseudo {
            width: 200px;
            overflow: hidden;
            text-overflow: ellipsis;
        }
    }

    @media screen and (max-width: 850px) {
        #container-post-other {
            width: 700px;
        }

        #container-post-other #post {
            width: 300px;
        }

        #container-post-other #postPseudo {
            width: 180px;
        }
    }

    @media screen and (max-width: 700px) {
        #container-post-other {
            width: 450px;
        }

        #container-post-other #post {
            width: 450px;
        }

        #container-post-other #photo-post img {
            height: 300px;
        }

        #container-post-other #postPseudo {
            width: 220px;
        }

        #container-post-other #comment {
            flex-direction: column;
            align-items: flex-start;
            padding: 10px;
        }
    }



    @media screen and (max-width: 500px) {
        #container-post-other {
            width: 400px;
        }

        #container-post-other #post {
            width: 400px;
        }

        #container-post-other #photo-post img {
            height: 250px;
        }
    }

    @media screen and (max-width: 400px) {
        #container-post-other {
            width: 300px;
        }

        #container-post-other #post {
            width: 300px;
        }

        #container-post-other #photo-post img {
            height: 200px;
        }

        #container-post-other #postPseudo {
            width: 130px;
        }
    }
</style>