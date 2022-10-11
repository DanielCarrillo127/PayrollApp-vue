<template>
  <div class="upload-payroll">
    <button class="ui button primary" @click="showCloseForm">
      Nueva nomina
    </button>

    <form
      class="ui form upload-payroll__form"
      :class="{ open: showForm }"
      @submit.prevent="handleUploadFile"
    >
      <div class="field">
        <label for="file" class="ui icon button">
          <i class="file icon" />
          Seleccionar nomina
          <span v-if="file">({{ file.name }})</span>
        </label>
        <input
          type="file"
          id="file"
          style="display: none"
          @change="uploadFile"
        />
      </div>
      <div class="field">
        <div class="ui calendar">
          <div class="ui input left icon">
            <input type="date" @change="changeDate" :value="date" />
          </div>
        </div>
      </div>

      <button class="ui button positive" :class="{ loading }">
        Subir nomina
      </button>

      <p v-if="error">{{ error }}</p>
    </form>
  </div>
</template>

<script>
import { ref } from "vue";
import { v4 as uuidv4 } from "uuid";
import { uploadFileStorage } from "../../utils/firebase";

export default {
  name: "UploadPayroll",
  props: { getPayrolls: Function },
  setup(props) {
    let showForm = ref(false);
    let file = ref(null);
    let date = ref(null);
    let loading = ref(false);
    let error = ref(null);

    const showCloseForm = () => {
      showForm.value = !showForm.value;
    };

    const changeDate = (e) => {
      date.value = e.target.value;
    };

    const uploadFile = (e) => {
      const fileTemp = e.target.files[0];
      error.value = null;
      if (fileTemp.type === "application/pdf") {
        file.value = fileTemp;
      } else {
        error.value = "Fichero no valido";
      }
    };

    const handleUploadFile = async () => {
      if (file.value && date.value) {
        loading.value = true;

        try {
          const fileId = uuidv4();
          await uploadFileStorage(file.value, fileId, date.value);
          props.getPayrolls();
        } catch (error) {
          console.log(error);
        }
        loading.value = false;
        file.value = null;
        date.value = null;
        showForm.value = false;
        error.value = null;
        document.getElementById("file").value = "";
      } else {
        error.value = "Sube una nomina y selecciona la fecha de la nomina";
      }
    };

    return {
      showCloseForm,
      handleUploadFile,
      changeDate,
      uploadFile,
      showForm,
      file,
      date,
      loading,
      error,
    };
  },
};
</script>

<style lang="scss" scoped>
.upload-payroll {
  > .ui.button.primary {
    margin-bottom: 30px;
  }
  &__form {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 0;
    overflow: hidden;
    transition: height 0.3s ease;
    &.open {
      height: 200px;
    }
  }
}
</style>
