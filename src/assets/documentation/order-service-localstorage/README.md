# Documentation for `OrderService` and its Usage

## `OrderService`

The `OrderService` is a utility service designed to manage the ordering of items and persist this order across sessions by saving it to `localStorage`. It is generic, meaning it can be used with any array of objects, not just blogs, as long as the objects have a unique identifier.

### Methods:

1. `applySavedOrder<T>(items: T[], storageKey: string, idKey: keyof T): T[]`
   - **Description**: This method applies a saved order from `localStorage` to an array of items. It reorders the items based on the saved index values stored under a specific key in `localStorage`.
   - **Parameters**:
     - `items`: The array of items to reorder.
     - `storageKey`: The key under which the order is stored in `localStorage`.
     - `idKey`: The key in the items that represents the unique identifier (e.g., `id`, `_id`).
   - **Returns**: The reordered array of items.
   - **Example Usage**:
      ```typescript
      const orderedBlogs = this._orderService.applySavedOrder(this.blog, 'blogStorage', '_id');
      ```
2. `saveOrderToLocalStorage<T>(items: T[], storageKey: string, idKey: keyof T): void`
   - **Description**: This method saves the current order of an array to `localStorage`, allowing it to be restored later. It maps each item to its index and saves this mapping.
   - **Parameters**:
     - `items`: The array of items to save.
     - `storageKey`: The key under which to store the order in `localStorage`.
     - `idKey`: The key in the items that represents the unique identifier.
   - **Returns**: `void`.
   - **Example Usage**:
      ```typescript
      this._orderService.saveOrderToLocalStorage(this.blog, 'blogOrder', '_id');
      ```
3. `clearOrderFromLocalStorage(storageKey: string): void`
  - **Description**: This method removes a saved order from `localStorage` under the specified key.
  - **Parameters**:
    - `storageKey`: The key under which the order is stored in `localStorage`.
  - **Returns**: `void`.
  - **Example Usage**:
     ```typescript
     this._orderService.clearOrderFromLocalStorage('blogOrder');
     ```
