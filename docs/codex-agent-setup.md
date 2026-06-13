# Codex setup notes for διάνοια

## Recommended approach

Use three layers:

```text
AGENTS.md       = durable project rules
.agents/skills  = reusable workflows
scripts/        = validation tools
```

## When to use each mechanism

| Mechanism            | Use for                                                                  |
| -------------------- | ------------------------------------------------------------------------ |
| `AGENTS.md`          | Always-on project instructions                                           |
| `.agents/skills`     | Repeatable workflows such as processing sources or building MOCs         |
| `.codex/config.toml` | Model, sandbox, approval policy, fallback instruction filenames          |
| MCP                  | External systems such as GitHub, Drive, docs servers, databases          |
| Plugins              | Distributing skills/MCP/app integrations across teams or multiple vaults |

## Suggested first prompts

```text
Read AGENTS.md and summarize how you should work in this vault.
```

```text
Use the vault-reviewer skill to inspect 00 - Inbox and propose a cleanup plan. Do not edit files yet.
```

```text
Use atomic-note-maker to turn this raw note into 3 durable notes and link them to relevant MOCs.
```

```text
Use moc-builder to update the Technology and Humanity MOC based on existing notes. Keep it concise.
```

## Safety defaults

- Keep `approval_policy = "on-request"`.
- Keep `sandbox_mode = "workspace-write"`.
- Keep network access disabled unless a task truly needs live information.
- Do not let the agent delete or rename large batches of files without approval.
