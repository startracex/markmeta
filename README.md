# markmeta

Get the metadata in markdown

```ts
import { splitMarkdown } from "@games/markmeta";

// Returns [metadata object, metadata text, content after metadata]
splitMarkdown(`---
title: Title
---

## content
`);
// [{ title: "Title" }, "---\ntitle: Title\n---", "\n\n## content\n"]

splitMarkdown(`---
{
  "title": "Title"
}
---

## content
`);
// [{ title: "Title" }, `---\n{\n  "title": "Title"\n}\n---`, "\n\n## content\n"]

splitMarkdown(`+++
title= Title
+++

## content
`);
// [{ title: "Title" }, `+++\ntitle= Title\n+++`, "\n\n## content\n"]
```
