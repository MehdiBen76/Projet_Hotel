<template>
  <v-row>
    <v-dialog v-model="dialog" persistent max-width="800px">
      <v-card>
        <v-card-title>
          <span class="headline">Dossier numero : {{ dossier.numero }}</span>
          <v-btn class="col-close" fab text top right x-small @click="close">
            <v-icon> mdi-close </v-icon>
          </v-btn>
        </v-card-title>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>Date : {{ dossier.date }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title
              >Intitulé du dossier : {{ dossier.titre }}</v-list-item-title
            >
          </v-list-item-content>
        </v-list-item>

        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>Client : {{ dossier.client }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item>
          <v-list-item-content>
            <v-list-item-title
              >Priorité : {{ dossier.status }}</v-list-item-title
            >
          </v-list-item-content>
        </v-list-item>
        <v-list-item v-if="dossier.photos != null">
          <v-list-item-content>
            <v-list-item-title
              >Nombre de photos : {{ dossier.photos.length }}</v-list-item-title
            >
          </v-list-item-content>
        </v-list-item>
         <v-list-item v-else>
          <v-list-item-content>
            <v-list-item-title
              >Pas de photos dans ce dossier</v-list-item-title
            >
          </v-list-item-content>
        </v-list-item>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  components: {},
  props: { dialog: Boolean, dossier: Object },
  data() {
    return {
      mykey: 0,
    };
  },
  methods: {
    close() {
      this.$emit("close");
    },
  },
  computed: {},

  watch: {},
};
</script>
<style scoped>
.headline {
  margin: 0 auto;
  width: 400px;
}
</style>