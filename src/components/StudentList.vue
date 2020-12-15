<template>
  <Table :columns="columns" :data-source="data" rowKey="id">
    <template #name="{ text }">
      <a>{{ text }}</a>
    </template>
    <template #customTitle>
      <span><smile-outlined /> 姓名</span>
    </template>
  </Table>
</template>
<script lang='ts'>
import { Table } from "ant-design-vue";
import { defineComponent } from "vue";
import { SmileOutlined } from "@ant-design/icons-vue";
const columns = [
  {
    title: "学号",
    key: "id",
    dataIndex: "id"
  },
  {
    dataIndex: "name",
    key: "name",
    slots: { title: "customTitle", customRender: "name" },
  },

  {
    title: "性别",
    dataIndex: "sex",
    key: "sex",
  },
  {
    title: "手机",
    dataIndex: "phone",
    key: "phone",
  },
  {
    title: "说明",
    dataIndex: "infor",
    key: "infor",
  }
];

export default defineComponent({
  components: {
    SmileOutlined,
    Table,
  },
  data() {
    return {
      data: [],
      columns,
    };
  },
  mounted() {
    this.data = this.$store.state.studentList;
  },
});
</script>
