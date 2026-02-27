---
slug: useeffect-vs-uselayouteffect
title: "Understanding useEffect vs. useLayoutEffect in React"
date: "January 28, 2026"
description: "Understanding useEffect vs. useLayoutEffect - Choosing the right effect hook for smoother UIs."
---

<p>Choosing the right effect hook is key to avoiding subtle bugs and UI jank in React applications. The fundamental difference between <code>useEffect</code> and <code>useLayoutEffect</code> is their timing relative to the browser paint cycle. Grasping this mental model will lead to smoother user interfaces.</p>

<h2>useEffect (The Default): Runs AFTER Paint</h2>
<p>This is the standard side-effect hook. Its execution is deferred until after the browser has rendered the screen.</p>

<p><strong>Step-by-Step Flow:</strong></p>
<ol>
    <li>React commits DOM changes. (New state is in the DOM.)</li>
    <li>Browser paints. (User sees the new frame.)</li>
    <li>useEffect callbacks fire. (Your code runs.)</li>
</ol>

<p><strong>Impact:</strong></p>
<ul>
    <li>Any DOM reading or mutation inside <code>useEffect</code> happens on the next visual frame.</li>
    <li><strong>Risk of Flicker:</strong> The user might momentarily see the old layout before your effect runs and potentially causes a layout jump or "flash of wrong content."</li>
    <li><strong>Stale Measurements:</strong> If you read DOM properties like <code>offsetWidth</code> or <code>scrollTop</code>, you might get values from the previous frame.</li>
</ul>

<p><strong>When to Use useEffect (The Default):</strong></p>
<ul>
    <li>Non-DOM-related side effects: Data fetching, logging, setting up subscriptions, timers, or analytics calls.</li>
    <li>The vast majority of side effects.</li>
    <li>When there is no visible flicker or layout issue.</li>
</ul>

<p><strong>Example Use:</strong></p>
<pre><code class="language-jsx">
useEffect(() => {
  // Doesn't need to block the paint cycle
  fetchUser(id).then(setUser);
}, [id]);
</code></pre>

<h2>useLayoutEffect: Runs BEFORE Paint (Synchronous)</h2>
<p>This hook is for interacting with the DOM immediately after React has made its changes, but before the browser paints the new frame.</p>

<p><strong>Step-by-Step Flow:</strong></p>
<ol>
    <li>React commits DOM changes. (New state is in the DOM.)</li>
    <li>useLayoutEffect callbacks fire. (Synchronous, blocks paint)</li>
    <li>Browser does layout and paint. (User sees the final frame.)</li>
</ol>

<p><strong>Impact:</strong></p>
<ul>
    <li>Perfect for when you must read or mutate the DOM and ensure the result is visible before the user sees the screen.</li>
    <li><strong>No Flicker:</strong> Ensures visual correctness by preventing layout shifts or stale measurements from being displayed.</li>
</ul>

<p><strong>The Trade-Off: Potential Jank</strong></p>
<p>Because <code>useLayoutEffect</code> runs synchronously and blocks the main thread before the browser can paint, a long or slow operation inside it will delay the frame, potentially causing jank. It is a trade-off between visual correctness and performance risk.</p>

<h2>When to Use useLayoutEffect (Only When Necessary)</h2>
<p>Only use this hook when a DOM measurement or mutation is required to prevent a visual bug.</p>

<p><strong>Good Reasons:</strong></p>
<ul>
    <li><strong>Scroll Position Fixes:</strong> Setting <code>scrollTop</code> or using <code>scrollIntoView</code> immediately after content changes (e.g., in a chat window).</li>
    <li><strong>Dynamic Positioning:</strong> Measuring an element's size/position to correctly place another element (e.g., tooltips, popovers, arrows).</li>
    <li><strong>Syncing DOM Elements:</strong> Calculating dimensions for sticky headers, fake scroll shadows, or other synchronization tasks.</li>
    <li><strong>Preventing Layout Shift:</strong> Guaranteeing the layout is correct before the first paint.</li>
</ul>

<p><strong>Bad Reasons (Stick to useEffect):</strong></p>
<ul>
    <li>"I want it to run earlier" or "Just to be safe."</li>
    <li>Data fetching.</li>
    <li>Console logging.</li>
</ul>

<p><strong>Example Use:</strong></p>
<pre><code class="language-jsx">
useLayoutEffect(() => {
  if (!ref.current) return;
  // This mutation happens before paint, preventing a flash of the wrong scroll position
  ref.current.scrollTop = ref.current.scrollHeight;
}, [messages]);
</code></pre>

<h2>Avert Performance Pitfalls</h2>
<p><strong>Avoid Layout Thrashing:</strong> Multiple <code>useLayoutEffect</code> calls in a component tree can force numerous synchronous layout recalculations (reflows), leading to a massive performance hit. Batch your measurements when possible.</p>
<p><strong>The Golden Rule:</strong> If you do not see a flicker, wrong initial position, or stale measurements with <code>useEffect</code>, then do not use <code>useLayoutEffect</code>. It is inherently slower and riskier for performance.</p>

<h2>Quick Decision Tree</h2>
<ul>
    <li>Does it read or write DOM layout before the user sees it? <strong>Yes -> useLayoutEffect</strong></li>
    <li>Does it fetch data, log, subscribe, or anything non-DOM-layout? <strong>Yes -> useEffect</strong></li>
    <li>Is there no visual flicker/jump with the default hook? <strong>Yes -> useEffect (Default)</strong></li>
    <li>Can CSS handle the layout/animation instead? <strong>Yes -> Delete the effect entirely</strong></li>
</ul>

<p><strong>Bonus Ninja Tip:</strong> Prioritize CSS solutions (Flexbox, Grid, position: sticky, native transitions) over JavaScript for layout and styling to minimize effect timing problems.</p>
<p>Master the timing model, respect the paint cycle, and write butter-smooth React UIs. 🥷</p>
