
<template>

<div id="container-centraux" class="bloc">

    
    <div id="post" :key="post.id" class="bloclist">

        <div id="first-line">
            <div id="user-info">
                <a href="">
                    <!-- <img src="../assets/IDphoto.png" alt="photo user"> -->
                    <!-- <div>{{ post.posterId }}</div> -->
                    <div>PSEUDO</div>
                </a>
            </div>
            <button type="button" @click="modifPost(post.id)" class="accountbutton" id="modifPost"><i class="fas fa-cog"></i></button>
            <button type="button" @click="deletePost(post.id)" class="accountbutton"><div id="trash"><i class="fas fa-trash"></i></div></button>
        </div>
        <div id="photo-post">
            <a href="">
                <img v-if="post.picture != null" :src="post.picture" :key="post.picture" alt="post user">
            </a>
        </div>
        <div v-if="post.message != 'null'" id="texte-post">{{ post.message }}</div>
    
       
    </div>    
</div>

    <form id="modif-post" @submit.prevent="modifPost">
        <div id="fileUser">
            <div id="preview" v-if="preview">
                <img :src="preview" :alt="preview">
            </div>         
            <div id="btns">                
                <input type="file" ref="file" name="file" class="upload" id="file" @change="selectFile">             
            </div>
        </div>

        <div id="modif">
            <input v-if="post.message != null" type="text" name="textarea" v-model="post.message">
            <input v-else type="text" name="textarea" placeholder="votre texte ici ..." >             
        </div>
        <button type="submit">Envoyer</button>

        <p>{{ errMsg }}</p>
    </form>

</template>


<script>

import axios from 'axios';
export default {
    name: 'ModifPost',
    data() {
        return {
            message: null,
            file: '',
            preview: null,
            errMsg: null,
            post: {
                img:true,
                message: "",
                userId: "",
                picture: "",
                posterId: "",
            }
        }
    },
    beforeCreate() {
        this.userId = JSON.parse(localStorage.getItem("userId"));
        let url = "http://localhost:3000/api/post/7";
        let options = {
            method: "GET",
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem("token"),
            }
        };
        fetch(url, options)
            .then((res) => {
                res.json().then(data =>{
                    this.post=data;
                    this.post.posterId = data[0].posterId;
                    this.post.message = data[0].message;
                    this.post.picture = data[0].picture;
                })
            })
            .catch(error => console.log(error))
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
        modifPost() {
                
            if (!this.message && !this.file) {
                this.errMsg = "Vous devez remplir le champ texte ou importer une photo pour créer une nouvelle publication!"
                return
            }
            
            let formData = new FormData()
            formData.append('message', this.message)
            formData.append('image', this.file)
            formData.append('userId', localStorage.getItem('userId'))
            
            axios.put('http://localhost:3000/api/post/7', formData, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                },
            })  
                .then(res => this.$emit('modif-Post', res.data), (window.location.reload()))
                .catch(error => console.log(error))
            
            this.$emit('toggle-Create')
            this.message = ''
            this.file = ''
            this.preview = ''
            document.querySelector('form').reset()           
        },
        //modifPost() {
            //let hidden3 = document.getElementById("modif")
            //hidden3.style.display = "none";
            //let flex = document.getElementById("supprConfirm")
            //flex.style.display = "flex";
        //}
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
    
        input {
            background-color: #EFEFEF;
            border: none;
            width: 100%;
            height: 100%;
            padding: 5px 10px;
        }

        #container {
            display: flex;
            justify-content: space-around;
            padding: 10px;
            padding-top: 80px;
        }

        #container-centraux {
            width: 700px;
            display: flex;
            flex-direction: column;
            margin: auto;
            position: relative;
            left: -100px;
        }

        #container-centraux > div {
            margin: 0px 0px 15px 0px;
        }

        #post {
            border: 2px solid grey;
            background-color: white;
        }

        #post:hover {
            box-shadow: 0px 0px 10px black;;
        }

        #first-line {
            border: 1px solid grey;
            display: flex;
            height: 60px;
            align-items: center;
            padding: 5px 10px 5px 5px;
            position: relative;
            font-weight: bold;
            justify-content: space-between;
        }

        #user-info {
            display: flex;
            align-items: center;
            height: 100%;
        }

        #user-info img {
            height: 100%;
            margin-right: 5px;
            width: 40px;
            object-fit: cover;
        }

        #modifPost {
            position: absolute;
            right: 35px;
            display: flex;
            align-items: center;
        }

        #modifPost i {
            position: relative;
            top: 1px;
        }

        .accountbutton {
            border: none;
        }

        #photo-post {
            width: 100%;
            height: 100%;
            border: 2px solid grey;
        }

        #photo-post img {
            width: 100%;
            height: 400px;
            object-fit: contain;
        }

        #texte-post {
            padding: 10px;
            border: 1px solid grey;
        }

        #second-line {
            display: flex;
            justify-content: space-between;
            padding: 5px 15px;
            border: 1px solid grey;
            font-weight: bold;
        }

        #heart-count {
            display: flex;
            align-items: center;
        }

        #heart-count i {
            margin-right: 5px;
        }

        #zeroLikeSmall {
            display: none;
        }

        #comment {
            border: 1px solid grey;
            display: flex;
            align-items: center;
            padding: 5px;
            position: relative;
        }

        #user-comment {
            display: flex;
            align-items: center;
            justify-content: space-between;
            border: 1px solid grey;
            border-radius: 0px 5px 5px 0px;
            margin-right: 10px;
            padding-right: 5px;
            font-weight: bold;
        }

        #user-comment img {
            height: 50px;
            width: 40px;
            object-fit: cover;
            margin-right: 5px;
        }

        #text-comment {
            padding: 5px;
        }

        #add-comment {
            display: flex;
            justify-content: space-between;
            padding: 5px 10px;
            background-color: white;
            border: 1px solid grey;
        }

        #add-comment input {
            background-color: white;
            width: 85%;
        }

        #add-comment button {
            padding: 5px;
            background-color: #EFEFEF;
            border: 1px solid grey;
            border-radius: 5px;
            font-weight: bold;
            cursor: pointer;
        }
    
        @media screen and (max-width: 1300px) {
            #container-centraux {
                left: -150px;
            }
        }

        @media screen and (max-width: 1050px) {
            #container {
                flex-direction: column;
                justify-content: center;
                align-items: center;
            }

            #container-centraux {
                left: 0px;
            }
            
        }

        @media screen and (max-width: 750px) {
            #container-centraux {
                width: 500px;
            }

            #photo-post img {
                height: 300px;
            }

            #comment {
                flex-direction: column;
                align-items: flex-start;
                padding: 10px;
            }
        }

        @media screen and (max-width: 550px) {
            #container-centraux {
                width: 400px;
            }

            #photo-post img {
                height: 250px;
            }
        }

        @media screen and (max-width: 450px) {
            #container-centraux {
                width: 300px;
            }

            #photo-post img {
                height: 200px;
            }

            #postPseudo {
                width: 190px;
                overflow: hidden;
                text-overflow: ellipsis;
            }

            #commentPseudo {
                width: 150px;
                overflow: hidden;
                text-overflow: ellipsis;
            }
            
            #zeroLike {
                display: none;
            }

            #zeroLikeSmall {
                display: block;
            }
        }
</style>