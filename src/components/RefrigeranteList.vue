<template>
  <div>
    <v-row>
      <v-col md="6">
        <v-card
          outlined
          :loading="loading"
        >
          <v-list-item three-line>
            <v-list-item-content>
              <div class="overline mb-4">refrigerante-teste</div>
              <v-list-item-title class="headline mb-1">Bebidas</v-list-item-title>
              <v-list-item-subtitle>Adicione uma bebida e selecione um sabor de refrigerante</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>

          <v-card-actions>
            <v-btn text @click="addItem">Adicionar</v-btn>
            <v-btn text @click="removeAll">Remover Todas</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>

      <v-col>
        <v-card
          outlined
        >
          <v-list-item three-line>
            <v-list-item-content>
              <div class="overline mb-4">valor-total</div>
              <v-list-item-title class="headline mb-1">Valor</v-list-item-title>
              <v-list-item-subtitle v-if="totalValue === 0">Nenhuma bebida foi adicionada ao seu pedido.</v-list-item-subtitle>
              <v-list-item-subtitle v-else>O valor total dos itens adicionados é {{ formatValue(totalValue) }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>

          <v-card-actions>
            <v-btn text>Realizar Pedido</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

    <v-row>
      <v-col v-for="(drink, index) in items" :key="index" md="4">
        <v-card>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>Bebida</v-list-item-title>
              <v-row>
                <v-col>
                  <v-select
                    v-model="drink.data"
                    :items="drinks"
                    label="Refrigerante"
                    return-object
                    item-value="id"
                    :item-text="formatText"
                  ></v-select>
                </v-col>
              </v-row>

              <v-row>
                <v-col>
                  <v-text-field label="Marca" disabled :value="drink.data.marca"></v-text-field>
                </v-col>

                <v-col>
                  <v-text-field label="Valor" disabled :value="formatValue(drink.data.valor)"></v-text-field>
                </v-col>
              </v-row>

              <v-row>
                <v-col>
                  <v-text-field label="Sabor" disabled :value="drink.data.sabor"></v-text-field>
                </v-col>

                <v-col>
                  <v-text-field label="Quantidade" disabled :value="drink.data.quantidade"></v-text-field>
                </v-col>
              </v-row>

              <v-row>
                <v-col>
                  <v-checkbox label="Comprado" disabled :value="drink.data.comprado"></v-checkbox>
                </v-col>
              </v-row>

            </v-list-item-content>
          </v-list-item>

          <v-card-actions>
            <v-layout>
              <v-btn rounded depressed>
                <v-layout align-center>
                  <v-icon color="red">mdi-heart</v-icon>
                  <span class="ml-1">{{ drink.data.curtidas }}</span>
                </v-layout>
              </v-btn>

              <v-spacer></v-spacer>

              <v-btn icon @click="removeItem(index)">
                <v-icon>mdi-delete</v-icon>
              </v-btn>
            </v-layout>

          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

  </div>
</template>

<script>
export default {
  props: {
    loading: {
      type: Boolean
    },

    drinks: {
      type: Array
    }
  },

  computed: {
    totalValue () {
      let value = 0

      this.items.forEach(({ data: { valor } }) => {
        if (valor) value += valor
      })

      return value
    }
  },

  methods: {
    addItem () {
      this.items.push({ data: {} })
    },

    removeItem (index) {
      this.items.splice(index, 1)
    },

    removeAll () {
      this.items = []
    },

    formatValue (value) {
      if (!value) return
      const price = Number(value).toFixed(2)
      return `R$ ${price}`
    },

    formatText ({ sabor, quantidade }) {
      return `${sabor} ${quantidade}`
    }
  },

  data () {
    return {
      items: []
    }
  }
}
</script>
