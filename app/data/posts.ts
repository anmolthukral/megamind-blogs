export interface Post {
  slug: string;
  title: string;
  date: string;
  description: string;
  content: string;
}

export const posts: Post[] = [
  {
    slug: 'comprehensive-performance-analysis',
    title: 'A Comprehensive Examination of Frontend Performance: The React Paradigm',
    date: 'January 28, 2026',
    description: 'A Comprehensive Examination of Frontend Performance: The React Paradigm - A masterclass on verifiable performance principles.',
    content: `
            <p>The prevailing discourse regarding "React performance" often relies on information that is outdated, derived from unverified practices, or fundamentally inaccurate.</p>
            <p>The reality is that performance constitutes a systemic challenge, rather than being solely a "React-specific issue."</p>
            <p>The suboptimal performance of an application is rarely attributable to inherent sluggishness in the React framework; rather, it typically stems from an element within the system executing excessive computation at an inopportune moment.</p>
            <p>Presented herein is a thorough, evidence-based masterclass synthesizing verifiable principles. This document should be consulted prior to the indiscriminate application of constructs such as <code>useMemo</code>.</p>

            <h2>1. Performance is a Systemic Issue, Not a React Framework Limitation</h2>
            <p>React itself demonstrates high computational efficiency.</p>
            <p>Factors that demonstrably degrade performance include:</p>
            <ul>
                <li>Large component hierarchies necessitating intensive rendering operations</li>
                <li>Unnecessary JavaScript execution that blocks the main thread</li>
                <li>Overly large application bundle sizes</li>
                <li>Excessive or inefficient network communication (chatty requests)</li>
                <li>Unoptimized static assets (e.g., images, fonts)</li>
                <li>Integration of third-party scripts</li>
                <li>Overly aggressive or unmanaged animations</li>
            </ul>
            <p>React functions primarily as the rendering mechanism. Optimization should focus on the surrounding application ecosystem.</p>

            <h2>2. Precede Optimization with Measurement — Initial Assumptions are Generally Invalid</h2>
            <p>The hypothesis, "I believe the slowdown is due to excessive re-renders," is empirically inaccurate in the vast majority of cases.</p>
            <p>The essential diagnostic tools, listed in order of operational priority, are:</p>
            <ol>
                <li><strong>Chrome DevTools Performance tab</strong> (for capturing real-world user interaction traces)</li>
                <li><strong>React DevTools Profiler</strong> (for granular analysis of component re-render causation)</li>
                <li><strong>Lighthouse</strong> (for establishing baseline metrics and identifying initial optimization opportunities)</li>
                <li><strong>Web Vitals Chrome extension</strong> or dedicated real-user monitoring (RUM) solutions</li>
            </ol>
            <p>Optimization efforts must never be based on subjective intuition. The process must be: <strong>Record performance → Isolate the protracted task → Implement a targeted corrective action.</strong></p>
            <p>A component re-rendering at a high frequency (e.g., 300 times per second) is not inherently detrimental, provided that:</p>
            <ul>
                <li>The rendering duration is minimal (e.g., less than 1 millisecond per render)</li>
                <li>It does not impede input responsiveness or animation fluidity</li>
            </ul>
            <p>Conversely, any synchronous JavaScript execution that exceeds approximately 50 milliseconds will block the main thread, leading to "jank," delayed user input processing, and dropped animation frames.</p>
            <p>Re-renders should be viewed as a symptom; long-running tasks represent the underlying performance pathology.</p>

            <h2>3. Network Latency Frequently Represents the Principal Bottleneck</h2>
            <p>A significant proportion (estimated at 80%) of perceived application latency in modern environments is attributable to data retrieval wait times.</p>
            <p>This includes issues such as:</p>
            <ul>
                <li>Serialized (waterfall) network requests</li>
                <li>Uncompressed image assets</li>
                <li>Absence of preloading or prefetching strategies</li>
                <li>Improper configuration of caching headers (e.g., missing <code>Cache-Control</code> or <code>stale-while-revalidate</code>)</li>
            </ul>
            <p>Before implementing memoization on a rendered list, one must first ensure that the associated API call is not consuming 1.2 seconds to return data for a small 12-row dataset.</p>
            <p>The utilization of robust data fetching libraries like React Query or SWR, coupled with streaming Server-Side Rendering (SSR) where feasible, consistently yields performance improvements that surpass render-level optimizations.</p>

            <h2>4. The Focus Must Be on Interaction Performance, Not Merely Lighthouse Scores</h2>
            <p>Lighthouse is a valuable diagnostic utility, but it is an inadequate ultimate performance goal.</p>
            <p>The pursuit of a perfect 100/100 score often results in unintended consequences, such as:</p>
            <ul>
                <li>Excessive memoization, which introduces overhead and slows initial load times (cold starts)</li>
                <li>Bloat from inlining excessive critical CSS</li>
                <li>The premature disabling of otherwise functional and necessary features</li>
            </ul>
            <p>The true operational metrics are <strong>Time to Interactive (TTI)</strong>, <strong>Interaction to Next Paint (INP)</strong>, and documented instances of user-reported "jank."</p>
            <p>An application with a 98 Lighthouse score but a 400ms INP provides a demonstrably worse user experience than one with a 78 score but an 80ms INP.</p>

            <h2>5. Memoization is a Strategic Tradeoff, Not a Default Implementation</h2>
            <p>The application of <code>useMemo</code>, <code>useCallback</code>, and <code>React.memo</code> introduces several costs:</p>
            <ul>
                <li>Increased memory consumption (memory pressure)</li>
                <li>Additional computational work for dependency comparison checks</li>
                <li>Elevated complexity in debugging</li>
                <li>Potential for stale closure bugs</li>
            </ul>
            <p>Memoization should be selectively applied only when profiling data confirms wasted rendering cycles and the computational cost of the dependency comparison is less than the cost of the re-render it prevents.</p>
            <p>The established heuristic, as articulated by Dan Abramov, suggests: "Do not memoize until the absence of it demonstrably degrades the developer experience."</p>

            <h2>6. Prioritize Work Reduction Over Work Caching</h2>
            <p>While caching computationally expensive operations is a sound practice, eliminating the need for expensive work is the superior strategy.</p>
            <p>Effective architectural patterns include:</p>
            <ul>
                <li>Deriving data within the render function when the computation is fast (<code>const filtered = items.filter(...)</code>)</li>
                <li>Implementing virtualization for long lists (<code>react-window</code> or <code>tanstack-virtual</code>)</li>
                <li>Offloading intensive computations to Web Workers</li>
                <li>Utilizing Suspense and streaming techniques to defer the rendering of non-critical components</li>
                <li>Decomposing large components into smaller, more focused units</li>
            </ul>
            <p>Fewer lines of executed code inherently translates to faster execution than the most aggressively memoized code.</p>

            <h2>7. Performance Budgets are Architecturally Superior to Performance Hacks</h2>
            <p>Establish and rigorously adhere to stringent performance budgets early in the development lifecycle:</p>
            <ul>
                <li>Target for interactive pages: Less than 100 KB of gzipped JavaScript</li>
                <li>Target for main-thread work per interaction: Less than 50 milliseconds</li>
                <li>Target for Interaction to Next Paint (INP): Less than 200 milliseconds</li>
                <li>Target for Largest Contentful Paint (LCP): Less than 2.5 seconds</li>
            </ul>
            <p>When a budget is exceeded, the imperative is to reform the system architecture, not to introduce temporary "hacks."</p>
            <p>Budgets enforce disciplined architectural decisions. Hacks merely defer the inevitable technical debt.</p>

            <h2>8. Web Vitals Reflect User Experience Pain, Not Developer Vanity</h2>
            <p>While Core Web Vitals are not flawless, they exhibit a strong correlation with critical user metrics such as bounce rates and overall satisfaction:</p>
            <ul>
                <li>LCP (Loading performance)</li>
                <li>FID/INP (Interactivity responsiveness)</li>
                <li>CLS (Visual stability)</li>
            </ul>
            <p>Optimization efforts must be centered on the human user, not on achieving superficial green indicators. An aesthetically pleasing application that is perceptibly slow will lose users more rapidly than a utilitarian, fast-loading one.</p>

            <h2>9. The Ultimate Optimization is the Elimination of Unexecuted Code</h2>
            <p>The most potent form of optimization is the decisive removal of code.</p>
            <p>Key strategies include:</p>
            <ul>
                <li>Deleting unused features</li>
                <li>Avoiding unnecessary polyfills</li>
                <li>Aggressive code-splitting at the route and component level</li>
                <li>Lazy-loading of non-critical routes and components</li>
                <li>Removing third-party trackers or scripts that do not provide sufficient return on investment</li>
                <li>Preferring native browser capabilities over implementing custom JavaScript libraries</li>
            </ul>
            <p>Every line of code that is not shipped to the client is, by definition, infinitely fast.</p>

            <h2>Concluding Performance Checklist</h2>
            <ul>
                <li>Rigorously measure real-world interactions (employing DevTools and React Profiler).</li>
                <li>Prioritize the remediation of long main-thread tasks.</li>
                <li>Optimize the network transaction profile before focusing on render-level optimization.</li>
                <li>Establish and enforce clear performance budgets.</li>
                <li>Adopt the principle: Reduce Work > Cache Work.</li>
                <li>Emphasize INP and perceived user responsiveness over achieving perfect scores.</li>
                <li>Engage in systematic and aggressive code deletion.</li>
            </ul>
            <p>Effective performance management is not about achieving the absolute fastest execution speed; it is about achieving a level of speed sufficiently high that the user perceives the application as instantaneous and seamless.</p>
    `
  },
  {
    slug: 'debunking-usetransition',
    title: 'Debunking useTransition',
    date: 'January 28, 2026',
    description: "Debunking useTransition - Understanding React's useTransition hook and its proper usage.",
    content: `
            <p><code>useTransition</code> is a tool in React’s arsenal that helps you to render some part of the UI in the background. Due to this exact behaviour of this, it gets misunderstood in modern world application as a utility that automatically makes your UI’s performance sharp.</p>
            
            <p>Developers tend to use it, hoping it will solve all the performance issues like a magic pill but it is not true. Its core idea is to work on responsiveness and not on performance or speed.</p>
            
            <p>In order to understand this we need to debunk the following myths about <code>useTransition</code>:</p>

            <h2>1. useTransition is NOT a performance optimisation</h2>
            <p>The whole idea of <code>useTransition</code> is to help your components compute the state updates and async actions passively i.e. offloading it to background tasks.</p>
            <p>This whole concept gets confusing with actual performance of application but its a totally different thing.</p>
            <p>Performance is all about optimizing the execution time or using lesser memory; Transactions wrapped inside <code>useTransition</code> will take the same time to perform the executable task.</p>
            
            <p>What it does is lets React know what needs to be done behind the scene so React doesn’t block the user behaviour because of it.</p>

            <h2>2. A Magic Pill to make UI more responsive</h2>
            <p>Let's consider a common example:</p>
            <p>A common search component in React acts in the following way:</p>
            <p><code>type in search → list filters instantly → if filter is expensive → typing feels laggy/janky.</code></p>
            
            <p>Now let's consider the same thing but with <code>startTransition</code>:</p>
            <p><code>Types in search → a transition gets acted with pending=true → UI remains butter smooth</code></p>
            
            <p>Meanwhile, transition action performs all the heavy compute of filters as background task; as a result Speed stays the same. Jank disappears.</p>

            <h2>3. Prioritizing User Interaction with Interruptible Rendering</h2>
            <p>React achieves interruptible rendering through the combination of concurrent rendering and transitions.</p>
            <p>This mechanism ensures that urgent user interactions, such as <code>onClick</code> or <code>onChange</code> events from direct input, are prioritized and handled immediately.</p>
            <p>Less urgent, transition-wrapped updates can be efficiently managed by pausing and resuming their rendering process.</p>
            <p>This seamless priority management is what makes the user experience for complex features like search and filtering feel so smooth and responsive.</p>

            <h2>4. Heavy computations STILL block JS</h2>
            <p><code>useTransition</code> doesn't offload anything to a web worker or a secondary thread.</p>
            <p>So for CPU intensive tasks (more than 500ms of synchronous JS) always use a web worker.</p>

            <h2>5. Deferring Non-Urgent State Updates</h2>
            <p>Using transitions is beneficial for updates that don't require immediate visual feedback, allowing the application to remain responsive.</p>
            
            <p><strong>Ideal Use Cases:</strong></p>
            <ul>
                <li>Filtering a large list based on search input.</li>
                <li>Loading intensive content when switching tabs.</li>
                <li>Quick actions like applying filters or changing sort order.</li>
                <li>Adding multiple items to large data tables while the user is typing.</li>
            </ul>

            <p><strong>Updates to Avoid Deferring (Bad Use Cases):</strong></p>
            <ul>
                <li>Applying to every single <code>setState</code> call in your application.</li>
                <li>Critical user feedback, such as navigation changes or form submission confirmation.</li>
                <li>Small components where visible lag is not an issue.</li>
            </ul>

            <h2>6. Caution Against Overuse</h2>
            <p>Excessive use of transitions can negatively impact the user experience and make debugging difficult.</p>
            
            <p><strong>Consequences of Overuse:</strong></p>
            <ul>
                <li>Delayed display of helpful elements (e.g., tooltips appearing too late).</li>
                <li>Sluggish performance for essential UI elements (e.g., modals).</li>
                <li>Loading spinners appearing indefinitely because the application is stuck in a 'transitioning' state.</li>
            </ul>
            
            <p>The Guiding Principle: <strong>Only use transitions for updates that are acceptable to feel slightly delayed.</strong></p>

            <h2>7. If you don’t feel jank, you probably don’t need it</h2>
            <p>Most apps with &lt; 1000 elements and reasonable computation don't need <code>useTransition</code>.</p>
            <p>Measure first.</p>
            <p>Open React DevTools → Profiler tab → record → type in your input → look at commit times.</p>
            <p>If interactions are &gt;100ms delayed → consider transition.</p>
            <p>No visible lag? Skip it. Keep code simpler.</p>
    `
  },
  {
    slug: 'react-like-a-ninja',
    title: 'React Like a Ninja',
    date: 'January 28, 2026',
    description: 'React Like a Ninja - Best practices for clean and scalable React code.',
    content: `
            <p>Have you ever seen the code of your peers and thought, "that's one way of doing it" or "I wish I could have thought of that"? And then tried to do the same but ended up overusing things and creating complicated structures that you didn't even understand but knew worked.</p>
            
            <p>If that's what you went for, then my dear friend, what you have done is not ninja code but an example of bad code.</p>
            
            <p>A good React code always follows the following principles to make your applications clean, performant and scalable.</p>

            <h2>1. Components in the Purest Capacity</h2>
            <p>A pure function is one that accepts some parameters and its result will always remain the same.</p>
            <p>Similarly, per React's mental model, "All components should be pure functions of props and state," i.e., renders the same thing for the same set of props and state.</p>
            
            <p><strong>But why should we do that?</strong></p>
            <p>We already have an option to do things differently and it sounds easy so why shouldn't we do that? Because React works best with help of predictability. And predictability leads to easier debugging and reasoning.</p>
            
            <p>So rule of thumb should be: <strong>No forced mutations, no random values and no direct DOM manipulation.</strong></p>

            <p>Here is an example:</p>

            <pre><code class="language-jsx">
let counter = 0;

function InternComponent() {
  counter += 1; // modifies a variable outside the component
  document.title = \`Count: \${counter}\`; // directly manipulates the DOM
  
  return <div>Render count: {counter}</div>;

}
            </code></pre>

            <p><strong>Ninja move:</strong></p>
            <pre><code class="language-jsx">
function NinjaComponent({ count }) {
  return <div>Render count: {counter}</div>;
}
            </code></pre>

            <h2>2. Side Effects are for Sides and Effects</h2>
            <p>Anything that is not rendering is a side effect, be it updating a state or having logic to create or pull data from an API or executing some business logic.</p>
            <p>React provides provisions to run these logics via <code>useEffect</code> or calculations via <code>useMemo</code>. And we should stick to using them.</p>
            
            <p><strong>Rule of thumb:</strong> calculate what needs to be rendered and cumulate what should be or might get rendered.</p>

            <pre><code class="language-jsx">
// Preventing side effects 
useEffect(() => {
  myAPIcall(data)
}, [data]); // dependencies
            </code></pre>

            <h2>3. Prefer Composition over Configuration</h2>
            <p>React frontend is a composition of smaller components and let's stick to this logic entirely. We have the ability to split the code and use them as per our choice, we should capitalize on that the most. Stick to smaller components and larger component trees for easy debugging, better performance and faster recalculation of renders.</p>

            <p>Instead of:</p>
            <pre><code class="language-jsx">
&lt;SuperTable configurable={true} fancyMode={false} ... /&gt;
            </code></pre>

            <p>Do:</p>
            <pre><code class="language-jsx">
&lt;BasicTable&gt;
  &lt;SortableHeader /&gt;
  &lt;PaginatedBody /&gt;
&lt;/BasicTable&gt;
            </code></pre>

            <p>Take components as smaller lego blocks which can be joined to build one big application. This makes your application scalable and easily testable.</p>

            <h2>4. Keep your States Close and Renders Closer</h2>
            <p>Creating unnecessary dependencies leads to extra renders. Only keep the states that are actually required at the level to be lifted up, no higher.</p>
            <p>Your dependency and composition chart should be around the components that use the state and the ones that update it and nothing more.</p>
            <p>Also remember App level states or global states are a scalability nightmare.</p>
            <p>As a ninja way, states that keep on changing should remain in component and component only. Whatever needs to be shared should only be shared. That's the rule of need to know basis.</p>

            <h2>5. Avoid Premature Memoization (Measure First)</h2>
            <p>Memoization patterns like <code>useMemo</code>, <code>useCallback</code>, <code>React.memo</code> are not cheap operations. They take away memory and add an extra layer of complexities over the normal logic. Thus, using them right can only help in optimization not the other way around.</p>
            <p>Again as rule of thumb, write your code first (cleaner and sleeker if possible). Profile all the calculations with React profiler, check for renders then see what can be memorized and what shouldn't.</p>

            <h2>6. Components Should be Adaptable Not Reusable</h2>
            <p>Ironically, this will be a controversial statement; but as far as experience goes, the best and most components are the ones who get built over the iteration not in the first time. With more and more possibilities from React ecosystem, there are more than one ways of making a component reusable. You can use parent components, configure your components via props, use HOCs etc.</p>

            <p>The config and usage comes based upon the requirement. But it should not disobey the idea number one of component purity. Thus to grow into that mindset the minimal and optimal components with right usability and minimality should be built.</p>

            <p>For example let's just take a button component like:</p>

            <pre><code class="language-jsx">
function Button({ variant,buttonText, clickHandler}){
  if(variant==='primary') return &lt;button className='primary' onClick={clickHandler}&gt;{buttonText}&lt;/button&gt;
  if(variant==='secondary') return &lt;button className='secondary' onClick={clickHandler}&gt;{buttonText}&lt;/button&gt;
  return &lt;button className='tertitary' onClick={clickHandler}&gt;{buttonText}&lt;/button&gt;
}
            </code></pre>

            <p>This can be an optimal component as</p>

            <pre><code class="language-jsx">
function Button ({buttonText, clickHandler,className}) {
  return &lt;button className={className} onClick={clickHandler}&gt;{buttonText}&lt;/button&gt;
}
            </code></pre>

            <p>And this can be furthermore used as</p>

            <pre><code class="language-jsx">
function PrimaryButton (props){
  return &lt;Button className='primary' {...props} /&gt;
}
            </code></pre>

            <h2>7. UI State ≠ Server State ≠ Global State</h2>
            <p>Understand what they are and treat them differently:</p>
            <ul>
                <li><strong>UI state:</strong> local and transient, keeps on changing, usually held at client level in order to keep track of your components e.g. <code>isModalOpen</code>, <code>isDropdownOpen</code> etc.</li>
                <li><strong>Server state:</strong> cached and async fetched from the API calls or server operations, usually the data powering your components. Example should be data you receive in your server components from async task. Need to understand what needs to be cached and what should be refetched or reevaluated based upon the need. This preserves and differentiates your component from SSR, SSG, ISR etc.</li>
                <li><strong>Global app state:</strong> Things your applications needs all the time and probably everywhere. Like your auth or theme values, design system tokens etc.</li>
            </ul>
            <p>Mixing them leads to drastic downgrades in performance followed by debugging deadends.</p>

            <h2>8. Applications are Prone to Errors but Users Aren't</h2>
            <p>Make your errors friends; don't let your user experience break even if your code breaks. React offers error boundaries, wrap your components around the same to keep user aware of the breakage and what should be the next step for user in activity cycle so that it doesn't break.</p>

            <pre><code class="language-jsx">
&lt;ErrorBoundary fallback={&lt;SadCatError /&gt;}&gt;
  &lt;MyComponent /&gt;
&lt;/ErrorBoundary&gt;
            </code></pre>
    `
  },
  {
    slug: 'useeffect-vs-uselayouteffect',
    title: 'Understanding useEffect vs. useLayoutEffect in React',
    date: 'January 28, 2026',
    description: 'Understanding useEffect vs. useLayoutEffect - Choosing the right effect hook for smoother UIs.',
    content: `
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
    `
  },
  {
    slug: 'introduction-to-claude-code',
    title: "Introduction to Claude Code: Anthropic's Agentic Coding Tool",
    date: 'February 25, 2026',
    description: "A deep dive into Claude Code — Anthropic's agentic coding tool that lives in your terminal and IDE. Learn how to set it up, master commands, and customize your workflow.",
    content: `
            <p>Claude Code is fundamentally different from the chat-based AI assistants we've grown accustomed to. While tools like Copilot or ChatGPT provide code completions or snippets in a sidebar, Claude Code is <strong>agentic</strong>. It lives in your terminal and IDE, reads your actual files, runs terminal commands on your behalf, and understands your entire codebase in context.</p>

            <p>Think of it as a senior developer pair-programming with you, 24/7, who can handle an 18,000-line React component without breaking a sweat. This guide serves as a comprehensive reference for mastering Claude Code in your daily workflow.</p>

            <h2>1. Slash Commands</h2>
            <p>Built-in commands available in any session. Type <code>/</code> to see the full list.</p>
            <table>
                <thead>
                    <tr><th>Command</th><th>Description</th></tr>
                </thead>
                <tbody>
                    <tr><td><code>/help</code></td><td>Show all available commands</td></tr>
                    <tr><td><code>/clear</code></td><td>Wipe conversation history (Essential for context management)</td></tr>
                    <tr><td><code>/compact</code></td><td>Summarize history to free context window</td></tr>
                    <tr><td><code>/cost</code></td><td>Show token usage and session cost</td></tr>
                    <tr><td><code>/checkpoint</code></td><td>Save current state to rewind to later</td></tr>
                    <tr><td><code>/rewind</code></td><td>Roll back to a previous checkpoint</td></tr>
                    <tr><td><code>/memory</code></td><td>Open and edit CLAUDE.md memory files</td></tr>
                    <tr><td><code>/commit</code></td><td>AI-assisted git commit</td></tr>
                    <tr><td><code>/review</code></td><td>Review code or a PR</td></tr>
                    <tr><td><code>/config</code></td><td>Open interactive settings</td></tr>
                    <tr><td><code>/agents</code></td><td>Browse and create subagents interactively</td></tr>
                    <tr><td><code>/fast</code></td><td>Toggle fast response mode</td></tr>
                </tbody>
            </table>

            <h2>2. Directory Structure</h2>
            <h3>Global (~/.claude/)</h3>
            <p>Applies to all projects on your machine.</p>
            <ul>
                <li><code>settings.json</code>: Personal defaults across all projects</li>
                <li><code>CLAUDE.md</code>: Personal memory loaded in every session</li>
                <li><code>agents/</code>: Global custom subagents</li>
                <li><code>skills/</code>: Global custom skills (slash commands)</li>
            </ul>

            <h3>Workspace (.claude/)</h3>
            <p>Applies to the current project only (Committed to Git).</p>
            <ul>
                <li><code>settings.json</code>: Team settings</li>
                <li><code>CLAUDE.md</code>: Project context and conventions</li>
                <li><code>rules/</code>: Context-aware rules (e.g., <code>rules/typescript/RULES.md</code>)</li>
                <li><code>.mcp.json</code>: MCP server definitions</li>
            </ul>

            <h2>3. CLAUDE.md — Memory Files</h2>
            <p>Claude automatically loads these files as context at the start of every session. They are your briefing documents.</p>
            
            <h3>Example: ~/.claude/CLAUDE.md (Personal Preferences)</h3>
            <pre><code class="language-markdown"># My Claude Preferences
## Style
- Be concise. Skip preamble and filler phrases.
- When suggesting code, show only the diff or changed block.
## Git conventions
- Commit messages: conventional commits (feat:, fix:, chore:)</code></pre>

            <h3>Example: .claude/rules/typescript/RULES.md</h3>
            <pre><code class="language-markdown"># TypeScript Rules
- Prefer \`interface\` over \`type\` for object shapes
- Never use \`any\` — use \`unknown\` or proper generics
- Always type function return values explicitly</code></pre>

            <h2>4. Custom Skills (Slash Commands)</h2>
            <p>Skills let you define your own <code>/commands</code> using Markdown files with YAML frontmatter.</p>
            <p><strong>Location:</strong> <code>.claude/skills/&lt;skill-name&gt;/SKILL.md</code></p>
            
            <h3>Example: Scaffold New Endpoint</h3>
            <pre><code class="language-markdown">---
name: new-endpoint
description: Scaffold a new REST API endpoint
argument-hint: "[METHOD] [/path]"
allowed-tools: Read, Write, Edit, Bash
---
Scaffold a new $1 endpoint at $2.
1. Read src/routes/ to understand the pattern.
2. Create the route handler in src/routes/$2.ts.
3. Add the route to src/routes/index.ts.</code></pre>

            <h2>5. Custom Subagents</h2>
            <p>Subagents are specialized AI workers that Claude can delegate tasks to. Claude picks the right agent automatically based on its description.</p>
            
            <h3>Example: Code Reviewer Agent</h3>
            <pre><code class="language-markdown">---
name: code-reviewer
description: Expert code reviewer for quality, security, and conventions.
tools: Read, Grep, Glob, Bash
model: sonnet
---
You are a senior engineer performing a thorough code review.
1. Run \`git diff HEAD\` to see recent changes.
2. Read modified files and check CLAUDE.md for conventions.
3. Output a structured report with Must Fix, Should Fix, and Suggestions.</code></pre>

            <h2>6. Settings & Hooks</h2>
            <p>Control Claude's behavior and automate tasks using <code>settings.json</code>.</p>
            
            <h3>Auto-lint after every edit (Hook)</h3>
            <pre><code class="language-json">{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Write|Edit",
        "hooks": [
          { "type": "command", "command": "npm run lint --fix" }
        ]
      }
    ]
  }
}</code></pre>

            <h2>7. Pro Tips for Power Users</h2>
            <ul>
                <li><strong>Use <code>@filename</code>:</strong> Reference specific files inline in your prompt for precise context.</li>
                <li><strong>Direct Shell Access:</strong> Use the <code>!</code> prefix (e.g., <code>!npm run test</code>) to run terminal commands without conversational processing.</li>
                <li><strong>The <code>/auto</code> mode:</strong> Toggle auto-edit mode to let Claude iterate on features faster without constant permission prompts.</li>
            </ul>

            <p>Claude Code represents a shift from <em>coding assistants</em> to <em>coding partners</em>. By investing a little time up front in your <code>CLAUDE.md</code> and mastering these advanced features, you'll find it becomes an indispensable part of your daily workflow.</p>
    `
  }
];
