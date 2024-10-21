import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import { describe, it } from 'vitest'
import ItemList from '../components/ItemList'

describe('ItemList Component', () => {
  it('should render the form fields and add button', () => {
    render(<ItemList />)

    expect(screen.getByPlaceholderText('Nome')).toBeInTheDocument()

    expect(screen.getByPlaceholderText('Descrição')).toBeInTheDocument()

    expect(screen.getByLabelText('Prioridade')).toBeInTheDocument()

    expect(
      screen.getByRole('button', { name: /adicionar/i })
    ).toBeInTheDocument()
  })
})
