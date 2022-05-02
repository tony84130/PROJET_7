<template>
    <div v-if="posts">
        <div id="photo-post" v-for="post in posts" :key="post.id">
            <div id="photo">
                <img v-if="post.picturePost != null" :src="post.picturePost" :key="post.picturePost" alt="post user">
            </div>
            <div v-if="post.message != 'null'" id="texte-post">{{ post.message }}</div>
        </div>
    </div>
            
</template>

<script>
    export default {
        name: "ListPost",
        
        props : {
            parentPost: Number,
        },
        data() {
            return {
                posts: {
                    user_id: "",
                    post_id: "",
                    message: ""
                }
            }
        },
        created() {
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
                        //this.post=data;
                        this.posts=data;
                        //console.log(this.posts)         
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
