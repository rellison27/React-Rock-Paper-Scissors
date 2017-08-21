import React, { Component } from 'react';

export default class App extends Component {

  constructor(){
    super();
    this.state = {
      computerPick: null,
      userPick: null,
      animatedClass: 'animated rotateIn',
      result: null
    }
  }

  submitUserPick(userPick){
    this.setState({userPick: userPick});
    this.generateComputerPick();
  }

  generateComputerPick(){
    let possiblePicks = ['rock', 'paper', 'scissor'];
    // Pick a random number between 0 and 2 and round it to nearest whole number
    let randomNumber = Math.floor(Math.random() * 3 - 0 + 0);
    this.setState({computerPick: possiblePicks[randomNumber]}, function(){
      this.pickWinner();
    })
    
  }

  pickWinner(){
    let result;
    let {userPick, computerPick} = this.state;
    console.log('userPick', userPick, 'computerPick', computerPick);

   if (userPick === 'rock' && computerPick === 'scissor') {
        result = `You win ${userPick} beats ${computerPick}`;
    } 
    else if (userPick === 'paper' && computerPick === 'scissor') {
      result = `Computer wins ${computerPick} beats ${userPick}`;
    }
    else if (userPick === 'scissor' && computerPick === 'rock') {
      result = `Computer wins ${computerPick} beats ${userPick}`;
    }
    else if (userPick === 'scissor' && computerPick === 'paper') {
      result = `You win ${userPick} beats ${computerPick}`;
    }
    else if (userPick === 'rock' && computerPick === 'paper') {
      result = `Computer wins ${computerPick} beats ${userPick}`;
    }
    else if (userPick === 'paper' && computerPick === 'rock') {
     result = `You win ${userPick} beats ${computerPick}`;
    }
    else {
      result = 'tie';
    }

    this.setState({result: result});
    setTimeout(() => {
      this.setState({userPick: null});
    },500)
  }

  render() {
    return (
      <div>
        <div>
          <img className={ this.state.userPick === 'rock' ? this.state.animatedClass : ''} src="./the-rock.png" onClick={this.submitUserPick.bind(this, 'rock')} alt="rock"/>
          <img className={ this.state.userPick === 'paper' ? this.state.animatedClass : ''} src="./paper.png" onClick={this.submitUserPick.bind(this, 'paper')} alt="paper"/>
          <img className={ this.state.userPick === 'scissor' ? this.state.animatedClass : ''} src="./scissor.png" onClick={this.submitUserPick.bind(this, 'scissor')} alt="scissor"/>
        </div>
        <div className="result">
            {this.state.result}
        </div>
      </div>
    );
  }
}
