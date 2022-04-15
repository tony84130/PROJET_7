
<template>
    <div id="container-post" class="bloc">

     <!-- Liste des posts -->   
      <div v-for="post in post" :key="post.id" id="post">

            <div id="first-line">
                <div id="user-info">
                    <a href="">
                        <img src="../assets/IDphoto.png" alt="photo user">
                        <div>{{ post.posterId }}</div>
                    </a>
                </div>
                <button v-if="post.posterId" type="button" @click="deleteMessage(post.id)" class="accountbutton"><div id="trash"><i class="fas fa-trash"></i></div></button>
            </div>
            <div id="photo-post" v-if="post.picture != null">
                <a href="">
                    <img v-if="post.picture != null" :src="post.picture" :key="post.picture" alt="post user">
                </a>
            </div>
            <div id="texte-post">{{ post.message }}</div>
            <div id="second-line">
                <div id="heart-count">
                    <div><i class="fas fa-heart"></i></div>
                    <div><i class="far fa-heart"></i></div>
                    <a href="">
                        <div>1 j'aime</div>
                    </a>
                </div>
                <div><i class="fas fa-comment"></i></div>
            </div>

        <PreferButton :parentPost="post.id"/>
        <CommentPost :parentPost="post.id"/>
        <BlocComment :parentPost="post.id"/>
       
      </div>   
      
  </div>

  

</template>

<script>
//import CommentPost from '../components/CommentPost.vue'
//import PreferButton from '../components/PreferButton.vue'
//import BlocComment from '../components/BlocComment.vue'
export default {
    name: "ListPost",
    components: {
        //CommentPost,
        //PreferButton,
        //BlocComment
    },
    data() {
        return {
            
            post: {
            img:true,
            surname: "",
            name: "",
            userId: "",
            content: "",
            date:"%d/%m/%Y",
            image_url: ""
        }
    }
},
    mounted() {
        this.userId = JSON.parse(localStorage.getItem("userId"));
        let url = "http://localhost:3000/api/post/user/29";
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
            this.post.image_url = "couou" + data[0].image_url;
            for(var i=0; i < this.post.length;i++){
                if(data[i].image_url != null)
                this.post[i].image_url= "http://localhost:3000/" + data[i].image_url
            }               
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
            height: min-content;
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

        .accountbutton {
            border: none;
        }

        #trash {
            position: absolute;
            right: 15px;
        }

        #photo-post {
            width: 100%;
            height: 300px;
            border: 2px solid grey;
        }

        #photo-post img {
            width: 100%;
            height: 100%;
            object-fit: cover;
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

        #heart-count .fas {
            display: none;
            color: red;
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
            margin-right: 10px;
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
            
        }

        @media screen and (max-width: 850px) {

            #container {
                width: 700px;
            }

            #container-secondaire {
                width: 400px;
            }

            #container-post {
                width: 700px;
            }

            #post {
                width: 300px;
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

        }

        @media screen and (max-width: 400px) {
            #container-post {
                width: 300px;
            }

            #post {
                width: 300px;
            }

        }

</style>