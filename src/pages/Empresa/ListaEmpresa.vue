<template>
  <q-layout view="lHh Lpr lFf">
    <q-page padding>
      <div class="row text-h2 text-weight-bold">
        <q-toolbar>
          <q-toolbar-title class="text-center"
            >Contrate as mehores equipes</q-toolbar-title
          >
        </q-toolbar>
      </div>

      <div class="class-card q-pa-md">
        <q-list>
          <q-item v-for="(item, index) in empresaGroup" :key="index">
            <q-card class="q-pa-md" style="width: 100%; height: 200px">
              <div class="row">
                <div class="col-2">
                  <q-item-section top avatar>
                    <q-avatar size="100px" font-size="82px">
                      <img
                        :src="'data:image/png;base64, ' + item.logo.base64"
                      />
                    </q-avatar>
                  </q-item-section>
                </div>
                <div class="col-8">
                  <p class="text-h6">{{ item.nome_fantasia }}</p>

                  <q-scroll-area style="height: 100%; width: 100%">
                    <p class="k-subtitle-page">{{ item.descricao }}</p>
                  </q-scroll-area>
                </div>

                <div class="col-2">
                  <div class="row justify-end" side top>
                    <q-btn
                      class="btn-edit-empresa float-right"
                      @click="visualizarEmpresa(item)"
                      dense
                      no-caps
                    >
                      Visualizar
                    </q-btn>
                  </div>
                </div>
              </div>
            </q-card>
          </q-item>
        </q-list>
      </div>
    </q-page>
  </q-layout>
</template>

<script>
import { useEmpresaStore } from "../../stores/empresa";
import { mapState } from "pinia";

export default {
  name: "ListaEmpresa",

  components: {},

  setup() {
    const empresaStore = useEmpresaStore();

    return { empresaStore };
  },

  data() {
    return {
      empresaGroup: [],
    };
  },

  watch: {},

  async mounted() {
    await this.empresaStore.loadEmpresas();
    this.empresaGroup = this.empresaStore.getEmpresas;
  },

  computed: {
    ...mapState(useEmpresaStore, ["empresa", "empresas"]),
  },

  methods: {
    onSubmit() {
      // console.log("hehe");
      this.empresaStore.addEmpresa(this.empresaObject);
    },

    visualizarEmpresa() {},
  },
};
</script>

<style>
.class-card {
  margin: 0 auto;
  max-width: 60%;
}
.btn-edit-empresa {
  width: 90px;
  background: #8c3f3c;
  color: white;
}
</style>
