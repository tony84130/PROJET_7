
<template>
    <div id="container-post" class="bloc">

    <!-- Liste des posts -->   
        <div v-for="post in post" :key="post.id" id="postUser">

            <div id="first-line">
                <div id="user-info">
                    <!-- <img src="../assets/IDphoto.png" alt="photo user"> -->
                    <!-- <div>{{ post.posterId }}</div> -->
                    <Pseudo :parentPost="post.posterId"/>
                </div>
                <button v-if="post.posterId" @click="modifPost(post.id)" class="accountbutton" id="modifPost"><i class="fas fa-cog"></i></button>
                <button v-if="post.posterId" type="button" @click="deleteMessage(post.id)" id="trash" class="accountbutton"><i class="fas fa-trash"></i></button>
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
    import Pseudo from '../components/Pseudo.vue'
    import Likes from '../components/Likes.vue'
    import Comments from '../components/Comments.vue'
    import AddComment from '../components/AddComment.vue'
    import router from '../router'
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
                }
            }
        },
        mounted() {
            this.userId = JSON.parse(localStorage.getItem("userId"));
            let url = `http://localhost:3000/api/post/user/${this.userId}`;
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
                    })
                })
                .catch(error => console.log(error))
        },
        methods: {
            deleteMessage(id_post) {
                this.userId = JSON.parse(localStorage.getItem("userId"));
                let url = "http://localhost:3000/api/post/" + id_post;
                let options = {
                    method: "DELETE",
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem("token"),
                    }
                };
                fetch(url, options)
                    .then((response) => {
                        console.log(response);
                        window.location.reload();
                    })
                    .catch(error => console.log(error))
            },
            modifPost(id) {
                router.push({ path: `/publication/${id}` })
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

    #container-post {
        display: flex;
        flex-wrap: wrap;
        width: 1000px;
        margin: auto;
    }

    #postUser {
        border: 2px solid grey;
        border-radius: 10px;
        width: 450px;
        flex-wrap: wrap;
        margin: 15px;
        height: min-content;
        background-color: white;
    }

    #postUser:hover {
        box-shadow: 0px 0px 10px black;;
    }

    #postUser #first-line {
        display: flex;
        height: 50px;
        align-items: center;
        padding: 5px 10px 5px 5px;
        position: relative;
        font-weight: bold;
        justify-content: space-between;
    }

    #postUser #user-info {
        display: flex;
        align-items: center;
        height: 100%;
    }

    #postUser #user-info img {
        height: 100%;
        max-width: 40px;
        margin-right: 5px;
        object-fit: cover;
    }

    #postUser #modifPost {
        position: absolute;
        right: 35px;
        display: flex;
        align-items: center;
    }

    #postUser #modifPost i {
        position: relative;
        top: 1px;
    }

    #postUser .accountbutton {
        border: none;
    }

    #postUser #trash {
        position: absolute;
        right: 15px;
    }

    #postUser #trash i {
        position: relative;
        top: 1px;
    }

    #postUser #photo-post {
        width: 100%;
        height: 300px;
        border-top: 1px solid grey;
        border-bottom: 1px solid grey;
    }

    #postUser #photo-post img {
        width: 100%;
        height: 100%;
        object-fit: contain;
    }

    #postUser #texte-post {
        padding: 10px;
        border-top: 1px solid grey;
        border-bottom: 1px solid grey;
    }

    #postUser #second-line {
        display: flex;
        justify-content: space-between;
        padding: 5px 15px;
        border-top: 1px solid grey;
        border-bottom: 1px solid grey;
        font-weight: bold;
    }

    #postUser #heart-count {
        display: flex;
        align-items: center;
    }

    #postUser #heart-count i {
        margin-right: 5px;
    }

    #postUser #comment {
        border-top: 1px solid grey;
        border-bottom: 1px solid grey;
        display: flex;
        align-items: center;
        padding: 5px;
    }

    #postUser #user-comment {
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

    #postUser #user-comment img {
        height: 100%;
        max-width: 40px;
        margin-right: 5px;
        object-fit: cover;
    }

    #postUser #texte-comment {
        padding: 5px;
    }

    #postUser #add-comment {
        display: flex;
        justify-content: space-between;
        padding: 5px 10px;
    }

    #postUser #add-comment input {
        background-color: white;
        width: 85%;
        border: none;
    }

    #postUser #add-comment button {
        padding: 5px;
        background-color: #EFEFEF;
        border: 1px solid grey;
        border-radius: 5px;
        font-weight: bold;
        cursor: pointer;
    }

    #postUser #zeroLike {
        display: none;
    }

    #postUser #zeroLikeSmall {
        display: block;
    }

    #postUser #comment {
        flex-direction: column;
        align-items: flex-start;
        padding: 10px;
        position: relative;
    }

    #postUser #commentPseudo {
        width: 150px;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    
    @media screen and (max-width: 1050px) {
        #container-post {
            width: 850px;
        }

        #postUser {
            width: 370px;
        }

        #postUser #postPseudo {
            width: 200px;
            overflow: hidden;
            text-overflow: ellipsis;
        }
    }

    @media screen and (max-width: 850px) {
        #container-post {
            width: 700px;
        }

        #postUser {
            width: 300px;
        }

        #postUser #postPseudo {
            width: 180px;
        }
    }

    @media screen and (max-width: 700px) {
        #container-post {
            width: 450px;
        }

        #postUser {
            width: 450px;
        }

        #postUser #photo-post img {
            height: 300px;
        }

        #postUser #postPseudo {
            width: 220px;
        }

        #postUser #comment {
            flex-direction: column;
            align-items: flex-start;
            padding: 10px;
        }
    }



    @media screen and (max-width: 500px) {
        #container-post {
            width: 400px;
        }

        #postUser {
            width: 400px;
        }

        #postUser #photo-post img {
            height: 250px;
        }
    }

    @media screen and (max-width: 400px) {
        #container-post {
            width: 300px;
        }

        #postUser {
            width: 300px;
        }

        #postUser #photo-post img {
            height: 200px;
        }

        #postUser #postPseudo {
            width: 130px;
        }
    }
</style>