<template>

    <div id="container">

        <div id="container-centraux">
            <h1 id="logo">Groupomania</h1>
            <div>Inscrivez-vous pour voir les publications de vos amis.</div>
            <div id="creation-compte">
                <label for="email">Adresse email *</label>
                <input v-model="email" class="form-row__input" type="email" required @keyup.enter="login" placeholder="Email"/>
                <label for="password">Adresse email *</label>
                <input v-model="password" type="password" required @keyup.enter="login" class="form-row__input" placeholder="Mot de passe"/>
                <label for="pseudo">Pseudo *</label>
                <input v-model="pseudo" class="form-row__input" type="text" required @keyup.enter="login" placeholder="Pseudo"/>

                <button pill class="button" type="submit" @click="signup">
                    <span>Connexion</span>
                </button>
            </div>
            <div>En vous inscrivant, vous acceptez nos Conditions générales.</div>
        </div>

        <div id="connection-compte">
            <div>Vous avez un compte  ? <router-link to="/login">Connectez-vous</router-link></div>
        </div>

    </div>


  
</template>

<script>
import Axios from "axios";
export default {
  name: "Login-page3",
  data() {
    return {
        pseudo: "",
        email: "",
        password: "",
        error: "",
    };
  },
  methods: {
    //Fonction de connexion
    signup() {
      const user = {
        pseudo: this.pseudo,
        email: this.email,
        password: this.password,
      };
      Axios.post("http://localhost:3000/api/auth/signup", user)
        .then((res) => {
          if (res.status === 200) {
            localStorage.setItem("userSignup", JSON.stringify(res.data));
            console.log(res);
            this.$router.push("/login");
          }
        })
        .catch((err) => {
          localStorage.clear();
          if (err.response.status === 401) {
            this.error =
              "Connexion au serveur impossible.";
          } else {
            this.error = "Vérifiez vos identifiants. ";
          }
        });
    },
  },
};
</script>

<style scoped>


.input:hover {
  outline: none !important;
  border: solid 1px black1;
  box-shadow: 0 0 10px #3b2cc2;
}

        label {
            display: none;
        }

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