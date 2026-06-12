import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import BadgeModal from './BadgeModal';

describe('BadgeModal Component', () => {
  const defaultProps = {
    imagen: 'https://example.com/badge.jpg',
    seasonYears: '2022-2023',
    isOpen: true,
    onClose: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders nothing when isOpen is false', () => {
    const { container } = render(
      <BadgeModal {...defaultProps} isOpen={false} />
    );
    expect(container.firstChild).toBeNull();
  });

  test('renders modal when isOpen is true', () => {
    const { container } = render(<BadgeModal {...defaultProps} />);
    const img = container.querySelector('img');
    expect(img).toBeInTheDocument();
  });

  test('displays badge image with correct src', () => {
    const { container } = render(<BadgeModal {...defaultProps} />);
    const image = container.querySelector('img');
    expect(image).toHaveAttribute('src', defaultProps.imagen);
  });

  test('displays season years text', () => {
    render(<BadgeModal {...defaultProps} />);
    expect(screen.getByText('2022-2023')).toBeInTheDocument();
  });

  test('calls onClose when close button is clicked', async () => {
    const user = userEvent.setup();
    const onCloseMock = jest.fn();
    render(<BadgeModal {...defaultProps} onClose={onCloseMock} />);

    const closeButton = screen.getByLabelText('close');
    await user.click(closeButton);

    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });

  test('renders modal background', () => {
    const { container } = render(<BadgeModal {...defaultProps} />);
    expect(container.querySelector('.modal-background')).toBeInTheDocument();
  });

  test('has is-active class on modal when open', () => {
    const { container } = render(<BadgeModal {...defaultProps} />);
    expect(container.querySelector('.modal')).toHaveClass('is-active');
  });
});
