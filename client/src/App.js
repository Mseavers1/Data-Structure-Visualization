import React, {useState} from 'react';
import './ProjectStylesheet.css';

import {Route, Routes, BrowserRouter as Router, Link} from "react-router-dom";
import {MenuOutlined, CloseOutlined} from '@ant-design/icons';

import About from "./components/about"
import Algorithms from "./components/algorithms"
import Credits from "./components/credits"
import Arrays from "./components/algorithms/arrays"
import A_star from "./components/algorithms/graphs/a_star";
import Bfs from "./components/algorithms/graphs/bfs";
import Dfs from "./components/algorithms/graphs/dfs";
import Dijkstra from "./components/algorithms/graphs/dijkstra";
import Directed_undirected from "./components/algorithms/graphs/directed_undirected";
import Kruskal from "./components/algorithms/graphs/kruskal";
import Prim from "./components/algorithms/graphs/prim";
import Weighted_unweighted from "./components/algorithms/graphs/weighted_unweighted";
import Hash_table from "./components/algorithms/hashing/hash_table";
import Max_heap from "./components/algorithms/heaps/max_heap";
import Min_heap from "./components/algorithms/heaps/min_heap";
import Array_list from "./components/algorithms/lists/array_list";
import Circular_queue from "./components/algorithms/queues/circular_queue";
import Circular_linked_list from "./components/algorithms/lists/circular_linked_list";
import Double_linked_list from "./components/algorithms/lists/double_linked_list";
import Linked_list from "./components/algorithms/lists/linked_list";
import Array_queue from "./components/algorithms/queues/array_queue";
import Deque from "./components/algorithms/queues/deque";
import Linked_queue from "./components/algorithms/queues/linked_queue";
import Priority_queue from "./components/algorithms/queues/priority_queue";
import Factorial from "./components/algorithms/recursive/factorial";
import Fibonacci from "./components/algorithms/recursive/fibonacci";
import Binary_search from "./components/algorithms/searching/binary_search";
import Linear_search from "./components/algorithms/searching/linear_search";
import N_ary_search from "./components/algorithms/searching/n_ary_search";
import Bubble_sort from "./components/algorithms/sorting/bubble_sort";
import Bucket_sort from "./components/algorithms/sorting/bucket_sort";
import Counting_sort from "./components/algorithms/sorting/counting_sort";
import Insertion_sort from "./components/algorithms/sorting/insertion_sort";
import Merge_sort from "./components/algorithms/sorting/merge_sort";
import Quick_sort from "./components/algorithms/sorting/quick_sort";
import Radix_sort from "./components/algorithms/sorting/radix_sort";
import Selection_sort from "./components/algorithms/sorting/selection_sort";
import Array_stack from "./components/algorithms/stacks/array_stack";
import Linked_stack from "./components/algorithms/stacks/linked_stack";
import Avl_tree from "./components/algorithms/trees/avl_tree";
import B_tree from "./components/algorithms/trees/b_tree";
import Binary_search_tree from "./components/algorithms/trees/binary_search_tree";
import Binary_tree from "./components/algorithms/trees/binary_tree";
import Red_black_tree from "./components/algorithms/trees/red_black_tree";

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
                        <Route path="/algorithms/graphs/a-star" element={<A_star/>} />
                        <Route path="/algorithms/graphs/breadth-first-search" element={<Bfs/>} />
                        <Route path="/algorithms/graphs/depth-first-search" element={<Dfs/>} />
                        <Route path="/algorithms/graphs/dijkstra" element={<Dijkstra/>} />
                        <Route path="/algorithms/graphs/directed-and-undirected" element={<Directed_undirected/>} />
                        <Route path="/algorithms/graphs/kruskal" element={<Kruskal/>} />
                        <Route path="/algorithms/graphs/prim" element={<Prim/>} />
                        <Route path="/algorithms/graphs/weighted-and-unweighted" element={<Weighted_unweighted/>} />
                        <Route path="/algorithms/hashing/hash-table" element={<Hash_table/>} />
                        <Route path="/algorithms/heaps/min" element={<Min_heap/>} />
                        <Route path="/algorithms/heaps/max" element={<Max_heap/>} />
                        <Route path="/algorithms/lists/array" element={<Array_list/>} />
                        <Route path="/algorithms/lists/linked" element={<Circular_linked_list/>} />
                        <Route path="/algorithms/lists/doubly-linked" element={<Double_linked_list/>} />
                        <Route path="/algorithms/lists/circular-linked" element={<Linked_list/>} />
                        <Route path="/algorithms/queues/array" element={<Array_queue/>} />
                        <Route path="/algorithms/queues/circular" element={<Circular_queue/>} />
                        <Route path="/algorithms/queues/deque" element={<Deque/>} />
                        <Route path="/algorithms/queues/linked" element={<Linked_queue/>} />
                        <Route path="/algorithms/queues/priority" element={<Priority_queue/>} />
                        <Route path="/algorithms/recursive/factorial" element={<Factorial/>} />
                        <Route path="/algorithms/recursive/fibonacci" element={<Fibonacci/>} />
                        <Route path="/algorithms/searching/binary-search" element={<Binary_search/>} />
                        <Route path="/algorithms/searching/linear-search" element={<Linear_search/>} />
                        <Route path="/algorithms/searching/n-ary-search" element={<N_ary_search/>} />
                        <Route path="/algorithms/sorting/bubble-sort" element={<Bubble_sort/>} />
                        <Route path="/algorithms/sorting/bucket-sort" element={<Bucket_sort/>} />
                        <Route path="/algorithms/sorting/counting-sort" element={<Counting_sort/>} />
                        <Route path="/algorithms/sorting/insertion-sort" element={<Insertion_sort/>} />
                        <Route path="/algorithms/sorting/merge-sort" element={<Merge_sort/>} />
                        <Route path="/algorithms/sorting/quick-sort" element={<Quick_sort/>} />
                        <Route path="/algorithms/sorting/radix-sort" element={<Radix_sort/>} />
                        <Route path="/algorithms/sorting/selection-sort" element={<Selection_sort/>} />
                        <Route path="/algorithms/stacks/array" element={<Array_stack/>} />
                        <Route path="/algorithms/stacks/linked" element={<Linked_stack/>} />
                        <Route path="/algorithms/trees/avl-tree" element={<Avl_tree/>} />
                        <Route path="/algorithms/trees/b-tree" element={<B_tree/>} />
                        <Route path="/algorithms/trees/binary-search-tree" element={<Binary_search_tree/>} />
                        <Route path="/algorithms/trees/binary-tree" element={<Binary_tree/>} />
                        <Route path="/algorithms/trees/red-black-tree" element={<Red_black_tree/>} />
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
