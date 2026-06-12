import { render, screen } from '@testing-library/react';
import NavBar from './NavBar';

describe('NavBar Component', () => {
  test('renders without crashing', () => {
    render(<NavBar />);
    expect(screen.getByRole('navigation')).toBeInTheDocument();
  });

  test('has correct aria-label for navigation', () => {
    render(<NavBar />);
    const nav = screen.getByRole('navigation');
    expect(nav).toHaveAttribute('aria-label', 'main navigation');
  });

  test('renders logo image with correct attributes', () => {
    render(<NavBar />);
    const logo = screen.getByAltText('Sporty Group Logo');
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute('src', 'https://sportygroup.com/images/logo.svg');
  });

  test('has correct Bulma CSS classes', () => {
    render(<NavBar />);
    const nav = screen.getByRole('navigation');
    expect(nav).toHaveClass('navbar');
    expect(nav).toHaveClass('is-flex');
    expect(nav).toHaveClass('is-justify-content-center');
    expect(nav).toHaveClass('is-align-items-center');
  });
});
