

<template>
    <div id="container">
        <div id="container-user">
            <img id="photo-profil" v-if="user.picture != `avatar.png`" v-bind:src="user.picture" :key="user.picture" alt="photo user">
            <img id="photo-profil" v-else src="../assets/avatar.png" alt="photo user">
            <div>{{ user.prenom }} {{ user.nom }}</div>
        </div>
    
        <div id="container-secondaire">
            <div id="modif-and-delete-user">
                <div id="modif-photo" @click="modifPicture">
                    <p>Modifier la photo</p>
                    <div><i class="fas fa-upload"></i></div>     
                </div>
                <div id="modifUser" @click="modifAccount">
                    <p>Modifier la biographie</p>
                    <div><i class="fas fa-cog"></i></div>
                </div>
                <div id="supprUser" @click="supprUser">
                    <p>Supprimer le profil</p>
                    <div><i class="fas fa-trash"></i></div>
                </div>
            </div>
            <div id="bio-user">
                <div v-if="user.bio != null && user.bio != 'null' && user.bio.length >1 ">{{ user.bio }}</div>
            </div>
            
            <div @click="annuler" id="annuler"><button type="submit">Annuler</button></div>

            <form id="modif" @submit.prevent="modifyBio">
                <input v-if="user.bio != null" type="text" name="textarea" v-model="user.bio">
                <input v-else type="text" name="textarea" placeholder="votre texte ici ..." >             
                <button type="submit">Envoyer</button>
            </form>
            <form id="fileUser" @submit.prevent="modifyPicture">
                <div id="preview" v-if="preview">
                    <img :src="preview" :alt="preview">
                </div>         
                <div id="btns">   
                    <!-- <label for="file">Choisir une nouvelle image</label> -->             
                    <!-- <input type="file" ref="file" name="file" class="upload" id="file" @change="selectFile"> -->
                    <input type="file" ref="file" name="file" class="upload" id="file" @change="updateFile">          
                    <!-- <input type="submit" value="Envoyer" class="btn"> -->
                    <button type="submit">Envoyer</button>
                </div>
            </form>
            <div id="supprConfirm">
                <div>Êtes-vous sûr de vouloir supprimer ce compte ?</div>
                <button type="submit" @click="deleteAccount">Confirmer</button>
            </div>
        </div>
    </div>
</template>

