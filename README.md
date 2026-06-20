# Codex Sessions Workspace Patch Kit

Experimental patch kit for the shipped `openai.chatgpt` VS Code extension
bundle.

This is not an upstream source patch and it is not a VS Code extension. It is a
guarded local workaround that edits the installed extension bundle on disk after
checking for known minified-code anchors.

## What It Does

When a VS Code workspace is open, the patch narrows Codex session history
responses to sessions whose saved `cwd` belongs to the current workspace roots.
It also widens `thread/list` requests before filtering so older matching
workspace sessions are less likely to be hidden behind newer sessions from other
workspaces.

When no workspace folder is open, the patch leaves global history behavior
unchanged.

## Safety Model

- `scan` checks whether the installed bundle matches the expected anchors.
- `apply:dry` simulates the patch and reports what would change.
- `apply` creates a backup before writing the installed extension file.
- `restore` restores the latest backup created by this tool.
- If the extension bundle changes shape, the tool reports missing anchors
  instead of guessing.

## Commands

```powershell
npm run scan
npm run apply:dry
npm run apply
npm run restore
```

By default, the tool targets the newest installed extension folder matching
`openai.chatgpt-*` under the current user's VS Code extensions directory.

You can target a specific extension root:

```powershell
node src/index.js scan --extension-root "C:\path\to\openai.chatgpt-version"
node src/index.js apply --extension-root "C:\path\to\openai.chatgpt-version"
```

Reload VS Code after applying or restoring the patch.

## Compatibility

This kit is version-fragile by design because it patches a minified shipped
bundle. A VS Code extension update can overwrite the patch or change the anchor
strings. If that happens, rerun:

```powershell
npm run scan
```

If anchors are missing, the kit needs to be retargeted before applying again.
