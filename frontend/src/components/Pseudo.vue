
<template>    
    <img v-if="user.picture != `avatar.png`" v-bind:src="user.picture" :key="user.picture" alt="photo user">
    <img v-else src="../assets/avatar.png" alt="photo user">

    <div id="postPseudo" :key="user.id">{{ user.pseudo }}</div>
</template>

<script>
export default {
    name: "userPseudo",
    props : {
        parentPost: Number,
    },
    data() {
        return {
            user: {
                pseudo: "",
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
            this.userId = JSON.parse(localStorage.getItem("userId"));
            let url = `http://localhost:3000/api/auth/${this.parentPost}`;
            //let url = `http://localhost:3000/api/auth/1`;
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
                        this.user.pseudo = data[0].pseudo;
                        this.user.picture = data[0].picture;
                    })
                })
                .catch(error => console.log(error))
            }
        console.log(this.user)
    },
}
</script>