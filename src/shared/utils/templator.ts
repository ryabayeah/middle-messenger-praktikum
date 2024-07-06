import Handlebars from 'handlebars';

const compile = (template: string, props: unknown): string =>
  Handlebars.compile(template)(props);

export { compile };
