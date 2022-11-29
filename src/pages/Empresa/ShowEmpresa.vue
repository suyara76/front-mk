<template>
  <div class="q-pa-md">
    <div class="margin-card">
      <q-card class="class-card" bordered>
        <q-card-section>
          <div class="row">
            <div class="col-2">
              <q-item-section top avatar>
                <q-avatar size="100px" font-size="82px">
                  <img
                    :src="
                      'data:image/png;base64, ' +
                      empresaStore.empresa.logo.base64
                    "
                  />
                </q-avatar>
              </q-item-section>
            </div>
            <div class="col-8">
              <div class="text-h6">
                {{ empresaStore.empresa.nome_fantasia }}
              </div>
              <div class="text-subtitle2">Perfil Verificado</div>
            </div>
            <div class="col-2 absolut-center">
              <q-btn
                no-caps
                class="btn-edit-empresa float-right"
                dense
                label="Editar"
                @click="onRouter()"
              />
            </div>
          </div>
        </q-card-section>

        <q-separator />

        <q-card-section>
          <QListItem :empresaObject="empresaStore.empresa"></QListItem>
        </q-card-section>
      </q-card>
    </div>

    <q-card class="q-mt-md class-card" bordered>
      <q-card-section>
        <div class="row q-pa-md">
          <div class="text-h6">Fotos</div>
          <div class="text-subtitle2">
            Inclua imagens de seu trabalho, fotos de antes e depois, sua equipe,
            do seu espaço de trabalho ou de seus equipamentos e materiais
          </div>
        </div>
        <div class="q-gutter-sm row items-center">
          <div
            v-for="(item, index) in empresaStore.getFotosEmpresa"
            :key="index"
          >
            <q-checkbox
              v-model="fotosSelectAction"
              :val="item.foto_id"
              color="black"
            />
            <img
              :src="'data:image/png;base64, ' + item.base64"
              style="height: 160px; width: 180px"
            />
          </div>
        </div>
        <div class="row q-pa-md" v-if="fotosSelectAction.length > 0">
          <div class="col-12 absolut-center">
            <q-btn
              no-caps
              class="btn-edit-empresa float-right"
              dense
              icon="delete"
              @click="deletarImagens()"
            />
          </div>
        </div>

        <div class="row q-pa-md">
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
        <!-- <UploadFiles
          :lista="files"
          @change="
            (lista) => {
              files = lista;
            }
          "
        /> -->
        <div class="row q-pa-md">
          <div class="col-12 absolut-center">
            <q-btn
              no-caps
              class="btn-edit-empresa float-right"
              dense
              @click="onSubmit()"
              label="Adicionar"
            />
          </div>
        </div>
      </q-card-section>

      <q-separator />
    </q-card>
  </div>
</template>

<script>
import { useEmpresaStore } from "../../stores/empresa";
import { mapState } from "pinia";
import QListItem from "../../components/QListItem.vue";

export default {
  name: "ShowEmpresa",

  props: ["empresa_id"],

  components: { QListItem },

  setup() {
    const empresaStore = useEmpresaStore();

    return { empresaStore };
  },

  data() {
    return {
      empresaObject: {
        nome: "",
        endereco_comercial: "",
        email: "",
        telefone: "",
        cnpj: "",
        ano_fundacao: "",
        senha: "",
      },

      senha_confirma: "",

      files: [],
      fotosSelectAction: [],
    };
  },

  watch: {},

  async mounted() {
    await this.empresaStore.loadEmpresaById(this.empresa_id);
    this.empresaObject = this.empresaStore.getEmpresa;

    await this.empresaStore.loadFotosEmpresa(this.empresa_id);
  },

  computed: {
    ...mapState(useEmpresaStore, ["empresa", "empresas", "fotosEmpresa"]),
  },

  methods: {
    async deletarImagens() {
      for (let index = 0; index < this.fotosSelectAction.length; index++) {
        const element = this.fotosSelectAction[index];
        await this.empresaStore.deleteFotoEmpresa(element);
      }

      await this.empresaStore.loadFotosEmpresa(this.empresa_id);

      this.fotosSelectAction = [];
    },

    async onSubmit() {
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
          let URI = `http://127.0.0.1:8000/api/empresa/upload-foto/${this.empresa_id}`;
          let response = await this.$axios.post(URI, formData, config);
        }
      }

      await this.empresaStore.loadFotosEmpresa(this.empresa_id);

      this.files = [];
    },

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

    onRouter() {
      this.$router.push("/empresa/editar/" + this.empresa_id);
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
.class-card {
  margin: 0 auto;
  width: 800px;
}

.margin-card {
  margin: 3% 0px 3% 0px;
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
