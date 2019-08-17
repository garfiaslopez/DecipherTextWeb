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
      isLoading: false,
      decipheredSuccessfully: false,
    }
  }

  handleClick = () => {
    console.log("Sending text");
    console.log(this.state.textToDecipher);
    this.setState({
      isLoading: true,
    });

    const response = axios.get(`http://decipher:8888/api/decipher.php?text=${this.state.textToDecipher}`).then((response) => {
      console.log(response);
      if (response.data.success) {
        this.setState({
          isLoading: false,
          result: 'Texto traducido chido',
        }); 
      } else {
        this.setState({
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
        <Typography variant="h6" gutterBottom>
          Texto:
        </Typography>
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

