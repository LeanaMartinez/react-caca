import React, {Component} from 'react';
import './App.css';

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            seriesList: [],
            seriesEpisodesList: [],
            display: []
        };
    }

    componentDidMount() {

        fetch('seriesList.json',{})
            .then(response => response.json())
            .then(seriesListDepuisFichier => {
                this.setState({seriesList: seriesListDepuisFichier});

            })
            .catch(function (error) {
                console.log(error);
            })

        fetch('seriesEpisodesList.json', {})
            .then(response => response.json())
            .then(seriesEpisodesListDepuisFichier => {
                this.setState({ seriesEpisodesList: seriesEpisodesListDepuisFichier });

            })
            .catch(function (error) {
                console.log(error);
            })

    }


    onKeyUp = (event) => {
        let inputValue = event.target.value.toLowerCase();
        let matchingSeries = [];

        if (inputValue.length !== 0) {
            matchingSeries = this.state.seriesList.filter(
                (a) => (a.seriesName.toLowerCase().indexOf(inputValue) > -1)
            );
        }

        let display = [];
        for (let matchingSerie of matchingSeries) {
            let matchingEpisodesList = this.state.seriesEpisodesList.filter(
                (b) => (b.serie_id === matchingSerie.id)
            );
            display.push({
                'title': matchingSerie.seriesName,
                'episodes': matchingEpisodesList[0].episodes_list
            });
        }
        this.setState({ display: display})
        console.log(display)
    };

    render() {
        return (
            <div>
                <p>Série Name</p>
                <input type="text" onKeyUp={this.onKeyUp} />
                <ul>
                    {this.state.display.length ?
                        this.state.display.map((serie) => (
                            <li key={serie.title}>
                                {serie.title}
                                <ul>
                                    {serie.episodes.map((episode) =>
                                        <li key={episode.episodeName}>
                                            {episode.episodeName}
                                        </li>
                                    )}
                                </ul>
                            </li>
                        ))
                        : <p>Il n{"'"}y a rien, et c{"'"}est fort dommage</p>
                    }
                </ul>
            </div>
        )
    }
}


export default App;