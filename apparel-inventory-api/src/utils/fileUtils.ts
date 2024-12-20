import fs from 'fs/promises';
import path from 'path';
import { InventoryItem } from '../types';

const inventoryPath = path.join(__dirname, '../../data/inventory.json');

export const readInventory = async (): Promise<InventoryItem[]> => {
  try {
    const data = await fs.readFile(inventoryPath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading inventory:', error);
    return [];
  }
};

export const writeInventory = async (inventory: InventoryItem[]): Promise<void> => {
  try {
    await fs.writeFile(inventoryPath, JSON.stringify(inventory, null, 2));
  } catch (error) {
    console.error('Error writing inventory:', error);
  }
};

