import { Request, Response } from 'express';
import { readInventory, writeInventory } from '../utils/fileUtils';
import { Apparel, Order, InventoryItem } from '../types';

export const updateApparel = async (req: Request, res: Response) => {
  try {
    const { code, size, quantity, price } = req.body;
    const inventory = await readInventory();

    const index = inventory.findIndex(item => item.code === code && item.size === size);
    if (index !== -1) {
      inventory[index].quantity = quantity;
      inventory[index].price = price;
    } else {
      inventory.push({ code, size, quantity, price });
    }

    await writeInventory(inventory);
    res.status(200).json({ message: 'Apparel updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const updateApparelBulk = async (req: Request, res: Response) => {
  try {
    const updates: Apparel[] = req.body;
    const inventory = await readInventory();

    updates.forEach(update => {
      const index = inventory.findIndex(item => item.code === update.code && item.size === update.size);
      if (index !== -1) {
        inventory[index].quantity = update.quantity;
        inventory[index].price = update.price;
      } else {
        inventory.push(update);
      }
    });

    await writeInventory(inventory);
    res.status(200).json({ message: 'Apparel updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const checkOrder = async (req: Request, res: Response) => {
  try {
    const order: Order = req.body;
    const inventory = await readInventory();

    const canFulfill = order.items.every(item => {
      const inventoryItem = inventory.find(invItem => invItem.code === item.code && invItem.size === item.size);
      return inventoryItem && inventoryItem.quantity >= item.quantity;
    });

    res.status(200).json({ canFulfill });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getOrderCost = async (req: Request, res: Response) => {
  try {
    const order: Order = req.body;
    const inventory = await readInventory();

    let totalCost = 0;
    let canFulfill = true;

    for (const item of order.items) {
      const inventoryItem = inventory.find(invItem => invItem.code === item.code && invItem.size === item.size);
      if (!inventoryItem || inventoryItem.quantity < item.quantity) {
        canFulfill = false;
        break;
      }
      totalCost += inventoryItem.price * item.quantity;
    }

    if (canFulfill) {
      res.status(200).json({ totalCost });
    } else {
      res.status(400).json({ error: 'Order cannot be fulfilled' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

