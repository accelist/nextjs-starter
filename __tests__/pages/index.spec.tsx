import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import IndexPage from '../../pages/index'
import swr from 'swr';

describe('Index renders Hello World', () => {
  // Checks for Hello World! as heading
  it('renders a heading', () => {
    render(<IndexPage />);

    const heading = screen.getByRole('heading', {
      name: 'Hello World!',
    });

    expect(heading).toBeInTheDocument();
  })

  // Checks for button
  it('handles button', () => {
    render(<IndexPage />);

    const button = screen.getByRole('button', {
      name: 'Test Clicking',
    })

    expect(button).toBeInTheDocument();
  })
})

describe('Index Snapshot Testing', () => {
  // Checks for snapshot of index.tsx
  it('matches snapshot', () => {
    const { container } = render(
      <IndexPage />
    ) 
    expect(container).toMatchSnapshot()
  })
})


describe('Mock examples', () => {
  // Example for mocking functions and callbacks
  it('mocks functions', () => {
    const add = jest.fn(x => x + 1);

    add(25);

    expect(add.mock.results[0]?.value).toBe(26);
  })

  it('mocks modules', () => {
    // Mocks an imported module
    jest.mock('swr');
  });

  it('mocks timers', () => {
    // Mocks timer-related functions
    jest.useFakeTimers();
  })
})

describe('Jest features', () => {
  // Executed before / after all tests in this block
  beforeAll(() => console.log('2 - beforeAll'));
  afterAll(() => console.log('2 - afterAll'));

  // Executed before /after every test in this block
  beforeEach(() => console.log('2 - beforeEach'));
  afterEach(() => console.log('2 - afterEach'));

})
