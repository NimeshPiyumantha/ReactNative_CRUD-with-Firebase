import { RequestHandler, Request, Response } from "express";
import mongoose, { ClientSession } from "mongoose";
import { Item } from "../models/Item";

export default class ItemController {
  addNewItem: RequestHandler = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    let session: ClientSession | null = null;

    try {
      const item = new Item(req.body);
      // save role details
      let newItem = await item.save();
      return res
        .status(200)
        .json({ message: "New Item created.", responseData: newItem });
    } catch (error: unknown) {
      if (session != null) {
      }

      if (error instanceof Error) {
        return res.status(500).json({ message: error.message });
      } else {
        return res.status(500).json({ message: "Unknown error occured." });
      }
    }
  };

  updateItem: RequestHandler = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    try {
      const { id } = req.params;
      let updatedItem = await Item.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      return res
        .status(200)
        .json({ message: "Item updated.", responseData: updatedItem });
    } catch (error: unknown) {
      if (error instanceof Error) {
        return res.status(500).json({ message: error.message });
      } else {
        return res.status(500).json({ message: "Unknown error occured." });
      }
    }
  };

  deleteItem: RequestHandler = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    try {
      const { id } = req.params;
      let deletedItem = await Item.findByIdAndDelete(id);

      if (!deletedItem) {
        throw new Error("Failed to delete Item.");
      }

      return res
        .status(200)
        .json({ message: "Item deleted.", responseData: deletedItem });
    } catch (error: unknown) {
      if (error instanceof Error) {
        return res.status(500).json({ message: error.message });
      } else {
        return res.status(500).json({ message: "Unknown error occured." });
      }
    }
  };

  retrieveAllItem: RequestHandler = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    try {
      const item = await Item.find();
      return res.status(200).json({ responseData: item });
    } catch (error: unknown) {
      if (error instanceof Error) {
        return res.status(500).json({ message: error.message });
      } else {
        return res.status(500).json({ message: "Unknown error occured." });
      }
    }
  };

  searchItemId: RequestHandler = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    try {
      const { id } = req.params;
      const item = await Item.find({
        $or: [{ id: id }, { name: id }, { qty: id }, { price: id }],
      });
      return res.status(200).json({ responseData: item });
    } catch (error: unknown) {
      if (error instanceof Error) {
        return res.status(500).json({ message: error.message });
      } else {
        return res.status(500).json({ message: "Unknown error occured." });
      }
    }
  };

  searchById: RequestHandler = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    try {
      const { id } = req.params;
      const items = await Item.findById(id);
      return res.status(200).json({ responseData: items });
    } catch (error: unknown) {
      if (error instanceof Error) {
        return res.status(500).json({ message: error.message });
      } else {
        return res.status(500).json({ message: "Unknown error occured." });
      }
    }
  };
}
