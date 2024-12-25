import { cleanup } from "@testing-library/vue";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { MarkdownPreviewTest } from "./helpers/markdown-preview.helper";
import "@testing-library/jest-dom";

describe("markdown preview features", () => {
  let markdownPreview: MarkdownPreviewTest;

  beforeEach(() => {
    markdownPreview = new MarkdownPreviewTest();
  });

  afterEach(() => {
    cleanup();
  });

  describe("view toggling", () => {
    it("should show both editor and preview by default", async () => {
      expect(await markdownPreview.isEditorVisible()).toBe(true);
      expect(await markdownPreview.isPreviewVisible()).toBe(true);
    });

    it("should toggle preview visibility independently", async () => {
      // Initially both visible
      expect(await markdownPreview.isPreviewVisible()).toBe(true);
      expect(await markdownPreview.isEditorVisible()).toBe(true);

      // Hide preview
      await markdownPreview.togglePreview();
      expect(await markdownPreview.isPreviewVisible()).toBe(false);
      expect(await markdownPreview.isEditorVisible()).toBe(true);

      // Show preview again
      await markdownPreview.togglePreview();
      expect(await markdownPreview.isPreviewVisible()).toBe(true);
      expect(await markdownPreview.isEditorVisible()).toBe(true);
    });

    it("should toggle editor visibility independently", async () => {
      // Initially both visible
      expect(await markdownPreview.isEditorVisible()).toBe(true);
      expect(await markdownPreview.isPreviewVisible()).toBe(true);

      // Hide editor
      await markdownPreview.toggleEditor();
      expect(await markdownPreview.isEditorVisible()).toBe(false);
      expect(await markdownPreview.isPreviewVisible()).toBe(true);

      // Show editor again
      await markdownPreview.toggleEditor();
      expect(await markdownPreview.isEditorVisible()).toBe(true);
      expect(await markdownPreview.isPreviewVisible()).toBe(true);
    });

    it("should allow hiding both panels", async () => {
      // Initially both visible
      expect(await markdownPreview.isEditorVisible()).toBe(true);
      expect(await markdownPreview.isPreviewVisible()).toBe(true);

      // Hide both panels
      await markdownPreview.togglePreview();
      await markdownPreview.toggleEditor();

      // Both should be hidden
      expect(await markdownPreview.isEditorVisible()).toBe(false);
      expect(await markdownPreview.isPreviewVisible()).toBe(false);

      // Show editor
      await markdownPreview.toggleEditor();
      expect(await markdownPreview.isEditorVisible()).toBe(true);
      expect(await markdownPreview.isPreviewVisible()).toBe(false);

      // Show preview
      await markdownPreview.togglePreview();
      expect(await markdownPreview.isEditorVisible()).toBe(true);
      expect(await markdownPreview.isPreviewVisible()).toBe(true);
    });
  });

  it("should update preview when typing in editor", async () => {
    await markdownPreview.typeInEditor("# Hello World");
    expect(await markdownPreview.getPreviewContent()).toContain(
      "<h1>Hello World</h1>",
    );

    await markdownPreview.typeInEditor("\n\nThis is a **bold** text");
    expect(await markdownPreview.getPreviewContent()).toContain(
      "<strong>bold</strong>",
    );
  });

  it("should render different markdown elements correctly", async () => {
    const markdownText = `
# Heading 1
## Heading 2

This is a paragraph with *italic* and **bold** text.

- List item 1
- List item 2

1. Numbered item 1
2. Numbered item 2

> This is a blockquote

\`inline code\`

\`\`\`
code block
\`\`\`

[Link](https://example.com)
`;
    await markdownPreview.typeInEditor(markdownText);
    const content = await markdownPreview.getPreviewContent();

    expect(content).toContain("<h1>Heading 1</h1>");
    expect(content).toContain("<h2>Heading 2</h2>");
    expect(content).toContain("<em>italic</em>");
    expect(content).toContain("<strong>bold</strong>");
    expect(content).toContain("<ul>");
    expect(content).toContain("<ol>");
    expect(content).toContain("<blockquote>");
    expect(content).toContain("<code>");
    expect(content).toContain("<pre>");
    expect(content).toContain('<a href="https://example.com">');
  });

  it("should update preview in real-time", async () => {
    await markdownPreview.typeInEditor("# ");
    expect(await markdownPreview.getPreviewContent()).toContain("<h1></h1>");

    await markdownPreview.typeInEditor("# H");
    expect(await markdownPreview.getPreviewContent()).toContain("<h1>H</h1>");

    await markdownPreview.typeInEditor("# Hello");
    expect(await markdownPreview.getPreviewContent()).toContain(
      "<h1>Hello</h1>",
    );
  });

  it("should handle empty input", async () => {
    await markdownPreview.typeInEditor(" ");
    await markdownPreview.clearEditor();
    expect(await markdownPreview.getPreviewContent()).toBe("");
  });
});
