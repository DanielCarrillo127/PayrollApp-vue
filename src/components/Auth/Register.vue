<template>
  <div class="Register">
    <h1>Crear cuenta</h1>
    <form class="ui form" @submit.prevent="handlerRegister">
      <div class="field">
        <input
          type="text"
          placeholder="Correo electronico"
          v-model="formData.email"
          :class="{ error: formError.email }"
        />
      </div>
      <div class="field">
        <input
          type="password"
          placeholder="Contraseña"
          v-model="formData.password"
          :class="{ error: formError.password }"
        />
      </div>
      <div class="field">
        <input
          type="password"
          placeholder="Repetir contraseña"
          v-model="formData.repeatPassword"
          :class="{ error: formError.repeatPassword }"
        />
      </div>
      <button
        type="submit"
        class="ui button positive fluid"
        :class="{ loading }"
      >
        Registrarme
      </button>
    </form>
    <div class="back">
      <button class="ui button" @click="HandlerStateLogin">
        Ya tengo una cuenta
      </button>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import * as Yup from "yup";
import {auth,register} from "../../utils/firebase"


export default {
  name: "Register",
  props: {
    HandlerStateLogin: Function,
  },
  setup() {
    let formData = {};
    let formError = ref({});
    let loading = ref(false);

    const schemaForm = Yup.object().shape({
      email: Yup.string().email(true).required(true),
      password: Yup.string().required(true),
      repeatPassword: Yup.string()
        .required(true)
        .oneOf([Yup.ref("password")], true),
    });

    const handlerRegister = async () => {
      loading.value = true;
      formError.value = {};

      try {
        await schemaForm.validate(formData, { abortEarly: false });

        try {
          const {email,password} = formData;
          await register(email, password);
        } catch (error) {
          console.log(error);
        }
      } catch (err) {
        err.inner.forEach((error) => {
          formError.value[error.path] = error.message;
        });
      }
      loading.value = false;
    };

    return {
      handlerRegister,
      formData,
      formError,
      loading,
    };
  },
};
</script>

<style lang="scss" scoped>
.Register {
  background-color: #fff;
  padding: 30px;
  box-shadow: 0px 0px 38px -5px rgba(0, 0, 0, 0.45);
  width: 400px;
  border-radius: 10px;
  h1 {
    text-align: center;
    margin-bottom: 30px;
  }
  form {
    input.error {
      border-color: #faa;
      background-color: #ffeded;
    }
  }
  p {
    text-align: center;
    margin-top: 30px;
    &:hover {
      cursor: pointer;
      opacity: 0.6;
    }
  }
}
.back {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
}
</style>
