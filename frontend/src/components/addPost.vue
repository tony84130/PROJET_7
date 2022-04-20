
<template>

        <div id="container-centraux">
            <form id="add-post">
                <div id="titre-add-post">Créer une nouvelle publication</div>
                <div>
                    <label for="text">Contenu du post :</label>
                    <input type="text" id="text" maxlength="500" name="message" placeholder="votre texte ici ..." requireed v-model="inputPost.message">
                    
                </div>
                <div id="fichier-boutton">
                    <label for="avatar"></label>
                    <input type="file" id="avatar" name="avatar" accept="image/png, image/jpg, image/jpeg">

                    <div class="form"> 🤗🤗🤗
                        <input id="image" type="file" name="image" @change="handleFileUpload($event)" required capture>
                    </div>
                    
                    <button @click="sendPost">Envoyer</button>
                </div>
            </form>
        </div>


</template>


<script>
const axios = require('axios').default;
export default {
    name: 'addPost',
    data() {
        return {
            inputPost: {
                message: "",
                posterId: ""
            }
        }
    },
    methods: {
        sendPost() {
             
            let post = {
                "message": this.inputPost.message,
                "posterId": localStorage.getItem("userId"),
                
            }
            let url = "http://localhost:3000/api/post/"
            let options = {
                method: "POST",
                body: JSON.stringify(post),
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem("token"),
                    'Content-Type': 'application/json'
                }
            }
            fetch(url, options)
                .then((res) => {
                    if (res.ok) {
                    res.json().then(result =>{
                      if(this.file){
                            this.sendFile(result.picture);
                        }
                    })
                    
                window.location.reload();
                    this.inputMessage = {} // Retour à 0 des inputs //
                } else {
                    alert("Post publié avec succès !");
                }
                })
                    .then(this.$router.push("/home"))
                    .catch(error => console.log(error))  
        },
        sendFile(picture){
            let formData = new FormData();
            formData.append('image', this.file);
            axios.post( 'http://localhost:3000/api/post/' + picture, formData, {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem("token"),
                    'Content-Type': 'multipart/form-data',
                }
            }).then(function(){
                console.log('SUCCESS!!');
            })
            .catch(function(err){
                console.log(err);
                console.log('FAILURE!!');
            });
        },
       
        handleFileUpload(event){
            this.file = event.target.files[0];
        }  
    }
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

        #add-post {
            border: 2px solid grey;
            background-color: white;
        }

        #titre-add-post {
            padding: 10px;
            font-weight: bold;
            border: 1px solid grey;
        }

        #add-post input[type="text"] {
            border: 1px solid grey;
            padding: 10px 20px;
        }

        #fichier-boutton {
            display: flex;
            justify-content: space-between;
            padding: 5px 10px;
            background-color: white;
            border: 1px solid grey;
        }

        #add-post label {
            display: none;
        }

        #add-post input {
            background-color: white;
            width: 100%;
        }

        #add-post button {
            padding: 5px;
            background-color: #EFEFEF;
            border: 1px solid grey;
            border-radius: 5px;
            font-weight: bold;
            cursor: pointer;
        }
         
</style>