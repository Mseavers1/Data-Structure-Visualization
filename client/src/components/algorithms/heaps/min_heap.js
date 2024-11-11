export const MinHeap = {

    heap: [],
    canvasRef: null,

    add(value) {

        const val = parseFloat(value)

        isNaN(val) ? this.heap.push(value) : this.heap.push(val)

        this.heapify_up();

        this.drawHeap();
    },

    remove(value) {

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

        this.drawHeap();

    },

    clear() {
        this.heap = []
        this.drawHeap();
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

    },

    setCanvasRef(canvasRef) {
        this.canvasRef = canvasRef;
    },

    // Helper function to draw the heap on canvas
    drawHeap() {
        if (!this.canvasRef) return;

        const canvas = this.canvasRef;
        const ctx = canvas.getContext('2d');

        const levelHeight = 80;  // Vertical space between levels
        const nodeRadius = 20;   // Radius of each node
        const horizontalSpacing = 100;  // Horizontal space between nodes

        ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas

        // Draw a line between two points
        const drawLine = (x1, y1, x2, y2) => {
            ctx.beginPath();
            ctx.moveTo(x1, y1);
            ctx.lineTo(x2, y2);
            ctx.stroke();
        };

        // Draw a single node
        const drawNode = (x, y, value) => {
            ctx.beginPath();
            ctx.arc(x, y, nodeRadius, 0, Math.PI * 2);
            ctx.fillStyle = 'lightblue';
            ctx.fill();
            ctx.stroke();
            ctx.fillStyle = 'black';
            ctx.fillText(value, x - nodeRadius / 2, y + 5);
        };

        // Helper function to recursively draw the tree
        const drawTree = (index, x, y, level) => {
            if (index >= this.heap.length) return;

            // Draw lines (edges) first, then draw nodes (circles) on top
            const leftChildIndex = 2 * index + 1;
            const rightChildIndex = 2 * index + 2;

            if (leftChildIndex < this.heap.length) {
                const leftX = x - horizontalSpacing / Math.pow(2, level);
                const leftY = y + levelHeight;
                drawLine(x, y, leftX, leftY); // Draw line first
                drawTree(leftChildIndex, leftX, leftY, level + 1);
            }

            if (rightChildIndex < this.heap.length) {
                const rightX = x + horizontalSpacing / Math.pow(2, level);
                const rightY = y + levelHeight;
                drawLine(x, y, rightX, rightY); // Draw line first
                drawTree(rightChildIndex, rightX, rightY, level + 1);
            }

            // Now draw the node itself on top of the lines
            drawNode(x, y, this.heap[index]);
        };

        // Draw the heap starting from the root (index 0)
        if (this.heap.length > 0) {
            drawTree(0, canvas.width / 2, 50, 1); // Start from top-center of the canvas
        }
    }

}
