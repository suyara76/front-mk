<template>
  <q-layout view="lHh Lpr lFf">
    <q-page padding>
      <div class="class-card">
        <div class="q-pa-md text-h4 text-weight-bold">Cadastra-se</div>

        <q-form @submit="onSubmit">
          <div>
            <div class="row q-pa-md">
              <span class="q-pa-md text-weight-bold"> Logo </span>
              <div class="col-12 filezone">
                <input
                  type="file"
                  id="files"
                  ref="files"
                  v-on:change="handleFiles()"
                />
                <p>Arraste e solte <br />ou click para buscar</p>
                <div
                  v-for="(file, index) in files"
                  :key="index"
                  class="file-listing"
                >
                  <div class="row">
                    <div class="col-11">
                      <q-input
                        type="text"
                        v-model="file.name"
                        label=""
                        outlined
                        readonly
                      />
                      <!-- {{ file.name }} -->
                    </div>
                    <div class="col-1 remove-container">
                      <q-btn
                        flat
                        scratch
                        align="center"
                        color="black"
                        class="center"
                        icon="delete"
                        @click="removeFile(index)"
                      />
                    </div>
                  </div>
                </div>
                <div class="col-5 remove-container" v-if="files.length == 0">
                  Adicione arquivos menores que 2MB
                </div>
                <!-- <a class="submit-button" v-on:click="submitFiles()" v-show="files.length > 0">Submit</a> -->
              </div>
            </div>
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

  props: ["empresa_id"],

  components: {},

  setup() {
    const empresaStore = useEmpresaStore();
    const usuarioStore = useUsuarioStore();

    return { empresaStore, usuarioStore };
  },

  data() {
    return {
      empresaObject: {},

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

      fotosSelectAction: [],
      files: [],
    };
  },

  watch: {},

  async mounted() {
    await this.empresaStore.loadEmpresaById(this.empresa_id);
    this.empresaObject = this.empresaStore.getEmpresa;
  },

  computed: {
    ...mapState(useEmpresaStore, ["empresa", "empresas"]),
  },

  methods: {
    handleFiles() {
      let uploadedFiles = this.$refs.files.files;

      for (var i = 0; i < uploadedFiles.length; i++) {
        this.files.push(uploadedFiles[i]);
      }
      // this.getImagePreviews();
    },

    removeFile(key) {
      for (let i = 0; i < this.files.length; i++) {}
      this.files.splice(key, 1);
      // this.getImagePreviews();
    },

    async onSubmit() {
      const resposta = await this.empresaStore.editEmpresa(
        this.empresaObject,
        this.empresaObject.id
      );

      //   let dadosUsuario = {
      //     name: this.empresaObject.usuario_responsavel,
      //     email: this.empresaObject.email,
      //     empresa_id: resposta.data.id,
      //   };

      //   await this.usuarioStore.editUsuario(dadosUsuario);

      //   await this.empresaStore.addEmpresaServico({
      //     servicosIdGroup: this.servicosSelected,
      //     empresa_id: resposta.data.id,
      //   });
      if (this.files.length > 0) {
        console.log("teste");
        let config = {
          headers: {
            "Content-Type": "image/jpeg",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "POST",
          },
        };
        for (let i = 0; i < this.files.length; i++) {
          let formData = new FormData();
          formData.append("file", this.files[i]);
          let URI = `http://127.0.0.1:8000/api/foto/upload-logo-empresa/${this.empresa_id}`;
          let response = await this.$axios.post(URI, formData, config);
        }
      }

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

<style scoped>
input[type="file"] {
  opacity: 0;
  width: 100%;
  height: 200px;
  position: absolute;
  cursor: pointer;
}
.filezone {
  outline: 2px dashed #003758;
  outline-offset: -10px;
  background: white;
  color: black;
  padding: 10px 10px;
  min-height: 200px;
  position: relative;
  cursor: pointer;
}

.filezone p {
  font-size: 1.2em;
  text-align: center;
  padding: 50px 50px 50px 50px;
}
div.file-listing img {
  max-width: 90%;
}

div.file-listing {
  margin: auto;
  padding: 10px;
  border-bottom: 1px solid #ddd;
}

div.file-listing img {
  height: 100px;
}
div.success-container {
  text-align: center;
  color: green;
}

div.remove-container {
  text-align: center;
}

div.remove-container a {
  color: red;
  cursor: pointer;
}

a.submit-button {
  display: block;
  margin: auto;
  text-align: center;
  width: 200px;
  padding: 10px;
  text-transform: uppercase;
  background-color: #ccc;
  color: white;
  font-weight: bold;
  margin-top: 20px;
}
</style>
