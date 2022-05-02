<template>
    <div id="container-centraux-liked" class="bloc">

    <h2>Vous retrouvez ici les publications que vous avez aimés :</h2>

    <!-- Liste des posts -->   
      <div v-for="post in post"  id="post" :key="post.id" class="bloclist">
        <div v-if="post">
            <div id="first-line">
                <div id="user-info">
                    <Pseudo :parentPost="post.user_id"/>
                </div>
                <button v-if="post.posterId == this.userId" type="button" @click="modifPost(post.post_id)" class="accountbutton" id="modifPost"><i class="fas fa-cog"></i></button>
                <button v-if="post.posterId == this.userId || user.isAdmin == 1" type="button" @click="deletePost(post.post_id)" class="accountbutton"><div id="trash"><i class="fas fa-trash"></i></div></button>
            </div>
            
            <!-- <Post :parentPost="checkPostId(post.post_id)"/> -->

            <Post :parentPost="post.post_id"/>

            <Likes :parentPost="post.post_id"/>
            <Comments :parentPost="post.post_id"/>
            <AddComment :parentPost="post.post_id"/>
        </div>
      </div>   
  </div>

  

</template>

<script>
    // Importation de ...
    import Post from '../components/publication.vue'
    import Pseudo from '../components/Pseudo.vue'
    import Likes from '../components/Likes.vue'
    import Comments from '../components/Comments.vue'
    import AddComment from '../components/AddComment.vue'
    import router from '../router'

    export default {
        name: "ListPost",
        components: {
            Post,
            Pseudo,
            Likes,
            Comments,
            AddComment
        },
        data() {
            return {
                post: {
                    user_id: "",
                    post_id: ""
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
            let url = `http://localhost:3000/api/post/get-like-user/${this.userId}`;
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
                        //console.log(data)         
                    })
                })
                .catch(error => console.log(error))
        },
        created() {
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
                    })
                })
                .catch(error => console.log(error)) 
        },
        methods: {
            // Fonction pour supprimer une publication
            deletePost(id_post) {
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
                            //console.log("Post supprimé !");
                            window.location.reload();
                        })
                        .catch(error => console.log(error))
                }
            },

            // Fonction pour se rendre sur la page de modification d'une publication
            modifPost(id) {
                router.push({ path: `/publication/${id}` })
            },
        },
        computed: {
            /*
            checkPostId(id) {
                let result= null;
                if(id !== undefined)  {
                    result = id;
                }
                return result;
                //return id !== undefined ? id :
            }
            */
        }
    }
</script>

<style lang="scss">
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

    #container {
        display: flex;
        justify-content: space-around;
        padding: 10px;
        padding-top: 80px;
    }

    #container-centraux-liked {
        width: 700px;
        display: flex;
        flex-direction: column;
        margin: auto;
        padding-top: 100px;
    }

    h2 {
        margin-bottom: 30px;
        font-size: 20px;
    }

    #container-centraux-liked > div {
        margin: 0px 0px 15px 0px;
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
        border-top: 1px solid grey;
        border-bottom: 1px solid grey;
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
        height: 50px;
        margin-right: 5px;
        width: 50px;
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
        object-fit: cover;
    }

    #texte-post {
        padding: 10px;
        border-top: 1px solid grey;
        border-bottom: 1px solid grey;
    }

    #second-line {
        display: flex;
        justify-content: space-between;
        padding: 5px 15px;
        border-top: 1px solid grey;
        border-bottom: 1px solid grey;
        font-weight: bold;
    }

    #heart-count {
        display: flex;
        align-items: center;
    }

    #heart-count i {
        margin-right: 5px;
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
        height: 50px;
        border: 1px solid grey;
        border-radius: 0px 5px 5px 0px;
        margin-right: 10px;
        padding-right: 5px;
        font-weight: bold;
    }

    #user-comment img {
        height: 100%;
        width: 50px;
        object-fit: cover;
        margin-right: 5px;
    }

    #texte-comment {
        padding: 5px;
    }

    #add-comment {
        display: flex;
        justify-content: space-between;
        padding: 5px 10px;
        background-color: white;
        border-bottom-right-radius: 10px;
        border-bottom-left-radius: 10px;
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
        #container-centraux-liked {
            left: -150px;
        }
    }

    @media screen and (max-width: 1050px) {
        #container {
            flex-direction: column;
            justify-content: center;
            align-items: center;
        }

        #container-centraux-liked {
            left: 0px;
        }
        
    }

    @media screen and (max-width: 750px) {
        #container-centraux-liked {
            width: 500px;
        }

        #photo-post img {
            height: 350px;
        }

        #comment {
            flex-direction: column;
            align-items: flex-start;
            padding: 10px;

        }

        #comment #user-comment {
            margin: 5px;
        }
    }

    @media screen and (max-width: 550px) {
        #container-centraux-liked {
            width: 400px;
        }

        #photo-post img {
            height: 300px;
        }
    }

    @media screen and (max-width: 450px) {
        #container-centraux-liked {
            width: 300px;
        }

        #photo-post img {
            height: 200px;
        }
    }
</style>