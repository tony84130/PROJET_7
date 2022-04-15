<script>
    export default {
        name: "Profil-1"

    }
</script>

<template>

    <div id="container">
        <div id="container-user">
            <div id="photo-profil"><img src="../assets/IDphoto.png" alt="photo user"></div>
            <div>NOM USER</div>
        </div>
    
        <div id="container-secondaire">
            <div id="modif-and-delete-user">
                <div>
                    <p>Modifier le profil</p>
                    <div><i class="fas fa-cog"></i></div>
                </div>
                <div>
                    <p>Supprimer le profil</p>
                    <div><i class="fas fa-trash"></i></div>
                </div>
            </div>
            <div id="bio-user">
                <div>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ratione sint illo asperiores consequuntur minus nobis! Eos, iure deserunt quasi distinctio suscipit temporibus commodi architecto totam ullam qui, ratione, quidem placeat!</div>
            </div>
        </div>
    </div>

    <div id="container-post">
               

        <div id="post">
            <div id="first-line">
                <div id="user-info">
                    <a href="">
                        <img src="../assets/IDphoto.png" alt="photo user">
                        <div>nom user</div>
                    </a>
                </div>
                <div id="trash"><i class="fas fa-trash"></i></div>
            </div>
            <div id="photo-post">
                <a href="">
                    <img src="../assets/mer.jpeg" alt="post user">
                </a>
            </div>
            <div id="texte-post">Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla cupiditate possimus mollitia quaerat repellendus deserunt quos dicta sunt, labore corporis ullam voluptate rerum optio adipisci, recusandae error magnam dolore veniam.</div>
            <div id="second-line">
                <div id="heart-count">
                    <div><i class="fas fa-heart"></i></div>
                    <div><i class="far fa-heart"></i></div>
                    <a href="">
                        <div>1 j'aime</div>
                    </a>
                </div>
                <div><i class="fas fa-comment"></i></div>
            </div>
            <div id="comment">
                <div id="user-comment">
                    <a href="">
                        <img src="../assets/IDphoto.png" alt="photo user">
                        <div>nom_user</div>
                    </a>
                </div>
                <div id="texte-comment">Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus tenetur vitae repellendus voluptate doloribus ex nesciunt enim laudantium et suscipit! Molestias esse, consequuntur error rem cupiditate praesentium atque maxime repudiandae.</div>
            </div>
        </div>

    </div>
    
</template>

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
    
        nav {
            display: flex;
            justify-content: space-between;
            align-items: center;
            background-color: white;
            padding: 15px 30px;
            border: 1px solid grey;
            position: fixed;
            width: 100%;
            z-index: 1;
        }

        h1 {
            color: red;
        }

        nav #logo-groupomania {
            display: none;
        }

        #search {
            border: 1px solid grey;
            background-color: #EFEFEF;
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 5px;
            border-radius: 5px;
            width: 300px;
            height: 30px;
        }

        input {
            background-color: #EFEFEF;
            border: none;
            width: 100%;
            height: 100%;
            padding: 5px 10px;
        }

        #nav-droite {
            display: flex;
            justify-content: center;
            align-items: center;
        }

        #nav-droite i {
            margin: 10px;
        }

        #photo-profil-nav {
            width: 20px;
            height: 20px;
            margin: 10px;
        }

        #photo-profil-nav img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            border-radius: 200px;
        }

        #container {
            display: flex;
            width: 1000px;
            margin: auto;
            padding-top: 100px;
        }

        #container-user {
            display: flex;
            flex-direction: column;
            align-items: center;
            margin: 20px;
            font-weight: bold;
        }

        #photo-profil {
            width: 200px;
            height: 200px;
            margin-bottom: 10px;
        }

        #photo-profil img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            border-radius: 200px;
        }

        #container-secondaire {
            margin: 20px;
            width: 700px;
            display: flex;
            flex-direction: column;
        }

        #modif-and-delete-user {
            display: flex;
            justify-content: center;
            margin: 10px 0px 40px 0px;
            cursor: pointer;
            text-align: center;
        }

        #modif-and-delete-user > div {
            display: flex;
            align-items: center;
            border: 1px solid grey;
            border-radius: 5px;
            padding: 10px;
            justify-content: space-between;
            background-color: white;
            font-weight: bold;
            margin: 0px 10px;
        }

        #modif-and-delete-user i {
            margin-left: 10px;
        }

        #bio-user div {
            padding: 10px;
            background-color: white;
            border: 1px solid grey;
            border-radius: 5px;
        }

        #container-post {
            display: flex;
            flex-wrap: wrap;
            width: 1000px;
            margin: auto;
        }

        #post {
            border: 2px solid grey;
            width: 450px;
            flex-wrap: wrap;
            margin: 24px;
        }

        #post:hover {
            box-shadow: 0px 0px 10px black;;
        }

        #first-line {
            border: 1px solid grey;
            display: flex;
            height: 50px;
            align-items: center;
            padding: 5px;
            position: relative;
            font-weight: bold;
        }

        #user-info {
            display: flex;
            align-items: center;
            height: 100%;
        }

        #user-info img {
            height: 100%;
            margin-right: 5px;
        }

        #trash {
            position: absolute;
            right: 15px;
        }

        #photo-post {
            width: 100%;
            height: 400px;
            border: 2px solid grey;
        }

        #photo-post img {
            width: 100%;
            height: 100%;
            object-fit: cover;
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

        #heart-count .fas {
            display: none;
            color: red;
        }

        #comment {
            border: 1px solid grey;
            display: flex;
            align-items: center;
            padding: 5px;
        }

        #user-comment {
            display: flex;
            align-items: center;
            height: 50px;
            border: 1px solid grey;
            margin-right: 10px;
            padding-right: 5px;
            font-weight: bold;
        }

        #user-comment img {
            height: 100%;
            margin-right: 5px;
        }

        #texte-comment {
            padding: 5px;
        }

        footer {
            position: absolute;
            bottom: 0px;
            display: block;
            width: 100%;
        }

        #container-bas {
            display: flex;
            justify-content: center;
        }

        #container-bas div {
            margin: 20px;
        }

        

        @media screen and (max-width: 1050px) {
            #container {
                width: 800px;
            }

            #container-secondaire {
                width: 500px;
            }

            #container-post {
                width: 850px;
            }

            #post {
                width: 370px;
            }
            
        }

        @media screen and (max-width: 850px) {
            nav {
                padding: 10px 15px;
            }

            #container {
                width: 700px;
            }

            #container-secondaire {
                width: 400px;
            }

            #container-post {
                width: 700px;
            }

            #post {
                width: 300px;
            }

        }

        @media screen and (max-width: 700px) {
            #comment {
                flex-direction: column;
                align-items: flex-start;
                padding: 10px;
            }

            nav #logo-groupomania {
                display: block;
                height: 40px;
                margin-right: 10px;
            }

            nav #logo-groupomania img {
                height: 40px;
            }

            h1 {
                display: none;
            }

            #search {
                width: 200px;
            }

            #container {
                flex-direction: column;
                align-items: center;
                justify-content: center;
                width: 500px;
            }

            #container-post {
                width: 450px;
            }

            #post {
                width: 450px;
            }

        }



        @media screen and (max-width: 500px) {
            nav #logo-groupomania {
                margin-right: 5px;
            }

            #container {
                width: 300px;
            }

            #container-secondaire {
                width: 300px;
            }

            #container-post {
                width: 400px;
            }

            #post {
                width: 400px;
            }

        }

        @media screen and (max-width: 400px) {
            #container-post {
                width: 300px;
            }

            #post {
                width: 300px;
            }

        }
</style>