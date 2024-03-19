/**
 * Create metadata regexp
 * @param spec Spec
 * @returns regexp
 */
export function createRegExp(spec: string): RegExp {
  return new RegExp(`^\\${spec}{3}\r?\n(.+?)\r?\n\\${spec}{3}`, "s");
}

/**
 * Saves the key value of the spec split
 * @param raw Raw
 * @param spec Spec
 * @returns Parse result
 */
export function parseMeta(raw: string, spec: string): Record<string, string> {
  if (raw.startsWith("{")) {
    return JSON.parse(raw);
  }
  return raw.split("\n").reduce((acc: Record<string, string>, line: string) => {
    if (!line.startsWith("#")) {
      const index = line.indexOf(spec);
      if (index > 0) {
        const key = line.slice(0, index).trim();
        const value = line.slice(index + 1).trim();
        acc[key] = value;
      }
    }
    return acc;
  }, {});
}

/**
 * Get metadata regexp match result
 * @param raw Raw input
 * @param spec regexp spec
 * @returns Match result
 */
export function matchMeta(raw: string, spec: string): RegExpMatchArray | null {
  return raw.match(createRegExp(spec));
}

/**
 *
 * @param input Markdown
 * @returns [metadata object, metadata text, content after metadata]
 */
export function splitMarkdown(
  input: string
): [Record<string, string> | null, string, string] {
  let match: RegExpMatchArray | null = matchMeta(input, "-");
  let spec = ":";
  if (!match) {
    match = matchMeta(input, "+");
    spec = "=";
  }
  if (match) {
    const metadata = parseMeta(match[1], spec);
    const metaText = match[0];
    const content = input.slice(metaText.length);
    return [metadata, metaText, content];
  }
  return [null, "", input];
}

/**
 * Get title form content (starts with "# ")
 * @param content Content
 * @returns Title
 */
export function getTitle(content: string): string | undefined {
  return content.match(/(^#|\n#) \S(.*)/)?.[0].trim();
}