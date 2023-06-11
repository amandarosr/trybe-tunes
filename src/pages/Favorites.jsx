import { Component } from 'react';
import Header from '../components/Header';
// import { getFavoriteSongs } from '../services/favoriteSongsAPI';
// import MusicCard from '../components/MusicCard';
// import Loading from '../components/Loading';

class Favorites extends Component {
  // state = {
  //   loading: false,
  //   faves: '',
  // };

  // async componentDidMount() {
  //   this.setState({
  //     loading: true,
  //   });
  //   const list = await getFavoriteSongs();
  //   this.setState({
  //     faves: list,
  //   }, () => this.setState({
  //     loading: false,
  //   }));
  // }

  render() {
    // const { loading, faves } = this.state;
    return (
      <div data-testid="page-favorites">
        <Header />
        {/* { !loading && faves.length ? (
          <ul>
            { faves.map((fav) => (
              <MusicCard
                key={ fav.trackId }
                trackName={ fav.trackName }
                previewUrl={ fav.previewUrl }
                trackId={ fav.trackId }
              />
            )) }
          </ul>) : <Loading /> } */}
      </div>
    );
  }
}

export default Favorites;
