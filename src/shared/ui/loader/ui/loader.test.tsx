import { render, screen } from '@testing-library/react';
import Loader from './loader';

describe('Component: Loader', () => {
  it('should correctly render', () => {
    const loaderContainerTestId = 'loader-container';

    render(<Loader />);

    expect(screen.getByTestId(loaderContainerTestId)).toBeInTheDocument();
  });
});
