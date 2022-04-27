

<template>
    <div v-for="comment in comment" :key="comment.id" id="comment">
        <div id="user-comment">
                
            <img v-if="comment.picture != `avatar.png`" v-bind:src="comment.picture" :key="comment.picture" alt="photo user">
            <img v-else src="../assets/avatar.png" alt="photo user">

            <div id="commentPseudo">{{ comment.prenom }} {{ comment.nom }}</div>

            <!-- <img src="../assets/avatar.png" alt="photo user"> -->
            <!-- <Pseudo :parentPost="comment.user_id"/> -->
        </div>
        <div id="text-comment">{{ comment.text }}</div>
        <button id="bouton-poubelle" v-if="comment.user_id == this.userId || user.isAdmin == 1" @click="deleteComment(comment.id)"><i class="fas fa-trash"></i></button>
    </div>
</template>

<script>
//import Pseudo from '../components/test-Pseudo.vue'
export default {
    name: "ListComments",
    props : {
        parentPost: Number,
    },
    /*
    components: {
        Pseudo,
        Likes,
        Comments,
        AddComment
    },
    */
    data() {
        return {
            userId: "",
            comment: {
                prenom: "",
                nom: "",
                text: "",
                id: "",
                picture: ""
            },
            user: {
                userId: "",
                isAdmin: "",
                id: "",
                prenom: "",
                nom: "",
            }
        }
    },
    beforeCreate() {
        
        let url = `http://localhost:3000/api/post/get-comment/${this.parentPost}`;
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
                    //this.comment.picture=data[0].picture;
                })
            })
            .catch(error => console.log(error))
    },
    mounted() {
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
                })
            })
            .catch(error => console.log(error)) 


    },
    methods: {
        //addComment(id_comment) {
        addComment() {
            
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
                    //window.location.reload();
                    alert("Commentaire supprimé !");
                    location.reload();
                })
                .catch(error => console.log(error))
        },
        
        /*
        deleteComment(commentId) {
            if (confirm("êtes vous sûr de vouloir supprimer ce commentaire ?")) {
                fetch(`http://localhost:3000/api/post/delete-comment/${(commentId)}`, {
                    method: 'DELETE',
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    } 
                })
                    .catch(error => console.log(error))
                this.$emit('deleted', commentId)
                location.reload();
            }   
        },
        */
    },
}
</script>


<style>
    #bouton-poubelle {
            position: absolute;
            right: 20px;
            border: none;
        }
</style>