---
slug: react-like-a-ninja
title: "React Like a Ninja"
date: "January 28, 2026"
description: "React Like a Ninja - Best practices for clean and scalable React code."
---

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
