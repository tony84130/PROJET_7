
<template>
    <nav>
        <h1>Groupomania</h1>
        <div id="logo-groupomania">
            <img src="../assets/icon.png" alt="Logo Groupomania">
        </div>
        <div id="search">
            <i class="fas fa-search"></i>
            <input type="search" placeholder="Rechercher">
        </div>
        <div id="nav-droite">
            <router-link to="/" title="Home"><i class="fas fa-home"></i></router-link> 
            <router-link to="/liked" title="Liked"><i class="fas fa-heart"></i></router-link> 
            <!-- <router-link to="/profil" title="Profil"><i class="fas fa-user"></i></router-link> -->
            <router-link to="/profil" title="Profil">
                <div id="photo-profil-nav">
                    <img v-if="user.picture != `avatar.png`" v-bind:src="user.picture" :key="user.picture" alt="photo user">
                    <img v-else src="../assets/avatar.png" alt="photo user">
                </div>
            </router-link>
            <button @click="logoutSession" id="iconOff" class="accountbutton"><i class="fas fa-power-off"></i></button> 
        </div>
    </nav>
</template>

<script>
export default {
    name: "List-user",
    components: {
    },
    data() {
        return {
            user: {
            img:true,
            prenom: "",
            nom: "",
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
            this.user.prenom = data[0].prenom;
            this.user.nom = data[0].nom;
            this.user.bio = data[0].bio;             
        })
        })
        .catch(error => console.log(error))
    },
    methods: {
        logoutSession(){
            localStorage.clear();
            this.$router.push("/login")
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

        nav a {
            height: 100%;
            display: flex;
            align-items: center;
        }

        body {
            background-color: #EFEFEF;
        }
    
        nav {
            display: flex;
            justify-content: space-between;
            align-items: center;
            background-color: white;
            padding: 15px 30px;
            border: 1px solid grey;
            position: fixed;
            width: 100%;
            z-index: 1;
        }

        nav h1 {
            color: red;
        }

        nav #logo-groupomania {
            display: none;
        }

        nav #search {
            border: 1px solid grey;
            background-color: #EFEFEF;
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 5px;
            border-radius: 5px;
            width: 300px;
            height: 30px;
        }

        nav input {
            background-color: #EFEFEF;
            border: none;
            width: 100%;
            height: 100%;
            padding: 5px 10px;
        }

        nav #nav-droite {
            display: flex;
            justify-content: center;
            align-items: center;
        }

        nav #nav-droite i {
            margin: 10px;
        }

        .accountbutton {
            background-color: transparent;
            display: flex;
        }

        #iconOff {
            position: relative;
            top: 2px;
            border: none;
        }

        nav #photo-profil-nav {
            width: 20px;
            height: 20px;
            margin: 10px;
        }

        nav #photo-profil-nav img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            border-radius: 200px;
        }

        @media screen and (max-width: 750px) {
            nav {
                padding: 10px 15px;
            }

            nav #logo-groupomania {
                display: block;
                height: 40px;
                margin-right: 10px;
            }

            nav #logo-groupomania img {
                height: 40px;
            }

            h1 {
                display: none;
            }

            #search {
                width: 200px;
            }
        }

        @media screen and (max-width: 450px) {
            nav #logo-groupomania {
                margin-right: 5px;
            }
        }
</style>