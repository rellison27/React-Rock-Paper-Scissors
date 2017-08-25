import React, { Component } from 'react';

export default class App extends Component {
  constructor(){
    super();
    this.state = {
      userPick: null,
      computerPick: null,
      result: null
    }
  }
  
  pickWinner(){
    let result;
    let {userPick, computerPick} = this.state;
    if (userPick === 'rock' && computerPick === 'scissor') {
      result = 'User Wins!';
    }
    else if (userPick === 'paper' && computerPick === 'scissor'){
      result = 'Computer Wins!';
    }
  else if (userPick === 'scissor' && computerPick === 'rock') {
    result = 'Computer Wins!';
  }
  else if (userPick === 'scissor' && computerPick === 'paper'){
    result = 'User Wins!';
  }
  else if (userPick === 'rock' && computerPick === 'paper') {
    result = 'User Wins!';
  }
  else {
    result = 'Tie Game';
  }
  this.setState({result: result})
   let self = this;
   setTimeout(function(){
      self.setState({userPick: null, computerPick: null})
    }, 500)
  }
  
  submitUserPick(userPick){
    this.setState({userPick: userPick}, function(){
      this.generateComputerPick();
    })
    
  }
  
  generateComputerPick(){
    let possiblePicks = [ 'rock', 'paper', 'scissor'];
    let randomNumber = Math.floor(Math.random() * (3 - 0)) + 0;
    
    let randomPick = possiblePicks[randomNumber];
    this.setState({computerPick: randomPick}, function(){
    this.pickWinner();   
    });
  }
  render() {
    return (
      <div>
      <div>
        <img onClick={this.submitUserPick.bind(this, 'rock')} src="./the-rock.png" alt="rock"/>
        <img onClick={this.submitUserPick.bind(this, 'paper')}src="./paper.png" alt="paper"/>
        <img onClick={this.submitUserPick.bind(this, 'scissor')} src="./scissor.png" alt="scissor"/>
      </div>
      <div className = "result">
      {this.state.result}
      </div>
      </div>
    );
  }
}
