import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Track from './Track';
import '@testing-library/jest-dom';

describe('Track Component', () => {
    test('renders without crashing', () => {
      const mockProps = {
        track: { name: 'Imagine', artist: 'John Lennon', album: 'Imagine' },
        onAdd: jest.fn(),
        onRemove: jest.fn(),
        isRemoval: false,
      };
  
      render(<Track {...mockProps} />);
    });
  
    test('displays track information correctly', () => {
      const mockProps = {
        track: { name: 'Imagine', artist: 'John Lennon', album: 'Imagine' },
        onAdd: jest.fn(),
        onRemove: jest.fn(),
        isRemoval: false,
      };
  
      const { getByText } = render(<Track {...mockProps} />);
      expect(getByText('Imagine')).toBeInTheDocument();
      expect(getByText('John Lennon | Imagine')).toBeInTheDocument();
    });
  
    test('renders "+" button and calls onAdd when clicked', () => {
      const mockProps = {
        track: { name: 'Imagine', artist: 'John Lennon', album: 'Imagine' },
        onAdd: jest.fn(),
        onRemove: jest.fn(),
        isRemoval: false,
      };
  
      const { getByText } = render(<Track {...mockProps} />);
      fireEvent.click(getByText('+'));
  
      expect(mockProps.onAdd).toHaveBeenCalled();
    });
  
    test('renders "-" button and calls onRemove when clicked', () => {
      const mockProps = {
        track: { name: 'Imagine', artist: 'John Lennon', album: 'Imagine' },
        onAdd: jest.fn(),
        onRemove: jest.fn(),
        isRemoval: true,
      };
  
      const { getByText } = render(<Track {...mockProps} />);
      fireEvent.click(getByText('-'));
  
      expect(mockProps.onRemove).toHaveBeenCalled();
    });
  });