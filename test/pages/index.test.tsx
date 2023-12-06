import React from 'react'
import { render, screen } from '../testUtils'
import { Home } from '../../pages/index'

describe('Home page', () => {
  it('matches snapshot', () => {
    const { asFragment } = render(<Home />, {})
    expect(asFragment()).toMatchSnapshot()
  })

  it('should render the description', () => {
    render(<Home />)

    const description = screen.getByText(
      'Hi, my name is Ryutaro Kobayashi.I am a software engineer in Japan.',
    )

    expect(description).toBeInTheDocument()
  })

  it('should render the resume', () => {
    render(<Home />)

    const description = screen.getByText('Resume')

    expect(description).toBeInTheDocument()
  })

  it('should render the work experience', () => {
    render(<Home />)

    const description = screen.getByText('Experience')

    expect(description).toBeInTheDocument()
  })

  it('should render the education', () => {
    render(<Home />)

    const description = screen.getByText('Education')

    expect(description).toBeInTheDocument()
  })

  {
    /*
    it('clicking button triggers alert', () => {
      const { getByText } = render(<Home />, {})
      window.alert = jest.fn()
      fireEvent.click(getByText('Test Button'))
      expect(window.alert).toHaveBeenCalledWith('With typescript and Jest')
    })
  */
  }
})
