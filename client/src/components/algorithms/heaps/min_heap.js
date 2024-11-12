export const MinHeap = {

    heap: [],
    canvasRef: null,
    max_size: 62,
    is_swapping: false,

    add(value) {

        if (this.heap.length > this.max_size || value === "") return;

        const val = parseFloat(value)

        isNaN(val) ? this.heap.push(value) : this.heap.push(val)

        this.draw();

        this.heapify_up ().then (r  =>  this.draw());
    },

    animateSwap(index1, index2) {
        return new Promise((resolve) => {
            this.is_swapping = true;

            const getNodePosition = (index, x = this.canvasRef.width / 2, y = 120) => {
                const levelHeight = 80;
                const horizontalSpacing = 1000;
                const level = Math.floor(Math.log2(index + 1))

                // Base case for root node
                if (index === 0) return { x, y };

                // Calculate the parent index
                const parentIndex = Math.floor((index - 1) / 2);

                // Recursively get the position of the parent node
                const parentPos = getNodePosition(parentIndex, x, y);

                // Calculate the new x, y positions for the current node
                const newX = parentPos.x + (index % 2 === 1 ? -horizontalSpacing / Math.pow(2, level) : horizontalSpacing / Math.pow(2, level));
                const newY = parentPos.y + levelHeight;

                return { x: newX, y: newY };
            };

            if (!this.canvasRef) return;

            const canvas = this.canvasRef;
            const ctx = canvas.getContext('2d');

            const index1Value = this.heap[index1];
            const index2Value = this.heap[index2];

            const index1Pos = getNodePosition(index1);
            const index2Pos = getNodePosition(index2);

            let x1 = index1Pos.x, y1 = index1Pos.y;
            let x2 = index2Pos.x, y2 = index2Pos.y;

            const speed = 200;

            const stepX1 = (index2Pos.x - index1Pos.x) / speed;
            const stepY1 = (index2Pos.y - index1Pos.y) / speed;
            const stepX2 = (index1Pos.x - index2Pos.x) / speed;
            const stepY2 = (index1Pos.y - index2Pos.y) / speed;

            const animate = () => {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                this.draw();

                drawNode(ctx, index1Pos.x, index1Pos.y, "");
                drawNode(ctx, index2Pos.x, index2Pos.y, "");

                drawNode(ctx, x1, y1, index1Value);
                drawNode(ctx, x2, y2, index2Value);

                x1 += stepX1;
                y1 += stepY1;
                x2 += stepX2;
                y2 += stepY2;

                const hasReachedTarget1 = Math.abs(x1 - index2Pos.x) < Math.abs(stepX1) && Math.abs(y1 - index2Pos.y) < Math.abs(stepY1);
                const hasReachedTarget2 = Math.abs(x2 - index1Pos.x) < Math.abs(stepX2) && Math.abs(y2 - index1Pos.y) < Math.abs(stepY2);

                if (!hasReachedTarget1 || !hasReachedTarget2) {
                    requestAnimationFrame(animate);
                } else {
                    // Final position adjustments
                    drawNode(ctx, index2Pos.x, index2Pos.y, index1Value);
                    drawNode(ctx, index1Pos.x, index1Pos.y, index2Value);

                    // Complete the swap and resolve the promise
                    this.is_swapping = false;
                    resolve();
                    this.draw()
                }
            };

            animate();
        });
    },


    remove(value) {

        if (this.heap.length <= 0 || value === "") return;

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

        this.animateSwap (valueIndex, this.heap.length - 1).then (r  => {
            // Put the value in the last index into this index
            this.heap[valueIndex] = this.heap[this.heap.length - 1];

            // Delete the last index
            this.heap.pop()

            // Heapify
            this.heapify_down ().then (r  =>  this.draw());
        })
    },

    clear() {
        this.heap = []
        this.draw();
    },

    async heapify_up(curIndex = this.heap.length - 1) {
        if (curIndex <= 0) return;  // Base case: we're at the root, so stop

        let parentIndex = Math.floor((curIndex - 1) / 2); // Parent index in a 0-based array

        // If heap property is violated, animate and swap
        if (this.heap[parentIndex] > this.heap[curIndex]) {
            // Wait for the swap animation to complete before continuing
            await this.animateSwap(parentIndex, curIndex);

            // Swap the parent and child
            [this.heap[curIndex], this.heap[parentIndex]] = [this.heap[parentIndex], this.heap[curIndex]];

            // Continue bubbling up recursively
            await this.heapify_up(parentIndex);
        }
    },

    async heapify_down(curIndex = 0) {
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

        // If the smallest value is the current index, the heap property is satisfied, so stop
        if (smallest === curIndex) return;

        // Await the animation before swapping
        await this.animateSwap(curIndex, smallest);

        // Swap the current index with the smallest child
        [this.heap[curIndex], this.heap[smallest]] = [this.heap[smallest], this.heap[curIndex]];

        // Recursively call heapify_down on the new smallest child index
        await this.heapify_down(smallest);
    },

    setCanvasRef(canvasRef) {
        this.canvasRef = canvasRef;
    },

    draw() {
        if (!this.canvasRef) return;

        const canvas = this.canvasRef;
        const ctx = canvas.getContext('2d');

        const levelHeight = 80;  // Vertical space between levels
        const horizontalSpacing = 1000;  // Horizontal space between nodes

        ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas

        // Draw the array first
        this.drawArray();

        // Draw the heap starting from the root (index 0)
        if (this.heap.length > 0) {
            drawTree(ctx, horizontalSpacing, levelHeight,0, canvas.width / 2, 120, 1); // Start drawing tree below the array
        }
    },

    drawArray() {
        const nilText = 'nil';  // The value for empty slots
        const yPosition = 40;  // Position the array text just above the tree (adjust as needed)
        const padding = 2;  // Smaller padding between the boxes
        const boxHeight = 30;  // Height of the big box that contains all array elements
        const boxWidth = this.canvasRef.width - 20;  // Width of the big box (slightly smaller than canvas)
        const arrayLength = this.max_size
        const ctx = this.canvasRef.getContext('2d');

        // Draw the big box that will hold all array elements
        ctx.beginPath();
        ctx.rect(10, yPosition, boxWidth, boxHeight);  // Large box
        ctx.fillStyle = '#f0f0f0';  // Light gray for the big box
        ctx.fill();
        ctx.stroke();

        // Calculate the width of each slot in the array
        const slotWidth = (boxWidth - (arrayLength - 1) * padding) / arrayLength;  // Evenly distribute space

        // Draw the individual elements inside the box
        ctx.fillStyle = 'black';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        ctx.font = '12px Arial';

        // Draw indexes above each section
        const indexYOffset = -12;  // Vertical offset for index numbers
        for (let i = 0; i < arrayLength; i++) {
            const xPosition = 10 + i * (slotWidth + padding);  // Horizontal position for each element
            const value = this.heap[i] !== undefined ? this.heap[i] : nilText;  // Use "nil" for empty slots

            // Draw the vertical separator between each element
            if (i !== 0) {
                ctx.moveTo(xPosition, yPosition);
                ctx.lineTo(xPosition, yPosition + boxHeight);
                ctx.stroke();
            }

            // Draw the index above the slot
            ctx.fillText(i, xPosition + slotWidth / 2, yPosition + indexYOffset);

            // Draw the text inside the box
            ctx.fillText(value, xPosition + slotWidth / 2, yPosition + boxHeight / 2);
        }
    }

}

