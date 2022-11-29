<template>
  <DialogEditItem
    @clickCancel="showDialogEdit = false"
    @saveClick="onSubmitEdit()"
    :show="showDialogEdit"
    :label="labelDialog"
  >
    <q-input :label="labelEdit" v-model="valueEdit" outlined />
  </DialogEditItem>
  <q-list>
    <q-item clickable v-ripple>
      <q-item-section avatar>
        <q-icon color="black" name="phone" />
      </q-item-section>

      <q-item-section>
        <q-item-label>Telefone</q-item-label>
        <q-item-label caption>{{ empresaObject.telefone }}</q-item-label>
      </q-item-section>
      <q-item-section>
        <div class="row justify-end">
          <q-btn
            @click="
              abrirDialogEdit('telefone', empresaObject.telefone, 'telefone')
            "
            no-caps
            class="btn-edit-empresa"
            dense
            label="Adicionar"
          />
        </div>
      </q-item-section>
    </q-item>

    <q-item clickable v-ripple>
      <q-item-section avatar>
        <q-icon color="black" name="language" />
      </q-item-section>

      <q-item-section>
        <q-item-label>Website</q-item-label>
        <q-item-label caption>{{ empresaObject.website }}</q-item-label>
      </q-item-section>
      <q-item-section>
        <div class="row justify-end">
          <q-btn
            @click="
              abrirDialogEdit('website', empresaObject.website, 'website')
            "
            no-caps
            class="btn-edit-empresa"
            dense
            label="Adicionar"
          />
        </div>
      </q-item-section>
    </q-item>

    <q-item clickable v-ripple>
      <q-item-section avatar>
        <q-icon color="black" name="location_on" />
      </q-item-section>

      <q-item-section>
        <q-item-label>Endereço</q-item-label>
        <q-item-label caption>{{
          empresaObject.endereco_comercial
        }}</q-item-label>
      </q-item-section>
      <q-item-section>
        <div class="row justify-end">
          <q-btn
            @click="
              abrirDialogEdit(
                'endereco_comercial',
                empresaObject.endereco_comercial,
                'endereço comercial'
              )
            "
            no-caps
            class="btn-edit-empresa"
            dense
            label="Adicionar"
          />
        </div>
      </q-item-section>
    </q-item>

    <q-item clickable v-ripple>
      <q-item-section avatar>
        <q-icon color="black" name="watch_later" />
      </q-item-section>

      <q-item-section>
        <q-item-label>Ano de criação</q-item-label>
        <q-item-label caption>{{ empresaObject.ano_fundacao }}</q-item-label>
      </q-item-section>
      <q-item-section>
        <div class="row justify-end">
          <q-btn
            @click="
              abrirDialogEdit(
                'ano_fundacao',
                empresaObject.ano_fundacao,
                'ano fundação'
              )
            "
            no-caps
            class="btn-edit-empresa"
            dense
            label="Adicionar"
          />
        </div>
      </q-item-section>
    </q-item>

    <q-item clickable v-ripple>
      <q-item-section avatar>
        <q-icon color="black" name="groups" />
      </q-item-section>

      <q-item-section>
        <q-item-label>Número de funcionários</q-item-label>
        <q-item-label caption>{{ empresaObject.empregados }}</q-item-label>
      </q-item-section>
      <q-item-section>
        <div class="row justify-end">
          <q-btn
            @click="
              abrirDialogEdit(
                'empregados',
                empresaObject.empregados,
                'empregados'
              )
            "
            no-caps
            class="btn-edit-empresa"
            dense
            label="Adicionar"
          />
        </div>
      </q-item-section>
    </q-item>

    <q-item clickable v-ripple>
      <q-item-section avatar>
        <q-icon color="black" name="badge" />
      </q-item-section>

      <q-item-section>
        <q-item-label>Número CNPJ</q-item-label>
        <q-item-label caption>{{ empresaObject.cnpj }}</q-item-label>
      </q-item-section>
      <q-item-section>
        <div class="row justify-end">
          <q-btn
            @click="abrirDialogEdit('cnpj', empresaObject.cnpj, 'cnpj')"
            no-caps
            class="btn-edit-empresa"
            dense
            label="Adicionar"
          />
        </div>
      </q-item-section>
    </q-item>
  </q-list>
</template>

<script>
import { useEmpresaStore } from "../stores/empresa";
import { mapState } from "pinia";

import DialogEditItem from "../components/DialogEditItem.vue";

export default {
  name: "QListitem",

  components: { DialogEditItem },

  props: {
    empresaObject: {
      type: Object,
      required: false,
    },
  },

  setup() {
    const empresaStore = useEmpresaStore();

    return { empresaStore };
  },
  data() {
    return {
      showDialogEdit: false,
      labelEdit: "",
      valueEdit: "",
      labelDialog: "",
    };
  },

  computed: {
    ...mapState(useEmpresaStore, ["empresa", "empresas"]),
  },

  methods: {
    abrirDialogEdit(label, value, name) {
      this.showDialogEdit = true;
      this.labelEdit = label;
      this.valueEdit = value;
      this.labelDialog = "Editar " + name;
    },

    async onSubmitEdit() {
      this.empresaStore.editEmpresa(
        this.montarObjectEdit(),
        this.empresaObject.id
      );

      await this.empresaStore.loadEmpresaById(this.empresaObject.id);

      this.showDialogEdit = false;
    },

    montarObjectEdit() {
      switch (this.labelEdit) {
        case "telefone":
          return { telefone: this.valueEdit };
        case "website":
          return { website: this.valueEdit };
        case "endereco_comercial":
          return { endereco_comercial: this.valueEdit };
        case "ano_fundacao":
          return { ano_fundacao: this.valueEdit };
        case "empregados":
          return { empregados: this.valueEdit };
        case "cnpj":
          return { cnpj: this.valueEdit };
      }
    },
  },
};
</script>

<style>
.btn-edit-empresa {
  width: 90px;
  background: #8c3f3c;
  color: white;
}
</style>
