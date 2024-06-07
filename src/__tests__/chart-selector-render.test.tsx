import { expect, test } from 'vitest'
import { render, screen } from '@testing-library/react'
import ChartSelector from '~/app/dashboard/chartSelector'

 
test('Page', () => {
  render(<ChartSelector currentChart='heatmap' setCurrentChart={() => {}}/>)
  expect(screen.getByTestId("chart-selector")).toBeDefined()
})