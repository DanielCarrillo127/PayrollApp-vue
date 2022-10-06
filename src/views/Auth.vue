<template>
  <div class="auth">
    <Login v-if="showLogin" :HandlerStateLogin="HandlerStateLogin"/>
    <Register v-if="!showLogin" :HandlerStateLogin="HandlerStateLogin"/>
  </div>
</template>

<script>
import {ref} from "vue"
import Login from "../components/Auth/Login.vue";
import Register from "../components/Auth/Register.vue";
export default {
  name: "Auth",
  setup() {
    let showLogin = ref(true);
    const HandlerStateLogin = () => {
        showLogin.value = !showLogin.value
    }
    return{
        showLogin,
        HandlerStateLogin
    }
  },
  components: {
    Login,
    Register,
  },
};
</script>

<style lang="scss" scoped>
.auth {
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: rgb(4, 78, 157);
  background: linear-gradient(
    0deg,
    rgba(4, 78, 157, 1) 0%,
    rgba(0, 174, 255, 1) 100%
  );
}
</style>
