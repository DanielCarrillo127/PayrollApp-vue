<template>
  <BasicLayout>
    <div class="payrolls">
      <h1>Mis nominas</h1>
      <UploadPayroll/>
      <PayrollList/>

    </div>
  </BasicLayout>
</template>

<script>
import BasicLayout from "../layouts/BasicLayaut.vue";
import { ref, onMounted } from "vue";
import UploadPayroll from "../components/Payrolls/UploadPayroll.vue"
import PayrollList from "../components/Payrolls/PayrollList.vue";


export default {
  name: "Payrolls",
  setup(){

  },
  components: {
    BasicLayout,
    UploadPayroll,
    PayrollList
  },
};
</script>

<style lang="scss" scoped>
.payrolls {
  margin: 50px 0;
  text-align: center;
}
</style>
