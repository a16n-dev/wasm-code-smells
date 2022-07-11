import { parse } from '@textlint/markdown-to-ast';

export const readmeToPlaintext = (readme: string) => {
  const AST = parse(readme);

  console.log(JSON.stringify(AST));
};
