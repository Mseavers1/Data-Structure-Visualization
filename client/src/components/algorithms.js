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
                    <ul className="test">
                        <li><Link to="/algorithms/arrays">Arrays</Link></li>
                        <li><i>Lists</i></li>
                        <ul>
                            <li><Link to="/algorithms/lists/array">Array Lists</Link></li>
                            <li><Link to="/algorithms/lists/linked">Linked Lists</Link></li>
                            <li><Link to="/algorithms/lists/doubly-linked">Doubly Linked Lists</Link></li>
                            <li><Link to="/algorithms/lists/circular-linked">Circular Linked Lists</Link></li>
                        </ul>
                        <li><i>Stacks</i></li>
                        <ul>
                            <li><Link to="/algorithms/stacks/array">Array Stacks</Link></li>
                            <li><Link to="/algorithms/stacks/linked">Linked Stacks</Link></li>
                        </ul>
                        <li><i>Queues</i></li>
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
                        <li><i>Hashing</i></li>
                        <ul>
                            <li><Link to="/algorithms/hashing/hash-table">Hash Tables</Link></li>
                        </ul>
                        <li><i>Trees</i></li>
                        <ul>
                            <li><Link to="/algorithms/trees/binary-tree">Binary Tree</Link></li>
                            <li><Link to="/algorithms/trees/binary-search-tree">Binary Search Tree (BST)</Link></li>
                            <li><Link to="/algorithms/trees/avl-tree">AVL Tree</Link></li>
                            <li><Link to="/algorithms/trees/red-black-tree">Red-Black Tree</Link></li>
                            <li><Link to="/algorithms/trees/b-tree">B-Tree</Link></li>
                        </ul>
                        <li><i>Heaps</i></li>
                        <ul>
                            <li><Link to="/algorithms/heaps/min">Min Heap</Link></li>
                            <li><Link to="/algorithms/heaps/max">Max Heap</Link></li>
                        </ul>
                        <li><i>Graphs</i></li>
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
                        <li><i>Comparison-Based</i></li>
                        <ul>
                            <li><Link to="/algorithms/sorting/bubble-sort">Bubble Sort</Link></li>
                            <li><Link to="/algorithms/sorting/selection-sort">Selection Sort</Link></li>
                            <li><Link to="/algorithms/sorting/insertion-sort">Insertion Sort</Link></li>
                            <li><Link to="/algorithms/sorting/merge-sort">Merge Sort</Link></li>
                            <li><Link to="/algorithms/sorting/quick-sort">Quick Sort</Link></li>
                        </ul>

                        <li><i>Non-Comparison-Based</i></li>
                        <ul>
                            <li><Link to="/algorithms/sorting/counting-sort">Counting Sort</Link></li>
                            <li><Link to="/algorithms/sorting/radix-sort">Radix Sort</Link></li>
                            <li><Link to="/algorithms/sorting/bucket-sort">Bucket Sort</Link></li>
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
                        <li><Link to="/algorithms/searching/linear-search">Linear Search</Link></li>
                        <li><Link to="/algorithms/searching/binary-search">Binary Search</Link></li>
                        <li><Link to="/algorithms/searching/n-ary-search">N-ary Search</Link></li>
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
                        <li><i>Graph Traversal</i></li>
                        <ul>
                            <li><Link to="/algorithms/graphs/depth-first-search">Depth-First Search (DFS)</Link></li>
                            <li><Link to="/algorithms/graphs/breadth-first-search">Depth-First Search (BFS)</Link></li>
                        </ul>
                        <li><i>Shortest Path Algorithms</i></li>
                        <ul>
                            <li><Link to="/algorithms/graphs/a-star">A* Algorithm</Link></li>
                            <li><Link to="/algorithms/graphs/dijkstra">Dijkstra's Algorithm</Link></li>
                        </ul>
                        <li><i>Minimum Spanning Tree Algorithms</i></li>
                        <ul>
                            <li><Link to="/algorithms/graphs/prim">Prim's Algorithm</Link></li>
                            <li><Link to="/algorithms/graphs/kruskal">Kruskal's Algorithm</Link></li>
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
                        <li><Link to="/algorithms/recursive/factorial">Factorial Calculation</Link></li>
                        <li><Link to="/algorithms/recursive/fibonacci">Fibonacci Sequence</Link></li>
                    </ul>
                </nav>
            </div>
        </div>
    );
}