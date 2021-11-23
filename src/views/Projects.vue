<template>
  <v-container>
    <!-- <div ref="content">
      <v-btn @click="getPdf"> AFFICHER L'IMAGE </v-btn>
      <v-row v-if="img">
        <v-col cols="6" sm="4">
          <v-img
            :src="URL"
            gradient="to top right, rgba(100,115,201,.33), rgba(25,32,72,.7)"
          ></v-img>
        </v-col>
      </v-row>
    </div>
    <v-btn @click="test"> {{ $store.state.user.nomCompte }} </v-btn>
    <v-img
      v-if="test2"
      :src="monURL"
      height="125"
      width="250"
      class="grey darken-4"
    ></v-img> -->
    <v-layout row wrap class="mb-4">
      <v-tooltip bottom>
        <template v-slot:activator="{ on }">
          <Popup v-if="!dialogReco" @ajoutDossier="(value) => addDossier(value)" v-on="on" />
          <ConsulterProjet
            v-bind:dialog="consulter"
            v-bind:dossier="dossierAffiche"
            @close="fermer"
          />
        </template>
        <span>Sort client</span>
      </v-tooltip>
      <v-row justify="center">
        <v-dialog persistent
         v-model="dialogReco" max-width="500px">
          <v-card>
            <v-card-title>
              <span class="text-h5">Veuillez vous reconnecter</span>
            </v-card-title>

            <v-card-actions>
              <v-btn color="blue darken-1" text @click="goReco">
                Me connecter
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="popupExisteDeja" max-width="810px">
          <v-card>
            <v-card-title>
              <span class="text-h5">Attention, un dossier dans votre liste a le même nom qu'un fichier dans ce dossier ! </span>
              <span class="text-h5">Veuillez modifier votre sélection.</span>
            </v-card-title>

            <v-card-actions>
              <v-btn color="blue darken-1" text @click="fermerExisteDeja">
                Fermer
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogExiste" max-width="560px">
          <v-card>
            <v-card-title>
              <span class="text-h5"
                >Attention un dossier avec le même numéro existe déjà !</span
              >
            </v-card-title>

            <v-card-actions>
              <v-btn color="error" text @click="dialogExiste = false">
                fermer
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-tooltip bottom>
          <v-dialog v-model="verifier" persistent max-width="800px">
            <v-card class="justify-center">
              <v-card-title>
                <span class="headline" style="margin-right: 145px"
                  >Formulaire d'ajout de dossier</span
                >
                <v-btn
                  class="col-close"
                  fab
                  text
                  top
                  right
                  x-small
                  @click="closeForm()"
                >
                  <v-icon> mdi-close </v-icon>
                </v-btn>
              </v-card-title>
            </v-card>
          </v-dialog>
        </v-tooltip>
      </v-row>
    </v-layout>

    <!-- ********************************************************************** -->
    <v-data-table
      :headers="headers"
      :items="projects"
      sort-by="date"
      class="elevation-1"
      :loading="load"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>Dossiers</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-dialog :key="clefDialog" v-model="dialog" max-width="600px">
            <v-card>
              <v-card-title>
                <span class="text-h5">{{ formTitle }}</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.numero"
                        label="Numéro de dossier"
                      ></v-text-field>
                    </v-col>

                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.titre"
                        label="Intitulé du dossier"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.adresse"
                        label="Adresse"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.date"
                        label="Date"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.client"
                        label="Client"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.status"
                        label="Statut"
                      ></v-text-field>
                    </v-col>

                    <!--  <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        label="PDF"
                      ></v-text-field>
                      <pdf src="C:\Users\33751\Desktop\Copie-Projet\src\assets\Cv_W.pdf"></pdf>
                    </v-col> -->
                    <!-- <v-col>
                      <div>
                        <div>
                          <p>Upload an image to Firebase:</p>
                          <input
                            type="file"
                            @change="previewImage"
                            accept="image/*"
                          />
                        </div>
                        <div>
                          <p>
                            Progress: {{ uploadValue.toFixed() + "%" }}
                            <progress
                              id="progress"
                              :value="uploadValue"
                              max="100"
                            ></progress>
                          </p>
                        </div>
                        <div v-if="imageData != null">
                          <img class="preview" :src="picture" />
                          <br />
                          <button @click="onUpload">Upload</button>
                        </div>
                      </div>
                    </v-col> -->
                  </v-row>
                </v-container>
                <span
                  style="
                    color: red;
                    text-decoration: underline;
                    font-weight: bold;
                  "
                  >Liste des pièces jointes :</span
                >
                <v-card
                  flat
                  v-for="file in editedfiles"
                  :key="file.name"
                  class="mb-1"
                  style="margin-left: 250px"
                >
                  <v-btn icon :href="file.lien" target="_blank">
                    {{ file.nom }}
                  </v-btn>
                </v-card>
                <v-container fluid>
                  <v-row>
                    <v-col cols="12">
                      <v-combobox
                        v-model="select"
                        :items="comboFiles"
                        label="Liste des fichiers"
                        multiple
                        outlined
                        dense
                      ></v-combobox>
                    </v-col>
                    <v-col style="margin-right: 145px" cols="12">
                      <v-btn  style="margin-right: 145px" color="error" @click="deleteFiles(editedItem)"
                        >Supprimer le(s) fichier(s)</v-btn
                      >
                    </v-col>
                    <v-col cols="12">
                      <VueFormulate
                        :onlyFiles="true"
                        :key="clefFormulaire"
                        @submitDossier="(value) => assignerValue(value, editedItem)"
                      />
                    </v-col>

                    <!-- <v-col cols="12">
                      <v-btn @click="addFiles(editedItem)"
                        >Ajouter le(s) fichier(s)</v-btn
                      >
                    </v-col> -->
                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="red white--text" @click="close">
                  Annuler
                </v-btn>
                <v-btn color="green white--text"  @click="save()"> Valider </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-dialog v-model="dialogDelete" max-width="500px">
            <v-card>
              <v-card-title class="text-h5"
                >Voulez-vous vraiment supprimer ce dossier ?</v-card-title
              >
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="closeDelete"
                  >Annuler</v-btn
                >
                <v-btn color="blue darken-1" text @click="deleteItemConfirm()"
                  >Supprimer</v-btn
                >
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:[`item.actions`]="{ item }">
        <v-icon small class="mr-2" @click="editItem(item)"> mdi-pencil </v-icon>
        <v-icon small class="mr-2" @click="deleteItem(item)">
          mdi-delete
        </v-icon>
        <v-icon small class="mr-2" @click="telechargerDossier(item)">
          mdi-cloud-download
        </v-icon>
        <!-- <v-icon small class="mr-2" @click="afficherDossier(item)">
          mdi-eye
        </v-icon> -->
      </template>
    </v-data-table>
    <!--  <v-card flat v-for="project in projects" :key="project.id" class="mb-1">
      <v-layout row wrap :class="`pa-3 project ${project.status}`">
        <v-flex xs12 md3>
          <div class="caption">Numéro de dossier</div>
          <div>{{ project.numero }}</div>
        </v-flex>
        <v-flex xs12 md2>
          <div class="caption grey--text">Intitulé du projet</div>
          <div>{{ project.titre }}</div>
        </v-flex>
        <v-flex xs6 sm4 md2>
          <div class="caption grey--text">Nom du client</div>
          <div>{{ project.client }}</div>
        </v-flex>
        <v-flex xs6 sm4 md2>
          <div class="caption grey--text">Date</div>
          <div>{{ project.date }}</div>
        </v-flex>
        <v-card-actions>
          <v-btn color="red" text @click="afficherDossier(project.id)">
            Consulter
          </v-btn>
          <v-btn
            class="col-close"
            fab
            text
            top
            right
            x-small
            @click="removeProject(project.id)"
          >
            <v-icon> mdi-close </v-icon>
          </v-btn>
        </v-card-actions>
      </v-layout>
    </v-card> -->
  </v-container>
