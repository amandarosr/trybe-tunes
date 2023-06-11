import { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';
import Loading from '../components/Loading';

class Album extends Component {
  state = {
    loading: false,
    albumName: '',
    artistName: '',
    songs: '',
  };

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    this.setState({
      loading: true,
    });
    const info = await getMusics(id);
    this.setState({
      albumName: info[0].collectionName,
      artistName: info[0].artistName,
      songs: info.filter((_a, index) => index > 0),
    });
    this.setState({
      loading: false,
    });
  }

  render() {
    const { albumName, artistName, songs, loading } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        { albumName.length && !loading ? (
          <div>
            <h1 data-testid="album-name">{ albumName }</h1>
            <h2 data-testid="artist-name">{ artistName }</h2>
            <ul>
              { songs.map((m) => (
                <MusicCard
                  key={ m.trackId }
                  trackName={ m.trackName }
                  previewUrl={ m.previewUrl }
                  trackId={ m.trackId }
                />
              )) }
            </ul>
          </div>
        ) : <Loading /> }
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default Album;
