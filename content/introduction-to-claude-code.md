---
slug: introduction-to-claude-code
title: "Introduction to Claude Code: Anthropic's Agentic Coding Tool"
date: "February 25, 2026"
description: "A deep dive into Claude Code — Anthropic's agentic coding tool that lives in your terminal and IDE. Learn how to set it up, master commands, and customize your workflow."
---

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