<script>
    // Importation de axios
    import axios from 'axios';
    //import router from '../router'
    import { watchEffect } from 'vue';
    
    export default {
        name: "List-user",
        data() {
            return {
                preview: null,
                file: "",
                user: {
                    img:true,
                    prenom: "",
                    nom: "",
                    userId: "",
                    picture: "",
                    bio: "",
                    newFile: '',
                    preview: null,
                    file: "",
                }
            }
        },
        created() {
            watchEffect(() => {
                // Récupération des informations de l'utilisateur connecté pour pouvoir les afficher sur la page
                this.userId = JSON.parse(localStorage.getItem("userId"));
                let url = `http://localhost:3000/api/auth/${this.userId}`;
                let options = {
                    method: "GET",
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem("token"),
                    }
                };
                fetch(url, options)
                    .then((res) => {
                        res.json().then(data =>{
                        this.user=data;
                        this.user.picture = data[0].picture;
                        this.user.prenom = data[0].prenom;
                        this.user.nom = data[0].nom;
                        this.user.bio = data[0].bio;        
                        })
                    })
                .catch(error => console.log(error))
                })
            
        },
        methods: {
            // Fonction pour supprimer son compte utilisateur
            deleteAccount() {
                this.userId = JSON.parse(localStorage.getItem("userId"));
                let url = `http://localhost:3000/api/auth/${this.userId}`;
                let options = {
                    method: "DELETE",
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem("token"),
                    }
                };
                fetch(url, options)
                    .then((response) => {
                        console.log(response);
                        localStorage.clear();
                        alert("Compte supprimé !");
                    })
                    .then(this.$router.push("/signup"))
                    .catch(error => console.log(error))
            },

            // Fonction pour afficher le bouton de modification de sa biographie 
            modifAccount() {
                let hidden = document.getElementById("bio-user")
                hidden.style.display = "none";
                let hidden2 = document.getElementById("fileUser")
                hidden2.style.display = "none";
                let hidden3 = document.getElementById("supprConfirm")
                hidden3.style.display = "none";
                let flex = document.getElementById("modif")
                flex.style.display = "flex";
                let flex2 = document.getElementById("annuler")
                flex2.style.display = "flex";
            },

            // Fonction pour afficher le bouton de modification de sa photo
            modifPicture() {
                let hidden = document.getElementById("bio-user")
                hidden.style.display = "none";
                let hidden2 = document.getElementById("modif")
                hidden2.style.display = "none";
                let hidden3 = document.getElementById("supprConfirm")
                hidden3.style.display = "none";
                let flex = document.getElementById("fileUser")
                flex.style.display = "flex";
                let flex2 = document.getElementById("annuler")
                flex2.style.display = "flex";
            },

            // Fonction pour afficher le bouton de suppression de compte
            supprUser() {
                let hidden = document.getElementById("bio-user")
                hidden.style.display = "none";
                let hidden2 = document.getElementById("fileUser")
                hidden2.style.display = "none";
                let hidden3 = document.getElementById("modif")
                hidden3.style.display = "none";
                let flex = document.getElementById("supprConfirm")
                flex.style.display = "flex";
                let flex2 = document.getElementById("annuler")
                flex2.style.display = "flex";
            },

            // Fonction pour annuler les modifications et la suppression
            annuler() {
                let hidden = document.getElementById("fileUser")
                hidden.style.display = "none";
                let hidden2 = document.getElementById("modif")
                hidden2.style.display = "none";
                let hidden3 = document.getElementById("annuler")
                hidden3.style.display = "none";
                let hidden4 = document.getElementById("supprConfirm")
                hidden4.style.display = "none";
                let block = document.getElementById("bio-user")
                block.style.display = "block";
            },

            // Fonction pour modifier sa biographie via axios.put
            modifyBio() {
                this.userId = JSON.parse(localStorage.getItem("userId")); 
                
                let formData = new FormData()
                formData.append('bio', this.user.bio)
                
                axios.put(`http://localhost:3000/api/auth/${this.userId}`, formData, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    },
                })  
                    .then(res => this.$emit('modif-bio', res.data), (window.location.reload()))
                    .catch(error => console.log(error))
            },

            // Fonction pour ajouter un fichier image
            updateFile(event) {
                this.file = this.$refs.file.files[0]
                let input = event.target
                if(input.files) {
                    let reader = new FileReader()
                    reader.onload = (e) => {
                        this.preview = e.target.result
                    }
                    reader.readAsDataURL(input.files[0])
                }
            },

            // Fonction pour modifier sa photo via axios.put
            modifyPicture() {
                this.userId = JSON.parse(localStorage.getItem("userId")); 
                
                let formData = new FormData()
                formData.append('profil_image', this.file)
                
                if (confirm("êtes vous sûr de vouloir modifier votre photo ?")) {
                    axios.put(`http://localhost:3000/api/auth/profil/${this.userId}`, formData, {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem('token')}`
                        },
                    })  
                        .then(res => {
                            //this.$emit('modif-picture', res.data)
                            console.log(res.data)
                            //watchEffect(() => {this.user.picture = null})
                            window.location.reload()
                            //this.userId = JSON.parse(localStorage.getItem("userId"));
                            //router.push({ path: `/profil` })
                            })
                        .catch(error => console.log(error))
                }
                //window.location.reload()
            }
        },
    }
</script>

<style>
    * {
        margin: 0px;
        padding: 0px;
        box-sizing: border-box;
        font-family: Verdana, Geneva, Tahoma, sans-serif;
    }

    i, a, button {
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
        width: 1000px;
        margin: auto;
        padding-top: 100px;
    }

    #container #container-user {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin: 20px;
        font-weight: bold;
    }

    #container #photo-profil {
        width: 200px;
        height: 200px;
        margin-bottom: 10px;
        object-fit: cover;
        border-radius: 200px;
        border: 2px solid grey;
    }

    #container #container-secondaire {
        margin: 20px;
        width: 700px;
        display: flex;
        flex-direction: column;
    }

    #container #modif-and-delete-user {
        display: flex;
        justify-content: center;
        margin: 10px 0px 40px 0px;
        text-align: center;
    }

    #container #modif-and-delete-user > div {
        display: flex;
        align-items: center;
        border: 1px solid grey;
        border-radius: 5px;
        padding: 10px;
        justify-content: space-between;
        background-color: white;
        font-weight: bold;
        margin: 0px 10px;
    }

    #container #modif-and-delete-user i {
        margin-left: 10px;
    }

    #supprUser, #modifUser, #modif-photo, #annuler button {
        cursor: pointer;
    }

    #container #fileUser {
        width: 100%;
        display: none;
        flex-direction: column;
    }

    #container #fileUser #btns {
        width: 100%;
        display: flex;
        flex-direction: column;
    }

    #container #fileUser #btns input {
        width: 100%;
        padding: 10px;
        margin-bottom: 5px;
        border: 1px solid grey;
        border-radius: 5px;
        background-color: white;
    }

    #container #fileUser #btns button {
        width: 100%;
        padding: 10px;
        border: 1px solid grey;
        border-radius: 5px;
        font-weight: bold;
    }

    #container #preview {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 5px;
    }

    #container #preview img {
        max-width: 400px;
        max-height: 400px;
        object-fit: cover;
        margin: auto;
    }

    #container #bio-user div {
        padding: 10px;
        background-color: white;
        border: 1px solid grey;
        border-radius: 5px;
    }

    #container #annuler {
        width: 100%;
        display: none;
        margin-bottom: 5px;
    }

    #container #annuler button {
        width: 100%;
        padding: 10px;
        font-weight: bold;
        border: 1px solid grey;
        border-radius: 5px;
    }
    
    #container #modif {
        width: 100%;
        display: none;
        flex-direction: column;
    }

    #container #modif input {
        width: 100%;
        padding: 10px;
        margin-bottom: 5px;
        border: 1px solid grey;
        border-radius: 5px;
    }

    #container #modif button {
        width: 100%;
        padding: 10px;
        border: 1px solid grey;
        border-radius: 5px;
        font-weight: bold;
    }

    #container #supprConfirm {
        width: 100%;
        display: none;
        flex-direction: column;
    }

    #container #supprConfirm div {
        width: 100%;
        padding: 10px;
        margin-bottom: 5px;
        background-color: white;
        border: 1px solid grey;
        text-align: center;
        border-radius: 5px;
    }

    #container #supprConfirm button {
        width: 100%;
        padding: 10px;
        border: 1px solid grey;
        border-radius: 5px;
        font-weight: bold;
    }

    @media screen and (max-width: 1050px) {
        #container {
            width: 800px;
        }

        #container #container-secondaire {
            width: 500px;
        }

        #container #post {
            width: 370px;
        }
    }

    @media screen and (max-width: 850px) {
        #container {
            flex-direction: column;
            align-items: center;
            justify-content: center;
            width: 500px;
        }

        #container #container-secondaire {
            width: 500px;
        }
    }

    @media screen and (max-width: 500px) {
        #container {
            width: 300px;
        }

        #container #container-secondaire {
            width: 300px;
        }

        #container #modif-and-delete-user {
            
        }

        #container #modif-and-delete-user > div {
            flex-direction: column;
        }

        #container #modif-and-delete-user i {
            margin-top: 5px;
        }
    }
</style>