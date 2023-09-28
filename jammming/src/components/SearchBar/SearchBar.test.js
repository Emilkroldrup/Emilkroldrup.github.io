import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import SearchBar from './SearchBar';

describe('SearchBar Component', () => {
    test('renders without crashing', () => {
      const mockProps = {
        onSearch: jest.fn(),
      };
  
      render(<SearchBar {...mockProps} />);
    });
  
    test('captures input value correctly', () => {
      const mockProps = {
        onSearch: jest.fn(),
      };
  
      const { getByPlaceholderText } = render(<SearchBar {...mockProps} />);
      const inputElement = getByPlaceholderText("Enter A Song, Album, or Artist");
      fireEvent.change(inputElement, { target: { value: 'Imagine' } });
  
      expect(inputElement.value).toBe('Imagine');
    });
  
    test('calls onSearch prop with current term when "SEARCH" button is clicked', () => {
      const mockProps = {
        onSearch: jest.fn(),
      };
  
      const { getByPlaceholderText, getByText } = render(<SearchBar {...mockProps} />);
      const inputElement = getByPlaceholderText("Enter A Song, Album, or Artist");
      fireEvent.change(inputElement, { target: { value: 'Imagine' } });
  
      fireEvent.click(getByText('SEARCH'));
  
      expect(mockProps.onSearch).toHaveBeenCalledWith('Imagine');
    });
  });