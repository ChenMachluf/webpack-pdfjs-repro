import React, { Component } from 'react';
import PDFJS from 'pdfjs-dist/webpack';

class App extends Component {
  constructor() {
    super();
    this.state = {pdfs: []};
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    const self = this;
    for (const file of event.target.files) {
      const reader = new FileReader();
      reader.onload = function() {
        const typedArray = new Uint8Array(this.result);
        PDFJS.getDocument(typedArray).then(pdf => {
          self.setState({pdfs: self.state.pdfs.concat(pdf)});
        });
      };
      reader.readAsArrayBuffer(file);
    }
  }

  render() {
    return (
      <div>
        <input type="file" multiple onChange={this.handleInputChange}/>
        <ul>
          {this.state.pdfs.map((pdf, i) => <li key={i}>{pdf.numPages}</li>)}
        </ul>
      </div>
    );
  }
}

export default App;
