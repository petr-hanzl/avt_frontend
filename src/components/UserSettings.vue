<template>
  <div>
    <br>
    <h2>Shipping data:</h2>
    <form @submit="postData" method="post">
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
      <label for="album"><h5>Choose style of your album:</h5></label>
      <select id="album" name="album" v-model="user.albumStyle">
        <option value="classic">Classic</option>
        <option value="romantic">Romantic</option>
        <option value="children">Children</option>
        <option value="modern">Modern</option>
      </select>
      <br>
      <input type="submit" value="Submit">
    </form>
  </div>
</template>

<script>


  export default {
    name: "Album",
    data(){
      return {
        user:{
          firstName: null,
          surname: null,
          address: null,
          zip: null,
          albumStyle: null
        }
    }

    },
    methods: {
      postData(e){


        this.$axios.post('http://localhost:3001/users', this.user)
            .then((r) => {
              console.warn(r);
            })
            .catch((err)=> {
              console.warn(err);
            })

        e.preventDefault();
      }
    }
  }
</script>

<style scoped>

</style>