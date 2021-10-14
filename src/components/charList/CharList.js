import { Component } from 'react';

import './charList.scss';
import MarvelService from '../../services/MarvelService';
import SingleChar from '../singleChar/SingleChar';
import abyss from '../../resources/img/abyss.jpg';

class CharList extends Component {
    state = {
        charList: {}
    }

    marvelService = new MarvelService();

    componentDidMount() {
        this.updateCharList();
        /* this.timerId = setInterval(this.updateChar, 3000); */
    }

    updateCharList = () => {
        this.marvelService
            .getAllCharacters()
            .then(res => {
                this.setState({
                    charList: res
                })
            })
    }

   

    render() {
        return (
            <div className="char__list">
                <ul className="char__grid">
                    <SingleChar/>
                    
                </ul>
                <button className="button button__main button__long">
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }
}

export default CharList;