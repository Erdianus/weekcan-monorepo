import { router } from "react-query-kit";

import item from "./item";
import warehouse from "./warehouse";

const inventory = router("inventory", {
  item,
  warehouse,
});

export default inventory;
