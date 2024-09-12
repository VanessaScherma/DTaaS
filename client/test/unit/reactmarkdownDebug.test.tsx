import { render } from '@testing-library/react';
import { renderMarkdown } from '../../src/reactmarkdownDebug';

describe('renderMarkdown', () => {
  it('should render the markdown content correctly', () => {
    const markdown = '# Hello World';
    const { getByText } = render(renderMarkdown(markdown));
    
    expect(getByText('Hello World')).toBeInTheDocument();
  });
});
