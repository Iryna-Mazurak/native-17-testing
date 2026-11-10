
import React from 'react'
import { render, fireEvent, waitFor } from '@testing-library/react-native'
import App from '../App'
import { fetchMeal } from '../services/mealService'

jest.mock('../services/mealService', () => ({
  fetchMeal: jest.fn()
}))

describe('App', () => {
  const mockMeal = {
    idMeal: '52772',
    strMeal: 'Chicken Teriyaki',
    strMealThumb: 'https://example.com/chicken.jpg',
    strInstructions: 'Cook the chicken.'
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('should fetch and display a random meal on app start', async () => {
    fetchMeal.mockResolvedValue(mockMeal)

    const { getByText } = render(<App />)

    await waitFor(() => {
      expect(fetchMeal).toHaveBeenCalledWith('')
      expect(getByText('Chicken Teriyaki')).toBeTruthy()
    })
  })

  test('should display message when no meal is found', async () => {
    fetchMeal.mockResolvedValue(null)

    const { getByText } = render(<App />)

    await waitFor(() => {
      expect(getByText('No meal was found')).toBeTruthy()
    })
  })

  test('should fetch a random meal when input is empty and button is pressed', async () => {
    fetchMeal
    .mockResolvedValueOnce(mockMeal)
    .mockResolvedValueOnce(mockMeal)

    const { getByText, getByRole } = render(<App />)

    await waitFor(() => {
      expect(getByText('Chicken Teriyaki')).toBeTruthy()
    })

    fireEvent.press(getByRole('button', { name: 'Get Meal' }))

    await waitFor(() => {
      expect(fetchMeal).toHaveBeenCalledTimes(2)
      expect(fetchMeal).toHaveBeenLastCalledWith('')
    })
  })

  test('should search for a meal by entered name', async () => {
    fetchMeal
    .mockResolvedValueOnce(mockMeal)
    .mockResolvedValueOnce(mockMeal)

    const { getByPlaceholderText, getByRole } = render(<App />)

    await waitFor(() => {
      expect(fetchMeal).toHaveBeenCalledTimes(1)
    })

    const input = getByPlaceholderText('Enter a meal name')

    fireEvent.changeText(input, 'chicken')

    fireEvent.press(getByRole('button', { name: 'Get Meal' }))

    await waitFor(() => {
      expect(fetchMeal).toHaveBeenLastCalledWith('chicken')
    })
  })

  test('should clear input after searching for a meal', async () => {
    fetchMeal
    .mockResolvedValueOnce(mockMeal)
    .mockResolvedValueOnce(mockMeal)

    const { getByPlaceholderText, getByRole } = render(<App />)

    await waitFor(() => {
      expect(fetchMeal).toHaveBeenCalledTimes(1)
    })

    const input = getByPlaceholderText('Enter a meal name')

    fireEvent.changeText(input, 'chicken')

    fireEvent.press(getByRole('button', { name: 'Get Meal' }))

    await waitFor(() => {
      expect(input.props.value).toBe('')
    })
  })
})
