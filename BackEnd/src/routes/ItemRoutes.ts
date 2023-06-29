import express, { Router } from "express";
import ItemController from "../controllers/ItemController";

export default class ItemRoutes {
  private router: Router = express.Router();
  private routerController: ItemController = new ItemController();

  constructor() {
    this.configRoutes();
  }

  private configRoutes = (): void => {
    // POST /api/v1/item
    this.router.post("/", this.routerController.addNewItem);

    // GET /api/v1/item
    this.router.get("/", this.routerController.retrieveAllItem);

    // PUT /api/v1/item/:id
    this.router.put("/:id", this.routerController.updateItem);

    // DELETE /api/v1/item/:id
    this.router.delete("/:id", this.routerController.deleteItem);

    // GET /api/v1/item/serch/:id
    this.router.get("/:id", this.routerController.searchById);

    // GET /api/v1/item/search/:id
    this.router.get("/search/:id", this.routerController.searchItemId);
  };

  public getRouter = (): Router => {
    return this.router;
  };
}
