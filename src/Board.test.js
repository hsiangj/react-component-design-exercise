import {render, fireEvent} from "@testing-library/react";
import Board from "./Board";

describe('<Board /> rendering and winning message', () => {
  it('renders without crashing', () => {
    render(<Board />)
  });

  it('shows winning message when lights are out', () => {
    const {getByText} = render(<Board chanceLightStartsOn={0}/>);
    expect(getByText('You win!')).toBeInTheDocument();
  });
});

describe('cell click', () => {
  it('toggles lights correctly when clicked', () => {
    const {getAllByRole} = render(<Board nrows={3} ncols={3} chanceLightStartsOn={1} />);
    const cells = getAllByRole('button');
    
    // all cells start out as lit
    cells.forEach(cell => {
      expect(cell).toHaveClass('Cell-lit');
    });

    // click on middle cell
    fireEvent.click(cells[4]);

    // check only corner cells are lit
    let litIdx = [0,2,6,8];
    cells.forEach((cell, i) => {
      if(litIdx.includes(i)){
        expect(cell).toHaveClass('Cell-lit');
      } else {
        expect(cell).not.toHaveClass('Cell-lit');
      }
    });
  });

  it('shows winning message when game completed', () => {
    const {queryByText, getAllByRole} = render(<Board nrows={1} ncols={3} chanceLightStartsOn={1} />);

    // before click
    expect(queryByText('You win!')).not.toBeInTheDocument();

    // click on middle cell
    const cells = getAllByRole('button');
    fireEvent.click(cells[1]);

    // game should be won 
    expect(queryByText('You win!')).toBeInTheDocument();
  });

})

