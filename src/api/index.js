import * as label from "./modules/label";
import * as imgs from "./modules/imgs";

const apiObj = { label, imgs };

const install = function(Vue) {
  if (install.installed) return;
  install.installed = true;
  Object.defineProperties(Vue.prototype, {
    $apis: {
      get() {
        return apiObj;
      }
    }
  });
};
export default {
  install
};
