import React, {useState} from 'react';
import './ProjectStylesheet.css';

import {Route, Routes, BrowserRouter as Router, Link} from "react-router-dom";
import {MenuOutlined, CloseOutlined} from '@ant-design/icons';

import About from "./components/about"
import Algorithms from "./components/algorithms"
import Credits from "./components/credits"
import Arrays from "./components/algorithms/arrays"
import AStar from "./components/algorithms/graphs/a_star";
import Bfs from "./components/algorithms/graphs/bfs";
import Dfs from "./components/algorithms/graphs/dfs";
import Dijkstra from "./components/algorithms/graphs/dijkstra";
import DirectedUndirected from "./components/algorithms/graphs/directed_undirected";
import Kruskal from "./components/algorithms/graphs/kruskal";
import Prim from "./components/algorithms/graphs/prim";
import WeightedUnweighted from "./components/algorithms/graphs/weighted_unweighted";
import HashTable from "./components/algorithms/hashing/hash_table";
import MaxHeap from "./components/algorithms/heaps/max_heap";
import MinHeap from "./components/algorithms/heaps/min_heap";
import ArrayList from "./components/algorithms/lists/array_list";
import CircularQueue from "./components/algorithms/queues/circular_queue";
import CircularLinkedList from "./components/algorithms/lists/circular_linked_list";
import DoubleLinkedList from "./components/algorithms/lists/double_linked_list";
import LinkedList from "./components/algorithms/lists/linked_list";
import ArrayQueue from "./components/algorithms/queues/array_queue";
import Deque from "./components/algorithms/queues/deque";
import LinkedQueue from "./components/algorithms/queues/linked_queue";
import PriorityQueue from "./components/algorithms/queues/priority_queue";
import Factorial from "./components/algorithms/recursive/factorial";
import Fibonacci from "./components/algorithms/recursive/fibonacci";
import BinarySearch from "./components/algorithms/searching/binary_search";
import LinearSearch from "./components/algorithms/searching/linear_search";
import NarySearch from "./components/algorithms/searching/n_ary_search";
import BubbleSort from "./components/algorithms/sorting/bubble_sort";
import BucketSort from "./components/algorithms/sorting/bucket_sort";
import CountingSort from "./components/algorithms/sorting/counting_sort";
import InsertionSort from "./components/algorithms/sorting/insertion_sort";
import MergeSort from "./components/algorithms/sorting/merge_sort";
import QuickSort from "./components/algorithms/sorting/quick_sort";
import RadixSort from "./components/algorithms/sorting/radix_sort";
import SelectionSort from "./components/algorithms/sorting/selection_sort";
import ArrayStack from "./components/algorithms/stacks/array_stack";
import LinkedStack from "./components/algorithms/stacks/linked_stack";
import AvlTree from "./components/algorithms/trees/avl_tree";
import BTree from "./components/algorithms/trees/b_tree";
import BinarySearchTree from "./components/algorithms/trees/binary_search_tree";
import BinaryTree from "./components/algorithms/trees/binary_tree";
import RedBlackTree from "./components/algorithms/trees/red_black_tree";

