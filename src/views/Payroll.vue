<template>
  <BasicLayout>
    <div class="payrolls">
      <h1>Mis nominas</h1>
      <UploadPayroll :getPayrolls="getPayrolls"/>
      <PayrollList :payrolls="payrolls" :getPayrolls="getPayrolls" />
    </div>
  </BasicLayout>
</template>

<script>
import BasicLayout from "../layouts/BasicLayaut.vue";
import { ref, onMounted } from "vue";
import UploadPayroll from "../components/Payrolls/UploadPayroll.vue";
import PayrollList from "../components/Payrolls/PayrollList.vue";
import {getPayrollsFuntion } from "../utils/firebase";

export default {
  name: "Payrolls",
  setup() {
    let payrolls = ref(null);
    onMounted(() => {
      getPayrolls();
    });
    const getPayrolls = async () => {
      payrolls.value = await getPayrollsFuntion();
    };
    return {
      payrolls,
      getPayrolls,
    };
  },
  components: {
    BasicLayout,
    UploadPayroll,
    PayrollList,
  },
};
</script>

<style lang="scss" scoped>
.payrolls {
  margin: 50px 0;
  text-align: center;
}
</style>
