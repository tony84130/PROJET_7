

<template>
    <div v-for="comment in comment" :key="comment.id" id="comment">
        <div id="user-comment">
                
            <img src="../assets/avatar.png" alt="photo user">
            <div>{{ comment.user_id }}</div>
        </div>
        <div id="text-comment">{{ comment.text }}</div>
    </div>
</template>

<script>
export default {
    name: "ListComments",
    data() {
        return {
            comment: {
            pseudo: "",
            userId: "",
            text: "",
        }
    }
},
    mounted() {
        this.userId = JSON.parse(localStorage.getItem("userId"));
        let url = "http://localhost:3000/api/post/get-comment/1";
        let options = {
            method: "GET",
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem("token"),
            }
        };
        fetch(url, options)
            .then((res) => {
                res.json().then(data =>{
            this.comment=data;
            this.comment.image_url = "couou" + data[0].image_url;
            for(var i=0; i < this.comment.length;i++){
                if(data[i].image_url != null)
                this.comment[i].image_url= "http://localhost:3000/" + data[i].image_url
            }               
        })
        })
        .catch(error => console.log(error))
    },
    methods: {
        //addComment(id_comment) {
        addComment() {
            this.userId = JSON.parse(localStorage.getItem("userId"));
            //let url = "http://localhost:3000/api/post/comment/" + id_comment;
            let url = "http://localhost:3000/api/post/comment/1";
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
        deleteComment(id_comment) {
            this.userId = JSON.parse(localStorage.getItem("userId"));
            let url = "http://localhost:3000/api/post/delete-comment/" + id_comment;
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