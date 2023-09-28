import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Playlist from './Playlist';

describe('Playlist Component', () => {
  test('renders without crashing', () => {
    const mockProps = {
      onNameChange: jest.fn(),
      playlistTracks: [],
      onRemove: jest.fn(),
      onSave: jest.fn(),
    };

    render(<Playlist {...mockProps} />);
  });

  test('calls onNameChange prop when input value changes', () => {
    const mockProps = {
      onNameChange: jest.fn(),
      playlistTracks: [],
      onRemove: jest.fn(),
      onSave: jest.fn(),
    };

    const { getByDisplayValue } = render(<Playlist {...mockProps} />);
    fireEvent.change(getByDisplayValue('New Playlist'), { target: { value: 'Updated Playlist' } });

    expect(mockProps.onNameChange).toHaveBeenCalled();
  });

  test('calls onSave prop when "SAVE TO SPOTIFY" button is clicked', () => {
    const mockProps = {
      onNameChange: jest.fn(),
      playlistTracks: [],
      onRemove: jest.fn(),
      onSave: jest.fn(),
    };

    const { getByText } = render(<Playlist {...mockProps} />);
    fireEvent.click(getByText('SAVE TO SPOTIFY'));

    expect(mockProps.onSave).toHaveBeenCalled();
  });
});
