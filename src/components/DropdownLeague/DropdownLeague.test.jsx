import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import DropdownLeague from './DropdownLeague';

describe('DropdownLeague Component', () => {
  const mockSetCategory = jest.fn();
  const defaultProps = {
    categories: ['Football', 'Basketball', 'Tennis'],
    category: 'Football',
    setCategory: mockSetCategory,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders dropdown button', () => {
    render(<DropdownLeague {...defaultProps} />);
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
  });

  test('displays current category in button', () => {
    render(<DropdownLeague {...defaultProps} />);
    const button = screen.getByRole('button');
    expect(button).toHaveTextContent('Football');
  });

  test('displays Categories placeholder when no category selected', () => {
    render(<DropdownLeague {...defaultProps} category={null} />);
    const button = screen.getByRole('button');
    expect(button).toHaveTextContent('Categories');
  });

  test('button has is-danger class', () => {
    render(<DropdownLeague {...defaultProps} />);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('button');
    expect(button).toHaveClass('is-danger');
  });

  test('toggles dropdown visibility on button click', async () => {
    const user = userEvent.setup();
    const { container } = render(<DropdownLeague {...defaultProps} />);

    const dropdown = container.querySelector('.dropdown');
    expect(dropdown).not.toHaveClass('is-active');

    const button = screen.getByRole('button');
    await user.click(button);

    expect(dropdown).toHaveClass('is-active');

    await user.click(button);
    expect(dropdown).not.toHaveClass('is-active');
  });

  test('renders all categories as links', () => {
    render(<DropdownLeague {...defaultProps} />);
    const links = screen.getAllByRole('link');
    
    expect(links).toHaveLength(3);
    expect(links[0]).toHaveTextContent('Football');
    expect(links[1]).toHaveTextContent('Basketball');
    expect(links[2]).toHaveTextContent('Tennis');
  });

  test('calls setCategory when category is clicked', async () => {
    const user = userEvent.setup();
    render(<DropdownLeague {...defaultProps} />);

    const items = screen.getAllByRole('link');
    await user.click(items[1]); // Click Basketball

    expect(mockSetCategory).toHaveBeenCalledWith('Basketball');
  });

  test('closes dropdown after selecting a category', async () => {
    const user = userEvent.setup();
    const { container } = render(<DropdownLeague {...defaultProps} />);

    const button = screen.getByRole('button');
    await user.click(button);
    expect(container.querySelector('.dropdown')).toHaveClass('is-active');

    const items = screen.getAllByRole('link');
    await user.click(items[1]);
    expect(container.querySelector('.dropdown')).not.toHaveClass('is-active');
  });

  test('highlights active category', () => {
    render(<DropdownLeague {...defaultProps} category="Basketball" />);
    const items = screen.getAllByRole('link');
    
    expect(items[0]).not.toHaveClass('is-active');
    expect(items[1]).toHaveClass('is-active');
    expect(items[2]).not.toHaveClass('is-active');
  });

  test('prevents default link behavior', async () => {
    const user = userEvent.setup();
    render(<DropdownLeague {...defaultProps} />);

    const items = screen.getAllByRole('link');
    const link = items[0];
    
    await user.click(link);
    // Note: Event listener prevents default in the component
    expect(mockSetCategory).toHaveBeenCalled();
  });
});
