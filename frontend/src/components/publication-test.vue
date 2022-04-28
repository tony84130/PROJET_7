<template>

    <div id="photo-post">
        <a href="">
            <img v-if="posts.picturePost != null" :src="posts.picturePost" :key="posts.picturePost" alt="post user">
        </a>
    </div>
    <div id="texte-post">{{ posts.message }}</div>
            
</template>

<script>
    export default {
        name: "ListPost",
        
        props : {
            parentPost: Number,
        },
        data() {
            return {
                post: {
                    user_id: "",
                    post_id: "",
                    message: ""
                },
                posts: {
                    user_id: "",
                    post_id: "",
                    message: ""
                }
            }
        },
        mounted() {
            if (this.parentPost == undefined) {
                console.log("parentPost undefined");
            }
            else {
                this.userId = JSON.parse(localStorage.getItem("userId"));
            let url = `http://localhost:3000/api/post/${this.parentPost}`;
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
                        this.posts=data[0];
                        //console.log(data)         
                    })
                })
                .catch(error => console.log(error))
            }
            
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
