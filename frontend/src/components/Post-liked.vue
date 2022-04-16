<template>
    <div id="container-centraux" class="bloc">

     <!-- Liste des posts -->   
      <div v-for="post in post" id="post" :key="post.id" class="bloclist">

            <div id="first-line">
                <div id="user-info">
                    <a href="">
                        <img src="../assets/IDphoto.png" alt="photo user">
                        <div>{{ post.posterId }}</div>
                    </a>
                </div>
                <button v-if="post.posterId" type="button" @click="deletePost(post.id)" class="accountbutton"><div id="trash"><i class="fas fa-trash"></i></div></button>
            </div>
            <div id="photo-post">
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
        
        deletePost(id_post) {
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

        #container-centraux {
            width: 700px;
            display: flex;
            flex-direction: column;
            margin: auto;
            padding-top: 100px;
        }

        #container-centraux > div {
            margin: 0px 0px 15px 0px;
        }

        #post {
            border: 2px solid grey;
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

        .accountbutton {
            border: none;
        }

        #photo-post {
            width: 100%;
            height: 100%;
            border: 2px solid grey;
        }

        #photo-post img {
            width: 100%;
            height: 400px;
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
            border-radius: 0px 5px 5px 0px;
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

        #add-comment {
            display: flex;
            justify-content: space-between;
            padding: 5px 10px;
            background-color: white;
            border: 1px solid grey;
        }

        #add-comment input {
            background-color: white;
            width: 85%;
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
            #container {
                flex-direction: column;
                justify-content: center;
                align-items: center;
            }

            #container-centraux {
                left: 0px;
            }
            
        }

        @media screen and (max-width: 750px) {
            #container-centraux {
                width: 500px;
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
        }

        @media screen and (max-width: 450px) {
            #container-centraux {
                width: 300px;
            }
        }
</style>