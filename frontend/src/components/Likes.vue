 
<template>
    <div  :key="like.id" id="second-line">
        <div id="heart-count">

            <!--
            <div @click="addLike" v-if="like.length == 0 || like.length == undefined"><i class="far fa-heart"></i></div>
            <div @click="addLike" v-else><i class="fas fa-heart"></i></div>
            -->
            <div @click="addLike"><i class="fas fa-heart"></i></div>


            <div id="zeroLike" v-if="like.length == 0 || like.length == undefined">Soyez le premier à aimer ce post !</div>
            <div id="zeroLikeSmall" v-if="like.length == 0 || like.length == undefined">0 j'aime</div>
            <div v-else>{{ like.length }} j'aime</div>

        </div>
    </div>
</template>

<script>
    export default {
        name: "CountLike",
        props : {
            parentPost: Number,
        },
        data() {
            return {
                like: {
                    prenom: "",
                    nom: "",
                    userId: "",
                    text: "",
                    user_id: ""
                },
                user: {
                    id: ""
                }
            }
        },
        created() {
            // Récupération des informations de l'utilisateur connecté
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
                        //this.user.id = data[0].id;
                        //console.log(this.user.id) 
                    })
                })
                .catch(error => console.log(error)) 
        },
        mounted() {
            // Récupération des likes de chaque publication 
            if (this.parentPost == undefined) {
                console.log("parentPost undefined");
            }
            else{
                this.userId = JSON.parse(localStorage.getItem("userId"));
                let url = `http://localhost:3000/api/post/get-like-post/${this.parentPost}`;
                let options = {
                    method: "GET",
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem("token"),
                    }
                };
                fetch(url, options)
                    .then((res) => {
                        res.json().then(data =>{
                            this.like = data;
                            //console.log(this.like)
                        })
                    })
                .catch(error => console.log(error))
            }
        },
        methods: {
            // Fonction pour pouvoir ajouter ou enlever un like
            addLike() {
            //addLike(post_id) {
                //let url = "http://localhost:3000/api/post/like-post/1";
                let url = `http://localhost:3000/api/post/like-post/${this.parentPost}`;
                //let url = "http://localhost:3000/api/post/like-post/" + post_id;
                let options = {
                    method: "POST",
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
    
</style>