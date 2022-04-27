
<template>
    <main id="container-login">

        <div id="container-centraux-login" class="gros-logo-gauche">
            <img src="../assets/icon-above-font.png" alt="Logo Groupomania" id="logo-gauche">
        </div>

        <div v-on:submit.prevent="login" id="container-centraux-login" class="container-droit-login">
            <form id="connexion">
                <h1>Groupomania</h1>
                <img src="../assets/icon-above-font.png" alt="Logo Groupomania" id="logo-mobile">

                <label for="email">Email :</label>
                <input type="email" id="email" name="email" class="form-control" placeholder="Email" required v-model="inputLogin.email"/>
             
                <label for="password">Mot de passe :</label>
                <input type="password" id="password" name="password" class="form-control" placeholder="Mot de passe" required v-model="inputLogin.password"/>

                <button type="submit">Connexion</button>
            </form>
            <div id="creation-compte">
                <div>Vous n’avez pas de compte  ? <router-link to="/signup" title="signup">Inscrivez-vous</router-link></div>
                
            </div>
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
    name: 'LoginApp',
    data() {
        return {
            inputLogin: {
                email: "",
                password: ""
            }
        }
    },
    methods: {
        login() {
            let loginData = {
                "email": this.inputLogin.email,
                "password": this.inputLogin.password
            }
            let url = "http://localhost:3000/api/auth/login"
            let options = {
                method: "POST",
                body: JSON.stringify(loginData),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization':'bearer'
                }
            }
            fetch(url, options)
                
                .then((res) => {
                    res.json().then(content=>{
                        if(!this.inputLogin.email){
                            return res.status(401).json({error: "Utilisateur non existant!"})
                        }
                        if (true, loginData) {
                        if(res.status == 401){
                            alert(" Identifiant ou Mot de passe incorrect ! ");
                            return -1
                        }
                        else {
                            localStorage.setItem("userId", content.userId),
                            localStorage.setItem("token", content.token)
                            this.$router.push("/");
                        }
                        
                        //alert(" Bienvenue sur Groupomania, vous pouvez à présent échanger avec votre équipe ! ");
                    }     
                })
                    
            }).catch(error => console.log(error))
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
            align-content: space-around;
            height: 100vh;
        }

        a, button {
            cursor: pointer;
            text-decoration: none;
        }

        label {
            display: none;
        }

        #container-login {
            display: flex;
            align-items: center;
            justify-content: space-around;
            min-height: calc(100vh - 59px);
        }

        #container-centraux-login {
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

        .container-droit-login {
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
            #container-centraux-login {
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
            #container-login {
                flex-direction: column;
                justify-content: center;
            }

            #container-centraux-login {
                height: 500px;
            }

            #container-centraux-login.gros-logo-gauche {
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

            #container-login {
                width: 300px;
            }

            #container-centraux-login {
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