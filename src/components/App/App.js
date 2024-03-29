import React, { Component } from 'react';
import './App.css';
import InputBox from '../InputBox/InputBox';
import WordBox from '../WordBox/WordBox';
import data from '../../data.json';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentSong: data[Math.floor(Math.random() * data.length)],
      currentWord: 0,
      correct: 0,
      incorrect: 0,
      size: 100,
      lowercaseOnly: false,
      punctuationAllowed: true,
      wrongAllowed: true,
      words: []
    }
    let tempWords = this.state.currentSong.lyrics.split(" ");
    let startIndex = Math.floor(Math.random() * (tempWords.length-100));
    for (let i = startIndex; i < startIndex + this.state.size; i++){
      this.state.words.push(
        {
          "word": tempWords[i],
          "correct": false
        }
      )
    }
  }
  generateNewSong = () => {
    console.log(this.state)
    let newCurrentSong = data[Math.floor(Math.random() * data.length)];
    let tempWords = newCurrentSong.lyrics.split(" ");
    let startIndex = Math.floor(Math.random() * (tempWords.length-100));
    let words = []
    for (let i = startIndex; i < startIndex + this.state.size; i++){
      let word = tempWords[i];
      if (this.state.lowercaseOnly){
        word = word.toLowerCase();
      }
      if (!this.state.punctuationAllowed){
        word = word.replace(/[.,!?]/g,"");
      }
      words.push(
        {
          "word": word,
          "correct": false
        }
      )
    }
    this.setState({
      currentSong: newCurrentSong,
      words: words,
      currentWord: 0,
      correct: 0,
      incorrect: 0,
    })
  }
  changeLowercaseOnly = () => {
    this.setState({lowercaseOnly: !this.state.lowercaseOnly}, () => this.generateNewSong()); // required bc. state change is async
  }
  changePunctuationAllowed = () => {
    this.setState({punctuationAllowed: !this.state.punctuationAllowed}, () => this.generateNewSong()); // required bc. state change is async
  }
  changeTextSize = e => {
    this.setState({size: Number(e.target.value)}, () => this.generateNewSong()); // required bc. state change is async
  }
  checkWord = guess => {
    if (this.state.lowercaseOnly){
      guess = guess.toLowerCase();
    }
    if (this.state.correct + this.state.incorrect < this.state.size){
      let correctBool = true;
      if (guess !== this.state.words[this.state.currentWord].word){
        correctBool = false;
        this.setState({incorrect : this.state.incorrect + 1})
      }
      else{
        this.setState({correct : this.state.correct + 1})
      }
      let newWords = this.state.words;
      newWords[this.state.currentWord].correct = correctBool;
      this.setState({
        currentWord: this.state.currentWord + 1,
        words: newWords
      });
    }
  }
  render(){
    return (
      <div className="app">
        <div className="app-container">
          <h1 className="text-tight">i don't got no type</h1>
          <h4 className="text-tight">a typing game focused on rap lyrics</h4>
          <hr className="divider" />
          <div>
            <span className="input-group">
              <input
                type="checkbox"
                onChange={this.changeLowercaseOnly}
              />
              case insensitive
            </span>{" "}
            <span className="input-group">
              <input
                type="checkbox"
                onChange={this.changePunctuationAllowed}
              />
              no punctuation
            </span>{" "}
            <span className="input-group">
              <select value={this.state.size} onChange={this.changeTextSize}>
                <option value="10">10</option>
                <option value="25">25</option>
                <option value="50">50</option>
                <option value="100">100</option>
                <option value="250">250</option>
              </select>
              {" "} length
            </span>
          </div>
          <div className="row">
            <div className="col text-left">
              {this.state.currentSong.title} - {this.state.currentSong.artist}
            </div>
            <div className="col text-right">
              <div>
                <span className="word-correct">{this.state.correct}</span>/
                <span className="word-incorrect">{this.state.incorrect}</span>/
                {this.state.size}
              </div>
            </div>
          </div>
          <WordBox words={this.state.words} currentWord={this.state.currentWord} />
          <InputBox checkWord={guess => this.checkWord(guess)} />
          <button className="button" onClick={() => this.generateNewSong()}>restart</button>
          <hr className="divider" />
          <footer className="footer">
            <p>
              made with &lt;3 by <a href="https://matthewwang.me/" target="_blank" rel="noopener noreferrer">matt</a> on <a href="https://github.com/malsf21/i-dont-got-no-type" target="_blank" rel="noopener noreferrer">github</a>
            </p>
            <p>
              lyrics from <a href="https://genius.com/" target="_blank" rel="noopener noreferrer">genius</a>
            </p>
          </footer>
        </div>
      </div>
    );
  }
}

export default App;
