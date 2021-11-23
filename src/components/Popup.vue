<template>
  <v-row >
    <v-dialog v-model="dialog" persistent max-width="800px">
      <template v-slot:activator="{ on }">
        <v-btn outlined color="teal lighten-3" dark v-on="on"
          >Ajouter un dossier
        </v-btn>
      </template>
      <v-card class="justify-center">
        <v-card-title>
          <span class="headline" style="margin-right: 157px">Formulaire d'ajout de dossier</span>
          <v-btn
          style="margin-right: -20px"
              class="col-close"
              fab
              text
              top
              
              x-small
              @click="closeForm()"
            >
              <v-icon> mdi-close </v-icon>
            </v-btn>
        </v-card-title>
        <VueFormulate
          :onlyFiles="onlyFiles"
          :key="clefFormulaire"
          @submitDossier="(value) => saveDossier(value)"
        />
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import VueFormulate from "../views/VueFormulate.vue";

export default {
  components: {
    VueFormulate,
  },
  data: (vm) => ({
    dialog: false,
    clefFormulaire: 0,
    titre: "",
    content: "",
    due: null,
    date: new Date().toISOString().substr(0, 10),
    dateFormatted: vm.formatDate(new Date().toISOString().substr(0, 10)),
    menu1: false,
    inputRules: [(v) => v.length >= 3 || "Minimum lenght is 3 charachters"],
  }),
  props: {
    onlyFiles: Boolean
  },
  methods: {
    saveDossier(value) {
      /* eslint-disable no-console */
      
      /* eslint-enable no-console */
      this.dialog = false;
      this.clefFormulaire += 1;
      this.$emit("ajoutDossier", value);
    },
    closeForm(){
      this.dialog = false;
      this.clefFormulaire += 1;
    },
    formatDate(date) {
      if (!date) return null;

      const [year, month, day] = date.split("-");
      return `${year}/${month}/${day}`;
    },
    parseDate(date) {
      if (!date) return null;

      const [year, month, day] = date.split("/");
      return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
    },
  },
  computed: {
    computedDateFormatted() {
      return this.formatDate(this.date);
    },
  },

  watch: {
    date() {
      this.dateFormatted = this.formatDate(this.date);
    },
  },
};
</script>
<style scoped>
.headline {
  margin: 0 auto;
  width: 400px;
}
</style>