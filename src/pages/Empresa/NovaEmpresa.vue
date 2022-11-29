<template>
  <q-layout view="lHh Lpr lFf">
    <q-page padding>
      <div class="class-card">
        <div class="q-pa-md text-h4 text-weight-bold">Cadastra-se</div>

        <q-form @submit="onSubmit">
          <div>
            <div class="row">
              <div class="col-8 q-pa-md">
                <q-input
                  outlined
                  v-model="empresaObject.nome"
                  label="Nome da empresa*"
                  lazy-rules
                  :rules="[
                    (val) => (val && val.length > 0) || 'Campo obrigatório*',
                  ]"
                />
              </div>
              <div class="col-4 q-pa-md">
                <q-input
                  outlined
                  v-model="empresaObject.nome_fantasia"
                  label="Nome fantasia*"
                  lazy-rules
                  :rules="[
                    (val) => (val && val.length > 0) || 'Campo obrigatório*',
                  ]"
                />
              </div>
            </div>

            <div class="row">
              <div class="col-8 q-pa-md">
                <q-input
                  outlined
                  v-model="empresaObject.usuario_responsavel"
                  label="Usuário Responsável*"
                  lazy-rules
                  :rules="[
                    (val) => (val && val.length > 0) || 'Campo obrigatório*',
                  ]"
                />
              </div>
              <div class="col-4 q-pa-md">
                <q-input
                  outlined
                  v-model="empresaObject.website"
                  label="Website"
                />
              </div>
            </div>

            <div class="row">
              <div class="col-8 q-pa-md">
                <q-input
                  outlined
                  v-model="empresaObject.endereco_comercial"
                  label="Endereço comercial*"
                  lazy-rules
                  :rules="[
                    (val) => (val && val.length > 0) || 'Campo obrigatório*',
                  ]"
                />
              </div>
              <div class="col-4 q-pa-md">
                <q-input
                  outlined
                  v-model="empresaObject.cep"
                  label="CEP*"
                  lazy-rules
                  :rules="[
                    (val) => (val && val.length > 0) || 'Campo obrigatório*',
                  ]"
                />
              </div>
            </div>

            <div class="row">
              <div class="col-8 q-pa-md">
                <q-input
                  outlined
                  v-model="empresaObject.email"
                  label="Email*"
                  lazy-rules
                  :rules="[
                    (val) => (val && val.length > 0) || 'Campo obrigatório*',
                  ]"
                />
              </div>
              <div class="col-4 q-pa-md">
                <q-input
                  outlined
                  v-model="empresaObject.telefone"
                  label="Telefone para contato*"
                  lazy-rules
                  :rules="[
                    (val) => (val && val.length > 0) || 'Campo obrigatório*',
                  ]"
                />
              </div>
            </div>

            <div class="row">
              <div class="col-4 q-pa-md">
                <q-input
                  outlined
                  v-model="empresaObject.cnpj"
                  label="CNPJ*"
                  lazy-rules
                  :rules="[
                    (val) => (val && val.length > 0) || 'Campo obrigatório*',
                  ]"
                />
              </div>

              <div class="col-4 q-pa-md">
                <q-input
                  outlined
                  v-model="empresaObject.ano_fundacao"
                  label="Ano da fundação*"
                  lazy-rules
                  :rules="[
                    (val) => (val && val.length > 0) || 'Campo obrigatório*',
                  ]"
                />
              </div>

              <div class="col-4 q-pa-md">
                <q-input
                  outlined
                  type="number"
                  v-model="empresaObject.empregados"
                  label="Quantidade empregados*"
                  lazy-rules
                  :rules="[
                    (val) => (val && val.length > 0) || 'Campo obrigatório*',
                  ]"
                />
              </div>
            </div>
            <div class="row">
              <div class="col-6 q-pa-md">
                <q-input
                  outlined
                  v-model="empresaObject.estado"
                  label="Estado*"
                  lazy-rules
                  :rules="[
                    (val) => (val && val.length > 0) || 'Campo obrigatório*',
                  ]"
                />
              </div>
              <div class="col-6 q-pa-md">
                <q-input
                  outlined
                  v-model="empresaObject.cidade"
                  label="Cidade*"
                  lazy-rules
                  :rules="[
                    (val) => (val && val.length > 0) || 'Campo obrigatório*',
                  ]"
                />
              </div>
            </div>

            <div class="row">
              <div class="col-12 q-pa-md">
                <q-select
                  label="Tipo de Serviço"
                  outlined
                  use-chips
                  use-input
                  multiple
                  input-debounce="0"
                  v-model="servicosSelected"
                  :options="servicosOptions"
                />
              </div>
            </div>

            <div class="row">
              <span class="q-pa-md text-weight-bold"> Descrição</span>
              <div class="col-12 q-pa-md">
                <q-input
                  v-model="empresaObject.descricao"
                  outlined
                  label="Descrição*"
                  lazy-rules
                  :rules="[
                    (val) => (val && val.length > 0) || 'Campo obrigatório*',
                  ]"
                  type="textarea"
                />
              </div>
            </div>

            <div class="row">
              <div class="col-12 q-pa-md q-gutter-sm">
                <q-btn align="center" type="submit" class="btn-fixed-width"
                  >Salvar</q-btn
                >
              </div>
            </div>
          </div>
        </q-form>
      </div>
    </q-page>
  </q-layout>
