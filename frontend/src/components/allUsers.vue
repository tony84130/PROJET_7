<template>
    <div id="container-users">
        <div id="container-droite">
            <h2>suggestions</h2>
            <div id="suggestions">

                <div v-for="user in users" :key="user.id" id="user-suggestions" @click="userPage(user.id)">
                    <!-- <router-link :to="{ name: 'User-page', params: {id: 28 }}" title="Profil"> -->
                    
                    <!-- <router-link to="/user" title="User-page"> -->
                    
                        <img v-if="user.picture != `avatar.png`" v-bind:src="user.picture" :key="user.picture" alt="photo user">
                        <img v-else src="../assets/avatar.png" alt="photo user">
                        <div>{{ user.prenom }} {{ user.nom }}</div>
                    <!-- </router-link> -->
                </div>  
            </div>
        </div>
    </div>
</template>

<script>
    // Importation du router
    import router from '../router'
    
    export default {
        name: "ListUser",
        data() {
            return {
                users: {
                    img:true,
                    prenom: "",
                    nom: "",
                    userId: "",
                    picture: "",
                    id: "" 
                }   
            }
        },
        beforeCreate() {
            // Récupération de tous les utilisateurs
            this.userId = JSON.parse(localStorage.getItem("userId"));
            let url = "http://localhost:3000/api/auth";
            let options = {
                method: "GET",
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem("token"),
                }
            };
            fetch(url, options)
                .then((res) => {
                    res.json().then(data =>{
                        this.users=data; 
                        this.users.id=data.id;
                    })
                })
                .catch(error => console.log(error)) 
        },
        methods: {
            // Fonction pour aller sur la page profil d'un utilisateur
            userPage(id) {
                router.push({ path: `/user/${id}` })
            },
        },
    }         
</script>

<style scoped>
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

    #container-users {
        display: flex;
        justify-content: space-around;
        padding: 20px;
        padding-top: 100px;
    }

    #container-droite {
        border: 2px solid grey;
        border-radius: 10px;
        width: 300px;
        padding: 20px;
        margin-top: 10px;
        height: min-content;
        background-color: white;
        position: fixed;
        right: 50px;
    }

    #container-droite h2 {
        margin-bottom: 20px;
    }

    #suggestions {
        height: min-content;
        overflow-y: scroll;
        max-height: 60vh;
    }

    #user-suggestions {
        display: flex;
        align-items: center;
        height: 50px;
        border: 2px solid grey;
        border-radius: 0px 5px 5px 0px;
        padding-right: 5px;
        margin-bottom: 5px;
        font-weight: bold;
    }

    #user-suggestions:hover {
        box-shadow: 0px 0px 10px black;;
    }

    #user-suggestions img {
        height: 100%;
        margin-right: 10px;
        width: 50px;
        object-fit: cover;
        border: 1px solid grey;
    }

    #user-suggestions > div {
        height: 100%;
        width: 130px;
        display: flex;
        align-items: center;
    }

    @media screen and (max-width: 1300px) {
        #container-droite {
            width: 250px;
        }
    }

    @media screen and (min-width: 1050px) {
        #user-suggestions {
            overflow-y: scroll;
        }
    }

    @media screen and (max-width: 1050px) {
        #container-users {
            flex-direction: column;
            justify-content: center;
            align-items: center;
        }
        
        #container-droite {
            position: relative;
            left: 0px;
            order: -1;
            width: 700px;
        }

        #suggestions {
            display: flex;
            height: min-content;
            overflow-y: scroll;
            max-height: 60vh;
        }

        #user-suggestions {
        margin: 5px;
        }
    }

    @media screen and (max-width: 750px) {
        #container-droite {
            width: 96%;
        }
    }

    @media screen and (max-width: 550px) {

        
    }

    @media screen and (max-width: 450px) {
        #container-droite {
            width: 98%;
        }
        
    }
</style>