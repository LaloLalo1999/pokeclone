import { ID, Item, PokeballItem, PotionItem, ReviveItem } from "../types";

export const ITEMS: Record<ID, Item> = {
  potion: {
    id: "potion",
    name: "Potion",
    kind: "potion",
    healAmount: 20,
    description: "Restores 20 HP.",
    price: 300,
  } as PotionItem,
  super_potion: {
    id: "super_potion",
    name: "Super Potion",
    kind: "potion",
    healAmount: 50,
    description: "Restores 50 HP.",
    price: 700,
  } as PotionItem,
  revive: {
    id: "revive",
    name: "Revive",
    kind: "revive",
    revivePercent: 0.5,
    description: "Revives a fainted creature with half HP.",
    price: 1500,
  } as ReviveItem,
  pokeball: {
    id: "pokeball",
    name: "Pokeball",
    kind: "pokeball",
    catchModifier: 1,
    description: "A device for catching wild creatures.",
    price: 200,
  } as PokeballItem,
  greatball: {
    id: "greatball",
    name: "Great Ball",
    kind: "pokeball",
    catchModifier: 1.5,
    description: "A good, high-performance Ball.",
    price: 600,
  } as PokeballItem,
};

export const SHOP_STOCK: Array<{ itemId: ID; price: number }> = [
  { itemId: "potion", price: 300 },
  { itemId: "super_potion", price: 700 },
  { itemId: "revive", price: 1500 },
  { itemId: "pokeball", price: 200 },
  { itemId: "greatball", price: 600 },
];
