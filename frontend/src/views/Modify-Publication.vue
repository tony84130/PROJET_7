
<template>
    <Nav />
    
    <div id="container-modif" class="bloc">

        <div id="post" :key="post.id" class="bloclist">
            <div id="first-line">
                <div id="user-info">
                    <!-- <img src="../assets/IDphoto.png" alt="photo user"> -->
                    <!-- <div>{{ post.posterId }} {{ post.nom }}</div> -->
                    <img v-if="post.picture != `avatar.png`" v-bind:src="post.picture" :key="post.picture" alt="photo user">
                    <img v-else src="../assets/avatar.png" alt="photo user">

                    <div>{{ post.prenom }} {{ post.nom }}</div>
                </div>
                <button type="button" @click="goHome()" class="accountbutton"><div id="trash"><i class="fas fa-home"></i></div></button>
            </div>
            <div id="photo-post">
                <a href="">
                    <img v-if="post.picturePost != null" :src="post.picturePost" :key="post.picturePost" alt="post user">
                </a>
            </div>
            <div v-if="post.message != 'null'" id="texte-post">{{ post.message }}</div>
            <div v-else id="texte-post">"Votre publication ne contient pas de texte ..."</div>
        </div>  

        <form id="modif-post" @submit.prevent="modifyPost">
            <div id="infoModif">Vous pouvez modifier le texte de votre publication ici !</div>
            <div id="modif">
                <input v-if="post.message != 'null'" type="text" name="textarea" v-model="post.message">
                <input v-else type="text" name="textarea" v-model="post.message" placeholder="votre texte ici ..." >             
            </div>
            <button type="submit">Envoyer</button>
            <p>{{ errMsg }}</p>
        </form>  
    </div>
</template>

<script>
    import Nav from "@/components/Navbar.vue";
    import axios from 'axios';
    export default {
        name: 'ModifPost',
        components: {
            Nav,
        },
        data() {
            return {
                message: null,
                file: '',
                preview: null,
                errMsg: null,
                post: {
                    img:true,
                    message: "",
                    userId: "",
                    prenom: "",
                    nom: "",
                    picture: "",
                    picturePost: "",
                    posterId: "",
                    newFile: '',
                    preview: null,
                    errMsg: null
                }
            }
        },
        beforeCreate() {
            const parsedUrl = new URL(window.location.href)
            const userPageId = parsedUrl.pathname.split('/publication/')[1]
            this.userId = JSON.parse(localStorage.getItem("userId"));
            let url = `http://localhost:3000/api/post/${userPageId}`;
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
                        //console.log(this.post)
                        this.post.posterId = data[0].posterId;
                        this.post.message = data[0].message;
                        this.post.picturePost = data[0].picturePost;
                        this.post.prenom = data[0].prenom;
                        this.post.nom = data[0].nom;
                        this.post.picture = data[0].picture;
                    })
                })
                .catch(error => console.log(error))
        },  
        methods: {
            async modifyPost() {
                const parsedUrl = new URL(window.location.href)
                const userPageId = parsedUrl.pathname.split('/publication/')[1]
                /* on peut envoyer un post sans image mais il faut au moins qu'il y est un texte */     
                if (!this.post.message) {
                    this.errMsg = "Vous devez remplir le champ message pour modifier votre publication!"
                    return
                }
                /* on créé un objet formData afin de pouvoir ajouter le texte choisi */
                let formData = new FormData()
                formData.append('message', this.post.message)
                
                /* envoi du form via axios.put de l'objet formData */
                axios.put(`http://localhost:3000/api/post/${userPageId}`, formData, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    },
                })  
                    .then(res => this.$emit('Modif-Post', res.data), console.log("Post modifié !"))
                    .catch(error => console.log(error))
                    window.location.reload();
            },
            goHome() {
                this.$router.push("/");
            } 
        }
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

    #container-modif {
        width: 700px;
        display: flex;
        flex-direction: column;
        margin: auto;
        position: relative;
        padding-top: 100px;
    }

    #container-modif > div {
        margin: 0px 0px 15px 0px;
    }

    #post {
        border: 2px solid grey;
        background-color: white;
        border-radius: 5px;
    }

    #post:hover {
        box-shadow: 0px 0px 10px black;;
    }

    #first-line {
        border: 1px solid grey;
        display: flex;
        height: 60px;
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
        width: 40px;
        object-fit: cover;
    }

    #modifPost {
        position: absolute;
        right: 35px;
        display: flex;
        align-items: center;
    }

    #modifPost i {
        position: relative;
        top: 1px;
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
        height: 300px;
        object-fit: contain;
    }

    #texte-post {
        padding: 10px;
        border: 1px solid grey;
    }

    #modif-post {
        margin-top: 10px;
        border: 2px solid grey;
        background-color: white;
        width: 100%;
        position: relative;
        border-radius: 5px;
    }

    #modif-post #infoModif {
        padding: 10px;
        font-weight: bold;
    }

    #modif-post input {
        background-color: #EFEFEF;
        border: none;
        width: 100%;
        height: 100%;
        padding: 5px 10px;
        border-top: 1px solid grey;
        border-bottom: 1px solid grey;
    }

    #modif-post button {
        padding: 5px;
        background-color: #EFEFEF;
        border: none;
        font-weight: bold;
        cursor: pointer;
        width: 100%;
    }

    #preview {
        border: 1px solid grey;
        width: 100%;
    }

    #preview img {
        width: 100%;
        object-fit: contain;
        max-height: 400px;
    }

    @media screen and (max-width: 750px) {
        #container-modif {
            width: 500px;
        }

        #photo-post img {
            height: 300px;
        }

        #comment {
            flex-direction: column;
            align-items: flex-start;
            padding: 10px;
        }
    }

    @media screen and (max-width: 550px) {
        #container-modif {
            width: 400px;
        }

        #photo-post img {
            height: 250px;
        }
    }

    @media screen and (max-width: 450px) {
        #container-modif {
            width: 300px;
        }

        #photo-post img {
            height: 200px;
        }

        #postPseudo {
            width: 190px;
            overflow: hidden;
            text-overflow: ellipsis;
        }

        #commentPseudo {
            width: 150px;
            overflow: hidden;
            text-overflow: ellipsis;
        }
        
        #zeroLike {
            display: none;
        }

        #zeroLikeSmall {
            display: block;
        }
    }
</style>