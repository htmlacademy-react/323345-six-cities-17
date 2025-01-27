import { render, screen } from '@testing-library/react';
import StarElement from './star-element';


describe('Component: Loader', () => {
  it('should correctly render', () => {
    const starContainerTestId = 'star-container';
    const defaultCallBack = () => true;

    render(<StarElement value={3} formChangeHandle={defaultCallBack} isChecked={false} isdisabled={false} />);

    expect(screen.getByTestId(starContainerTestId)).toBeInTheDocument();
  });
});
