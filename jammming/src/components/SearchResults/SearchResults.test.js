import React from 'react';
import { render } from '@testing-library/react';
import SearchResults from './SearchResults';
import '@testing-library/jest-dom';


describe('SearchResults Component', () => {
    test('renders without crashing', () => {
      const mockProps = {
        searchResults: [],
        onAdd: jest.fn(),
      };
  
      render(<SearchResults {...mockProps} />);
    });
  
    test('displays "Results" header', () => {
      const mockProps = {
        searchResults: [],
        onAdd: jest.fn(),
      };
  
      const { getByText } = render(<SearchResults {...mockProps} />);
      expect(getByText('Results')).toBeInTheDocument();
    });
  
    test('renders TrackList with correct props', () => {
      const mockProps = {
        searchResults: [{ id: 1, name: 'Track 1' }],
        onAdd: jest.fn(),
      };
  
      const { getByText } = render(<SearchResults {...mockProps} />);
      
      // Assuming TrackList renders tracks by their name.
      expect(getByText('Track 1')).toBeInTheDocument();
    });
  });