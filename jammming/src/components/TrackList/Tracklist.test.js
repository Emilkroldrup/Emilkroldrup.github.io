import React from 'react';
import { render } from '@testing-library/react';
import TrackList from './Tracklist';

describe('TrackList Component', () => {
    test('renders without crashing', () => {
      const mockProps = {
        tracks: [],
        onAdd: jest.fn(),
        onRemove: jest.fn(),
        isRemoval: false,
      };
  
      render(<TrackList {...mockProps} />);
    });
  
    test('renders correct number of Track components', () => {
      const mockProps = {
        tracks: [
          { id: 1, name: 'Song1', artist: 'Artist1', album: 'Album1' },
          { id: 2, name: 'Song2', artist: 'Artist2', album: 'Album2' },
        ],
        onAdd: jest.fn(),
        onRemove: jest.fn(),
        isRemoval: false,
      };
  
      const { getAllByText } = render(<TrackList {...mockProps} />);
      const renderedTracks = getAllByText(/Song[1-2]/); // Matches 'Song1' and 'Song2'
      
      expect(renderedTracks).toHaveLength(2);
    });
});