</template>

<script lang=ts>
import { jsPDF } from "jspdf";
import "jspdf-autotable";
/* import * as autoTable from 'jspdf-autotable'; */
/* import  jsPDF  from "jspdf"; */
/* import html2canvas from "html2canvas"; */
import Popup from "../components/Popup.vue";
import ConsulterProjet from "../components/ConsulterProjet.vue";
import { db } from "../firebase/db";
import firebase from "firebase";
import VueFormulate from "../views/VueFormulate.vue";
/* import autotable from 'jspdf-autotable'; */
/* import pdf from "vue-pdf"; */
/*  */
export default {
  name: "projects",
  components: { Popup, ConsulterProjet, VueFormulate /* , pdf */ },
  data: () => ({
    imageData: null,
    picture: null,
    select: [],
    clefFormulaire: 0,
    img: false,
    dialogExiste: false,
    URL: "",
    dialogReco: false,
    uploadValue: 0,
    clefDialog: 0,
    popupExisteDeja: false,
    adedFiles: {},
    file: false,
    dialog: false,
    toDelete: {},
    monURL: "",
    editedfiles: [],
    storageRef: {},
    test2: false,
    load: false,
    dialogDelete: false,
    editedIndex: -1,
    editedItem: {
      numero: "",
      titre: "",
      date: "",
      client: "",
      status: "",
    },
    defaultItem: {
      numero: "",
      titre: "",
      date: "",
      client: "",
      status: "",
    },
    headers: [
      {
        text: "Numéro de dossier",
        align: "start",
        value: "numero",
      },
      { text: "Adresse du chantier", value: "adresse" },
      { text: "Auteur du dossier", value: "auteur" },
      { text: "Intitulé du dossier", value: "titre" },
      { text: "Date", value: "date" },
      { text: "Client", value: "client" },
      { text: "Statut", value: "status" },
      { text: "Actions", value: "actions", sortable: false },
    ],
    dossierAffiche: {},
    consulter: false,
    projects: [],
    verifier: false,
  }),
  computed: {
    formTitle() {
      return "Modifier le dossier";
    },
    comboFiles() {
      const listeFiles = [];
      this.editedfiles.forEach((file) => listeFiles.push(file.nom));
      return listeFiles;
    },
  },
  methods: {
    fermerExisteDeja(){
      this.popupExisteDeja = false
    },
    assignerValue(value, item) {
      this.adedFiles = value;
      this.addFiles(item)
    },
    async addFiles(item) {
      const listePdf = [];
      /* eslint-disable no-console */
      console.log(this.adedFiles, "FILE ADED");
      /* eslint-enable no-console */
      if (this.adedFiles.files != null) {
        let existe = 0;
        for (var i = 0; i < this.adedFiles.files.fileList.length; i++) {
           /* eslint-disable no-console */
      console.log(this.adedFiles.files.fileList[i].name, "ELEMENT A LA POSITION : ",i);
      /* eslint-enable no-console */
          this.editedfiles.forEach((file) =>
            file.nom === this.adedFiles.files.fileList[i].name
              ? existe++
              : (existe = existe + 0)
          );
        }
        if (existe === 0) {
          /* eslint-disable no-console */
          console.log("N'existe PAS !");
          console.log(this.editedfiles, "EDITED AVANT!");
          /* eslint-enable no-console */
          const files = this.adedFiles.files.fileList;
          files.forEach((file) => this.editedItem.files.push(file.name));
          files.forEach((file) => this.editedfiles.push(file.name));
          var index = 0;
          var random = "xbiijohapjpjigkbj:afjezBLHVB";
          this.editedfiles.push(random);

          index = this.editedfiles.indexOf(random);
          if (index != -1) {
            this.editedfiles.splice(index, 1);
          }

          /* eslint-disable no-console */

          console.log(this.editedfiles, "EDITED APRES!");
          /* eslint-enable no-console */
          files.forEach((file) => listePdf.push(file.name));
          const fileListe = this.adedFiles.files.fileList;
          /* eslint-disable no-console */
          console.log(fileListe, "FILE LISTE");
          /* eslint-enable no-console */
          fileListe.forEach(
            (file) =>
              (this.storageRef = firebase
                .storage()
                .ref(item.numero + "/" + `${file.name}`)
                .put(file))
          );
          await db
            .collection("projects")
            .doc(this.projects[this.editedIndex].id)
            .set(this.editedItem);
          this.clefDialog++;
          this.close();
        }else {
          this.popupExisteDeja = true,
          /* eslint-disable no-console */

          console.log( "EXISTE DEJA !!!!!!");
          /* eslint-enable no-console */
        }
      }
      this.clefFormulaire++;
    },
    async deleteFiles(item) {
      var fileLocations = [];
      /*  item.numero + "/" "2038/Logo-MIAGE.png"; */
      this.select.forEach((file) => fileLocations.push(file));
      fileLocations.forEach((fileLocation) =>
        firebase
          .storage()
          .ref(item.numero + "/" + fileLocation)
          .delete()
      );
      var index = 0;
      for (var i = 0; i < this.select.length; i++) {
        index = this.editedItem.files.indexOf(this.select[i]);
        if (index != -1) {
          this.editedfiles.splice(index, 1);
          this.editedItem.files.splice(index, 1);
        }
      }
      this.select = [];
      await db
        .collection("projects")
        .doc(this.projects[this.editedIndex].id)
        .set(this.editedItem);
      // delete the file
    },
    async getPdf(num, file) {
      const storageRef2 = await firebase
        .storage()
        .ref(num + "/" + file)
        .getDownloadURL();
      /*  this.URL = storageRef2; */
      return storageRef2;
      /* eslint-disable no-console */
      /* console.log(this.URL); */
      /* eslint-enable no-console */
      /* this.file = true; */
    },
    async getImage() {
      const storageRef2 = await firebase
        .storage()
        .ref("9999/" + this.projects[21].photos[0])
        .getDownloadURL();
      this.URL = storageRef2;
      this.img = true;
    },
    goReco() {
      this.$router.replace("/");
      this.dialogReco = false;
    },
    test3() {
      var fileLocation = "2038/Logo-MIAGE.png";

      // delete the file
      firebase.storage().ref(fileLocation).delete();
      /*  this.storageRef = firebase.storage().ref("2038/").delete(); */
    },
    /* GET pour une image à l'adresse dans le .ref(.../...) */
    async test() {
      const storageRef2 = await firebase
        .storage()
        .ref("1945/Logo-MIAGE.png")
        .getDownloadURL();
      this.monURL = storageRef2;
      this.test2 = true;
      /* eslint-disable no-console */

      /* eslint-enable no-console */
    },
    previewImage(event) {
      this.uploadValue = 0;
      this.picture = null;
      this.imageData = event.target.files[0];
    },

    onUpload() {
      this.picture = null;
      /* eslint-disable no-console */

      /* eslint-enable no-console */
      const storageRef = firebase
        .storage()
        .ref("test/" + `${this.imageData.name}`)
        .put(this.imageData);
      storageRef.on(
        `state_changed`,
        (snapshot) => {
          this.uploadValue =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        },
        (error) => {
          /* eslint-disable no-console */
          console.log(error.message);
          /* eslint-enable no-console */
        },
        () => {
          this.uploadValue = 100;
          storageRef.snapshot.ref.getDownloadURL().then((url) => {
            this.picture = url;
          });
        }
      );
    },
    fermer() {
      this.consulter = false;
    },
    telechargerDossier(item) {
      this.dossierAffiche = this.projects.filter(
        (project) => project.id === item.id
      )[0];
      const doc = new jsPDF();
      const textt =
        "Informations relatives au dossier N°" + this.dossierAffiche.numero;
      const text = [
        "Numero de dossier: " + this.dossierAffiche.numero,
        "Date: " + this.dossierAffiche.date,
        "Nom du client: " + this.dossierAffiche.client,
        "Status: " + this.dossierAffiche.status,
        "Intitulé du projet: " + this.dossierAffiche.titre,
        "Adresse: " + this.dossierAffiche.adresse,
        "Personne en charge du dossier: "+this.$store.state.user.nomCompte
      ];

      doc.text(textt, 50, 20);
      doc.text(text, 10, 50, { charSpace: 0.5, lineHeightFactor: 2 });

      doc.save("Dossier Numero : " + this.dossierAffiche.numero + ".pdf");
    },
    afficherDossier(item) {
      this.dossierAffiche = this.projects.filter(
        (project) => project.id === item.id
      )[0];
      /* eslint-disable no-console */
      console.log(this.dossierAffiche, "DOSSIER");
      /* eslint-enable no-console */
      this.consulter = true;

      /*  const contentHtml = this.$refs.content.innerHTML; */
      /* doc.fromHTML(contentHtml, 15, 15, {
        width: 170,
      }); */
      /* var img = new Image(); */
      /* eslint-disable no-console */
      /*  console.log(this.dossierAffiche.photos[0], "IMAGESSSSSSS"); */
      /*  const storageRef2 = await firebase
        .storage()
        .ref("9999/" + this.projects[21].photos[0])
        .getDownloadURL();
      console.log(storageRef2, "URLLLLL"); */
      /* eslint-enable no-console */

      /* img.src = storageRef2; */
      /* doc.addImage(img.src, "pnj", 50, 50, 100,100); */
    },
    async addDossier(value) {
      const listeImages = [];
      const listePdf = [];
      /* eslint-disable no-console */
      console.log(value, "VALUEEEEEEE");
      let existe = false;
      this.projects.forEach((project) =>
        project.numero === value.numero_de_dossier ? (existe = true) : false
      );

      if (existe === false) {
        if (value.photos != null) {
          const images = value.photos.fileList;
          images.forEach((img) => listeImages.push(img.name));
        }
        if (value.files != null) {
          const files = value.files.fileList;
          files.forEach((file) => listePdf.push(file.name));
        }
        console.log(listeImages, "MA LSIETEEEEEEEEE");
        await db.collection("projects").add({
          numero: value.numero_de_dossier,
          date: value.date,
          client: value.nom_du_client,
          adresse: value.adresse,
          status: "En cours",
          files: listePdf,
          auteur: this.$store.state.user.nomCompte,
          titre: value.type_du_dossier,
          photos: listeImages,
        });

        if (value.photos != null) {
          const imgListe = value.photos.fileList;
          imgListe.forEach(
            (img) =>
              (this.storageRef = firebase
                .storage()
                .ref(value.numero_de_dossier + "/" + `${img.name}`)
                .put(img))
          );
        }
        if (value.files != null) {
          const fileListe = value.files.fileList;
          fileListe.forEach(
            (file) =>
              (this.storageRef = firebase
                .storage()
                .ref(value.numero_de_dossier + "/" + `${file.name}`)
                .put(file))
          );
        }
      } else {
        this.dialogExiste = true;
        console.log("existe déjà ! ");
      }
      /* eslint-enable no-console */
    },
    removeProject() {
      this.verifier = true;
    },
    confirmation(id) {
      this.verifier = false;
      db.collection("projects").doc(id).delete();
    },
    async editItem(item) {
      this.editedIndex = this.projects.indexOf(item);
      this.editedItem = Object.assign({}, item);
      /* const listePdf= []; */
      /* eslint-disable no-console */
      console.log(item, "EDITED");
      var editedfilesTemps = [];
      /* eslint-enable no-console */
      if (item.files != null) {
        const files = item.files;
        files.forEach((file) => editedfilesTemps.push(file));
        var uniquefiles = [...new Set(editedfilesTemps)];
        editedfilesTemps = uniquefiles;
        for (var i = 0; i < files.length; i++) {
          var storageRef2 = await firebase
            .storage()
            .ref(item.numero + "/" + files[i])
            .getDownloadURL();
          this.editedfiles.push({
            nom: files[i],
            lien: storageRef2,
          });
        }

        /* eslint-disable no-console */
        console.log(this.editedfiles, "EDITED");
        /* eslint-enable no-console */
      }

      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.projects.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
      this.toDelete = item;
    },

    deleteItemConfirm() {
      /* eslint-disable no-console */

      db.collection("projects")
        .doc(this.projects[this.editedIndex].id)
        .delete();

      if (this.toDelete.photos != null) {
        this.toDelete.photos.forEach(
          (img) =>
            (this.storageRef = firebase
              .storage()
              .ref(this.toDelete.numero + "/" + `${img}`)
              .delete())
        );
      }
      if (this.toDelete.files != null) {
        this.toDelete.files.forEach(
          (file) =>
            (this.storageRef = firebase
              .storage()
              .ref(this.toDelete.numero + "/" + `${file}`)
              .delete())
        );
      }
      this.closeDelete();

      /* eslint-enable no-console */
    },

    close() {
      this.editedfiles = [];
      this.select = [];
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    async save() {
      Object.assign(this.projects[this.editedIndex], this.editedItem);
      await db
        .collection("projects")
        .doc(this.projects[this.editedIndex].id)
        .set(this.editedItem);
      this.editedfiles = [];
      this.select = [];
      this.close();
    },
  },
  watch: {
// Obliger à se reconnecter 
    projects() {
      this.projects.length === 0 ? (this.load = true) : (this.load = false);
      if (this.$store.state.user.nomCompte === "Veuillez vous connectez") {
        this.dialogReco = true;
        /* eslint-disable no-console */
        console.log(this.dialogRecon, "RECO !");
        /* eslint-enable no-console */
      }
    },
    dialogReco(){
      if (this.dialogReco === true) {
        this.projects = []
      }
    },
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },

  firestore: {
    projects: db.collection("projects"),
  },
};
</script>
<style >
.project {
  align-content: rightz;
}
.project.complete {
  border-left: 4px solid #3cd1c2;
}
.project.no {
  border-left: 4px solid orange;
}
.project.up {
  border-left: 4px solid red;
}
.project.yes {
  border-left: 4px solid yellow;
}
.v-chip.complete {
  color: #3cd1c2;
}
.p.ovnored {
  color: orange;
}
.p.up {
  color: red;
}
.p.yes {
  color: yellow;
}
</style>
