import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import NotFound from '@/app/not-found'

describe('frontend not-found page', () => {
  it('does not render html or body tags', () => {
    const { container } = render(<NotFound />)

    expect(container.querySelector('html')).toBeNull()
    expect(container.querySelector('body')).toBeNull()
  })
})
