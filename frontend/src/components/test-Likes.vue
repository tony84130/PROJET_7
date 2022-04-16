 
<template>
    <div id="second-line">
        <div id="heart-count">
            <div><i class="fas fa-heart"></i></div>
            <div @click="addLike"><i class="far fa-heart"></i></div>
            <a href="">
                <div v-if="like.length == 0 ">Soyez le premier à aimer ce post !</div>
                <div v-else>{{ like.length }} j'aime</div>
            </a>
        </div>
        <div><i class="fas fa-comment"></i></div>
    </div>
</template>

<script>
export default {
    name: "CountLike",
    data() {
        return {
            like: {
            pseudo: "",
            userId: "",
            text: "",
        }
    }
},
    mounted() {
        this.userId = JSON.parse(localStorage.getItem("userId"));
        let url = "http://localhost:3000/api/post/get-like-post/1";
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
    },
    methods: {
        
        addLike() {
        //addLike(post_id) {
            this.userId = JSON.parse(localStorage.getItem("userId"));
            let url = "http://localhost:3000/api/post/like-post/1";
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

