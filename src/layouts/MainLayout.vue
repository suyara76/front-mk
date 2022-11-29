<template>
  <q-layout view="lHh Lpr lFf">
    <q-header bordered class="bg-white text-black">
      <q-toolbar class="header-color shadow-2 rounded-borders">
        <q-btn flat label="Make Events" />
        <q-space />

        <!--
        notice shrink property since we are placing it
        as child of QToolbar
      -->
        <q-tabs v-model="tab" shrink>
          <q-tab name="empresas" label="Empresas" @click="onRouter()" />
          <q-tab name="login" label="Login" @click="onRouter()" />

          <q-tab name="cadastro" label="Cadastra-se" @click="onRouter()" />
        </q-tabs>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { ref } from "vue";

export default {
  data() {
    return {
      tab: "",
    };
  },

  watch: {},

  methods: {
    onRouter() {
      if (this.tab === "empresas") {
        this.$router.push("/empresa/lista");
      }
      if (this.tab === "cadastro") {
        this.$router.push("/empresa/adicionar");
      }
      if (this.tab === "cadastro") {
        this.$router.push("/empresa/adicionar");
      }
    },
  },
};
</script>

<style>
.header-color {
  background: #8c3f3c;
  color: white;
}
</style>
