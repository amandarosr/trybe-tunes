import { Component } from 'react';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Header from '../components/Header';
import Loading from '../components/Loading';
import AlbumCard from '../components/AlbumCard';

class Search extends Component {
  state = {
    searchInput: '',
    loading: false,
    artist: '',
    albums: '',
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  clickSearchButton = async () => {
    const { searchInput } = this.state;
    this.setState({
      loading: true,
      artist: searchInput,
    });
    const info = await searchAlbumsAPI(searchInput);
    this.setState({
      searchInput: '',
      albums: info,
    }, () => this.setState({
      loading: false,
    }));
  };

  render() {
    const { searchInput, loading, albums, artist } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <br />
        { !loading ? (
          <form>
            <input
              type="text"
              data-testid="search-artist-input"
              name="searchInput"
              value={ searchInput }
              onChange={ this.handleChange }
              placeholder="Nome do Artista"
            />
            <button
              type="submit"
              data-testid="search-artist-button"
              disabled={ searchInput.length < 2 }
              onClick={ this.clickSearchButton }
            >
              Pesquisar
            </button>
          </form>) : <Loading /> }
        { albums.length ? (
          <div>
            <h3>{`Resultado de álbuns de: ${artist}` }</h3>
            <ul>
              { albums.map((a) => (
                <AlbumCard
                  key={ a.collectionId }
                  albumName={ a.collectionName }
                  artistName={ a.artistName }
                  coverUrl={ a.artworkUrl100 }
                  collectionId={ a.collectionId }
                />
              )) }
            </ul>
          </div>) : null }
        { !albums.length && artist.length
          ? <span>Nenhum álbum foi encontrado</span> : null }
      </div>
    );
  }
}

export default Search;
