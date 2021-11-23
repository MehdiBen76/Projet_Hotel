<template>
  <v-container>
    <DialogAddBooking @roomToUpdate="(value) => bookRoom(value)" />
    <v-btn
      @click="addAllRooms()"
      color="error"
      rounded
      class="mr-4 mb-4"
      style="margin-left: 140px"
    >
      Générer/Supprimer les chambres</v-btn
    >
    <v-btn rounded color="primary" dark class="mb-4">
      Nouvelle réservation !
    </v-btn>
    <v-data-table
      :headers="headers"
      :items="rooms"
      sort-by="number"
      class="elevation-1"
      :loading="load"
    >
      <template v-slot:[`item.booked`]="{ item }">
        <v-chip :color="getColor(item.booked)" dark>
          {{ item.booked }}
        </v-chip>
      </template>
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>Réservations</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
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
        <v-icon small class="mr-2" @click="afficherDossier(item)">
          mdi-eye
        </v-icon>
      </template>
    </v-data-table>
  </v-container>
</template>

<script lang=ts>
import DialogAddBooking from "../components/DialogAddBooking.vue";
import { db } from "../firebase/db";
export default {
  components: { DialogAddBooking },
  data: () => ({
    dialog: false,
    dialogDelete: false,
    headers: [
      {
        text: "Numéro de chambre",

        value: "number",
        align: "center",
      },
      { text: "Client(s)", value: "client" },
      { text: "Date d'arrivée", value: "arrivalDate" },
      { text: "Date de sortie", value: "departureDate" },
      { text: "Prix", value: "price" },
      { text: "État", value: "booked", align: "center" },
      { text: "Actions", value: "actions", sortable: false },
    ],
    rooms: [],
    load: false,
    editedIndex: -1,
    editedItem: {
      name: "",
      calories: 0,
      fat: 0,
      carbs: 0,
      protein: 0,
    },
    defaultItem: {
      name: "",
      calories: 0,
      fat: 0,
      carbs: 0,
      protein: 0,
    },
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    },
  },

  methods: {
    async bookRoom(roomInfo) {
      let idToUpdate = "";
      this.rooms.forEach((room) => {
        /* eslint-disable no-console */

        if (`${room.number}` === roomInfo.roomNumber) {
          idToUpdate = `${room.id}`;
        }

        /* eslint-enable no-console */
      });
      /* eslint-disable no-console */
      console.log(roomInfo.roomNumber + "ROOM INFO----------");

      /* eslint-enable no-console */
      await db
        .collection("rooms")
        .doc(idToUpdate)
        .update({
          arrivalDate: roomInfo.arrivalDate,
          booked: roomInfo.booked,
          client: roomInfo.lastClient + "_" + roomInfo.firstClient,
          departureDate: roomInfo.departureDate,
          number: roomInfo.roomNumber,
          price: roomInfo.price,
        });
    },

    getColor(booked) {
      if (booked === "Booked") {
        return "red";
      } else {
        return "green";
      }
    },

    async deleteAllRooms() {
      this.rooms.forEach((room) => {
        db.collection("rooms").doc(room.id).delete();
      });
    },
    afficher() {
      let t = new Date(1511068319); // Epoch
      t.setSeconds(this.rooms[0].arrivalDate);
      /* eslint-disable no-console */
      console.log(t.toDateString());
      console.log(t.getTime());
      /* eslint-enable no-console */
    },

    async addAllRooms() {
      let clients = ["Mehdi", "Ben", "Youcef", "Babi"];
      let prices = ["60", "70", "80", "100", "120"];
      let chance = [1, 2];

      for (let i = 1; i < 39; i++) {
        await db.collection("rooms").add({
          arrivalDate: i < 31 ? i + "-11-2021" : i + "-12-2021",
          departureDate: i < 31 ? i + "-01-2022" : i + "-02-2022",
          client:
            i % 2 === 0
              ? [
                  clients[Math.floor(Math.random() * clients.length)],
                  clients[Math.floor(Math.random() * clients.length)],
                ]
              : clients[Math.floor(Math.random() * clients.length)],
          number: i,
          price: prices[Math.floor(Math.random() * prices.length)] + "€",
          booked:
            chance[Math.floor(Math.random() * chance.length)] % 2 === 0
              ? "Booked"
              : "Free",
        });
      }
    },
  },
  watch: {
    /* rooms() {
      this.rooms.length === 0 ? (this.load = true) : (this.load = false);
      this.rooms.forEach(function (room) {
        room.price = room.price + "€";
      });
    }, */
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },

  firestore: {
    rooms: db.collection("rooms"),
  },
};
</script>

<style>
</style>