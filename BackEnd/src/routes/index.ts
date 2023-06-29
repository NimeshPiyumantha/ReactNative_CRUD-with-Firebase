import { Router } from "express";
import UserRoutes from "./UserRoutes";
import ItemRoutes from "./ItemRoutes";

const router: Router = Router();
const url_prefix = "/api/v1";

router.use(`${url_prefix}/user`, new UserRoutes().getRouter());
router.use(`${url_prefix}/item`, new ItemRoutes().getRouter());

export default router;
