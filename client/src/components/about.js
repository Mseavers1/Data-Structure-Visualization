export default function About() {
    return (
        <div className="about">
            <h1>
                Introduction
            </h1>

            <p>
                Welcome to my visualization website for algorithms and data structures! Here, you can search through a plethora of
                algorithms and data structures and watch how they work and perform visually through simple-to-read animations. In addition
                to the visuals, you can view the analysis of each algorithms through pseudocode. So, if you want to learn how algorithms or data
                structures work, or learn how to calculate their run time or growth function, you came to the right place!
            </p>

            <h1>
                What is a visualizer?
            </h1>

            <p>
                A algorithm visualizer is a tool that allows users to view the steps that algorithms take as they perform through a piece of code.
                By looking at code directly, however, it can be confusing to completely understand what is occurring, especially if it your fist time
                using that algorithm. Visualizers, such as this one, are aim to showcase how algorithms work through simple-to-understand animations.
            </p>

            <h1>
                Inspiration
            </h1>

            <p>
                This visualizer is not a new concept. In fact, there are thousands of them out there and many of them are alike. One of the first is
                Dr. David Galles's visualizer, <a href="https://www.cs.usfca.edu/~galles/visualization/">Data Structure Visualizations</a>, which he created in 2011.
                His work inspired many to create their own visualizers, mainly within university students or professors, and mine is no different.
            </p>

            <p>
                During a lecture in my Analysis of Algorithms (CS 549) class at <a href="https://www.wku.edu/">Western Kentucky University</a> (WKU), my professor was using Dr. Galles's work when he came
                across an issue: you can not enter decimal values as an input. Although Dr. Galles addresses this in his <a href="https://www.cs.usfca.edu/~galles/visualization/faq.html">FAQ</a> page,
                my professor thought it would be a good assignment, and experience for us students, to create our own visualizer for WKU, but with our own modifications. Thus, this project was born!
            </p>

            <p>
                Aside from allowing decimals as user input, I wanted to add some features that were related to the class, other than learning how certain algorithms work. One of the main focus in class
                is to calculate algorithms run-time or growth function in terms of Big-O, Big-Theta, or Big-Omega notation. Therefore, I decided to add a feature in which
                users can view an algorithm growth function in a interactive way, allowing you actively see how they are calculated!
            </p>

            <h1>
                How to use this visualizer?
            </h1>

            <p>

            </p>

        </div>
    );
}