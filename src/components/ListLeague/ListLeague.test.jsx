import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ListLeague from './ListLeague';
import * as leaguesApi from '../../services/leaguesApi';

jest.mock('../../services/leaguesApi');
jest.mock('../BadgeModal/BadgeModal', () => {
  return function MockBadgeModal({ imagen, seasonYears, isOpen, onClose }) {
    return isOpen ? (
      <div data-testid="badge-modal">
        <img src={imagen} alt="badge" />
        <span>{seasonYears}</span>
        <button onClick={onClose}>Close Modal</button>
      </div>
    ) : null;
  };
});

describe('ListLeague Component', () => {
  const mockLeagues = [
    {
      idLeague: '133602',
      strLeague: 'Premier League',
      strSport: 'Soccer',
    },
    {
      idLeague: '133603',
      strLeague: 'Championship',
      strSport: 'Soccer',
    },
    {
      idLeague: '133604',
      strLeague: 'NBA',
      strSport: 'Basketball',
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
    leaguesApi.fetchSeasonBadge.mockResolvedValue({
      seasons: [
        {
          strBadge: 'https://example.com/badge.png',
        },
      ],
    });
  });

  test('renders table with leagues', () => {
    render(<ListLeague leagues={mockLeagues} search="" />);
    
    expect(screen.getByText('Premier League')).toBeInTheDocument();
    expect(screen.getByText('Championship')).toBeInTheDocument();
    expect(screen.getByText('NBA')).toBeInTheDocument();
  });

  test('renders table headers', () => {
    render(<ListLeague leagues={mockLeagues} search="" />);
    
    expect(screen.getByText('League')).toBeInTheDocument();
    expect(screen.getByText('Sport')).toBeInTheDocument();
    expect(screen.getByText('Alternate League')).toBeInTheDocument();
  });

  test('renders View Seasons button for each league', () => {
    render(<ListLeague leagues={mockLeagues} search="" />);
    
    const buttons = screen.getAllByText('View Seasons');
    expect(buttons).toHaveLength(3);
  });

  test('filters leagues based on search prop', () => {
    render(<ListLeague leagues={mockLeagues} search="Premier" />);
    
    expect(screen.getByText('Premier League')).toBeInTheDocument();
    expect(screen.queryByText('Championship')).not.toBeInTheDocument();
    expect(screen.queryByText('NBA')).not.toBeInTheDocument();
  });

  test('search is case-insensitive', () => {
    render(<ListLeague leagues={mockLeagues} search="PREMIER" />);
    
    expect(screen.getByText('Premier League')).toBeInTheDocument();
  });

  test('displays Loading state when fetching badge', async () => {
    const user = userEvent.setup();
    leaguesApi.fetchSeasonBadge.mockImplementation(
      () => new Promise(resolve => setTimeout(() => resolve({
        seasons: [{ strBadge: 'https://example.com/badge.png' }],
      }), 500))
    );

    render(<ListLeague leagues={mockLeagues} search="" />);
    
    const buttons = screen.getAllByText('View Seasons');
    const firstButton = buttons[0];
    await user.click(firstButton);

    const loadingButtons = screen.getAllByText('Loading...');
    expect(loadingButtons.length).toBeGreaterThan(0);
  });

  test('disables button during loading', async () => {
    const user = userEvent.setup();
    leaguesApi.fetchSeasonBadge.mockImplementation(
      () => new Promise(resolve => setTimeout(() => resolve({
        seasons: [{ strBadge: 'https://example.com/badge.png' }],
      }), 100))
    );

    render(<ListLeague leagues={mockLeagues} search="" />);
    
    const buttons = screen.getAllByText('View Seasons');
    await user.click(buttons[0]);

    await waitFor(() => {
      const allButtons = screen.getAllByRole('button');
      const disabledButtons = allButtons.filter(btn => btn.hasAttribute('disabled'));
      expect(disabledButtons.length).toBeGreaterThan(0);
    });
  });

  test('calls fetchSeasonBadge with correct league ID', async () => {
    const user = userEvent.setup();
    render(<ListLeague leagues={mockLeagues} search="" />);
    
    const buttons = screen.getAllByText('View Seasons');
    await user.click(buttons[0]);

    await waitFor(() => {
      expect(leaguesApi.fetchSeasonBadge).toHaveBeenCalledWith('133602');
    });
  });

  test('shows badge modal with fetched data', async () => {
    const user = userEvent.setup();
    render(<ListLeague leagues={mockLeagues} search="" />);
    
    const buttons = screen.getAllByText('View Seasons');
    await user.click(buttons[0]);

    await waitFor(() => {
      expect(screen.getByTestId('badge-modal')).toBeInTheDocument();
    });
  });

  test('closes modal when onClose is called', async () => {
    const user = userEvent.setup();
    render(<ListLeague leagues={mockLeagues} search="" />);
    
    const buttons = screen.getAllByText('View Seasons');
    await user.click(buttons[0]);

    await waitFor(() => {
      expect(screen.getByTestId('badge-modal')).toBeInTheDocument();
    });

    const closeButton = screen.getByText('Close Modal');
    await user.click(closeButton);

    expect(screen.queryByTestId('badge-modal')).not.toBeInTheDocument();
  });

  test('button re-enables after loading completes', async () => {
    const user = userEvent.setup();
    render(<ListLeague leagues={mockLeagues} search="" />);
    
    const buttons = screen.getAllByText('View Seasons');
    const firstButton = buttons[0];
    
    await user.click(firstButton);

    await waitFor(() => {
      expect(screen.getByTestId('badge-modal')).toBeInTheDocument();
    });

    const closeButton = screen.getByText('Close Modal');
    await user.click(closeButton);

    await waitFor(() => {
      expect(screen.getAllByText('View Seasons')[0]).not.toBeDisabled();
    });
  });

  test('renders empty table when no leagues match search', () => {
    render(<ListLeague leagues={mockLeagues} search="Nonexistent" />);
    
    const buttons = screen.queryAllByText('View Seasons');
    expect(buttons).toHaveLength(0);
  });

  test('displays correct sport for each league', () => {
    render(<ListLeague leagues={mockLeagues} search="" />);
    
    const sports = screen.getAllByText(/Soccer|Basketball/);
    expect(sports).toHaveLength(3);
    expect(sports[0]).toHaveTextContent('Soccer');
    expect(sports[2]).toHaveTextContent('Basketball');
  });

  test('has correct Bulma CSS classes on table', () => {
    const { container } = render(<ListLeague leagues={mockLeagues} search="" />);
    const table = container.querySelector('.table');
    
    expect(table).toHaveClass('table');
    expect(table).toHaveClass('is-black');
  });
});
