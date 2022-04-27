<template>
    <main id="container-centraux" class="bloc">

        <!-- Liste des posts -->   
        <div v-for="post in post" id="post" :key="post.id" class="bloclist">
            <div id="first-line">
                <div id="user-info">
                    <!-- <img src="../assets/IDphoto.png" alt="photo user"> -->
                    <!-- <div>{{ post.posterId }}</div> -->
                    <Pseudo :parentPost="post.posterId"/>
                </div>
                <button v-if="post.posterId == this.userId || user.isAdmin == 1" type="button" @click="modifPost(post.id)" class="accountbutton" id="modifPost"><i class="fas fa-cog"></i></button>
                <button v-if="post.posterId == this.userId || user.isAdmin == 1" type="button" @click="deletePost(post.id)" class="accountbutton"><div id="trash"><i class="fas fa-trash"></i></div></button>
            </div>
            <div id="photo-post">
                <a href="">
                    <img v-if="post.picturePost != null" :src="post.picturePost" :key="post.picturePost" alt="post user">
                </a>
            </div>
            <div v-if="post.message != 'null'" id="texte-post">{{ post.message }}</div>

            <Likes :parentPost="post.id"/>
            <Comments :parentPost="post.id"/>
            <AddComment :parentPost="post.id"/>
        </div>    
    </main>
</template>

