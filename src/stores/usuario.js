import { defineStore } from "pinia";
import { api } from "../boot/axios";

export const useUsuarioStore = defineStore("usuarioStore", {
  state: () => ({
    usuario: {},
    usuarios: [],
    loading: false,
    error: null,
  }),

  actions: {
    ["addUsuario"](usuarioObject) {
      return new Promise((resolve, reject) => {
        this.loading = true;

        const dados = {
          ...usuarioObject,
        };

        api
          .post("/user", dados)
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

    ["editUsuario"](usuarioObject, id) {
      return new Promise((resolve, reject) => {
        this.loading = true;

        const dados = { ...usuarioObject };

        api
          .put(`/user/${id}`, dados)
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

    ["loadUsuarioById"](usuario_id) {
      return new Promise((resolve, reject) => {
        this.loading = true;

        api
          .get(`/user/${usuario_id}`)
          .then((data) => {
            this.usuario = data.data;
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

    ["loadUsuarios"]() {
      return new Promise((resolve, reject) => {
        this.loading = true;

        api
          .get(`/user`)
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
  },

  getters: {
    getUsuario(state) {
      return { ...state.usuario };
    },

    getUsuarios(state) {
      let usuariosGroup = state.usuarios.map((item) => {
        return item;
      });

      return { ...usuariosGroup };
    },
  },
});
