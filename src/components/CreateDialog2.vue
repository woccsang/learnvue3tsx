<template>
  <div>
    <Button type="primary" @click="showModal">
      Open Modal with async logic
    </Button>
    <Modal
      title="Title"
      v-model:visible="visible"
      :confirm-loading="confirmLoading"
      @ok="handleOk"
    >
      <p>{{ ModalText }}</p>
    </Modal>
  </div>
</template>
<script>
import { Button, Modal } from "ant-design-vue";
export default {
  data() {
    return {
      ModalText: "Content of the modal",
      visible: false,
      confirmLoading: false,
    };
  },
  components: {
    Button,
    Modal,
  },
  methods: {
    showModal() {
      this.visible = true;
    },
    handleOk() {
      this.ModalText = "The modal will be closed after two seconds";
      this.confirmLoading = true;
      setTimeout(() => {
        this.visible = false;
        this.confirmLoading = false;
      }, 2000);
    },
  },
};
</script>
