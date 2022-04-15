<script>
    export default {
        name: "Add-post-1"

    }
</script>

<template>

        <div id="container-centraux">
            <div id="add-post">
                <div id="titre-add-post">Créer une nouvelle publication</div>
                <div>
                    <input type="text" placeholder="votre texte ici ...">
                </div>
                <div id="fichier-boutton">
                    <label for="avatar"></label>
                    <input type="file" id="avatar" name="avatar" accept="image/png, image/jpg, image/jpeg">
                    <button>Envoyer</button>
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