import MarkdownIt from 'markdown-it';
import { convert } from 'html-to-text';

const md = new MarkdownIt({
  html: true,
});

export const readmeToPlaintext = (readme: string) => {
  // Convert Markdown to HTML
  const HTML = md.render(readme);

  // Convert HTML to plain text, ignoring certain tags that the NLP tools won't be able to process
  const plain = convert(HTML, {
    selectors: [
      { selector: 'em', format: 'skip' },
      { selector: 'pre', format: 'skip' },
      { selector: 'a', format: 'block' },
      { selector: 'ul', format: 'block' },
      { selector: 'ol', format: 'block' },
      { selector: 'img', format: 'skip' },
    ],
  });

  // Remove special Characters
  const plaintext = plain.replace(/[^\x00-\x7F]/g, '');

  return plaintext;
};
