## ROCK, PAPER, SCISSORS:
  The final solution is in the solutions folder

### STEP:    
Create a wireframe.   What do we want our final app to look like?

For this app, we will have a top section that displays 3 images (rock, paper, and scissors).  We want the user to be able to click on one of these images to select their choice.  After an image is clicked we will determine whether the user beat the computer or not and display the result.

****As a BONUS, we will add a CSS animation library to animate the user's selected image.

### STEP:
Determine what we need to keep track of in order to build this application?  
 
 Rules of the Game:
  * Rock beats Scissor
  * Paper beats Rock
  * Scissor beats Paper

Variables:
  * User's pick
  * Computer's pick
  * Result



### STEP:
Setup our component to store the variables that we will need for the application. React uses an object variable called 'state' to keep track of the current variables used within a component.  Any time the 'state' is changed, React will re-render the DOM (view of the application).  State is declared and initialized in the constructor function.

```javascript
export default class App extends Component {

  constructor(){
    super();
    //Store the state of our application here
    this.state = {
      computerPick: null,
      userPick: null,
      result: null
    }
  }

  render() {
    return (
      <div>
      </div>
    );
  }
}
```


### STEP:
Create the display part of our JSX code in order to display our 3 images side by side and the result of our game below these images.  JSX stand for Javascript XML.  JSX allows us to mix HTML code with Javascript code in order to render a React application.

```javascript
export default class App extends Component {


  render() {
    return (
      <div>
        <div>
        //Add our three images to a div.  
          <img src="./the-rock.png" alt="rock"/>
          <img src="./paper.png" alt="paper"/>
          <img src="./scissor.png" alt="scissor"/>
        </div>
        //Add a div to display our result (we are giving it a className of result that we can use to style our result later)
        <div className="result">
        </div>
      </div>
    );
  }
}
```




### STEP:  
We need to create a function that will generate a random computer pick.  Javascript gives us a library called Math that we will use to generate a random number between 0 and 2 in order to choose a random computer pick of either rock, paper, or scissor.  Once we have the random number we can use it as an index in order to select the computer's choice from an array of possible choices.
Then we will update our state again with the computer's pick and once that state is updated we will call a function called 'pickWinner' that we will define later.  This 'pickWinner' function will return the winner of the game.

React gives us a method called 'setState' that allows us to update the state.  The setState function takes an argument of the state variable that we want to update and the value that we want to update that state variable to.  In this case we want to update the computerPick variable to the result of our randomly selected choice.

```javascript
export default class App extends Component {


//Create a function to make a random computer choice
  generateComputerPick(){
    let possiblePicks = ['rock', 'paper', 'scissor'];
    // Pick a random number between 0 and 2 and round it to nearest whole number using Math.floor
    let randomNumber = Math.floor(Math.random() * 3 - 0 + 0);
    //update the computerPick in our state object
    this.setState({computerPick: possiblePicks[randomNumber]}, function(){
      //after the state is updated we call the pickWinner function that we will define later
      this.pickWinner();
    })
  }

  render() {
    return (
      <div>
        <div>
          <img src="./the-rock.png" alt="rock"/>
          <img src="./paper.png" alt="paper"/>
          <img src="./scissor.png" alt="scissor"/>
        </div>
        <div className="result">
        </div>
      </div>
    );
  }
}
```


### STEP:
We need to create a click event handler to get the user's pick depending on which image they click.  React gives us built in event handler methods to use within our application.  In this case we will use the 'onClick' event handler on each of the 3 images to let us save the user's pick when a user clicks an image.  When the user clicks on an image we will run a function that we will call 'submitUserPick' that will take an argument of the user's pick and update the 'state' of our application to match the user's pick.  And then we will call the 'generateComputerPick' function that we just defined.  

```javascript
export default class App extends Component {

   constructor(){
    super();
    this.state = {
      computerPick: null,
      userPick: null,
      result: null
    }
  }

  submitUserPick(userPick){
    this.setState({userPick: userPick}, function(){
      this.generateComputerPick();
    });
  }



  render() {
    return (
      <div>
        <div>
        //add onClick event handler that will pass the user's pick to a function called submitUserPick
          <img onClick={this.submitUserPick.bind(this, 'rock')} src="./the-rock.png" alt="rock"/>
          <img onClick={this.submitUserPick.bind(this, 'paper')} src="./paper.png" alt="paper"/>
          <img onClick={this.submitUserPick.bind(this, 'scissor')} src="./scissor.png" alt="scissor"/>
        </div>
        <div className="result">
        </div>
      </div>
    );
  }
}
```
 



 
### STEP:  
We need to create the 'pickWinner' function that will return the correct user depending on the user and computer pick variables that we have in our state object.  In tht funciton we will use a series of if, else if, else conditional statements to return the winner.  We will update our result variable in our state object and after a half second we will reset the userPick and computerPick to null so that we can play again.

```javascript
 export default class App extends Component {

   pickWinner(){
    let result;  //initialize our result variable
    let {userPick, computerPick} = this.state; // get the userPick and computerPick from our state object using the ES6 spread operator

  //determine who is the winner based on the userPick and computerPick and user string template syntax to add our variables to our //result string

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

//update the result variable in our state, then use a setTimeout to update our computerPick and userPick both to null after 500 //milliseconds (a half second)

    this.setState({result: result});
      setTimeout(() => {
        this.setState({userPick: null, computerPick: null});
    },500)

  }


  render() {
    return (
      <div>
        <div>
          <img onClick={this.submitUserPick.bind(this, 'rock')} src="./the-rock.png" alt="rock"/>
          <img onClick={this.submitUserPick.bind(this, 'paper')} src="./paper.png" alt="paper"/>
          <img onClick={this.submitUserPick.bind(this, 'scissor')} src="./scissor.png" alt="scissor"/>
        </div>
        <div className="result">
        </div>
      </div>
    );
  }
}
```

### STEP:
Here will will display the result of the pickWinner function to the user.  

```javascript
export default class App extends Component {

  render() {
    return (
      <div>
        <div>
          <img onClick={this.submitUserPick.bind(this, 'rock')} src="./the-rock.png" alt="rock"/>
          <img onClick={this.submitUserPick.bind(this, 'paper')} src="./paper.png" alt="paper"/>
          <img onClick={this.submitUserPick.bind(this, 'scissor')} src="./scissor.png" alt="scissor"/>
        </div>
        <div className="result">
        //React allows us to display variable to the user by using the { } syntax and putting our variables in between those brackets
        { this.state.result }
        </div>
      </div>
    );
  }
}
```


### **BONUS STEP:
We want to add an animation to our image when the user makes their choice.  To do this we will add a css library to the top of our index.html page in our public directory.

Copy and paste this into your index.html:

<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.5.2/animate.min.css">


Add an 'animatedClass' variable to our state in the constructor and set it equal to 'animated rotateIn'.  We now want to set up a conditional className on each of the images that will apply this class to whichever image the user picks.  We use a ternary conditional statement to apply this class.  

Example for the rock image:  If this.state.userPick is equal to 'rock' we add the className that we have stored in our state object.  If not, we make the className an empty string.

  <img className={ this.state.userPick === 'rock' ? this.state.animatedClass : ''} src="./the-rock.png" onClick={this.submitUserPick.bind(this, 'rock')} alt="rock"/>


```javascript
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
```


### **BONUS STEP:
Style your app to look more appealing using index.css.