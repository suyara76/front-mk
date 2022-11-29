<template>
  <div>
    <!-- Dialog Erro -->
    <q-dialog v-model="internal_show" persistent>
      <q-card style="color: #8c3f3c; width: 100%">
        <!-- Título -->
        <q-card-section style="background: #8c3f3c" class="text-white col-12">
          <div class="row">
            <div class="text-h6">
              <q-avatar icon="info" text-color="white" />{{ label }}
            </div>
          </div>
        </q-card-section>

        <!-- Conteúdo -->
        <q-card-section class="row">
          <span class="col-12">
            <slot></slot>
          </span>
        </q-card-section>

        <!-- Botões de Ação -->
        <q-card-actions align="right">
          <q-btn
            @click="clickCancel"
            label="Cancelar"
            class="btn-cancel-empresa"
            v-close-popup
            outline
          />
          <q-btn
            class="btn-save-empresa"
            @click.prevent.stop="saveClick"
            @click="Click"
            v-close-popup
            outeline
            label="Confirmar"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
export default {
  name: "DialogEditItem",
  props: ["show", "label"],
  data() {
    return {
      internal_show: false,
    };
  },
  watch: {
    show() {
      this.internal_show = this.show;
    },
    internal_show() {
      if (!this.internal_show) {
        this.$emit("close");
      }
    },
  },
  methods: {
    saveClick() {
      this.$emit("saveClick", true);
    },

    clickCancel() {
      this.$emit("clickCancel", true);
    },

    Click() {
      this.$emit("Click", true);
    },
  },
};
</script>

<style>
.btn-save-empresa {
  width: 150px;
  background: #8c3f3c;
  color: white;
}
.btn-cancel-empresa {
  width: 150px;
  color: #8c3f3c;
}
</style>
