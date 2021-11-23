<template>
  <div>
      <h2>SALUT</h2>
      <input classe="d-flex" type="email" placeholder="Email" v-model="email">
<br/>
<input type="password" placeholder="Password" v-model="password">
 <br/>
 <v-btn @click="login">
     Login
 </v-btn>
  </div>
</template>
    
<script>
import firebase from "firebase";
export default {
name: "Login",
data() {
  return {
    email: "",
    password: "",
    connected: false,
  }
},
methods: {
    /* eslint-disable no-console */

    login: function() {
        console.log(this.connected,"AVANT");
        firebase.auth().signInWithEmailAndPassword(this.email, this.password).then(
            user => {
                console.log(user,"GOOD");
                this.connected = true;
                console.log(this.connected);
            },
            err => {
                alert(err,"BAD");
            }
        );
    }
    /* eslint-enable no-console */
}
}
</script>

<style>

</style>