
<template>
    <main id="container">
        <div id="container-centraux">
            <h1 id="logo">Groupomania</h1>
            <div>Inscrivez-vous pour voir les publications de vos amis.</div>
            <form v-on:submit.prevent="signup" id="creation-compte">

                <label for="prenom">Nom :</label>
                <input type="text" id="prenom" name="prenom" class="form-control" placeholder="Prenom" required 
                pattern="^[^&amp;<>@&quot;()'!_$*€£`+=\/;?#]+$" v-model="inputSignup.prenom"/>

                <label for="nom">Nom :</label>
                <input type="text" id="nom" name="nom" class="form-control" placeholder="Nom" required 
                pattern="^[^&amp;<>@&quot;()'!_$*€£`+=\/;?#]+$" v-model="inputSignup.nom"/>
              
                <label for="email">E-mail :</label>
                <input type="email" id="email" name="email" class="form-control" placeholder="Email" required 
                pattern="[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+.[a-zA-Z.]{2,15}" v-model="inputSignup.email"/>
                <p id="erreur">{{ errMsg }}</p>
              
                <label for="password"> Mot de passe :</label>
                <input type="password" id="password" name="password" class="form-control" placeholder="Mot de passe" required
                pattern="(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$" v-model="inputSignup.password"/>

                <p>Le mot de passe doit être compris entre 8 et 20 caractères avec une majuscule et un chiffre minimum</p>
                <button>Créer votre compte</button>
            </form>
            <div>En vous inscrivant, vous acceptez nos Conditions générales.</div>
        </div>
        <div id="connection-compte">
            <div>Vous avez un compte  ? <router-link to="/login" title="signup">Connectez-vous</router-link></div>
        </div>
    </main>

    <footer>
        <div id="container-bas">
            <div>Français</div>
            <div>©2022</div>
            <div>GROUPOMANIA</div>
        </div>
    </footer>
</template>

<script>
    export default {
        name: 'SignupApp',
        data() {
            return {
                inputSignup: {
                    prenom: "",
                    nom: "",
                    email: "",
                    password: ""
                },
                errMsg: null
            }
        },
        methods: {
            // On récupère les informations de création de compte puis on les transmet à la base donnée
            signup() {
                let inputDatas = {
                    "prenom": this.inputSignup.prenom,
                    "nom": this.inputSignup.nom,
                    "email": this.inputSignup.email,
                    "password": this.inputSignup.password
                }
                //console.log(inputDatas)
                let url = "http://localhost:3000/api/auth/signup"
                let options = {
                    method: "POST",
                    body: JSON.stringify(inputDatas),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
                //console.log(options)
                fetch(url, options)
                    .then(res => res.json())
                    .then((res) => {
                        localStorage.setItem("userId", res.userId);
                        localStorage.setItem("token", res.token);
                        if (res.status === 200 ) {
                            this.$router.push("/login");
                        }  else {
                            this.errMsg = "Utilisateur dejà existant !"
                        }
                        //alert("Bienvenue sur le réseau social de Groupomania, vous pouvez dès à présent vous connecter.  ");
                    })
                    .catch(error => console.log(error))
            }
        }
    }
</script>

<style scoped>
    * {
        margin: 0px;
        padding: 0px;
        box-sizing: border-box;
        font-family: Verdana, Geneva, Tahoma, sans-serif;
    }

    body {
        background-color: #EFEFEF;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        height: 100vh;
    }

    a, button {
        cursor: pointer;
        text-decoration: none;
    }

    p {
        text-align: center;
    }

    #erreur {
        color: red;
    }

    label {
        display: none;
    }

    #logo {
        color: red;
        margin: 30px 0px; 
    }

    #container {
        width: 500px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        min-height: calc(100vh - 59px);
        margin: auto;
    }

    #container-centraux {
        background-color: white;
        border: 1px solid grey;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 30px;
    }

    #creation-compte {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        margin: 10px;
    }

    input {
        width: 450px;
        height: 30px;
        margin: 5px 0px;
        border-radius: 5px;
        padding: 5px;
        border: 1px solid grey;
        background-color: #EFEFEF;
    }

    button {
        width: 450px;
        height: 30px;
        margin: 10px;
        border-radius: 5px;
        background-color: red;
        color: white;
        border: none;
        font-weight: bold;
    }
    
    #connection-compte {
        background-color: white;
        margin-top: 10px;
        border: 1px solid grey;
        height: 60px;
        display: flex;
        justify-content: center;
        align-items: center;
        border: 1px solid grey;
    }

    #connection-compte a {
        color: blue;
        font-weight: bold;
    }

    footer {
        display: block;
        width: 100%;
    }

    #container-bas {
        display: flex;
        justify-content: center;
    }

    #container-bas div {
        margin: 20px;
    }

    @media screen and (max-width: 500px) {
        #container {
            width: 300px;
        }

        input, button {
            width: 250px;
        }

        body {
            font-size: 80%;
        }
    }
</style>