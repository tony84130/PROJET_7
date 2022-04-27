<template>
    <div id="add-comment">
        <input type="text" name="text" maxlength="300" requireed v-model="comment.text" placeholder="votre texte ici ...">
        <button @click="createComment">Envoyer</button>
    </div>
</template>

<script>
    export default {
        name: 'commentPost',
        props: {
            parentPost: Number
        },
        data() {
            return { 
            comment: {
                userId : "",
                user_id: "",
                text: "", 
                date:"",
                image_url:"",
                post_id: this.parentPost,
                ref_comment:"",
                }
            }      
        },
        methods: { 
            createComment() {
                this.userId = JSON.parse(localStorage.getItem("userId"));
                this.comment.post_id = this.parentPost
                if(this.comment.post_id == undefined) return -1
                let inputComment= {
                    "post_id": this.parentPost,
                    "text": this.comment.text,
                    "user_id": this.userId
                }
                let url = "http://localhost:3000/api/post/comment"
                let options = {
                    method: "POST",
                    body: JSON.stringify(inputComment),
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem("token"),
                        'Content-Type': 'application/json'
                    }
                }
                fetch(url, options)
                    .then(res => res.json())
                    .then((res) => {
                        //console.log(res)
                        if (res.ok) {
                            this.comment= [{}]
                        } else {
                            //alert("Commentaire envoyé ");
                            console.log("Commentaire envoyé ");
                        }
                    })
                    .then(window.location.reload())
                    .catch(error => console.log(error))
            },
        },
    }
</script>