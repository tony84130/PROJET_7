

<template>

    <div id="container-other">
        <div id="container-user">
            <img id="photo-profil" v-if="user.picture != `avatar.png`" v-bind:src="user.picture" :key="user.picture" alt="photo user">
            <img id="photo-profil" v-else src="../assets/avatar.png" alt="photo user">
            <div>{{ user.prenom }} {{ user.nom }}</div>
        </div>
    
        <div id="container-secondaire">
            <div id="modif-and-delete-user" v-if="user.id == this.userId || user1.isAdmin == 1">
                <div id="afficher" @click="afficher">
                    <p>Supprimer le profil</p>
                    <div><i class="fas fa-trash"></i></div>
                </div>
                <div id="annuler-confirmer">
                    <div @click="annuler" id="annuler"><button type="submit">Annuler</button></div>
                    <div @click="deleteAccount" id="confirmer"><button type="submit">Confirmer la suppression du profil !</button></div>
                </div>
            </div>
            <div id="bio-user">
                <div>{{ user.bio }}</div>
            </div>
        </div>
    </div>

    
</template>



<script>
/*
let idPage = function getId() {
    return new URLSearchParams(window.location.search).get("id");
}
console.log(idPage());
*/

export default {
    name: "List-user",
    components: {
        //CommentPost,
        //PreferButton,
        //BlocComment
    },
    //props: ['id'],
    data() {
        return {
            user1: {
                img:true,
                prenom: "",
                nom: "",
                userId: "",
                picture: "",
                bio: "",
                isAdmin: "",
                id: ""
            },
            user: {
                img:true,
                prenom: "",
                nom: "",
                picture: "",
                bio: "",
                isAdmin: "",
                id: ""
            }
        }
    },
    beforeCreate() {
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
                    this.user1 = data[0];
                    this.user1.id = data[0].id;
                    this.user1.isAdmin = data[0].isAdmin;
                    this.user1.bio = data[0].bio;
                    //console.log(res)
                })
            })
            .catch(error => console.log(error)) 

    },
    created() {
        const parsedUrl = new URL(window.location.href)
        const userPageId = parsedUrl.pathname.split('/user/')[1]
        this.userId = JSON.parse(localStorage.getItem("userId"));
        //let url = `http://localhost:3000/api/auth/${['id']}`;
        //let url = `http://localhost:3000/api/auth/${idPage()}`;
        let url = `http://localhost:3000/api/auth/${userPageId}`;
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
            this.user.id = data[0].id;
            if (this.user1.id == this.user.id) {
                this.$router.push("/profil")
            }            
        })
        })
        .catch(error => console.log(error))

        
    },
    methods: {
        deleteAccount() {
            const parsedUrl = new URL(window.location.href)
            const userPageId = parsedUrl.pathname.split('/user/')[1]
            let url = `http://localhost:3000/api/auth/${userPageId}`;
            let options = {
                method: "DELETE",
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem("token"),
                }
            };
            fetch(url, options)
                .then((response) => {
                    console.log(response);
                    alert("Compte supprimé !");
                })
                .then(this.$router.push("/"))
                .catch(error => console.log(error))
        },
        afficher() {
            let hidden = document.getElementById("annuler-confirmer")
            hidden.style.display = "flex";
            let hidden3 = document.getElementById("afficher")
            hidden3.style.display = "none";
        },
        annuler() {
            let hidden = document.getElementById("annuler-confirmer")
            hidden.style.display = "none";
            let hidden3 = document.getElementById("afficher")
            hidden3.style.display = "block";
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

        #container-other {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 1000px;
            margin: auto;
            padding-top: 100px;
        }

        #container-other #container-user {
            display: flex;
            flex-direction: column;
            align-items: center;
            margin: 20px;
            font-weight: bold;
        }

        #container-other #photo-profil {
            width: 200px;
            height: 200px;
            margin-bottom: 10px;
            object-fit: cover;
            border-radius: 200px;
            border: 2px solid grey;
        }

        #container-other #container-secondaire {
            margin: auto;
            
            width: 700px;
            display: flex;
            flex-direction: column;
        }

        #container-other #modif-and-delete-user {
            display: flex;
            justify-content: center;
            margin: 10px 0px 40px 0px;
            cursor: pointer;
            text-align: center;
        }

        #container-other #modif-and-delete-user > div {
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

        #container-other #modif-and-delete-user i {
            margin: 10px;
        }

        #container-other #modif-and-delete-user #annuler-confirmer {
            display: none;

        }

        #container-other #modif-and-delete-user #annuler-confirmer div {
            margin: 10px;
            
        }

        #container-other #modif-and-delete-user #annuler-confirmer div button {
            padding: 10px;
            font-weight: bold;
        }

        #container-other #bio-user div {
            padding: 10px;
            background-color: white;
            border: 1px solid grey;
            border-radius: 5px;
        }
        

        @media screen and (max-width: 1050px) {
            #container-other {
                width: 800px;
            }

            #container-other #container-secondaire {
                width: 500px;
            }

            #container-other #container-post {
                width: 850px;
            }

            #container-other #post {
                width: 370px;
            }
            
        }

        @media screen and (max-width: 850px) {
            #container-other {
                width: 700px;
            }

            #container-other #container-secondaire {
                width: 400px;
            }

        }

        @media screen and (max-width: 700px) {
            #container-other {
                flex-direction: column;
                align-items: center;
                justify-content: center;
                width: 500px;
            }
        }



        @media screen and (max-width: 500px) {
            #container-other {
                width: 300px;
            }

            #container-other #container-secondaire {
                width: 300px;
            }
        }
</style>