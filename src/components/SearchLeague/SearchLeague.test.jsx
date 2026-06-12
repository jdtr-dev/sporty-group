import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SearchLeague from './SearchLeague';

describe('SearchLeague Component', () => {
  test('renders input element', () => {
    render(<SearchLeague value="" onChange={jest.fn()} />);
    const input = screen.getByPlaceholderText('Text input');
    expect(input).toBeInTheDocument();
  });

  test('has correct input type and placeholder', () => {
    render(<SearchLeague value="" onChange={jest.fn()} />);
    const input = screen.getByPlaceholderText('Text input');
    expect(input).toHaveAttribute('type', 'text');
  });

  test('has is-danger class', () => {
    render(<SearchLeague value="" onChange={jest.fn()} />);
    const input = screen.getByPlaceholderText('Text input');
    expect(input).toHaveClass('input');
    expect(input).toHaveClass('is-danger');
  });

  test('displays the passed value prop', () => {
    render(<SearchLeague value="test search" onChange={jest.fn()} />);
    const input = screen.getByDisplayValue('test search');
    expect(input).toBeInTheDocument();
  });

  test('calls onChange when user types', async () => {
    const user = userEvent.setup();
    const onChangeMock = jest.fn();
    render(<SearchLeague value="" onChange={onChangeMock} />);

    const input = screen.getByPlaceholderText('Text input');
    await user.type(input, 'Premier League');

    expect(onChangeMock).toHaveBeenCalled();
  });

  test('updates value when prop changes', () => {
    const { rerender } = render(<SearchLeague value="initial" onChange={jest.fn()} />);
    expect(screen.getByDisplayValue('initial')).toBeInTheDocument();

    rerender(<SearchLeague value="updated" onChange={jest.fn()} />);
    expect(screen.getByDisplayValue('updated')).toBeInTheDocument();
  });
});
