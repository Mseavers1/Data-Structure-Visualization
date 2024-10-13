import {Link} from "react-router-dom";
import React from "react";

export default function Algorithms() {
    return (
        <div className="algorithms">
            <div className="algorithms-section">
                <h2 className="algorithms-title">
                    Basic Data Structures
                    <hr/>
                </h2>

                <nav className="algorithms-links">
                    <ul>
                        <li><Link to="/algorithms/arrays">Arrays</Link></li>
                        <li>Lists</li>
                        <ul>
                            <li><Link to="/algorithms/lists/array">Array Lists</Link></li>
                            <li><Link to="/algorithms/lists/linked">Linked Lists</Link></li>
                            <li><Link to="/algorithms/lists/doubly-linked">Doubly Linked Lists</Link></li>
                            <li><Link to="/algorithms/lists/circular-linked">Circular Linked Lists</Link></li>
                        </ul>
                        <li>Stacks</li>
                        <ul>
                            <li><Link to="/algorithms/stacks/array">Array Stacks</Link></li>
                            <li><Link to="/algorithms/stacks/linked">Linked Stacks</Link></li>
                        </ul>
                        <li>Queues</li>
                        <ul>
                            <li><Link to="/algorithms/queues/array">Array Queues</Link></li>
                            <li><Link to="/algorithms/queues/linked">Linked Queues</Link></li>
                            <li><Link to="/algorithms/queues/circular">Circular Queues</Link></li>
                            <li><Link to="/algorithms/queues/priority">Priority Queues</Link></li>
                            <li><Link to="/algorithms/queues/deque">Deque</Link></li>
                        </ul>
                    </ul>
                </nav>
            </div>

            <div className="algorithms-section">
                <h2 className="algorithms-title">
                    Advanced Data Structures
                    <hr/>
                </h2>

                <nav className="algorithms-links">
                    <ul>
                        <li>Hashing</li>
                        <ul>
                            <li><Link to="/algorithms/hashing/hash-table">Hash Tables</Link></li>
                        </ul>
                        <li>Trees</li>
                        <ul>
                            <li><Link to="/algorithms/trees/binary-tree">Binary Tree</Link></li>
                            <li><Link to="/algorithms/trees/binary-search-tree">Binary Search Tree (BST)</Link></li>
                            <li><Link to="/algorithms/trees/avl-tree">AVL Tree</Link></li>
                            <li><Link to="/algorithms/trees/red-black-tree">Red-Black Tree</Link></li>
                            <li><Link to="/algorithms/trees/b-tree">B-Tree</Link></li>
                        </ul>
                        <li>Heaps</li>
                        <ul>
                            <li><Link to="/algorithms/heaps/min">Min Heap</Link></li>
                            <li><Link to="/algorithms/heaps/max">Max Heap</Link></li>
                        </ul>
                        <li>Graphs</li>
                        <ul>
                            <li><Link to="/algorithms/graphs/directed-and-undirected">Directed & Undirected Graphs</Link></li>
                            <li><Link to="/algorithms/graphs/weighted-and-unweighted">Weighted & Unweighted Graphs</Link></li>
                        </ul>
                    </ul>
                </nav>
            </div>

            <div className="algorithms-section">
                <h2 className="algorithms-title">
                    Sorting Algorithms
                    <hr/>
                </h2>

                <nav className="algorithms-links">
                    <ul>
                        <li>Comparison-Based</li>
                        <ul>
                            <li>Bubble Sort</li>
                            <li>Selection Sort</li>
                            <li>Insertion Sort</li>
                            <li>Merge Sort</li>
                            <li>Quick Sort</li>
                        </ul>

                        <li>Non-Comparison-Based</li>
                        <ul>
                            <li>Counting Sort</li>
                            <li>Radix Sort</li>
                            <li>Bucket Sort</li>
                        </ul>
                    </ul>
                </nav>
            </div>

            <div className="algorithms-section">
                <h2 className="algorithms-title">
                    Searching Algorithms
                    <hr/>
                </h2>

                <nav className="algorithms-links">
                    <ul>
                        <li>Linear Search</li>
                        <li>Binary Search</li>
                        <li>N-ary Search</li>
                    </ul>
                </nav>
            </div>

            <div className="algorithms-section">
                <h2 className="algorithms-title">
                    Graph Algorithms
                    <hr/>
                </h2>

                <nav className="algorithms-links">
                    <ul>
                        <li>Graph Traversal</li>
                        <ul>
                            <li>Depth-First Search (DFS)</li>
                            <li>Breadth-First Search (BFS)</li>
                        </ul>
                        <li>Shortest Path Algorithms</li>
                        <ul>
                            <li>A* Algorithm</li>
                            <li>Dijkstra's Algorithm</li>
                        </ul>
                        <li>Minimum Spanning Tree Algorithms</li>
                        <ul>
                            <li>Prim's Algorithm</li>
                            <li>Kruskal's Algorithm</li>
                        </ul>
                    </ul>
                </nav>
            </div>

            <div className="algorithms-section">
                <h2 className="algorithms-title">
                    Recursion Algorithms
                    <hr/>
                </h2>

                <nav className="algorithms-links">
                    <ul>
                        <li>Factorial Calculation</li>
                        <li>Fibonacci Sequence</li>
                    </ul>
                </nav>
            </div>
        </div>
);
}