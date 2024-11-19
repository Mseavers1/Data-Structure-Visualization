export const MinHeap = {

    heap: [],
    canvasRef: null,
    max_size: 31,
    is_animating: false,
    animation_speed: 200,
    animation_sec_speed: 2,
    pause_animation: false,
    inputWidth: 300,
    highlightedIndex: -1,
    highlight_mode: true,
    levelHeight: 0,
    horizontalSpacing: 0,
    name: "Heap",

    async add (value) {

        if (this.heap.length > this.max_size - 1 || value === "" || this.is_animating) return;

        const val = parseFloat (value)

        // If val is not a number but the heap is numbers & vise versa
        if ((typeof this.heap[0] === "number" && isNaN (val)) || (typeof this.heap[0] === "string" && !isNaN (val))) return;

        isNaN (val) ? this.heap.push (value) : this.heap.push (val)

        this.drawInputBox ("Insert", true, this.heap[this.heap.length - 1], true, 10 + (this.inputWidth / 2), 137, "Into the " + this.name);
        this.is_animating = true;
        await delay (2000)

        await this.animateInsertion()
        await this.heapify_up()
        this.draw()

    },

    toggleMouseListener(isActive) {
        this.isMouseListenerActive = isActive;

        // Create the bound mouse move listener if it doesn't exist
        if (!this.mouseMoveListener) {
            this.mouseMoveListener = this.handleMouseMove.bind(this);
        }

        // Add or remove the event listener based on the state
        if (isActive) {
            this.canvasRef.addEventListener('mousemove', this.mouseMoveListener);
        } else {
            this.canvasRef.removeEventListener('mousemove', this.mouseMoveListener);
        }
    },

    handleMouseMove(event) {

        if (this.is_animating) return;

        const rect = this.canvasRef.getBoundingClientRect();
        const ctx = this.canvasRef.getContext('2d');
        const mouseX = event.clientX - rect.left; // Mouse X position relative to the canvas
        const mouseY = event.clientY - rect.top;  // Mouse Y position relative to the canvas

        // Check if the mouse is within the array box
        const yPosition = 40; // Same as yPosition in drawArray
        const boxHeight = 30; // Same as boxHeight in drawArray
        if (mouseY >= yPosition && mouseY <= yPosition + boxHeight) {
            const arrayLength = this.max_size;
            const padding = 2; // Same as padding in drawArray
            const boxWidth = this.canvasRef.width - 20; // Same as boxWidth in drawArray
            const slotWidth = (boxWidth - (arrayLength - 1) * padding) / arrayLength;

            // Calculate which index is hovered
            const hoveredIndex = Math.floor((mouseX - 10) / (slotWidth + padding));

            if (hoveredIndex >= 0 && hoveredIndex < arrayLength) {
                this.highlightedIndex = hoveredIndex;
            } else {
                this.highlightedIndex = -1; // No valid index is hovered
            }
        } else {
            this.highlightedIndex = -1; // No valid index is hovered
        }

        // Not over the array
        if (this.highlightedIndex === -1) {
            for (let i = 0; i < this.heap.length; i++) {
                const curr = getNodePosition(i);

                let textWidth = ctx.measureText(this.heap[i]).width;

                // Set a maximum radius for the node (this could be adjusted as needed)
                const maxNodeRadius = 25;

                // Calculate the circle's radius based on the maximum width of the text
                let nodeRadius = Math.max(maxNodeRadius, textWidth / 2.5 + 10);


                if (Math.pow(mouseX - curr.x, 2) + Math.pow(mouseY - curr.y, 2) <= Math.pow(nodeRadius, 2)) {
                    this.highlightedIndex = i; // Highlight this node
                    break; // Exit loop once a node is found to be hovered
                }
            }
        }


        // Redraw the array with the highlighted cell
        this.draw();
    },

    generateRandomNumber() {

        let randomNumber = Math.random() * (99999 - -9999) + -9999;

        const rand = Math.random() * 100;

        // Don't keep Decimal
        if (rand > 50){
            randomNumber = Math.floor(randomNumber);
        }

        if (randomNumber.toString().length > 5) {
            randomNumber = parseFloat(randomNumber.toString().slice(0, 5));
        }

        return randomNumber;
    },

    getRandomString(length) {
        const characters = 'abcdefghijklmnopqrstuvwxyz'; // You can customize this to include numbers, uppercase letters, etc.
        let result = '';
        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            result += characters[randomIndex];
        }
        return result;
    },


    randomize(isNumber, N) {

        if (this.is_animating) return;

        this.clear();

        // Randomizes the heap
        if (isNumber) {

            for (let i = 0; i < N; i++) {
                this.heap.push(this.generateRandomNumber());
            }
        }
        else
        {
            for (let i = 0; i < N; i++) {
                this.heap.push(this.getRandomString(Math.floor(Math.random() * 5) + 1));
            }
        }

        // Build Heap
        this.draw()
        this.buildHeap().then (r  => this.draw())
    },

    async animateInsertion() {

        return new Promise(async (resolve) => {

            this.is_animating = true;

            const target = getNodePosition (this.heap.length - 1)

            const canvas = this.canvasRef;
            const ctx = canvas.getContext ('2d');

            const startingX = 10 + (this.inputWidth / 2);
            const startingY = 137

            let indexPos = {x : startingX, y : startingY};

            let stepX, stepY;

            const calculateSteps = () => {
                stepX = (target.x - startingX) / this.animation_speed;
                stepY = (target.y - startingY) / this.animation_speed;
            };

            const animate = () => {

                if (this.pause_animation) {
                    requestAnimationFrame (animate);
                    return;
                }

                calculateSteps ();
                ctx.clearRect (0, 0, canvas.width, canvas.height);
                this.draw ()

                drawNode (ctx, target.x, target.y, this.heap[this.heap.length-1], "#D7EAF5", true)
                this.drawInputBox ("Inserting Node " + this.heap[this.heap.length-1], true, this.heap[this.heap.length - 1], true, indexPos.x, indexPos.y, "to index " + (this.heap.length - 1));

                const dist = Math.sqrt (Math.pow (indexPos.x - target.x, 2) + Math.pow (indexPos.y - target.y, 2));

                if (dist > 1) {
                    indexPos.x += stepX;
                    indexPos.y += stepY

                    if ((stepX > 0 && indexPos.x > target.x) || (stepX < 0 && indexPos.x < target.x)) {
                        indexPos.x = target.x;
                    }
                    if ((stepY > 0 && indexPos.y > target.y) || (stepY < 0 && indexPos.y < target.y)) {
                        indexPos.y = target.y;
                    }

                    requestAnimationFrame (animate);
                } else {
                    this.drawInputBox ("Inserting Node " + this.heap[this.heap.length-1], true, this.heap[this.heap.length - 1], true, target.x, target.y, "to index " + (this.heap.length - 1));
                    this.is_animating = false;
                    resolve ();
                    this.draw ();
                }
            }

            calculateSteps ();
            animate ();
        });
    },

    async buildHeap() {
        for (let i = Math.floor(this.heap.length / 2) - 1; i >= 0; i--) {
            await this.heapify_down(i).then(r => this.draw());
        }
    },

    animateSwap(index1, index2) {
        return new Promise((resolve) => {
            this.is_animating = true;

            const padding = 2;
            const boxWidth  = this.canvasRef.width - 20;
            const boxHeight = 30;
            const yPosition = 40;
            const slotWidth = (boxWidth - (this.max_size - 1) * padding) / this.max_size;
            const indexYOffset = -12;

            if (!this.canvasRef) return;

            const canvas = this.canvasRef;
            const ctx = canvas.getContext('2d');

            const index1Value = this.heap[index1];
            const index2Value = this.heap[index2];

            const index1Pos = getNodePosition(index1);
            const index2Pos = getNodePosition(index2);

            let x1 = index1Pos.x, y1 = index1Pos.y;
            let x2 = index2Pos.x, y2 = index2Pos.y;

            const arraySlot1X = 10 + index1 * (slotWidth + padding);
            const arraySlot2X = 10 + index2 * (slotWidth + padding);

            let arrayX1 = arraySlot1X;
            let arrayX2 = arraySlot2X;

            let stepX1, stepY1, stepX2, stepY2, stepArrayX1, stepArrayX2;

            const calculateSteps = () => {
                stepX1 = (index2Pos.x - index1Pos.x) / this.animation_speed;
                stepY1 = (index2Pos.y - index1Pos.y) / this.animation_speed;
                stepX2 = (index1Pos.x - index2Pos.x) / this.animation_speed;
                stepY2 = (index1Pos.y - index2Pos.y) / this.animation_speed;

                stepArrayX1 = (arraySlot2X - arraySlot1X) / this.animation_speed;
                stepArrayX2 = (arraySlot1X - arraySlot2X) / this.animation_speed;
            };

            const animate = () => {

                if (this.pause_animation) {
                    requestAnimationFrame(animate);
                    return;
                }

                // Update the steps if the animation speed has changed
                calculateSteps();

                ctx.clearRect(0, 0, canvas.width, canvas.height);
                this.draw();

                this.drawInputBox ("Swapping Nodes", false, "", false, 0, 0, index2Value + " and " + index1Value);

                // Draw the nodes with the space string
                drawNode(ctx, index1Pos.x, index1Pos.y, index1Value, "#D7EAF5", true);
                drawNode(ctx, index2Pos.x, index2Pos.y, index2Value, "#D7EAF5", true);

                drawNode(ctx, x1, y1, index1Value, "#FFD700");
                drawNode(ctx, x2, y2, index2Value, "#FFD700");

                this.drawArray();

                ctx.fillStyle = '#f0f0f0';
                ctx.fillRect(arraySlot1X, yPosition, slotWidth, boxHeight);
                ctx.fillRect(arraySlot2X, yPosition, slotWidth, boxHeight);

                ctx.fillStyle = '#f0f0f0';
                ctx.fillRect(arraySlot1X, yPosition, slotWidth, boxHeight);
                ctx.fillRect(arraySlot2X, yPosition, slotWidth, boxHeight);

                ctx.strokeStyle = 'red';
                ctx.lineWidth = 2;
                ctx.strokeRect(arraySlot1X, yPosition, slotWidth, boxHeight);
                ctx.strokeRect(arraySlot2X, yPosition, slotWidth, boxHeight);

                ctx.fillStyle = 'red';
                ctx.fillText(index1Value, arrayX1 + slotWidth / 2, yPosition + boxHeight / 2);
                ctx.fillText(index2Value, arrayX2 + slotWidth / 2, yPosition + boxHeight / 2);

                const xPosition1 = 10 + index1 * (slotWidth + padding);
                const xPosition2 = 10 + index2 * (slotWidth + padding);

                ctx.fillStyle = 'white';
                ctx.fillRect(xPosition1, yPosition + indexYOffset - 10, slotWidth, 12);
                ctx.fillRect(xPosition2, yPosition + indexYOffset - 10, slotWidth, 12);

                ctx.fillStyle = 'red';
                ctx.fillText(index1, xPosition1 + slotWidth / 2, yPosition + indexYOffset);
                ctx.fillText(index2, xPosition2 + slotWidth / 2, yPosition + indexYOffset);

                let hasReachedTarget1 = Math.abs(x1 - index2Pos.x) < Math.abs(stepX1) && Math.abs(y1 - index2Pos.y) <= Math.abs(stepY1);
                let hasReachedTarget2 = Math.abs(x2 - index1Pos.x) < Math.abs(stepX2) && Math.abs(y2 - index1Pos.y) <= Math.abs(stepY2);

                if (!hasReachedTarget2) {
                    x1 += stepX1;
                    y1 += stepY1;
                }

                if (!hasReachedTarget1) {
                    x2 += stepX2;
                    y2 += stepY2;
                }

                let hasReachedArrayTarget1 = Math.abs(arrayX1 - arraySlot2X) < Math.abs(stepArrayX1);
                let hasReachedArrayTarget2 = Math.abs(arrayX2 - arraySlot1X) < Math.abs(stepArrayX2);

                if (!hasReachedArrayTarget2) {
                    arrayX2 += stepArrayX2;
                }
                if (!hasReachedArrayTarget1) {
                    arrayX1 += stepArrayX1;
                }

                if (!hasReachedTarget1 || !hasReachedTarget2 || !hasReachedArrayTarget1 || !hasReachedArrayTarget2) {
                    requestAnimationFrame(animate);
                } else {
                    drawNode(ctx, index2Pos.x, index2Pos.y, index1Value);
                    drawNode(ctx, index1Pos.x, index1Pos.y, index2Value);
                    this.is_animating = false;
                    resolve();
                    this.draw();
                }
            };

            calculateSteps();
            animate();
        });
    },

    set_animation_speed(value) {

        const y = (1 - 400) / 100;

        value === 0 ? this.animation_speed = 5000 : this.animation_speed = (y * value) + 400;

        if (value === 100) this.animation_sec_speed = 10;
        else if (value >= 66 && value < 100) this.animation_sec_speed = 1000;
        else if (value >= 33 && value < 66) return this.animation_sec_speed = 1500;
        else if (value > 0 && value < 33) return this.animation_sec_speed = 2000;
        else this.animation_sec_speed = 3000;

    },

    //        this.drawInputBox ("Find Node " + value, false, "", false, 10 + (this.inputWidth / 2), 137, found ? "Yes → Return index " + i : "No → continue", "Is " + this.heap[i] + " = " + value + "?");
    //
    //         const index = getNodePosition(i);
    //         let x = index.x, y = index.y;
    //         drawNode(ctx, x, y, this.heap[i], "#FFD700");
    //
    //         await delay (2000)
    //
    //         this.draw()


    async find (value, cur, ctx) {

        // Could not find
        if (cur > this.heap.length || this.heap[cur] === undefined || this.heap[cur] === null) {

            this.drawInputBox(
                "Find Node " + value,
                false,
                "",
                false,
                10 + this.inputWidth / 2,
                137,
                "Stop and Backtrack",
                "Reached Leaf",
            );
            await delay(2000);

            return -1;
        }

        const index = getNodePosition(cur)

        let x = index.x, y = index.y;
        drawNode(ctx, x, y, this.heap[cur], "#FFD700");

        // Comparison Animation
        if (Number(this.heap[cur]) > value) {
            this.drawInputBox(
                "Find Node " + value,
                false,
                "",
                false,
                10 + this.inputWidth / 2,
                137,
                "Stop and Backtrack",
                this.heap[cur] + " is > " + value,
            );

            await delay(1000);

            this.draw();


            return -1;
        }

        // Regular Animation
        this.drawInputBox(
            "Find Node " + value,
            false,
            "",
            false,
            10 + this.inputWidth / 2,
            137,
            this.heap[cur] === value ? `Yes → Return index ${cur}` : "No → Continue",
            `Is ${this.heap[cur]} = ${value}?`
        );

        await delay(1000);

        this.draw();

        // Found
        if (Number(this.heap[cur]) === value) return cur;

        // Search children
        const left = await this.find(value, (2 * (cur + 1)) - 1, ctx);

        if (left !== -1) return left;

        return await this.find (value, (2 * (cur + 1) + 1) - 1, ctx);
    },

    async remove (value) {

        if (this.heap.length <= 0 || value === "" || this.is_animating) return;

        const val = parseFloat (value)

        const canvas = this.canvasRef;
        const ctx = canvas.getContext('2d');

        // Animation 1 - Preparing to remove the node
        this.drawInputBox ("Remove Node " + value, false, "", false, 10 + (this.inputWidth / 2), 137, "From the " + this.name);
        this.is_animating = true;
        await delay (2000)

        // Animation 2 - Check if node is in the heap

        // Find the index of the value if exists
        const valueIndex = await this.find(val, 0, ctx);

        // Value is not in heap
        if (valueIndex < 0) {
            this.drawInputBox ("Find Node " + value, false, "", false, 10 + (this.inputWidth / 2), 137, "Node is not in Heap", "");
            this.is_animating = false;
            return;
        }

        if (valueIndex === this.heap.length - 1) {
            this.heap.pop ()
            this.draw ()
        } else {
            this.animateSwap (valueIndex, this.heap.length - 1).then (r => {
                // Put the value in the last index into this index
                this.heap[valueIndex] = this.heap[this.heap.length - 1];

                // Delete the last index
                this.heap.pop ()

                // Heapify
                this.heapify_down ().then (r => this.draw ());
            })
        }
    },

    clear() {

        if (this.is_animating) return;

        this.heap = []
        this.draw();
    },

    async heapify_up(curIndex = this.heap.length - 1) {

        if (curIndex <= 0) return;  // Root does not need to be heapifed

        let parentIndex = Math.floor((curIndex - 1) / 2); // P = i / 2 (floor and -1 since integers and starts in an array)

        const needsSwapping = this.heap[parentIndex] > this.heap[curIndex];

        this.draw();

        // Animate that we do or do not need to swap -- highlight nodes, update IB
        this.drawInputBox("Heapify Check", false, "", false, 0, 0, (needsSwapping ? "Yes → Swap" : "No → Stop"), "Is " + this.heap[parentIndex] + " < " + this.heap[curIndex] + "?");

        const canvas = this.canvasRef;
        const ctx = canvas.getContext('2d');

        const index1Pos = getNodePosition(curIndex);
        const index2Pos = getNodePosition(parentIndex);

        let x1 = index1Pos.x, y1 = index1Pos.y;
        let x2 = index2Pos.x, y2 = index2Pos.y;

        drawNode(ctx, x1, y1, this.heap[curIndex], "#FFD700");
        drawNode(ctx, x2, y2, this.heap[parentIndex], "#FFD700");

        await delay(2000); // Hold for some time

        // If heap property is violated, animate and swap
        if (needsSwapping) {
            // Wait for the swap animation to complete before continuing
            await this.animateSwap(parentIndex, curIndex);

            // Swap the parent and child
            [this.heap[curIndex], this.heap[parentIndex]] = [this.heap[parentIndex], this.heap[curIndex]];

            // Continue bubbling up recursively
            await this.heapify_up(parentIndex);
        }
    },

    async heapify_down(curIndex = 0) {

        const canvas = this.canvasRef;
        const ctx = canvas.getContext('2d');

        let leftChildIndex = 2 * curIndex + 1;
        let rightChildIndex = 2 * curIndex + 2;
        let smallest = curIndex;

        const curPos = getNodePosition(curIndex);
        const leftPos = getNodePosition(leftChildIndex);
        const rightPos = getNodePosition(rightChildIndex);

        let x1 = curPos.x, y1 = curPos.y;
        let x2 = leftPos.x, y2 = leftPos.y;
        let x3 = rightPos.x, y3 = rightPos.y;

        drawNode(ctx, x1, y1, this.heap[curIndex], "#FFD700");

        // Check if the left child exists
        if (leftChildIndex < this.heap.length) {
            drawNode(ctx, x2, y2, this.heap[leftChildIndex], "#FFD700");
            this.drawInputBox(
                "Heapify Check",
                false,
                "",
                false,
                0,
                0,
                (this.heap[leftChildIndex] < this.heap[smallest]) ? "Yes → Swap" : "No → Check Right Child",
                "Is " + this.heap[leftChildIndex] + " < " + this.heap[smallest] + "?"
            );
            await delay(2000);

            // Check if left child is smaller than the current node
            if (this.heap[leftChildIndex] < this.heap[smallest]) {
                smallest = leftChildIndex;
            }
        }

        // Check the right child only if the left child didn't change anything
        if (smallest === curIndex) {
            this.draw();
            // Check if the right child exists
            if (rightChildIndex < this.heap.length) {
                this.drawInputBox(
                    "Heapify Check",
                    false,
                    "",
                    false,
                    0,
                    0,
                    (this.heap[rightChildIndex] < this.heap[smallest]) ? "Yes → Swap" : "No → Stop",
                    "Is " + this.heap[rightChildIndex] + " < " + this.heap[smallest] + "?"
                );
                drawNode(ctx, x1, y1, this.heap[curIndex], "#FFD700");
                drawNode(ctx, x3, y3, this.heap[rightChildIndex], "#FFD700");
                await delay(2000);

                // Check if the right child is smaller than the current smallest value
                if (this.heap[rightChildIndex] < this.heap[smallest]) {
                    smallest = rightChildIndex;
                }
            }
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
        this.inputWidth = 4.35 * (((this.canvasRef?.width - 20) - (this.max_size - 1) * 2) / this.max_size);

        const canvas = this.canvasRef;
        const ctx = canvas.getContext('2d');

        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;

        this.levelHeight = Math.max(60, viewportHeight / 8);
        this.horizontalSpacing = Math.max(200, viewportWidth / 4);

        //this.canvasRef.addEventListener('mousemove', this.handleMouseMove.bind(this));
    },

    draw() {
        if (!this.canvasRef) return;

        const canvas = this.canvasRef;
        const ctx = canvas.getContext('2d');

        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;

        //const levelHeight = Math.max(60, viewportHeight / 12); // Set a minimum of 60, otherwise scale based on viewport height
        //const horizontalSpacing = Math.max(200, viewportWidth / 8);

        ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas

        // Draw the array first
        this.drawArray();

        // Draw input box next
        this.heap.length === 0 ? this.drawInputBox("Empty") : this.drawInputBox("Complete")

        // Draw the heap starting from the root (index 0)
        if (this.heap.length > 0) {
            drawTree(ctx, this.horizontalSpacing, this.levelHeight,0, canvas.width / 2, 120, 1); // Start drawing tree below the array
        }
    },

    drawInputBox(txt, isNode = false, nodeTxt = "", isNodeMoving = false, nodeX = 0, nodeY = 0, alt = "", mid = "") {
        const ctx = this.canvasRef.getContext('2d');

        ctx.beginPath();
        ctx.rect(10, 80, this.inputWidth, 140);
        ctx.fillStyle = "#f7e8e8";
        ctx.fill();
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 2;
        ctx.stroke();

        if (isNode) drawNode(ctx, nodeX, nodeY + 10, nodeTxt, "#add8e6",nodeTxt === "");

        let fontSize = 20;
        ctx.font = `${fontSize}px Arial`;

        ctx.fillStyle = 'black';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        while (ctx.measureText(txt).width > this.inputWidth - 20) {
            fontSize -= 1; // Decrease font size
            ctx.font = `${fontSize}px Arial`;
        }

        ctx.fillText(txt, 10 + (this.inputWidth / 2), 80 + 18);

        fontSize = 20;

        while (ctx.measureText(mid).width > this.inputWidth - 20) {
            fontSize -= 1; // Decrease font size
            ctx.font = `${fontSize}px Arial`;
        }

        ctx.fillText(mid, 10 + (this.inputWidth / 2), 137);

        fontSize = 20;

        while (ctx.measureText(alt).width > this.inputWidth - 20) {
            fontSize -= 1; // Decrease font size
            ctx.font = `${fontSize}px Arial`;
        }

        ctx.fillText(alt, 10 + (this.inputWidth / 2), 200);
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
        ctx.fillStyle = '#f7e8e8';
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

            if (i === this.highlightedIndex) {
                ctx.fillStyle = '#FFD700';
                ctx.fillRect(xPosition, yPosition, slotWidth, boxHeight);
            }

            ctx.strokeStyle = 'black'
            ctx.fillStyle = 'black'

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
const drawNode = (ctx, x, y, value, color="#add8e6", text_clear = false) => {
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
    ctx.fillStyle = color;
    ctx.fill();
    ctx.stroke();

    // Draw the text, centered within the circle
    ctx.fillStyle = 'black';

    if (!text_clear) ctx.fillText(value, x, y);
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
    MinHeap.highlightedIndex === index ? drawNode(ctx, x, y, MinHeap.heap[index], "#FFD700") : drawNode(ctx, x, y, MinHeap.heap[index])
};

const getNodePosition = (index, x = MinHeap.canvasRef.width / 2, y = 120) => {
    const levelHeight = MinHeap.levelHeight;
    const horizontalSpacing = MinHeap.horizontalSpacing;
    const level = Math.floor(Math.log2(index + 1));

    if (index === 0) return { x, y };

    const parentIndex = Math.floor((index - 1) / 2);
    const parentPos = getNodePosition(parentIndex, x, y);

    const newX = parentPos.x + (index % 2 === 1 ? -horizontalSpacing / Math.pow(2, level) : horizontalSpacing / Math.pow(2, level));
    const newY = parentPos.y + levelHeight;

    return { x: newX, y: newY };
};

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, MinHeap.animation_sec_speed));
}