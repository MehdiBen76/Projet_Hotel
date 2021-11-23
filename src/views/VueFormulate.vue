<template>
  <div class="madiv">
    <br />
    <!--  <br /> -->
    <FormulateForm v-if="!rooms" v-model="formValues" @submit="handleSubmit">
      <FormulateInput
        v-if="!onlyFiles"
        name="numero_de_dossier"
        label="Numéro de dossier"
        validation="required|number"
      />
      <FormulateInput
        v-if="!onlyFiles"
        name="nom_du_client"
        label="Nom du client"
        validation="required"
      />
      <FormulateInput
        v-if="!onlyFiles"
        type="email"
        name="email"
        label="Email du client"
        validation="required|email"
      />
      <FormulateInput
        v-if="!onlyFiles"
        type="text"
        name="adresse"
        label="Adresse"
        placeholder="Adresse"
        help="Veuillez entrer l'adresse"
        validation="required"
      />

      <FormulateInput
        v-if="!onlyFiles"
        type="date"
        name="date"
        label="Date de début du projet"
        placeholder="Date"
        validation="required"
        min="2010-12-01"
      />

      <!-- <FormulateInput
        type="password"
        name="password"
        label="Password"
        validation="required"
      /> -->
      <FormulateInput
        v-if="!onlyFiles"
        type="select"
        name="type_du_dossier"
        label="Type du dossier"
        placeholder="Sélectionnez un type"
        :options="{
          Vente: 'Vente',
          Achat: 'Achat',
          Location: 'Location',
        }"
        validation="required"
      />
      <!--  <FormulateInput v-if="!onlyFiles"
        type="image"
        name="photos"
        label="Select an image to upload"
        help="Select a png, jpg or gif to upload."
        validation="mime:image/jpeg,image/png,image/gif"
        multiple
      /> -->
      <FormulateInput
        type="file"
        name="files"
        label="Veuillez sélectionner les fichiers à ajouter au dossier"
        help="Sélectionnez un ou plusieurs fichier(s) PDF"
        validation="mime:application/pdf"
        multiple
      />

      <FormulateInput
        v-if="!onlyFiles"
        type="checkbox"
        name="Prioritaire"
        label="Prioritaire ?"
      />
      <FormulateInput
        type="submit"
        :label="titreBtn"
        style="margin-left: 85px"
      />
      <br />
    </FormulateForm>

    <!-- FORMULAIRE POUR LES CHAMBRES ! -->
    <FormulateForm v-else v-model="formValues" @submit="handleSubmit">
      <FormulateInput
        name="roomNumber"
        label="Numéro de chambre"
        validation="required|number"
      />
      <FormulateInput
        type="group"
        :repeatable="true"
        name="identity"
        add-label="+ Ajouter un client"
      >
        <FormulateInput
          name="roomClientLastName"
          label="Nom du client"
          validation="required"
        />
        <FormulateInput
          name="roomClientFirstName"
          label="Prénom du client"
          validation="required"
        />
      </FormulateInput>
      <FormulateInput
        type="date"
        name="arrivalDate"
        label="Date d'arrivée"
        placeholder="Date"
        validation="required"
      />
      <FormulateInput
        type="date"
        name="departureDate"
        label="Date de départ"
        placeholder="Date"
        validation="required"
      />
      <FormulateInput
        name="roomPrice"
        label="Prix"
        validation="required|number"
      />
      <FormulateInput
        type="checkbox"
        name="Prioritaire"
        label="Prioritaire ?"
      />
      <!-- <FormulateInput
        type="password"
        name="password"
        label="Password"
        validation="required"
      /> -->
      <FormulateInput
        type="select"
        name="type_du_dossier"
        label="Type du dossier"
        placeholder="Sélectionnez un type"
        :options="{
          Vente: 'Vente',
          Achat: 'Achat',
          Location: 'Location',
        }"
        validation="required"
      />
      <!--  <FormulateInput v-if="!onlyFiles"
        type="image"
        name="photos"
        label="Select an image to upload"
        help="Select a png, jpg or gif to upload."
        validation="mime:image/jpeg,image/png,image/gif"
        multiple
      /> -->
      <FormulateInput
        type="file"
        name="files"
        label="Veuillez sélectionner les fichiers à ajouter au dossier"
        help="Sélectionnez un ou plusieurs fichier(s) PDF"
        validation="mime:application/pdf"
        multiple
      />

      <FormulateInput
        type="checkbox"
        name="Prioritaire"
        label="Prioritaire ?"
      />
      <FormulateInput
        type="submit"
        :label="titreBtn"
        style="margin-left: 85px"
      />
      <br />
    </FormulateForm>
  </div>
</template>

<script>
export default {
  name: "formulaire",
  data: () => ({
    formValues: {},
  }),
  props: {
    onlyFiles: Boolean,
    rooms: Boolean,
  },
  computed: {
    titreBtn() {
      if (this.onlyFiles) {
        return "Ajouter le(s) fichier(s)";
      } else {
        return "Valider le formulaire";
      }
    },
  },
  methods: {
    handleSubmit() {
      this.$emit("submitDossier", this.formValues);
    },
  },
};
</script>
<style scoped>
.madiv {
  margin: 0 auto;
  width: 400px;
}
</style>