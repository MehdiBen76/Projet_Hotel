<template>
  <v-row justify="center">
    <v-col>
      <v-btn rounded color="success" small @click="dialog = true">
        Add new Booking
        <v-icon right dark> mdi-plus </v-icon>
      </v-btn>
    </v-col>

    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="text-h5">Booking description</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="lastClient"
                  label="Nom"
                  required
                  outlined
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="firstClient"
                  label="Prénom(s)"
                  required
                  outlined
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-select
                  v-model="bookingType"
                  :items="items"
                  :menu-props="{ top: true, offsetY: true }"
                  label="Type de réservation"
                  outlined
                ></v-select>
              </v-col>
              <v-col cols="12" sm="6">
                <v-select
                  v-model="roomNumber"
                  :items="rommNumbers"
                  :menu-props="{ top: true, offsetY: true }"
                  label="Numéro de chambre"
                  outlined
                ></v-select>
              </v-col>
              <v-col cols="6">
                <v-menu
                  v-model="menu"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  transition="scale-transition"
                  offset-y
                  min-width="auto"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="arrivalDate"
                      label="Arrival date"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="arrivalDate"
                    @input="menu = false"
                  ></v-date-picker>
                </v-menu>
              </v-col>
              <v-col cols="6">
                <v-menu
                  v-model="menu2"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  transition="scale-transition"
                  offset-y
                  min-width="auto"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="departureDate"
                      label="Departure date"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="departureDate"
                    @input="menu2 = false"
                  ></v-date-picker>
                </v-menu>
              </v-col>
              <v-col cols="6">
                <v-text-field
                  label="Nombre de nuit"
                  outlined
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="price"
                  label="Prix"
                  suffix="€"
                  outlined
                  required
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="closeDialog()">
            Close
          </v-btn>
          <v-btn color="blue darken-1" text @click="saveBooking()">
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import { db } from "../firebase/db";
export default {
  data: () => ({
    lastClient: "",
    firstClient: "",
    arrivalDate: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
      .toISOString()
      .substr(0, 10),
    departureDate: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
      .toISOString()
      .substr(0, 10),
    booked: false,
    bookingType: "",
    roomNumber: "",
    price: "",
    booking: {
      lastClient: "",
      firstClient: "",
      arrivalDate: "",
      departureDate: "",
      bookingType: "",
      roomNumber: "",
      price: "",
      booked: false,
    },
    dialog: false,
    items: ["Booking", "Hotel Beds", "Expedia"],
    rommNumbers: [
      "1",
      "2",
      "3",
      "5",
      "6 ",
      "7",
      "8",
      "9",
      "10",
      "11",
      "12",
      "13",
      "14",
      "15",
      "16",
      "17",
      "18",
      "19",
      "20",
      "21",
      "...",
      "38",
    ],
    date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
      .toISOString()
      .substr(0, 10),
    menu: false,
    menu2: false,
    date2: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
      .toISOString()
      .substr(0, 10),
  }),
  methods: {
    closeDialog() {
      this.dialog = false;
      this.clearBooking();
    },

    clearBooking() {
      let booking2 = {
        client: "",
        arrivalDate: "",
        departureDate: "",
        roomNumber: "",
        price: "",
        booked: false,
      };
      this.booking = booking2;
    },

    saveBooking() {
      this.booking.arrivalDate = this.arrivalDate;
      this.booking.lastClient = this.lastClient;
      this.booking.firstClient = this.firstClient;
      this.booking.arrivalDate = this.arrivalDate;
      this.booking.departureDate = this.departureDate;
      this.booking.bookingType = this.bookingType;
      this.booking.roomNumber = this.roomNumber;
      this.booking.price = this.price + "€";
      this.booking.booked = "Booked";
      this.$emit("roomToUpdate", this.booking);
      this.closeDialog();
    },
  },
  firestore: {
    rooms: db.collection("rooms"),
  },
};
</script>

<style>
</style>