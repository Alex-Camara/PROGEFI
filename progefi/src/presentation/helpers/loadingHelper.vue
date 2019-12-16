<template>
  <div>
    <div id="loading_modal" class="modal">
      <div class="modal-background"></div>
      <div class="modal-content">
        <div class="cp-spinner cp-flip"></div>
        <div>
          <p id="loading_text">Generando ficha de fotocolecta...</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import store from "../store/store.js";
import { mapState } from "vuex";

export default {
  data() {
    return {};
  },
  created() {
    store.watch(
      state => state.loading.active,
      (newValue, oldValue) => {
        if (newValue) {
          this.openModal();
        } else {
          this.closeModal();
        }
      }
    );
  },
  methods: {
    openModal() {
      var element = document.getElementById("loading_modal");
      element.classList.add("is-active");
    },
    closeModal() {
      var element = document.getElementById("loading_modal");
      element.classList.remove("is-active");
    }
  }
};
</script>

<style lang="scss">
.modal-content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

#loading_text {
  color: white;
  //text-align: center;
}

.cp-spinner {
  align-self: center;
  justify-self: center;
  width: 48px;
  height: 48px;
  display: inline-block;
  box-sizing: border-box;
  position: relative;
}
.cp-flip {
  transform-style: preserve-3d;
  perspective: 10em;
}
.cp-flip:before {
  width: 48px;
  height: 48px;
  display: inline-block;
  box-sizing: border-box;
  background: #f56151;
  content: " ";
  position: absolute;
  top: 0;
  left: 0;
  animation: cp-flip-animate-before 2s linear infinite;
}
@keyframes cp-flip-animate-before {
  0% {
    transform: rotateY(0) rotateX(0);
  }
  25% {
    transform: rotateY(360deg) rotateX(0);
  }
  50% {
    transform: rotateY(360deg) rotateX(360deg);
  }
  75% {
    transform: rotateY(0) rotateX(360deg);
  }
  100% {
    transform: rotateY(0) rotateX(0);
  }
}
</style>