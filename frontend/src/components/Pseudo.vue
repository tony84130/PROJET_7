
<template>    
    <img v-if="user.picture != `avatar.png`" v-bind:src="user.picture" :key="user.picture" alt="photo user">
    <img v-else src="../assets/avatar.png" alt="photo user">
    
    <div id="postPseudo" :key="user.id" @click="userPage()">{{ user.prenom }} {{ user.nom }}</div>
    
</template>

<script>
import router from '../router'
export default {
    name: "userPseudo",
    props : {
        parentPost: Number,
    },
    data() {
        return {
            user: {
                prenom: "",
                nom: "",
                picture: "",
                id: "",
            }
        }
    },
    mounted() {
        
        if(this.parentPost == undefined){
            console.log("no parent, the commponent is not created");
        }
        else{
            
            let url = `http://localhost:3000/api/auth/${this.parentPost}`;
            //let url = `http://localhost:3000/api/auth/1`;
            //console.log(url)
            //console.log(this.parentPost)
            let options = {
                method: "GET",
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem("token"),
                }
            };
            fetch(url, options)
                .then((res) => {
                    res.json().then(data =>{
                        this.user=data;
                        this.user.prenom = data[0].prenom;
                        this.user.nom = data[0].nom;
                        this.user.picture = data[0].picture;
                    })
                })
                .catch(error => console.log(error))
            }
        
    },
    methods: {
        userPage() {
            router.push({ path: `/user/${this.parentPost}` })
        },
    }
    
}
</script>