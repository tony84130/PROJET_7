
<template>
    <div id="container-post" class="bloc">

     <!-- Liste des posts -->   
        <div v-for="post in post" :key="post.id" id="post">

            <div id="first-line">
                <div id="user-info">
                    <a href="">
                        <!-- <img src="../assets/IDphoto.png" alt="photo user"> -->
                        <!-- <div>{{ post.posterId }}</div> -->
                        <Pseudo :parentPost="post.posterId"/>

                    </a>
                </div>
                <button v-if="post.posterId == this.userId || user.isAdmin == 1" type="button" @click="modifPost(post.id)" class="accountbutton" id="modifPost"><i class="fas fa-cog"></i></button>
                <button v-if="post.posterId" type="button" @click="deleteMessage(post.id)" id="trash" class="accountbutton"><i class="fas fa-trash"></i></button>
            </div>
            <div id="photo-post" v-if="post.picture != null">
                <a href="">
                    <img v-if="post.picture != null" :src="post.picture" :key="post.picture" alt="post user">
                </a>
            </div>
            <div id="texte-post">{{ post.message }}</div>
            
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
        }

        #photo-profil img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            border-radius: 200px;
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
            height: min-content;
            background-color: white;
        }

        #post:hover {
            box-shadow: 0px 0px 10px black;;
        }

        #first-line {
            border: 1px solid grey;
            display: flex;
            height: 50px;
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

        #trash {
            position: absolute;
            right: 15px;
        }

        #trash i {
            position: relative;
            top: 1px;
        }

        #photo-post {
            width: 100%;
            height: 300px;
            border: 2px solid grey;
        }

        #photo-post img {
            width: 100%;
            height: 100%;
            object-fit: contain;
        }

        #texte-post {
            padding: 10px;
            border: 1px solid grey;
        }

        #second-line {
            display: flex;
            justify-content: space-between;
            padding: 5px 15px;
            border: 1px solid grey;
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
            border: 1px solid grey;
            display: flex;
            align-items: center;
            padding: 5px;
        }

        #user-comment {
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

        #user-comment img {
            height: 100%;
            margin-right: 5px;
        }

        #texte-comment {
            padding: 5px;
        }

        #add-comment {
            display: flex;
            justify-content: space-between;
            padding: 5px 10px;
            
            border: 1px solid grey;
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

        #zeroLike {
            display: none;
        }

        #zeroLikeSmall {
            display: block;
        }

        #comment {
            flex-direction: column;
            align-items: flex-start;
            padding: 10px;
            position: relative;
        }

        #commentPseudo {
            width: 150px;
            overflow: hidden;
            text-overflow: ellipsis;
        }
        
        @media screen and (max-width: 1050px) {
            #container {
                width: 800px;
            }

            #container-secondaire {
                width: 500px;
            }

            #container-post {
                width: 850px;
            }

            #post {
                width: 370px;
            }

            #postPseudo {
                width: 200px;
                overflow: hidden;
                text-overflow: ellipsis;
            }

            
            
        }

        @media screen and (max-width: 850px) {

            #container {
                width: 700px;
            }

            #container-secondaire {
                width: 500px;
            }

            #container-post {
                width: 700px;
            }

            #post {
                width: 300px;
            }

            #postPseudo {
                width: 180px;
            }
            

        }

        @media screen and (max-width: 700px) {
            #comment {
                flex-direction: column;
                align-items: flex-start;
                padding: 10px;
            }

            #container {
                flex-direction: column;
                align-items: center;
                justify-content: center;
                width: 500px;
            }

            #container-post {
                width: 450px;
            }

            #post {
                width: 450px;
            }

            #photo-post img {
                height: 300px;
            }

            #postPseudo {
                width: 220px;
            }

        }



        @media screen and (max-width: 500px) {

            #container {
                width: 300px;
            }

            #container-secondaire {
                width: 300px;
            }

            #container-post {
                width: 400px;
            }

            #post {
                width: 400px;
            }

            #photo-post img {
                height: 250px;
            }

        }

        @media screen and (max-width: 400px) {
            #container-post {
                width: 300px;
            }

            #post {
                width: 300px;
            }

            #photo-post img {
                height: 200px;
            }

            #postPseudo {
                width: 130px;
            }

        }

</style>