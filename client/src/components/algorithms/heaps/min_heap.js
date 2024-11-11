export const MinHeap = {

    heap: [],

    add(value) {

        alert(this.heap)

        const val = parseFloat(value)

        isNaN(val) ? this.heap.push(value) : this.heap.push(val)

        this.heapify_up();

        alert(this.heap)
    },

    remove(value) {

        alert(this.heap)

        const val = parseFloat(value)

        let valueIndex = -1; // Default -1 meaning it is not in the heap

        // Find the index of the value if exists -- Linear Search
        for (let i = 0; i < this.heap.length; i++) {

            // Found item
            if (Number(this.heap[i]) === val) {
                valueIndex = i;
                break;
            }
        }

        // Value is not in heap
        if (valueIndex < 0) {
            alert("Value not in heap")
            return;
        }

        // Put the value in the last index into this index
        this.heap[valueIndex] = this.heap[this.heap.length - 1];

        // Delete the last index
        this.heap.pop()

        // Heapify
        this.heapify_down();

        alert(this.heap)

    },

    clear() {
        alert("Clear")
    },

    heapify_up() {
        let curIndex = this.heap.length - 1; // Start from the last inserted element
        let parentIndex = Math.floor((curIndex - 1) / 2); // Parent index in a 0-based array

        // Bubble up while the heap property is violated
        while (curIndex > 0 && this.heap[parentIndex] > this.heap[curIndex]) {

            // Swap the parent and child
            [this.heap[curIndex], this.heap[parentIndex]] = [this.heap[parentIndex], this.heap[curIndex]];

            // Update current and parent indices
            curIndex = parentIndex;
            parentIndex = Math.floor((curIndex - 1) / 2);
        }
    },

    heapify_down() {
        let curIndex = 0;

        while (true) {
            let leftChildIndex = 2 * curIndex + 1;
            let rightChildIndex = 2 * curIndex + 2;
            let smallest = curIndex;

            // Check if left child exists and is smaller than the current node
            if (leftChildIndex < this.heap.length && this.heap[leftChildIndex] < this.heap[smallest]) {
                smallest = leftChildIndex;
            }

            // Check if right child exists and is smaller than the smallest value so far
            if (rightChildIndex < this.heap.length && this.heap[rightChildIndex] < this.heap[smallest]) {
                smallest = rightChildIndex;
            }

            // If the smallest value is the current index, the heap property is satisfied
            if (smallest === curIndex) break;

            // Swap the current index with the smallest child
            [this.heap[curIndex], this.heap[smallest]] = [this.heap[smallest], this.heap[curIndex]];

            // Move to the next index
            curIndex = smallest;
        }

    }
}