
<template>

    <div id="container-centraux">
        <form id="add-post" @submit.prevent="createPost">
            <div id="titre-add-post">Créer une nouvelle publication</div>
            <div id="message">
                <input type="text" name="textarea" placeholder="votre texte ici ..." v-model="message">
            </div>
        
            <div id="preview" v-if="preview">
                <img :src="preview" :alt="preview">
            </div>         
            <div id="btns">                
                <input type="file" ref="file" name="file" class="upload" id="file" @change="selectFile">             
                <!-- <input type="submit" value="Envoyer" class="btn"> -->
                <button type="submit">Envoyer</button>
            </div>
        
            <p>{{ errMsg }}</p>
        </form>




<!--
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
-->


    </div>


</template>


<script>

import axios from 'axios';
export default {
    name: 'CreatePost',
    data() {
        return {
            message: null,
            file: '',
            preview: null,
            errMsg: null
        }
    },
    methods: {
        selectFile(event) {
            /* sur le onchange on va attribuer cette valeur à file (nécessaire pour l'envoi au backend) */
            this.file = this.$refs.file.files[0]
            let input = event.target
            if(input.files) {
                let reader = new FileReader()
                reader.onload = (e) => {
                    this.preview = e.target.result
                }
                reader.readAsDataURL(input.files[0])
            }
        },
        createPost() {
            /* on peut envoyer un post sans image mais il faut au moins qu'il y est un texte */     
            if (!this.message && !this.file) {
                this.errMsg = "Vous devez remplir le champ texte ou importer une photo pour créer une nouvelle publication!"
                return
            }
            /* on créé un objet formData afin de pouvoir ajouter le texte et surtout le file choisi */
            let formData = new FormData()
            formData.append('message', this.message)
            formData.append('image', this.file)
            formData.append('userId', localStorage.getItem('userId'))
            /* envoi du form via axios.put de l'objet formData */
            axios.post('http://localhost:3000/api/post/', formData, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                },
            })  
                .then(res => this.$emit('add-Post', res.data), (window.location.reload()))
                .catch(error => console.log(error))
            /* on emit le toggle-Create pour cacher ce composant tout en effaçant les inputs */
            this.$emit('toggle-Create')
            this.message = ''
            this.file = ''
            this.preview = ''
            document.querySelector('form').reset()           
        }
    }
}




/*
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
*/
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
            margin-bottom: 15px;
        }

        #titre-add-post {
            padding: 10px;
            font-weight: bold;
            border: 1px solid grey;
        }

        input[type="text"] {
            border: 1px solid grey;
            padding: 10px 20px;
            width: 100%;
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

        #message {
            
        }

        input[type="file"] {
            
        }

        #preview {
            border: 1px solid grey;
            width: 100%;
        }

        #preview img {
            width: 100%;
            object-fit: contain;
            max-height: 400px;
        }

        #btns {
            display: flex;
            border: 1px solid grey;
            padding: 5px;
        }

        input[type="submit"] {
            padding: 5px;
            background-color: #EFEFEF;
            border: 1px solid grey;
            border-radius: 5px;
            font-weight: bold;
            cursor: pointer;
        }

        button {
            padding: 5px;
            background-color: #EFEFEF;
            border: 1px solid grey;
            border-radius: 5px;
            font-weight: bold;
            cursor: pointer;
        }

        #add-post p {
            color: red;
            padding: 0px 10px;
        }
         
</style>