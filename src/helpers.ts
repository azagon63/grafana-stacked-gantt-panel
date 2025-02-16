// @ts-ignore
import { getColorForTheme, GrafanaTheme } from '@grafana/data';

const defaultColor = 'green';

export const labelColor = (
  label: string,
  theme: GrafanaTheme,
  colors?: Array<{ text: string; color: string }>
): string => {
  const mapping = (colors ?? []).find((col) => col.text === label);
  const color = mapping?.color ?? defaultColor;

  // Grafana 9.0.
  if (typeof theme.visualization !== 'undefined') {
    return theme.visualization.getColorByName(color);
  }

  return getColorForTheme(color, theme);
};


// Simple heap queue implementation to not change dependencies
export class PriorityQueue<T> {
  /**
   * @param isLowestToHighest If true, {@link poll} will return the item with
   * the lowest given value for "priority," Useful if your priorities are
   * actually costs. Defaults to false.
   */
  constructor(readonly isLowestToHighest: boolean = false) {}

  /**
   * The number of items in the queue
   */
  length = 0;

  /**
   * A heap sorted from highest to lowest number. If {@link isLowestToHighest}
   * is true, then we will multiply all given priorities by -1 before putting
   * them in this array, thus making it so we always sort from highest to lowest
   * internally.
   */
  private _priorities: number[] = [];

  /**
   * The heap datastructure that holds the actual data. The priority of each
   * entry is stored in the {@link _priorities} array at the same index.
   */
  private _data: T[] = [];

  /**
   * Add an element at a given priority to the queue, runs in O(log n) time.
   * @param priority The priority to add the element
   * @param item the item itself
   */
  add(priority: number, item: T) {
    const score = this.isLowestToHighest ? -priority : priority;

    const { _priorities: priorities, _data: data } = this;

    let i = this.length++;

    // shift data around to make room, note that this will implicitly expand the
    // arrays by writing to the end of them
    for (
      let parentI, parentPriority;
      i && (parentPriority = priorities[(parentI = (i - 1) >> 1)]) < score;
      i = parentI
    ) {
      priorities[i] = parentPriority;
      data[i] = data[parentI];
    }

    priorities[i] = score;
    data[i] = item;
  }

  /**
   * Returns the highest priority item without removing it from the queue, or
   * `undefined` if there is no data.
   */
  peek(): undefined | T {
    return this.length ? this._data[0] : undefined;
  }

  /**
   * Returns the priority of the next item to be returned from the queue.
   */
  peekPriority(): undefined | number {
    return this.length
      ? this.isLowestToHighest
        ? -this._priorities[0]
        : this._priorities[0]
      : undefined;
  }

  /**
   * Returns (and removes) the highest priority item from the heap.
   * Runs in O(log n) time.
   */
  poll(): undefined | T {
    const { length, _priorities: priorities, _data: data } = this;

    if (!length) { return; }

    if (length === 1) {
      this.length = 0;
      priorities.pop();
      return data.pop();
    }

    // there are multiple elements in the queue, so we need to re-sort the queue
    // after we remove the element.
    this.length = length - 1;

    const result = data[0];

    const poppedPriority = priorities.pop()!;
    const poppedItem = data.pop()!;

    const maxIndex = length - 2;

    let i = 0;
    let childI = 1;
    while (childI < maxIndex) {
      // to be in the loop means that childI is not the last index in the array,
      // and so we know it has a sibling next to it.

      let childPriority = priorities[childI];

      // go to the other sibling if it has a higher priority
      if (priorities[childI + 1] > childPriority) {
        childPriority = priorities[++childI];
      }

      // check to see if our popped element should be the parent of these two elements
      if (poppedPriority >= childPriority) {
        // the popped item has a higher prioirity than the child elements, so
        // break out of the loop and after-loop code set the data at index i to
        // the popped element
        childI = length;
      } else {
        // move the high-priority child up and continue the loop
        priorities[i] = childPriority;
        data[i] = data[childI];

        i = childI;
        childI = (childI << 1) | 1;
      }
    }

    // special case for if we ended the loop at a child without a sibling
    if (childI === maxIndex && priorities[childI] > poppedPriority) {
      priorities[i] = priorities[childI];
      data[i] = data[childI];
      i = childI;
    }

    priorities[i] = poppedPriority;
    data[i] = poppedItem;

    return result;
  }
}
