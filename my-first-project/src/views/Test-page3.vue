<template>

    <div id="container">

        <div id="container-centraux" class="gros-logo-gauche">
            <img src="../assets/icon-above-font.png" alt="Logo Groupomania" id="logo-gauche">
        </div>

        <div id="container-centraux" class="container-droit">
            <div id="connexion">
                <h1>Groupomania</h1>
                <img src="../assets/icon-above-font.png" alt="Logo Groupomania" id="logo-mobile">

                <label for="email">Adresse email *</label>
                <input v-model="email" class="form-row__input" type="email" required @keyup.enter="login" placeholder="Email"/>
                <label for="password">Adresse email *</label>
                <input v-model="password" type="password" required @keyup.enter="login" class="form-row__input" placeholder="Mot de passe"/>
                
                <button pill class="button" type="submit" @click="login">
                    <span>Connexion</span>
                </button>
            </div>
            <div id="creation-compte">
                <div>Vous n’avez pas de compte  ? <router-link to="/signup">Inscrivez-vous</router-link></div>
            </div>
        </div>

    </div>

  <div class="card">
   
    
    
    <label for="email-adress">Adresse email *</label>
    <div class="form-row">
      <input v-model="email" class="form-row__input" type="email" required @keyup.enter="login" placeholder="Adresse mail"/>
    </div>
    <label for="password">Mot de passe *</label>
    <div class="form-row">
      <input v-model="password" type="password" required @keyup.enter="login" class="form-row__input" placeholder="Mot de passe"/>
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
    login() {
      const user = {
        pseudo: this.pseudo,
        email: this.email,
        password: this.password,
      };
      Axios.post("http://localhost:3000/api/auth/login", user)
        .then((res) => {
          if (res.status === 200) {
            localStorage.setItem("userLogin", JSON.stringify(res.data));
            console.log(res);
            this.$router.push("/home");
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
            align-content: space-around;
            height: 100vh;
        }

        a, button {
            cursor: pointer;
        }

        label {
            display: none;
        }

        #container {
            display: flex;
            align-items: center;
            justify-content: space-around;
            min-height: calc(100vh - 59px);
        }

        #container-centraux {
            width: 500px;
            height: 500px;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
        }

        #logo-gauche {
            width: 500px;
            height: 500px;
            object-fit: cover;
            border: 1px solid grey; 
        }

        .container-droit {
            display: flex;
            flex-direction: column-reverse;
        }

        #connexion {
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
            background-color: white;
            width: 100%;
            border: 1px solid grey;
            height: 380px;
            margin-bottom: 20px;
        }

        h1 {
            color: red;
            margin-bottom: 40px;           
        }

        #logo-mobile {
            display: none;
        }

        input {
            width: 320px;
            height: 30px;
            margin-bottom: 5px;
            border-radius: 5px;
            padding: 5px;
            border: 1px solid grey;
            background-color: #EFEFEF;
        }

        button {
            width: 320px;
            height: 30px;
            margin: 10px;
            border-radius: 5px;
            background-color: red;
            color: white;
            border: none;
            font-weight: bold;
        }

        #creation-compte {
            background-color: white;
            width: 100%;
            height: 100px;
            display: flex;
            justify-content: center;
            align-items: center;
            border: 1px solid grey;
        }

        #creation-compte a {
            color: blue;
            font-weight: bold;
            text-decoration: none;
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

        @media screen and (max-width: 1200px) {
            #container-centraux {
                width: 400px;
                height: 400px;
            }

            #logo-gauche {
                width: 400px;
                height: 400px;
            }

            #connexion {
                height: 300;
            }

            #creation-compte {
                height: 80px;
            }

        }

        @media screen and (max-width: 900px) {
            #container {
                flex-direction: column;
                justify-content: center;
                position: relative;
                top: -50px;
            }

            #container-centraux {
                height: 500px;
            }

            #container-centraux.gros-logo-gauche {
                display: none;
            }

            #logo-mobile {
                display: flex;
                width: 200px;
                height: 200px;
                border-radius: 50%;
                border: 1px solid grey;
                margin: 10px 0px;
            }

            h1 {
                display: none;
            }

            #connexion {
                height: 380;
            }

            #creation-compte {
                height: 100px;
            }
        }


        @media screen and (max-width: 500px) {

            #container {
                width: 300px;
            }

            #container-centraux {
                width: 300px;
            }

            input, button {
                width: 250px;
            }

            #creation-compte {
                height: 80px;
                padding: 10px;
            }

            body {
                font-size: 80%;
                align-items: center;
            }

            footer {
                width: 300px
            }

        }
</style>