</template>

<script>
import { useEmpresaStore } from "../../stores/empresa";
import { useUsuarioStore } from "../../stores/usuario";
import { mapState } from "pinia";

export default {
  name: "NovaEmpresa",

  components: {},

  setup() {
    const empresaStore = useEmpresaStore();
    const usuarioStore = useUsuarioStore();

    return { empresaStore, usuarioStore };
  },

  data() {
    return {
      empresaObject: {
        nome: "",
        nome_fantasia: "",
        endereco_comercial: "",
        cep: "",
        email: "",
        telefone: "",
        cnpj: "",
        ano_fundacao: "",
        empregados: 0,
        cidade: "",
        estado: "",
      },

      servicosOptions: [
        {
          label: "Ornamentação",
          value: 1,
        },
        {
          label: "Espaço para aluguel",
          value: 2,
        },
        {
          label: "Buffet",
          value: 3,
        },
        {
          label: "Brinquedos para aluguel",
          value: 4,
        },
      ],

      servicosToFilter: [
        {
          label: "Ornamentação",
          value: 1,
        },
        {
          label: "Espaço para aluguel",
          value: 2,
        },
        {
          label: "Buffet",
          value: 3,
        },
        {
          label: "Brinquedos para aluguel",
          value: 4,
        },
      ],

      servicosSelected: [],
    };
  },

  watch: {},

  async mounted() {
    // this.servicosToFilter = { ...this.servicosOptions };
  },

  computed: {
    ...mapState(useEmpresaStore, ["empresa", "empresas"]),
  },

  methods: {
    async onSubmit() {
      const resposta = await this.empresaStore.addEmpresa(this.empresaObject);

      let dadosUsuario = {
        name: this.empresaObject.usuario_responsavel,
        email: this.empresaObject.email,
        empresa_id: resposta.data.id,
      };

      await this.usuarioStore.addUsuario(dadosUsuario);

      await this.empresaStore.addEmpresaServico({
        servicosIdGroup: this.servicosSelected,
        empresa_id: resposta.data.id,
      });

      this.$router.push("/empresa/lista");
    },

    filterServicos(val, update) {
      update(() => {
        if (val === "") {
          servicosOptions.value = servicosToFilter;
        } else {
          const needle = val.toLowerCase();
          servicosOptions.value = servicosToFilter.filter(
            (v) => v.toLowerCase().indexOf(needle) > -1
          );
        }
      });
    },
  },
};
</script>

<style>
.class-card {
  margin: 0 auto;
  width: 40%;
}
.btn-fixed-width {
  background-color: #75130f;
  color: white;
  width: 100%;
}
</style>
