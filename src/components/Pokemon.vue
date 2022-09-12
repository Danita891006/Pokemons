<template>
  <v-dialog :value="value"
            v-model="show" max-width="500">
    <v-card>
      <v-toolbar>
        <v-toolbar-title>{{pokemonName}}</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items class="ma-2">
          <v-btn
              dark
              text
              @click="onCancel"
          >
            <v-icon size="22">
              {{ icons.mdiCloseOutline }}
            </v-icon>
          </v-btn>
        </v-toolbar-items>
      </v-toolbar>
      <v-row>
        <v-col
            cols="4"
            md="4"
        ></v-col>
        <v-col
            cols="8"
            md="8"
        >
        <v-subheader class="text-2xl">Habilidades</v-subheader>
          <v-list-item-group>
            <v-list-item v-for="(pok, index) in pokemonAb"
                         :key="index">
              <v-list-item-icon>
                <v-icon>
                  {{ icons.mdiFormatHorizontalAlignRight }}
                </v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title class="text-lg"> {{ pok.ability.name }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            </v-list-item-group>
        </v-col>
      </v-row>
      <v-divider></v-divider>
      <v-list
          three-line
          subheader
      >
        <v-subheader></v-subheader>
          <v-img
              :src="pokemonImag"
              height="125"
              contain
              class="grey darken-4"
          ></v-img>
      </v-list>
    </v-card>

  </v-dialog>
</template>

<script>
import {mdiCloseOutline,mdiFormatHorizontalAlignRight} from '@mdi/js'

export default {
  data() {
    return {
    }
  },
  props: {
    value: Boolean,
    pokemonAb: Array,
    pokemonImag: String,
    pokemonName: String,
  },
  mounted() {
  },
  methods: {
    onCancel () {
      this.$emit('cancelled')
    }
  },
  computed: {
    show: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit("input", value);
      },
    },
  },
  setup() {
    return {
      icons: {
        mdiCloseOutline,
        mdiFormatHorizontalAlignRight,
      },
    }
  },
}
</script>

