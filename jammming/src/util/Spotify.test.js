import Spotify from "./Spotify";
import '@testing-library/jest-dom';

// Mocking window properties
Object.defineProperty(window, 'location', {
    value: {
      href: 'http://localhost:3000/#access_token=TEST_ACCESS_TOKEN&expires_in=3600'
    },
    writable: true
  });
  
  Object.defineProperty(window, 'history', {
    value: {
      pushState: jest.fn()
    },
    writable: true
  });

// Sample data for mocking fetch responses
const sampleTracksResponse = {
  tracks: {
    items: [
      {
        id: '123',
        name: 'Imagine',
        artists: [{ name: 'John Lennon' }],
        album: { name: 'Imagine' },
        uri: 'spotify:track:123'
      }
    ]
  }
};

const sampleUserResponse = {
  id: 'user_123'
};

const samplePlaylistResponse = {
  id: 'playlist_123'
};

// Mocking fetch globally
global.fetch = jest.fn();

describe('Spotify Module', () => {
  
  beforeEach(() => {
    fetch.mockClear();
  });

  describe('getAccessToken', () => {
    
    it('extracts and returns access token from URL', () => {
      const token = Spotify.getAccessToken();
      expect(token).toBe('TEST_ACCESS_TOKEN');
    });
  });

  describe('search', () => {
    
    it('makes a fetch request with the provided term and returns tracks', async () => {
      fetch.mockResolvedValueOnce({
        json: () => Promise.resolve(sampleTracksResponse),
      });

      const tracks = await Spotify.search('Imagine');
      expect(fetch).toHaveBeenCalledWith(
        'https://api.spotify.com/v1/search?type=track&q=Imagine',
        expect.objectContaining({ 
          headers: { Authorization: 'Bearer TEST_ACCESS_TOKEN' }
        })
      );

      expect(tracks).toEqual([{
        id: '123',
        name: 'Imagine',
        artist: 'John Lennon',
        album: 'Imagine',
        uri: 'spotify:track:123'
      }]);
    });
  });

  describe('savePlaylist', () => {
    
    it('makes the correct sequence of fetch calls to save a playlist', async () => {
      fetch.mockResolvedValueOnce({
        json: () => Promise.resolve(sampleUserResponse),
      }).mockResolvedValueOnce({
        json: () => Promise.resolve(samplePlaylistResponse),
      }).mockResolvedValueOnce({
        json: () => Promise.resolve({}),
      });

      await Spotify.savePlaylist('My Playlist', ['track1_uri', 'track2_uri']);

      expect(fetch).toHaveBeenNthCalledWith(1, 'https://api.spotify.com/v1/me', expect.objectContaining({
        headers: { Authorization: 'Bearer TEST_ACCESS_TOKEN' }
      }));

      expect(fetch).toHaveBeenNthCalledWith(2, 'https://api.spotify.com/v1/users/user_123/playlists', expect.objectContaining({
        method: 'POST',
        body: JSON.stringify({ name: 'My Playlist' }),
      }));

      expect(fetch).toHaveBeenNthCalledWith(3, 'https://api.spotify.com/v1/users/user_123/playlists/playlist_123/tracks', expect.objectContaining({
        method: 'POST',
        body: JSON.stringify({ uris: ['track1_uri', 'track2_uri'] }),
      }));
    });
  });

});