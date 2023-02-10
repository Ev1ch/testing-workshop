import { render, screen } from '@testing-library/react';
import Button from './Button'
 
describe('Button', () => {
  it('rendered component should be in document', () => {
    render(<Button />);
 
    const button = screen.getByRole('button');
 
    expect(button).toBeInTheDocument();
  });
});