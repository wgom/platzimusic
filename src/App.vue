<template lang="pug">
  #app
    img(src='https://wgom.github.io/platzimusic/dist/logo.png')
    h1 PlatziMusic

    select(v-model='selectedCountry') 
      option(v-for='(country, index) in countries' v-bind:value='country.name' v-bind:key='index') {{ country.name }}

    spinner(v-show="loading")

    ul 
      artist(v-for="artist in artists" v-bind:artist="artist" v-bind:key="artist.mbid") 

</template>

<script>
  import Artist from './components/Artist.vue'
  import Spinner from './components/spinner.vue'
  import {getArtists, getCountries} from './api'

  export default {
    name: 'app',
    data () {
      return {
        artists: [],
        countries: [],
        selectedCountry: 'paraguay',
        loading: true
      }
    },

    watch: {
      selectedCountry: function () {
        this.refreshArtists()
      }
    },

    components: {
      Artist,
      Spinner
    },

    methods: {
      refreshArtists() {
        const self = this
        this.loading=true
        this.artists=[]
        getArtists(this.selectedCountry)
          .then(function (artists){
            self.loading=false 
            self.artists=artists
          })  
      }
    },

    mounted() {
      this.refreshArtists()

      const that = this 
      getCountries().then(function(countries){
        that.countries = countries
      })
    }
  }
</script>

<style lang="stylus">
  #app
    font-family 'Avenir', Helvetica, Arial, sans-serif
    -webkit-font-smoothing antialiased
    -moz-osx-font-smoothing grayscale
    text-align center
    color #2c3e50
    margin-top 60px

  h1, h2
    font-weight normal

  ul
    list-style-type none
    padding 0

  li
    display inline-block
    margin 0 10px

  a
    color #42b983
</style>
