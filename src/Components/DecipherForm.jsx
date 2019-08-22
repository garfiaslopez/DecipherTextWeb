import React, { Fragment, Component } from 'react';

import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import DecipherFormStyles from './DecipherFormStyles';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import { withStyles } from '@material-ui/styles';
import axios from 'axios';
import CircularProgress from '@material-ui/core/CircularProgress';

class DecipherForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      textToDecipher: 'XXXXXXXXXXX',
      result: '',
      pivot: '',
      isLoading: false,
      decipheredSuccessfully: false,
    }
  }
  

  readFile = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.type === 'text/plain') {
        const fileReader = new FileReader();
        fileReader.onloadend = () => {
          const content = fileReader.result;
          this.setState({
            textToDecipher: content,
          });
        }
        fileReader.readAsText(file);
      } else {
        alert("Formato de documento no soportado");
      }
      console.log(file);
    }
  }

  handleClick = () => {
    console.log("Sending text");
    console.log(this.state.textToDecipher);
    this.setState({
      isLoading: true,
    });

    const response = axios.get(`http://decipher:8888/api/decipher.php?text=${this.state.textToDecipher}`).then((response) => {
      console.log(response.data);
      if (response.data.success) {
        this.setState({
          decipheredSuccessfully: true,
          isLoading: false,
          result: response.data.decipheredText,
          pivot: response.data.pivot,
        }); 
      } else {
        this.setState({
          decipheredSuccessfully: false,
          isLoading: false,
          result: 'No es un texto en ingles',
        }); 
      }
    }).catch((error) => { 
      console.log("ON ERROR", error);
    });
  }

  onChangeTextfield = (event) => {
    const text = event.target.value;
    this.setState({
      textToDecipher: text,
    });
  }
  render() {
    return(
      <Fragment>
        <div className={this.props.classes.titleContainer}>
            <Typography 
              variant="h6"
              gutterBottom
              className={this.props.classes.titleLabel}
            >
              Texto:
            </Typography>
            <input
              id="inputUploadFile"
              style={{display: 'none'}}
              type="file"
              name="textToDecipher"
              onChange={this.readFile}
            />
            <label htmlFor="inputUploadFile">
              <Button
                variant="contained"
                component="span"
                className={this.props.classes.buttonLabel}
                color="secondary"
                loading={this.state.isLoading}
              >
                Subir Archivo
              </Button>
            </label>
            
        </div>
        
        <TextField
          id="outlined-multiline-static"
          label="Cadena cifrada"
          multiline
          rows="4"
          defaultValue="XXXXXXXXXXX"
          className={this.props.classes.textField}
          margin="normal"
          variant="outlined"
          value={this.state.textToDecipher}
          onChange={this.onChangeTextfield}
        />
        <Divider className={this.props.classes.divider} variant="middle" />
        <Typography variant="h6" gutterBottom>
          Mensaje Descifrado:
        </Typography>
        <Typography variant="h8" gutterBottom>
          {this.state.result}
        </Typography>
        { this.state.decipheredSuccessfully ? 
          <Fragment>
            <Typography variant="h6" gutterBottom>
              Pivote:
            </Typography>
            <Typography variant="h8" gutterBottom>
              {this.state.pivot}
            </Typography>
          </Fragment>
          : '' 
        }

        <div className={this.props.classes.buttons}>
          {this.state.isLoading ? 
            <CircularProgress color="secondary" /> 
            : 
            <Button
              variant="contained"
              color="primary"
              onClick={this.handleClick}
              className={this.props.classes.button}
              loading={this.state.isLoading}
            >
              Descifrar
            </Button>
          }
        </div>
      </Fragment>
    );
  }
}

export default withStyles(DecipherFormStyles)(DecipherForm);

