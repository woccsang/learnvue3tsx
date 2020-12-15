import { defineComponent } from "vue";
import { Button } from 'ant-design-vue';
import StudentList from '@/components/StudentList.vue';
import CreateDialog from '@/components/CreateDialog';
import CreateDialog2 from '@/components/CreateDialog2.vue';
import Layout from '@/layouts/BaseLayouts'

export default defineComponent({
  name: "Home",
  data() {
    return {
      visible: false
    }
  },
  methods: {
    showCreateDialog() {
      this.visible = !this.visible
    }
  },
  render() {
    return (
      <Layout>
        <Button onClick={this.showCreateDialog}>新建接待</Button>
        {<CreateDialog visible={this.visible} onClose={() => { this.visible = false }}></CreateDialog>}
        <StudentList></StudentList>
      </Layout>
    )
  }
});
