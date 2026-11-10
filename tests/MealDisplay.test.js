import React from 'react'
import { render } from '@testing-library/react-native'
import MealDisplay from '../components/MealDisplay'

describe('MealDisplay', () => {
  const mockMeal = {
    strMeal: 'Chicken Teriyaki',
    strMealThumb: 'https://example.com/chicken.jpg',
    strInstructions: 'Cook chicken with teriyaki sauce.'
  }

  test('should display meal name', () => {
    const { getByText } = render(
      <MealDisplay meal={mockMeal} />
    )

    expect(getByText('Chicken Teriyaki')).toBeTruthy()
  })

  test('should display meal instructions', () => {
    const { getByText } = render(
      <MealDisplay meal={mockMeal} />
    )

    expect(
      getByText('Cook chicken with teriyaki sauce.')
    ).toBeTruthy()
  })

  test('should display meal image with correct source', () => {
    const { getByTestId } = render(
      <MealDisplay meal={mockMeal} />
    )

    const image = getByTestId('mealImage')

    expect(image.props.source).toEqual({
      uri: 'https://example.com/chicken.jpg'
    })
  })
})
