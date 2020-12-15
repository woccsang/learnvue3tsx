import { defineComponent } from "vue";
import { Layout, Menu } from 'ant-design-vue';
const { Header, Footer, Sider, Content } = Layout;
import './index.scss'

type menuEvent = Event & { key: string }

export default defineComponent({
  data() {
    return {
      selectKey: 'home'
    }
  },
  created() {
    console.log(this.$route)
    const path = this.$router.currentRoute.value.path
    this.selectKey = path.slice(1, path.length)
  },
  methods: {
    menuClick(e: menuEvent) {
      this.$router.push(`/${e.key}`)
    }
  },
  render() {
    const { $slots } = this
    return (
      <Layout class="page">
        <Sider>
          <Menu
            defaultSelectedKeys={[this.selectKey]}
            mode="inline"
            onClick={this.menuClick}
          >
            <Menu.Item key="home">新建相册</Menu.Item>
            <Menu.Item key="about">图片管理</Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Header>相片管理系统</Header>
          <Content>
            {
              $slots.default && $slots.default()
            }
          </Content>
          <Footer>demo@cripttype</Footer>
        </Layout>
      </Layout>
    )
  }
})
