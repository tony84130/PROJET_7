<template>
     <div class="login">
           
            <h2>Connectez-vous juste ici ! 👇</h2>

            <form v-on:submit.prevent="login" id="form-login" >
              <div class="form-group">
                <label for="email">Email :</label>
                <input type="email" id="email" name="email" class="form-control" required v-model="inputLogin.email"/>
              </div>
              <div class="form-group">
                <label for="password">Mot de passe :</label>
                <input type="password" id="password" name="password" class="form-control" required v-model="inputLogin.password"/>
              </div>   
              <button type="submit">Connect</button>                                     
            </form> 
              
             <nav class="navlogsignup"><p>Pas encore inscrit ? <router-link to="/signup">Rejoignez-nous !</router-link></p></nav>
    </div>  
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
                            alert("  Mot de passe incorrect ! ");
                            return -1
                        }
                        localStorage.setItem("userId", content.userId)
                        localStorage.setItem("token", content.token)
                         this.$router.push("/home");
                         alert(" Bienvenue sur Groupomania, vous pouvez à présent échanger avec votre équipe ! ");
                    }     
                })
                    
            }).catch(error => console.log(error))
        }
    }
}
</script>

<style lang="scss" scoped>
p{
    font-size: small;
}
.login{
    display: flex;
    flex-direction: column;
}
#form-login{
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