

<template>

    <div id="container">
        <div id="container-user">
            <img id="photo-profil" v-if="user.picture != `avatar.png`" v-bind:src="user.picture" :key="user.picture" alt="photo user">
            <img id="photo-profil" v-else src="../assets/avatar.png" alt="photo user">
            <div>{{ user.pseudo }}</div>
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
                <div v-if="user.bio != null">{{ user.bio }}</div>
            </div>
            
            <div @click="annuler" id="annuler"><button type="submit">Annuler</button></div>

            <div id="modif">
                <input v-if="user.bio != null" type="text" name="textarea" v-model="user.bio">
                <input v-else type="text" name="textarea" placeholder="votre texte ici ..." >             
                <button type="submit">Envoyer</button>
            </div>
            <div id="fileUser">
                <div id="preview" v-if="preview">
                    <img :src="preview" :alt="preview">
                </div>         
                <div id="btns">                
                    <input type="file" ref="file" name="file" class="upload" id="file" @change="selectFile">             
                    <!-- <input type="submit" value="Envoyer" class="btn"> -->
                    <button type="submit">Envoyer</button>
                </div>
            </div>
            <div id="supprConfirm">
                <div>Êtes-vous sûr de vouloir supprimer ce compte ?</div>
                <button type="submit" @click="deleteAccount">Confirmer</button>
            </div>
        </div>
    </div>

    
</template>



<script>
function getId() {
    return  new URLSearchParams(window.location.search).get("id");
}

console.log(getId());

export default {
    name: "List-user",
    components: {
        //CommentPost,
        //PreferButton,
        //BlocComment
    },
    data() {
        return {
            user: {
            img:true,
            pseudo: "",
            userId: "",
            picture: "",
            bio: ""
        }
    }
},
    mounted() {
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
            this.user.pseudo = data[0].pseudo;
            this.user.bio = data[0].bio;        
        })
        })
        .catch(error => console.log(error))
    },
    methods: {
        deleteAccount() {
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

        #container-user {
            display: flex;
            flex-direction: column;
            align-items: center;
            margin: 20px;
            font-weight: bold;
        }

        #photo-profil {
            width: 200px;
            height: 200px;
            margin-bottom: 10px;
            object-fit: cover;
            border-radius: 200px;
            border: 2px solid grey;
        }

        #container-secondaire {
            margin: 20px;
            width: 700px;
            display: flex;
            flex-direction: column;
        }

        #modif-and-delete-user {
            display: flex;
            justify-content: center;
            margin: 10px 0px 40px 0px;
            text-align: center;
        }

        #modif-and-delete-user > div {
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

        #modif-and-delete-user i {
            margin-left: 10px;
        }

        #supprUser, #modifUser, #modif-photo, #annuler button {
            cursor: pointer;
        }

        #fileUser {
            width: 100%;
            display: none;
            flex-direction: column;
        }

        #fileUser #btns {
            width: 100%;
            display: flex;
            flex-direction: column;
        }

        #fileUser #btns input {
            width: 100%;
            padding: 10px;
            margin-bottom: 5px;
            border: 1px solid grey;
            border-radius: 5px;
            background-color: white;
        }

        #fileUser #btns button {
            width: 100%;
            padding: 10px;
            border: 1px solid grey;
            border-radius: 5px;
            font-weight: bold;
        }

        #bio-user div {
            padding: 10px;
            background-color: white;
            border: 1px solid grey;
            border-radius: 5px;
        }

        #annuler {
            width: 100%;
            display: none;
            margin-bottom: 5px;
        }

        #annuler button {
            width: 100%;
            padding: 10px;
            font-weight: bold;
            border: 1px solid grey;
            border-radius: 5px;
        }
        
        #modif {
            width: 100%;
            display: none;
            flex-direction: column;
        }

        #modif input {
            width: 100%;
            padding: 10px;
            margin-bottom: 5px;
            border: 1px solid grey;
            border-radius: 5px;
        }

        #modif button {
            width: 100%;
            padding: 10px;
            border: 1px solid grey;
            border-radius: 5px;
            font-weight: bold;
        }

        #supprConfirm {
            width: 100%;
            display: none;
            flex-direction: column;
        }

        #supprConfirm div {
            width: 100%;
            padding: 10px;
            margin-bottom: 5px;
            background-color: white;
            border: 1px solid grey;
            text-align: center;
            border-radius: 5px;
        }

        #supprConfirm button {
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

            #container-secondaire {
                width: 500px;
            }

            #container-post {
                width: 850px;
            }

            #post {
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

            #container-secondaire {
                width: 500px;
            }

        }

        @media screen and (max-width: 500px) {
            #container {
                width: 300px;
            }

            #container-secondaire {
                width: 300px;
            }

            #modif-and-delete-user {
                
            }

            #modif-and-delete-user > div {
                flex-direction: column;
            }

            #modif-and-delete-user i {
                margin-top: 5px;
            }

        }
</style>