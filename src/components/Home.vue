<template>
  <v-app>
      <v-row
          class="align-content-center">
        <v-col
            cols="5"
            md="5">
        </v-col>
        <v-col
            cols="7"
            md="7">
          <h1 class="margin-head">Pokemons</h1>
        </v-col>
      </v-row>
      <v-row>
        <v-col
            cols="2"
            md="2"
        ></v-col>
        <v-col
            cols="8"
            md="8"
        >
          <v-card>
            <v-card-title>
              <v-spacer></v-spacer>
              <v-spacer></v-spacer>
              <v-spacer></v-spacer>
              <v-spacer></v-spacer>
              <v-text-field
                  v-model="search"
                  label="Buscar"
                  :append-icon="icons.mdiMagnify"
                  single-line
                  hide-details
              ></v-text-field>
            </v-card-title>
            <v-data-table
                :headers="headers"
                :items="pokemonsArr"
                :search="search"
                :loading="loading"
                loading-text="Cargando..... espere por favor"
                no-results
                no-results-text="No existen registros que coincidan con la búsqueda"
                no-data
                no-data-text="No existen registros"
                class="table-rounded cursor-pointer elevation-1 primary table-striped"
                hide-default-footer
                disable-pagination
                @click:row="viewDetail"
            >
              <template #[`item.name`]="{item}">
                {{ `${item.name.toUpperCase()}` }}
              </template>
            </v-data-table>
            <v-row class="margin-footer">
              <v-col cols="5" md="5">
              </v-col>
              <v-col cols="7" md="7" class="text-truncate">
               <strong> Total {{ pagination.itemsLength }} registros</strong>
              </v-col>
            </v-row>
            <v-row class="text-center px-4 align-center">
              <v-col cols="2" md="2">
              </v-col>
              <v-col cols="8" md="8">
                <v-pagination
                    v-model="pagination.page"
                    :length="pagination.pageCount"
                    @input="updatePagination"></v-pagination>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="2" md="2">
              </v-col>
              <v-col cols="4" md="4">
                <v-select
                    dense
                    outlined
                    hide-details
                    v-model="pagination.itemsPerPage"
                    :items="perPageChoices"
                    label="Registros por pagina"
                    @input="pagination.itemsPerPage = parseInt($event, 10)"
                >
                </v-select>
              </v-col>
              <v-col cols="4" md="4">
                <v-text-field
                    v-model="pagination.page"
                    label="Ir a la página"
                    type="number"
                    outlined
                    hide-details
                    dense
                    @input="pagination.page = parseInt($event, 10)"
                ></v-text-field>
              </v-col>
              <v-col cols="2" md="2">
              </v-col>
            </v-row>
          </v-card>
        </v-col>
        <v-col
            cols="2"
            md="2"
        ></v-col>
      </v-row>
      <Pokemon :pokemonAb="pokemonAb"
               :pokemonName="pokemonName"
               :pokemonImag="pokemonImag"
               :value="dialog"
               @cancelled="closeDialog"></Pokemon>
    </v-app>
</template>

<script>

import service from '@/services/api'
import {mdiMagnify} from '@mdi/js'
import Pokemon from "@/components/Pokemon";

export default {
  components: {Pokemon},
  data() {
    return {
      search: '',
      pagination: {
        itemsLength: 0,
        itemsPerPage: 10,
        page: 1,
        pageCount: 0,
      },
      perPageChoices: [
        {text:'5 registros' , value: 5},
        {text:'10 registros' , value: 10},
        {text:'20 registros' , value: 20}
      ],
      pokemonsArr: [],
      pokemonAb: [],
      pokemonImag: '',
      pokemonName: '',
      dialog: false,
      loading: false,
      headers : [
        { text: 'NAME', value: 'name'},
        { text: 'URL', value: 'url' },
      ],
    }
  },
  mounted() {
    this.loading= true;
    this.pokemonsArr =[]
    service.getPokemons(this.pagination.itemsPerPage,this.pagination.page).then(response => {
      this.pokemonsArr = response.data.results
      this.pagination.itemsLength = response.data.count
      this.pagination.pageCount = parseInt(this.pagination.itemsLength / this.pagination.itemsPerPage)
      this.loading= false;
    })
  },
  watch:{
    'pagination.page'(val){
      this.loading= true;
      this.pokemonsArr =[]
      service.getPokemons(this.pagination.itemsPerPage,val).then(response => {
        this.pokemonsArr = response.data.results
        this.pagination.itemsLength= response.data.count
        this.pagination.pageCount = parseInt(this.pagination.itemsLength / this.pagination.itemsPerPage)
        this.loading= false;
      })
    },
    'pagination.itemsPerPage'(items){
      this.loading= true;
      this.pagination.itemsPerPage= items
      this.pokemonsArr =[]
      service.getPokemons(this.pagination.itemsPerPage,this.pagination.page).then(response => {
        this.pokemonsArr = response.data.results
        this.pagination.itemsLength= response.data.count
        this.pagination.pageCount = parseInt(this.pagination.itemsLength / this.pagination.itemsPerPage)
        this.loading= false;
      })
    },
  },
  methods: {
    viewDetail(pokemonSel){
      let urlDet= pokemonSel.url
      this.pokemonName = pokemonSel.name.toUpperCase()
      service.getDetalle(urlDet).then(response => {
        this.pokemonAb = response.data.abilities
        this.pokemonImag = response.data.sprites.front_shiny
      })
      setTimeout(
          this.dialog = true
      )
    },
    updatePagination(pagenumber){
      this.loading= true;
      this.pokemonsArr =[]
      service.getPokemons(this.pagination.itemsPerPage,pagenumber).then(response =>{
        this.pokemonsArr = response.data.results
        this.pagination.itemsLength= response.data.count
        this.pagination.pageCount = parseInt(this.pagination.itemsLength / this.pagination.itemsPerPage)
        this.loading= false;
      })
    },
    closeDialog: function(){
      console.log('close dialog 2');
      this.dialog = false;

    },
    updateItems(items){
      console.log(items)
    }
  },
  setup() {
    return {
      icons: {
        mdiMagnify,
      },
    }
  },
}
</script>

