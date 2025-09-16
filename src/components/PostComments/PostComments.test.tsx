import { fireEvent, render, screen } from '@testing-library/react';
import PostComments from '.';

describe('Teste para o componente PostComments', () => {
  it('Deve renderizar o componente corretamente', () => {
    render(<PostComments />);
    expect(screen.getByTestId('comment-button')).toBeInTheDocument();
  });

  it('Deve adicionar dois comentários na lista', () => {
    render(<PostComments />);

    const input = screen.getByTestId('comment-input') as HTMLTextAreaElement;
    const button = screen.getByTestId('comment-button');

    // Primeiro comentário
    fireEvent.change(input, { target: { value: 'Primeiro comentário' } });
    fireEvent.click(button);

    // Segundo comentário
    fireEvent.change(input, { target: { value: 'Segundo comentário' } });
    fireEvent.click(button);

    const comments = screen.getAllByTestId('comment-item');
    expect(comments).toHaveLength(2);
    expect(comments[0]).toHaveTextContent('Primeiro comentário');
    expect(comments[1]).toHaveTextContent('Segundo comentário');
  });
});
