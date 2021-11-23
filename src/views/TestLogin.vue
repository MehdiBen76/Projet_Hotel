<template>
  <div class="row">
    <div class="col-12 text-center mb-4">
      <h1>Bienvenue dans votre application de gestion de projets !</h1>
    </div>
    <div class="col-sm-5 m-auto">
      <div v-if="errorMessage !== ''" class="alert alert-danger" role="alert">
        {{ errorMessage }}
      </div>
      <form @submit.prevent="loginRequest" id="login-form">
        <div class="row text-left">
          <div class="col-sm-12 form-group">
            <label for="email">Adresse email</label>
            <input
              type="email"
              v-model="email"
              id="email"
              class="form-control form-control-lg"
            />
          </div>
          <div class="col-sm-12 form-group">
            <label for="password">Mot de passe</label>
            <input
              type="password"
              v-model="password"
              id="password"
              class="form-control form-control-lg"
            />
          </div>
          <div class="col-sm-12 text-center form-group">
            <button
              v-bind:disabled="xhrRequest"
              v-bind:class="{ disabled: xhrRequest }"
              class="btn btn-lg btn-primary px-4"
            >
              <span v-if="!xhrRequest">Valider</span>
              <span v-if="xhrRequest">Connexion...</span>
            </button>
            <div
              v-if="xhrRequest"
              class="spinner-border text-secondary loader"
              role="status"
            >
              <span class="sr-only">Loading...</span>
            </div>
          </div>

        </div>
      </form>
    </div>
  </div>
</template>
<script>
import firebase from "firebase";
/* import {TEST_LOG} from "@/store/mutation-types" */

export default {
  name: "Login",
  data() {
    return {
      email: "",
      password: "",
      xhrRequest: false,
      errorMessage: "",
      successMessage: "",
    };
  },
  methods: {
    loginRequest() {
      let v = this;

      v.xhrRequest = true;
      v.errorMessage = "";
      v.successMessage = "";

      firebase
        .auth()
        .signInWithEmailAndPassword(v.email, v.password)
        .then(
          () => {
            this.$router.replace("projects");
            v.xhrRequest = false;
            v.successMessage = "Connexion réussie !";
            this.$store.commit('connexion', v.email)
          },
          () => {
            v.errorMessage = "Identifiants incorrects !";
            v.xhrRequest = false;
          }
        );
    },
  },
};
</script>
<style scoped>
.loader {
  position: relative;
  top: 6px;
  left: 10px;
}
</style>