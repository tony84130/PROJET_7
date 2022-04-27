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
                    .then(res => this.$emit('add-Post', res.data), console.log("Post envoyé !")/*(window.location.reload())*/)
                    //.then(window.location.reload())
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
</script>


<style scoped>
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
        border-radius: 10px;
        background-color: white;
        margin-bottom: 15px;
    }

    #titre-add-post {
        padding: 10px;
        font-weight: bold;
    }

    input[type="text"] {
        border-top: 1px solid grey;
        border-bottom: 1px solid grey;
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

    input {
        border: none;
        height: 100%;
        padding: 5px 10px;
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