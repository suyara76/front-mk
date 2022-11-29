import { defineStore } from "pinia";
import { api } from "../boot/axios";

export const useEmpresaStore = defineStore("empresaStore", {
  state: () => ({
    empresa: {},
    empresas: [],
    fotosEmpresa: [],
    loading: false,
    error: null,
  }),

  actions: {
    ["addEmpresa"](empresaObject) {
      return new Promise((resolve, reject) => {
        this.loading = true;

        const dados = {
          ...empresaObject,
        };

        api
          .post("/empresa", dados)
          .then((data) => {
            resolve(data);
          })
          .catch((error) => {
            this.error = error;
            reject(error);
          })
          .finally(() => {
            this.loading = false;
          });
      });
    },

    ["addEmpresaServico"](empresaServicoObject) {
      return new Promise((resolve, reject) => {
        this.loading = true;

        const dados = {
          servicos: empresaServicoObject.servicosIdGroup,
        };

        api
          .post(
            `/empresa/vincular-tipo-servico/${empresaServicoObject.empresa_id}`,
            dados
          )
          .then((data) => {
            resolve(data);
          })
          .catch((error) => {
            this.error = error;
            reject(error);
          })
          .finally(() => {
            this.loading = false;
          });
      });
    },

    ["editEmpresa"](empresaOject, id) {
      return new Promise((resolve, reject) => {
        this.loading = true;

        const dados = { ...empresaOject };

        api
          .put(`/empresa/${id}`, dados)
          .then((data) => {
            resolve(data);
          })
          .catch((error) => {
            this.error = error;
            reject(error);
          })
          .finally(() => {
            this.loading = false;
          });
      });
    },

    ["deleteFotoEmpresa"](id) {
      return new Promise((resolve, reject) => {
        this.loading = true;

        api
          .delete(`/empresa/delete-fotos/${id}`)
          .then((data) => {
            resolve(data);
          })
          .catch((error) => {
            this.error = error;
            reject(error);
          })
          .finally(() => {
            this.loading = false;
          });
      });
    },

    ["loadEmpresaById"](empresa_id) {
      return new Promise((resolve, reject) => {
        this.loading = true;

        api
          .get(`/empresa/${empresa_id}`)
          .then((data) => {
            this.empresa = data.data;
            resolve(data);
          })
          .catch((error) => {
            this.error = error;
            reject(error);
          })
          .finally(() => {
            this.loading = false;
          });
      });
    },

    ["loadEmpresas"]() {
      return new Promise((resolve, reject) => {
        this.loading = true;

        api
          .get(`/empresa`)
          .then((data) => {
            this.empresas = data.data;
            resolve(data);
          })
          .catch((error) => {
            this.error = error;
            reject(error);
          })
          .finally(() => {
            this.loading = false;
          });
      });
    },

    ["loadFotosEmpresa"](empresa_id) {
      return new Promise((resolve, reject) => {
        this.loading = true;

        console.log("antes");
        api
          .get(`/empresa/carregar-fotos-empresas/${empresa_id}`)
          .then((data) => {
            this.fotosEmpresa = data.data;
            resolve();
          })
          .catch((error) => {
            this.error = error;
            reject();
          })
          .finally(() => {
            this.loading = false;
          });
      });
    },
  },

  getters: {
    getEmpresa(state) {
      return { ...state.empresa };
    },

    getEmpresas(state) {
      let empresasGroup = state.empresas.map((item) => {
        return item;
      });

      return [...empresasGroup];
    },

    getFotosEmpresa(state) {
      let fotosEmpresaGroup =
        state.fotosEmpresa.length > 0
          ? state.fotosEmpresa.map((item) => {
              return item;
            })
          : [];

      return [...fotosEmpresaGroup];
    },
  },
});
