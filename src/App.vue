<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <div class="d-flex align-center">
        refrigerante-teste
      </div>
    </v-app-bar>

    <v-content>
      <v-container>
        <refrigerante-list :drinks="drinks" :loading="loading"/>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import RefrigeranteList from '@/components/RefrigeranteList'

export default {
  name: 'App',

  components: {
    RefrigeranteList
  },

  created () {
    this.getDrinks()
  },

  computed: {
    ...mapGetters(['drinks', 'loading'])
  },

  methods: {
    ...mapActions(['getDrinks'])
  }
}
</script>
