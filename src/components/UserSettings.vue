<template>
  <div>
    <br>
    <h2>Shipping data:</h2>

      <br>
      <label for="firstname"><h5>First name:</h5></label>
      <input type="text" id="firstname" v-model="user.firstName">
      <br>
      <label for="surname"><h5>Surname:</h5></label>
      <input type="text" id="surname" v-model="user.surname">
      <br>
      <label for="address"><h5>Shipping address:</h5></label>
      <input type="text" id="address" v-model="user.address">
      <br>
      <label for="zip"><h5>ZIP code:</h5></label>
      <input type="text" id="zip" v-model="user.zip">
      <br>
      <button @click="postData">Submit</button>

  </div>
</template>

<script>


  //asdasd
  //import {keycloak} from "@/keycloak";

  export default {
    name: "Album",
    data(){
      return {
        user:{
          id_keycloak: null,
          firstName: null,
          surname: null,
          address: null,
          zip: null,
        }
    }

    },
    methods: {
      postData(e){
        let token = localStorage.getItem("vue-token");
        console.log(token);
        //this.user.zip.replace(' ', '');
        this.$axios.post('http://localhost:3001/users', this.user)
            .then((r) => {
              console.warn(r);
            })
            .catch((err)=> {
              console.warn(err);
            })

        e.preventDefault();
      }
    },

  }
</script>

<style scoped>

</style>