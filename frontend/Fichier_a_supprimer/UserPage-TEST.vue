

<template>

    <div id="container">
        <div id="container-user">
            <img id="photo-profil" v-if="user.picture != `avatar.png`" v-bind:src="user.picture" :key="user.picture" alt="photo user">
            <img id="photo-profil" v-else src="../assets/avatar.png" alt="photo user">
            <div>{{ user.pseudo }}</div>
        </div>
    
        <div id="container-secondaire">
            <div id="modif-and-delete-user">
                <div>
                    <p>Modifier la biographie</p>
                    <div><i class="fas fa-cog"></i></div>
                </div>
                <div @click="deleteAccount">
                    <p>Supprimer le profil</p>
                    <div><i class="fas fa-trash"></i></div>
                </div>
            </div>
            <div id="bio-user">
                <div>{{ user.bio }}</div>
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
        let url = `http://localhost:3000/api/auth/29`;
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
            let url = `http://localhost:3000/api/auth/29`;
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
            cursor: pointer;
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

        #bio-user div {
            padding: 10px;
            background-color: white;
            border: 1px solid grey;
            border-radius: 5px;
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
                width: 700px;
            }

            #container-secondaire {
                width: 400px;
            }

        }

        @media screen and (max-width: 700px) {
            #container {
                flex-direction: column;
                align-items: center;
                justify-content: center;
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
        }
</style>