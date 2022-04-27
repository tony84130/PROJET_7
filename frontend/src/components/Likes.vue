 
<template>
    <div  :key="like.id" id="second-line">
        <div id="heart-count">
            <div @click="addLike" v-if="like.length == 0 || like.length == undefined"><i class="far fa-heart"></i></div>
            <div @click="addLike" v-else><i class="fas fa-heart"></i></div>
            
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
            }
        }
    },
    mounted() {
        if(this.parentPost == undefined){
            console.log("no parent, the commponent is not created");
        }
        else{
            this.userId = JSON.parse(localStorage.getItem("userId"));
            let url = `http://localhost:3000/api/post/get-like-post/${this.parentPost}`;
            //let url = `http://localhost:3000/api/post/get-like-post/1`;
            let options = {
                method: "GET",
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem("token"),
                }
            };
            fetch(url, options)
                .then((res) => {
                    res.json().then(data =>{
                    this.like=data;
                    })
                })
            .catch(error => console.log(error))
        }
    },
    methods: {
        
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
    #heart-count .fas.fa-heart {
        color: red;
    }
</style>