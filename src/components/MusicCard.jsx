import { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import getMusics from '../services/musicsAPI';
import Loading from './Loading';

class MusicCard extends Component {
  state = {
    favorite: false,
    loading: false,
    faves: '',
  };

  async componentDidMount() {
    await this.getFavesChecks();
    const { faves } = this.state;
    const { trackId } = this.props;
    if (faves.length) {
      const verify = localStorage.getItem('favorite_songs').match(trackId);
      if (verify) {
        this.setState({
          favorite: true,
        });
      }
    }
  }

  manageFaves = async (id) => {
    if (!localStorage.getItem('favorite_songs')
    || !localStorage.getItem('favorite_songs').match(id)) {
      this.setState({
        loading: true,
      });
      const obj = await getMusics(id);
      await addSong(obj[0]);
      this.setState({
        loading: false,
      });
    } else if (localStorage.getItem('favorite_songs').match(id)) {
      this.setState({
        loading: true,
      });
      const obj = await getMusics(id);
      await removeSong(obj[0]);
      this.setState({
        loading: false,
        favorite: false,
      });
    }
  };

  handleChange = ({ target }) => {
    const { name } = target;
    const value = target.type === 'checkbox' ? 'checked' : 'value';
    this.setState({
      [name]: value,
    }, this.getFavesChecks);
  };

  getFavesChecks = async () => {
    const list = await getFavoriteSongs();
    this.setState({
      faves: list,
    });
  };

  render() {
    const { trackName, previewUrl, trackId } = this.props;
    const { favorite, loading } = this.state;
    this.getFavesChecks();
    return (
      <div>
        <h3>{ trackName }</h3>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          <code>audio</code>
        </audio>
        <label htmlFor="favorite">
          <input
            type="checkbox"
            id="favorite"
            name="favorite"
            data-testid={ `checkbox-music-${trackId}` }
            onClick={ () => this.manageFaves(trackId) }
            onChange={ this.handleChange }
            checked={ favorite }
          />
          Favorita
        </label>
        { loading ? <Loading /> : null }
      </div>
    );
  }
}

MusicCard.propTypes = {
  trackName: PropTypes.string,
  previewUrl: PropTypes.string,
  trackId: PropTypes.number,
  faves: PropTypes.arrayOf(
    PropTypes.shape({
      trackId: PropTypes.number,
    }),
  ),
}.isRequired;

export default MusicCard;
