import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  /**
   * Generic function to apply saved order to an array of items.
   * @param items The array of items to reorder.
   * @param storageKey The key under which the order is stored in localStorage.
   * @param idKey The key to identify the unique ID in the item object.
   * @returns The reordered array.
   */
  applySavedBlogOrder<T>(items: T[], storageKey: string, idKey: keyof T) {
    const savedOrder = localStorage.getItem(storageKey)
    if (savedOrder) {
      const itemOrder = JSON.parse(savedOrder) as { id: string, index: number }[]
      return items.sort((a, b) => {
        const orderA = itemOrder.find(order => order.id === a[idKey])?.index ?? 0
        const orderB = itemOrder.find(order => order.id === b[idKey])?.index ?? 0
        return orderA - orderB
      })
    }
    return items // Return the original order if no saved order exists
  }

  /**
   * Save the order of any array to localStorage with the specified key.
   * @param items The array of items to save.
   * @param storageKey The key under which to store the order in localStorage.
   * @param idKey The key in the items that represents the unique identifier.
   */
  saveOrderToLocalStorage<T>(items: T[], storageKey: string, idKey: keyof T): void {
    const itemOrder = items.map((item, index) => ({ id: item[idKey], index }))
    localStorage.setItem(storageKey, JSON.stringify(itemOrder))
  }

  // Remove all order from localStorage
  clearBlogsFromLocalStorage(storageKey: string) {
    if (confirm(`Reset order for: ${storageKey}`))
      localStorage.removeItem(storageKey)
  }
}
