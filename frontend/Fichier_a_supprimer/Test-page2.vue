<template>
<h1>Bonjour !</h1>
  <div class="bloc">

    <div class="comment">

        <div v-for="comment in comments" :key="comment.id" class="blocauthor">
            <div class="author">
              <p>{{comment.user_id }}</p>
              <button v-if="comment.user_id" type="button" @click="deleteComment(comment.id)" class="accountbutton">Supprimer mon commentaire</button>
            </div>
          <div class="bloccomment">
                <p>{{ comment.text}} </p>
          </div>
        </div>
      </div>

  </div>

</template>

<script>
export default{
  name: "BlocComment",
  props : {
    parentPost: Number,
  },
  data() {
    return {
      comments: []
    }
  },
  mounted() {
    this.userId = JSON.parse(localStorage.getItem("userId"));
    let url = "http://localhost:3000/api/post/comment/" + this.parentPost ;
    let options = {
      method: "GET",
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem("token"),
      }
    };
    fetch(url, options)
        .then((res) => {
          res.json().then(data =>{
            this.comments = data;
          })
        })
        .catch(error => console.log(error))
  },
    methods: {
        
        deleteComment(id_comment) {
            this.userId = JSON.parse(localStorage.getItem("userId"));
            let url = "http://localhost:3000/api/comment/" + id_comment;
            let options = {
                method: "DELETE",
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem("token"),
                }
            };
            fetch(url, options)
                .then((response) => {
                    console.log(response);
                    window.location.reload();
                })
                .catch(error => console.log(error))
        }
}}
</script>
<style lang="scss" scoped>
.bloc{
    width: 100%;
}
.comment{
  border-radius: 5px;
  width: 100%;
  flex-direction: column;
  justify-content: center;
  margin-top: 30px ;
  overflow-y:scroll ;
  height: 100px;
}
.author{
  display: flex;
  border: 1px solid white ;
  border-radius: 5px;
  margin: 1px;
  width: 50%;
  align-content: center;
}
.blocauthor{
    font-size: small;
    margin: 5px;
}
.bloccomment{
    border: 1px solid white;
    border-radius: 5px;
    width: 100%;
}
button{
   
    font-size: small;
    margin-bottom: 10px;
    margin: 5px;
    background-color:white;
    border-radius: 5px;
    color: #2c3e50;
}
button:hover{
    color:#d1515a;
}
@media screen and (min-width: 359px) and (max-width: 1024px){
	.author{
        width: 100%;
        
    }
}
</style>