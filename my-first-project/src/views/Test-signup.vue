<template>
    <div class="signup">          
            <h2>Pour rejoindre la communauté, merci de remplir ce formulaire.👇</h2>
            <p>*le mot de passe doit être compris entre 8 et 20 caractères avec une majuscule et un chiffre minimum*</p>

            <form v-on:submit.prevent="signup" id="form-signup" >

              <div class="form-group">
                <label for="pseudo">Nom :</label>
                <input type="text" id="pseudo" name="pseudo" class="form-control" required 
                pattern="^[^&amp;<>@&quot;()'!_$*€£`+=\/;?#]+$" v-model="inputSignup.pseudo"/>
              </div>
             
              <div class="form-group">
                <label for="email">E-mail :</label>
                <input type="email" id="email" name="email" class="form-control" required 
                pattern="[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+.[a-zA-Z.]{2,15}" v-model="inputSignup.email"/>
              </div>

              <div class="form-group">
                <label for="password"> Mot de passe :</label>
                <input type="password" id="password" name="password" class="form-control" required
                pattern="(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$" v-model="inputSignup.password"/>
              </div>  

    
              <button>Envoyer !</button>                                       
            </form> 
             
              <nav class="navlogsign"><p>Vous avez déjà un compte ? <router-link to="/login">Connectez-vous</router-link></p></nav> 
    </div> 
</template>

<script>
export default {
    name: 'SignupApp',
    data() {
        return {
            inputSignup: {
                pseudo: "",
                email: "",
                password: ""
            }
        }
    },
    methods: {
        signup() {
            let inputDatas = {
                "pseudo": this.inputSignup.pseudo,
                "email": this.inputSignup.email,
                "password": this.inputSignup.password
            }
            console.log(inputDatas)
            let url = "http://localhost:3000/api/auth/signup"
            let options = {
                method: "POST",
                body: JSON.stringify(inputDatas),
                headers: {
                    'Content-Type': 'application/json'
                }
            }
            console.log(options)
            fetch(url, options)
                .then(res => res.json())
                .then((res) => {
                    /*if (res.userId && res.token){*/
                    localStorage.setItem("userId", res.userId);
                    localStorage.setItem("token", res.token);
                    this.$router.push("/login");
                    alert("Bienvenue sur le réseau social de Groupomania, vous pouvez dès à présent vous connecter.  ");
                    /*} */
                })
                .catch(error => console.log(error))
        }
    }
}
</script>

<style scoped lang= scss>
p{
    font-size: small;
}
.signup{
    display: flex;
    flex-direction: column;
}
#form-signup{
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 80%;
}
.form-group{
    align-content: center;
    margin-left: 20%;
}
label{
    margin-right: 10px;
}
input{
    display: flex;
    border-radius: 5px;
    margin: 10px;
}
button{
    align-content: center;
    margin-left: 20%;
    border-radius: 5px;
    background: white;
    margin-top: 5px;
}
button:hover{
    color:#d1515a
}
.navlogsignup{
    margin: 10px;
    color: #2c3e50;
}
</style>