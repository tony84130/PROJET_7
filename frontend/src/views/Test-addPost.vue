<template>
    <section>

            <div class="bloc">
                <h2>Bienvenu sur votre espace personnel {{userAccount.pseudo}} ! 🤓</h2>
            
                
                <div>
                    <label for="picture">Photo de profil:</label>
                <img class="profil" :src="userAccount.image_url" alt="picture_of_profil"><br/>
                    <input id="picture" type="file" name="photo_profil" @change="handleFileUpload($event)" required/>
                </div>
                <div>
                  <button v-on:click="sendFile()">Publier la photo</button>
                </div>
              
                <p>Ici, vous pouvez modifier votre compte ou bien le supprimer. <br/>
                Vous pouvez également ajouter une photo de profil pour que votre équipe puissent vous reconnaître ! </p><br/>
                <p>*Ne partager jamais vos identifiants de connexions.*</p>
                <button @click="logoutSession" class="accountbutton">Se déconnecter</button> 
                <!-- <button  class="accountbutton">Modifier mon compte</button>  -->
                <button @click="deleteAccount" class="accountbutton">Supprimez votre compte</button>   
            </div>  
           
     </section>
   
</template>

<script>
const axios = require('axios').default;
export default {
    name: 'AccountApp',
    components: {
    },
    data() {
        return {
            userAccount: {
                userId: localStorage.getItem("userId"),
                pseudo: "",
                image_url:""
            },
            inputAccount: {
                pseudo: "",
            }
        }
    },
    mounted() {
        let url = "http://localhost:3000/api/auth/29"
        let options = {
            method: "GET",
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem("token"),
            }
            
        };
        fetch(url, options)
            .then((res) => {
                res.json().then(result =>{
            this.userAccount.pseudo = result[0].pseudo;
            })
            .catch(error => console.log(error))
            })},
     
    methods: {
        
        sendFile(){
            let formData = new FormData();
            formData.append('profil_image', this.file);
            axios.put( 'http://localhost:3000/api/auth/29',
                formData,
                {
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem("token"),
                        'Content-Type': 'multipart/form-data',
                    }
                }
            ).then(function(){
            console.log('SUCCESS!!');
        })
            .catch(function(err){
                console.log(err);
                console.log('FAILURE!!');
            });
        },
       

     },
    //  modifyAccount() {
    //         let url = "http://localhost:3000/api/auth/account";
    //         let options = {
    //             method: "POST",
    //             headers: {
    //                 'Authorization': 'Bearer ' + localStorage.getItem("token"),
    //             }
    //         };
    //         fetch(url, options)
    //             .then((response) => {
    //                 console.log(response);
    //                 localStorage.clear();
    //                 alert("Compte modifié avec succès");
    //             })
    //             .then(this.$router.push("/account"))
    //             .catch(error => console.log(error))
    //     },
} 
</script>

<style lang="scss" scoped>
p{
    font-size: small;
}
button{
   
    font-size: small;
    margin-bottom: 10px;
    margin: 5px;
    background-color: white;
    border-radius: 5px;
    color: #2c3e50;
}
button:hover{
    color:#d1515a;
}
label{
    display: flex;
    flex-direction: column;
}
input{
    border-radius: 5px;
    background:white;
}
input:hover {
    color:#d1515a;
}
img{
    width: 350px;
    margin: 10px;
    border-radius: 10px;
}
</style>