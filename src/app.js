var React = require('react');

var App = React.createClass({
  getInitialState: function() {
      return {
        commands: {},
        history: [],
        prompt: '# '
      }
  },
  clearHistory: function() {
      this.setState({ history: [] });
  },
  registerCommands: function() {
    this.setState({
      commands: {
        'clear' : this.clearHistory,
        'ls'    : this.listFiles,
        'intro' : this.showWelcomeMsg,
        'help'  : this.showHelp,
        'cat'   : this.catFile,
        'github': this.openLink('https://github.com/pradeepannepu/hodorbot'),
        'hell': this.showHell,
        'whoisgod': this.showGod,
        'whoami': this.showWho,
        'pray': this.showPray,
        'man': this.showHelp
      }
    });
  },
  listFiles: function() {
      this.addHistory("README.md"),
      this.addHistory("loveletter"),
      this.addHistory("secret");
  },
  showWelcomeMsg: function() {
      this.addHistory("I'm Hodor."),
      this.addHistory("Type `help` to see what all commands are available")
  },
  catFile: function(e){ 
     switch(e) {
        case "README.md":
              this.addHistory("I'm Hodor, the Bot."),
              this.addHistory("Thanks for visiting!!")
              break;
        case "loveletter":
              this.addHistory("I'm still writing."),
              this.addHistory("Help me!!")
              break;
        case "secret":
              this.addHistory("Please have some manners."),
              this.addHistory("I said its a secret")
              break;
        default:
              this.addHistory("cat: " + e + ": No such file or directory")
    },
  openLink: function(link) {
      return function() {
        window.open(link, '_blank');
      }
  },
  showHelp: function() {
       this.addHistory("intro - print intro message"),
       this.addHistory("whoami - Know Who you are "),
       this.addHistory("pray - pray words of Fire Gods"),
       this.addHistory("hell - you find out!"),
       this.addHistory("ls - list files"),
       this.addHistory("cat - print contents of a file"),
       this.addHistory("clear - clear screen")
  },
  showHell: function() {
      this.registerCommands(),this.addHistory("Yes! What the hell")
  },
  showPray: function() {
      this.registerCommands(),this.addHistory("LORD OF LIGHT, COME TO US IN OUR DARKNESS"),
      this.addHistory(" WE OFFER YOU THESE FALSE GODS,"),
      this.addHistory("TAKE THEM AND CAST YOUR LIGHT UPON US"),
      this.addHistory("FOR THE NIGHT IS DARK AND FULL OF TERRORS")
  },
  showGod: function() {
      this.registerCommands(),this.addHistory("Rajinikanth")
  },
  showWho: function() {
      this.registerCommands(),this.addHistory("You are Prof.Bora!"),
      this.addHistory("Still trying to find Neural Schema of Chitti."),
      this.addHistory("You can't find here, because i don't have any."),
      this.addHistory("Hodor!")
  },
  componentDidMount: function() {
      var term = this.refs.term.getDOMNode();
      this.registerCommands();
      this.showWelcomeMsg();
      term.focus();
  },
  componentDidUpdate: function() {
      var el = React.findDOMNode(this);
      var container = document.getElementById("main");
      container.scrollTop = el.scrollHeight;
  },
  handleInput: function(e) {
      if (e.key === "Enter") {
          var input_text = this.refs.term.getDOMNode().value;
          var input_array = input_text.split(' ');
          var input = input_array[0];
          var arg = input_array[1];
          var command = this.state.commands[input];

          this.addHistory(this.state.prompt + " " + input_text);

          if (command === undefined) {
              this.addHistory("sh: command not found: " + input);
          } else {
              command(arg);
          }
          this.clearInput();
      }
  },
  clearInput: function() {
      this.refs.term.getDOMNode().value = "";
  },
  addHistory: function(output) {
    var history = this.state.history;
    history.push(output)
    this.setState({
      'history': history
    });
  },
  handleClick: function() {
    var term = this.refs.term.getDOMNode();
    term.focus();
  },
  render: function() {
      var output = this.state.history.map(function(op, i) {
          return <p key={i}>{op}</p>
      });
      return (
        <div className='input-area' onClick={this.handleClick}>
          {output}
          <p>
            <span className="prompt">{this.state.prompt}</span> 
            <input type="text" onKeyPress={this.handleInput} ref="term" />
          </p>
        </div>
      )
  }
});

// render it dawg!
var AppComponent = React.createFactory(App);
React.render(AppComponent(), document.getElementById('app'));