<script>
    import Pseudo from '../components/Pseudo.vue'
    import Likes from '../components/Likes.vue'
    import Comments from '../components/Comments.vue'
    import AddComment from '../components/AddComment.vue'
    import axios from 'axios';
    import router from '../router'
    export default {
        name: "ListPost",
        components: {
            Pseudo,
            Likes,
            Comments,
            AddComment,
        },
        data() {
            return {
                
                post: {
                    img:true,
                    surname: "",
                    name: "",
                    userId: "",
                    content: "",
                    posterId: "",
                },
                user: {
                    userId: "",
                    isAdmin: "",
                    id: "",
                    prenom: "",
                    nom: "",
                }
            }
        },
        beforeCreate() {
            this.userId = JSON.parse(localStorage.getItem("userId"));
            let url = "http://localhost:3000/api/post";
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
                        this.post.posterId = data[0].posterId;
                        
                    })
                })
                .catch(error => console.log(error))
        },  
        created() {
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
                    })
                })
                .catch(error => console.log(error)) 
        },
        methods: {
            deletePost(id_post) {
                this.userId = JSON.parse(localStorage.getItem("userId"));
                let url = "http://localhost:3000/api/post/" + id_post;
                let options = {
                    method: "DELETE",
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem("token"),
                    }
                };
                if (confirm("Êtes vous sûr de vouloir supprimer ce post ?")) {
                    fetch(url, options)
                        .then((response) => {
                            console.log(response);
                            //console.log("Post supprimé !");
                            window.location.reload();
                        })
                        .catch(error => console.log(error))
                }
            },
            modifPost(id) {
                router.push({ path: `/publication/${id}` })
            },
            async modifyPost(id_post) {
                /* on peut envoyer un post sans image mais il faut au moins qu'il y est un texte */     
                if (!this.post.message) {
                    this.errMsg = "Error => vous devez remplir le champ <message> pour créer une nouvelle publication!"
                    return
                }
                /* on créé un objet formData afin de pouvoir ajouter le texte et surtout le file choisi */
                let formData = new FormData()
                formData.append('message', this.post.message)
                if (this.post.newFile) {
                    formData.append('image', this.post.newFile)
                }
                /* envoi du form via axios.put de l'objet formData */
                if (confirm("êtes vous sûr de vouloir modifier votre post ?")) {
                    axios.put(`http://localhost:3000/api/post/7${id_post}`, formData, {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem('token')}`
                        },
                    })  
                        .then(res => this.$emit('add-Post', res.data), (window.location.reload()))
                        .catch(error => console.log(error))
                }
            }
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

    #container-centraux {
        width: 700px;
        display: flex;
        flex-direction: column;
        margin: auto;
        position: relative;
        left: -100px;
    }

    #container-centraux > div {
        margin: 0px 0px 30px 0px;
    }

    #post {
        border: 2px solid grey;
        background-color: white;
        border-radius: 10px;
    }

    #post:hover {
        box-shadow: 0px 0px 10px black;;
    }

    #first-line {
        border-radius: 10px 10px 0px 0px;
        display: flex;
        height: 60px;
        align-items: center;
        padding: 5px 10px 5px 5px;
        position: relative;
        font-weight: bold;
        justify-content: space-between;
    }

    #user-info {
        display: flex;
        align-items: center;
        height: 100%;
    }

    #user-info img {
        height: 100%;
        margin-right: 5px;
        width: 40px;
        object-fit: cover;
    }

    #modifPost {
        position: absolute;
        right: 35px;
        display: flex;
        align-items: center;
    }

    #modifPost i {
        position: relative;
        top: 1px;
    }

    .accountbutton {
        border: none;
    }

    #photo-post {
        width: 100%;
        height: 100%;
        border-top: 1px solid grey;
        border-bottom: 1px solid grey;
    }

    #photo-post img {
        width: 100%;
        height: 400px;
        object-fit: contain;
    }

    #texte-post {
        padding: 10px;
        border-top: 1px solid grey;
        border-bottom: 1px solid grey;
        font-size: 120%;
    }

    #second-line {
        display: flex;
        justify-content: space-between;
        padding: 5px 15px;
        font-weight: bold;
        border-bottom: 1px solid grey;
    }

    #heart-count {
        display: flex;
        align-items: center;
    }

    #heart-count i {
        margin-right: 5px;
    }

    #zeroLikeSmall {
        display: none;
        font-weight: normal;
    }

    #zeroLike {
        font-weight: normal;
    }

    #comment {
        border-top: 1px solid grey;
        border-bottom: 1px solid grey;
        display: flex;
        align-items: center;
        padding: 5px;
        position: relative;
    }

    #user-comment {
        display: flex;
        align-items: center;
        justify-content: space-between;
        border: 1px solid grey;
        border-radius: 0px 5px 5px 0px;
        margin-right: 10px;
        padding-right: 5px;
        font-weight: bold;
    }

    #user-comment img {
        height: 50px;
        width: 40px;
        object-fit: cover;
        margin-right: 5px;
    }

    #text-comment {
        padding: 5px;
    }

    #add-comment {
        display: flex;
        justify-content: space-between;
        padding: 5px 10px;
        background-color: white;
        border-radius: 0px 0px 10px 10px;
    }

    #add-comment input {
        background-color: white;
        width: 85%;
        border: none;
    }

    #add-comment button {
        padding: 5px;
        background-color: #EFEFEF;
        border: 1px solid grey;
        border-radius: 5px;
        font-weight: bold;
        cursor: pointer;
    }

    @media screen and (max-width: 1300px) {
        #container-centraux {
            left: -150px;
        }
    }

    @media screen and (max-width: 1050px) {

        #container-centraux {
            left: 0px;
        }
    }

    @media screen and (max-width: 750px) {
        #container-centraux {
            width: 500px;
        }

        #photo-post img {
            height: 300px;
        }

        #comment {
            flex-direction: column;
            align-items: flex-start;
            padding: 10px;
        }
    }

    @media screen and (max-width: 550px) {
        #container-centraux {
            width: 400px;
        }

        #photo-post img {
            height: 250px;
        }
    }

    @media screen and (max-width: 450px) {
        #container-centraux {
            width: 300px;
        }

        #photo-post img {
            height: 200px;
        }

        #postPseudo {
            width: 190px;
            overflow: hidden;
            text-overflow: ellipsis;
        }

        #commentPseudo {
            width: 150px;
            overflow: hidden;
            text-overflow: ellipsis;
        }
        
        #zeroLike {
            display: none;
        }

        #zeroLikeSmall {
            display: block;
        }
    }
</style>