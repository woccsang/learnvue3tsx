import { AxiosInstance } from "axios";
import { Store } from "vuex";

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $axios: AxiosInstance;
  }
}
declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $store: Store;
  }
}
