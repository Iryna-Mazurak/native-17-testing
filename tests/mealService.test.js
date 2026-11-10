import axios from 'axios'
import { fetchMeal, apiURL } from '../services/mealService'

jest.mock('axios')

describe('mealService', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  const mockMeal = {
    idMeal: '52772',
    strMeal: 'Teriyaki Chicken Casserole',
    strMealThumb: 'https://example.com/meal.jpg',
    strInstructions: 'Cook the chicken.'
  }

  test('should fetch a random meal when search query is empty', async () => {
    axios.get.mockResolvedValue({
      data: { meals: [mockMeal] }
    })

    const result = await fetchMeal('')

    expect(axios.get).toHaveBeenCalledWith(
      `${apiURL}random.php`
    )
    expect(result).toEqual(mockMeal)
  })

  test('should search for a meal by its name', async () => {
    axios.get.mockResolvedValue({
      data: { meals: [mockMeal] }
    })

    const result = await fetchMeal('chicken')

    expect(axios.get).toHaveBeenCalledWith(
      `${apiURL}search.php?s=chicken`
    )
    expect(result).toEqual(mockMeal)
  })

  test('should return undefined when no meals are found', async () => {
    axios.get.mockResolvedValue({
      data: { meals: null }
    })

    const result = await fetchMeal('unknown')

    expect(result).toBeUndefined()
  })

  test('should return null when the request fails', async () => {
    const error = new Error('Network Error')
    const consoleError = jest
    .spyOn(console, 'error')
    .mockImplementation(() => {})

    axios.get.mockRejectedValue(error)

    const result = await fetchMeal('chicken')

    expect(result).toBeNull()
    expect(consoleError).toHaveBeenCalledWith(error)

    consoleError.mockRestore()
  })

  test('should return undefined when response has no data', async () => {
    axios.get.mockResolvedValue({})

    const result = await fetchMeal('chicken')

    expect(result).toBeUndefined()
  })
})