// Draw a single node
const drawNode = (ctx, x, y, value) => {
    // Start with a base font size
    let fontSize = 20;
    ctx.font = `${fontSize}px Arial`;

    // Measure the text width
    let textWidth = ctx.measureText(value).width;

    // Set a maximum radius for the node (this could be adjusted as needed)
    const maxNodeRadius = 25;

    // Calculate the circle's radius based on the maximum width of the text
    let nodeRadius = Math.max(maxNodeRadius, textWidth / 2.5 + 10); // Add a small padding

    // Adjust the font size if the text width exceeds the node radius
    while (textWidth > nodeRadius * 2 - 10 && fontSize > 10) { // Limit to a minimum font size of 10
        fontSize -= 2; // Decrease the font size
        ctx.font = `${fontSize}px Arial`;
        textWidth = ctx.measureText(value).width;
    }

    // Set the font size and center alignment for the text
    ctx.font = `${fontSize}px Arial`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    // Draw the circle with adjusted radius
    ctx.beginPath();
    ctx.arc(x, y, nodeRadius, 0, Math.PI * 2);
    ctx.fillStyle = '#A4D1A7';
    ctx.fill();
    ctx.stroke();

    // Draw the text, centered within the circle
    ctx.fillStyle = 'black';
    ctx.fillText(value, x, y);
};

// Draw a line between two points
const drawLine = (ctx, x1, y1, x2, y2) => {
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
};

// Helper function to recursively draw the tree
const drawTree = (ctx, horizontalSpacing, levelHeight, index, x, y, level) => {
    if (index >= MinHeap.heap.length) return;

    // Draw lines (edges) first, then draw nodes (circles) on top
    const leftChildIndex = 2 * index + 1;
    const rightChildIndex = 2 * index + 2;

    if (leftChildIndex < MinHeap.heap.length) {
        const leftX = x - horizontalSpacing / Math.pow(2, level);
        const leftY = y + levelHeight;
        drawLine(ctx, x, y, leftX, leftY); // Draw line first
        drawTree(ctx, horizontalSpacing, levelHeight, leftChildIndex, leftX, leftY, level + 1);
    }

    if (rightChildIndex < MinHeap.heap.length) {
        const rightX = x + horizontalSpacing / Math.pow(2, level);
        const rightY = y + levelHeight;
        drawLine(ctx, x, y, rightX, rightY); // Draw line first
        drawTree(ctx, horizontalSpacing, levelHeight, rightChildIndex, rightX, rightY, level + 1);
    }

    // Now draw the node itself on top of the lines
    drawNode(ctx, x, y, MinHeap.heap[index]);
};