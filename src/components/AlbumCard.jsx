import { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class AlbumCard extends Component {
  render() {
    const { artistName, albumName, coverUrl, collectionId } = this.props;
    return (
      <div>
        <img
          src={ coverUrl }
          alt={ albumName }
        />
        <h3>{ albumName }</h3>
        <p>{ artistName }</p>
        <Link
          to={ `/album/${collectionId}` }
          data-testid={ `link-to-album-${collectionId}` }
        >
          Mais Informações
        </Link>
        <br />
        <br />
      </div>
    );
  }
}

AlbumCard.propTypes = {
  artistName: PropTypes.string,
  albumName: PropTypes.string,
  coverUrl: PropTypes.string,
}.isRequired;

export default AlbumCard;