const App = () => {

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    }

    return (
        <Router>
            <div className="app-div">
                <header>
                    <div className="left">
                        <img className="logo" src="/images/wkucuptall_w.png" alt="Logo of Western Kentucky University"/>
                        <h1 className="title">Dynamic Algorithm Visualizer</h1>
                    </div>

                    <div className="right">
                        <nav className="routes">
                            <Link to="/">About</Link>
                            <Link to="/algorithms"> Algorithms </Link>
                            <Link to="/credits"> Credits </Link>
                        </nav>

                        <div className="hamburger" onClick={toggleMenu}>
                            {isMenuOpen ? <CloseOutlined/> : <MenuOutlined />}
                        </div>
                    </div>
                </header>

                <main>
                    <Routes>
                        <Route path="/" element={<About/>}/>
                        <Route path="/algorithms" element={<Algorithms/>}/>
                        <Route path="/credits" element={<Credits />} />
                        <Route path="/algorithms/arrays" element={<Arrays/>} />
                        <Route path="/algorithms/graphs/a-star" element={<AStar/>} />
                        <Route path="/algorithms/graphs/breadth-first-search" element={<Bfs/>} />
                        <Route path="/algorithms/graphs/depth-first-search" element={<Dfs/>} />
                        <Route path="/algorithms/graphs/dijkstra" element={<Dijkstra/>} />
                        <Route path="/algorithms/graphs/directed-and-undirected" element={<DirectedUndirected/>} />
                        <Route path="/algorithms/graphs/kruskal" element={<Kruskal/>} />
                        <Route path="/algorithms/graphs/prim" element={<Prim/>} />
                        <Route path="/algorithms/graphs/weighted-and-unweighted" element={<WeightedUnweighted/>} />
                        <Route path="/algorithms/hashing/hash-table" element={<HashTable/>} />
                        <Route path="/algorithms/heaps/min" element={<MinHeap/>} />
                        <Route path="/algorithms/heaps/max" element={<MaxHeap/>} />
                        <Route path="/algorithms/lists/array" element={<ArrayList/>} />
                        <Route path="/algorithms/lists/linked" element={<CircularLinkedList/>} />
                        <Route path="/algorithms/lists/doubly-linked" element={<DoubleLinkedList/>} />
                        <Route path="/algorithms/lists/circular-linked" element={<LinkedList/>} />
                        <Route path="/algorithms/queues/array" element={<ArrayQueue/>} />
                        <Route path="/algorithms/queues/circular" element={<CircularQueue/>} />
                        <Route path="/algorithms/queues/deque" element={<Deque/>} />
                        <Route path="/algorithms/queues/linked" element={<LinkedQueue/>} />
                        <Route path="/algorithms/queues/priority" element={<PriorityQueue/>} />
                        <Route path="/algorithms/recursive/factorial" element={<Factorial/>} />
                        <Route path="/algorithms/recursive/fibonacci" element={<Fibonacci/>} />
                        <Route path="/algorithms/searching/binary-search" element={<BinarySearch/>} />
                        <Route path="/algorithms/searching/linear-search" element={<LinearSearch/>} />
                        <Route path="/algorithms/searching/n-ary-search" element={<NarySearch/>} />
                        <Route path="/algorithms/sorting/bubble-sort" element={<BubbleSort/>} />
                        <Route path="/algorithms/sorting/bucket-sort" element={<BucketSort/>} />
                        <Route path="/algorithms/sorting/counting-sort" element={<CountingSort/>} />
                        <Route path="/algorithms/sorting/insertion-sort" element={<InsertionSort/>} />
                        <Route path="/algorithms/sorting/merge-sort" element={<MergeSort/>} />
                        <Route path="/algorithms/sorting/quick-sort" element={<QuickSort/>} />
                        <Route path="/algorithms/sorting/radix-sort" element={<RadixSort/>} />
                        <Route path="/algorithms/sorting/selection-sort" element={<SelectionSort/>} />
                        <Route path="/algorithms/stacks/array" element={<ArrayStack/>} />
                        <Route path="/algorithms/stacks/linked" element={<LinkedStack/>} />
                        <Route path="/algorithms/trees/avl-tree" element={<AvlTree/>} />
                        <Route path="/algorithms/trees/b-tree" element={<BTree/>} />
                        <Route path="/algorithms/trees/binary-search-tree" element={<BinarySearchTree/>} />
                        <Route path="/algorithms/trees/binary-tree" element={<BinaryTree/>} />
                        <Route path="/algorithms/trees/red-black-tree" element={<RedBlackTree/>} />
                    </Routes>
                </main>

                <footer>
                    <div className="footer">
                        <h3>Developed by Michael Seavers </h3>
                        <h3>For Western Kentucky University</h3>
                        <h3>November 20th, 2024</h3>
                    </div>
                </footer>
            </div>
        </Router>
    );
};

export default App;
