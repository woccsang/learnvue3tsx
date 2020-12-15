import { defineComponent, PropType } from "vue";
import { Modal, Form, Input} from 'ant-design-vue';
const CreateDialog = defineComponent({
  data() {
    return {
      form: {
        name: ''
      }
    }
  },
  emits: ['close'],
  props: {
    visible: {
      type: Boolean
    },
    onClose: { /// 重点
      type: Function as PropType<(e: MouseEvent) => void>,
    }
  },
  methods: {
    handleOk(e: MouseEvent) {
      this.$emit('close', e);
    },
    handleInput(e: MouseEvent) {
      const target = e.target as HTMLTextAreaElement
      this.form.name = target.value
    }
  },
  render() {
    return (
      <Modal visible={this.visible} title="增加学生信息" onOk={this.handleOk} onCancel={this.handleOk} closable = {true}>
        <Form
          name="basic"
          model={this.form}
          rules={{
            name: [{
              required: true, message: 'Please input Activity name'  // trigger:'blur' | 'change' 只能是这两个值
            }]
          }}
        >
          <Form.Item
            label="姓名"
            name='name'
            ref="name"
          >
            <Input value={this.form.name} onChange={this.handleInput} />
          </Form.Item>
        </Form>
      </Modal>
    )
  }
})
export default CreateDialog
