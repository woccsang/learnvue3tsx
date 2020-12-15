import { createStore } from "vuex";

type student = {
  id: string;
  name: string;
  phone: number;
  infor?: string;
  sex: string;
  level: number;
};

interface StudentState {
  studentList: student[];
}
const StudentState: StudentState = {
  studentList: [
    {
      id: "1",
      name: "John Brown",
      phone: 32,
      infor: "New York No. 1 Lake Park",
      level: 1,
      sex: "男"
    }
  ]
};
export default createStore({
  state: StudentState,
  mutations: {
    addStudent(state, payload) {
      state.studentList.push(payload);
    },
    deleteStudent(state, payload) {
      state.studentList.filter(item => item.id != payload.id);
    }
  },
  actions: {},
  modules: {}
});
