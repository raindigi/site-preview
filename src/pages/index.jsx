import React from 'react';
import styled, { css } from 'styled-components';
import { isMobile } from 'react-device-detect';
import Helmet from 'react-helmet';
import 'whatwg-fetch';
import { mediaSize } from '../configOptions.js';
import '../globalStyles.js';
import LavaLampBg from '../components/LavaLampBg';


const Container = styled.div`
  display: grid;
  grid-template-columns: 5fr 3fr;
  grid-template-rows: 20vh 50vh 10vh;
  grid-template-areas: "title pic"
                       "actions pic"
                       "social copyright";
  height: 83vh;
  width: 80vw;
  padding: 10vh 10vw 7vh 10vw;
  background: linear-gradient(to bottom right, #895fd2 10%, #8f6bcd 48%, #b797ee 99%);

  color: white;
  font-family: "SF Pro Text", "SF Pro Text Regular", sans-serif;

  & > * {
    z-index: 2;
  }

  ${mediaSize.mobile`
    grid-template-columns: 35vw 45vw;
    grid-template-rows: 50vw auto 2em;
    grid-template-areas: "pic title"
                         "actions actions"
                         "social copyright";
  `}
`;

const Title = styled.h1`
  grid-area: title;
  font-size: 15vmin;
  align-self: center;
  font-weight: bold;
  font-family: "SF Pro Text", "SF Pro Text Bold", sans-serif;
  opacity: ${props => props.visible ? 1 : 0};
  transition: opacity 1s;

  &:after {
    content: 'is back.';
    font-size: 6vmin;
    position: relative;
    top: 1em;
    right: 3em;
    white-space:nowrap;
    opacity: ${props => props.subVisible ? 1 : 0};
    transition: opacity 1s;
    font-family: "SF Pro Text", "SF Pro Text Medium", sans-serif;
  }

  ${mediaSize.mobile`
    position: relative;
    right: 30vw;
  `};
`;

const Logo = styled.img`
  grid-area: pic;
  margin-top: 3em;
  max-width: 35vw;
  max-height: 55vh;
  justify-self: end;
  align-self: start;
  opacity: ${props => props.visible ? 1 : 0};
  transform: ${props => props.visible ? css`translateY(0)` : css`translateY(1rem)`};
  transition: opacity 1s, transform 1s ease-in-out;

  ${mediaSize.mobile`
    max-width: 35vw;
    max-height: 70vw;
    align-self: end;
    justify-self: start;
    opacity: ${props => props.visible ? 0.4 : 0};
  `};
`;

const ActionContainer = styled.div`
  margin-top: 4em;
  opacity: ${props => props.visible ? 1 : 0};
  transform: ${props => props.visible ? css`translateY(0)` : css`translateY(1rem)`};
  transition: opacity 1s, transform 1s ease-in-out;
  grid-area: actions;
  display: grid;
  align-self: center;
  grid-template-columns: 19vw 17vw;
  grid-template-rows: 2fr 12em;
  grid-column-gap: 20%;
  grid-row-gap: 2em;
  grid-template-areas: "action action"
                       "mailing-list sponsor-contact";


  ${mediaSize.mobile`
    width: 95%;
    margin-top: 0;
    justify-self: center;
    align-self: end;
    grid-template-columns: auto;
    grid-template-rows: auto auto auto;
    grid-column-gap: 0;
    grid-row-gap: 0;
    grid-template-areas: "action"
                         "sponsor-contact"
                         "mailing-list";
  `};
`;

const ActionHeader = styled.div`
  grid-area: action;
  font-size: 4.5vmin;

  ${mediaSize.mobile`
    font-size: 6vmin;
    margin-bottom: 0.5em;
  `};
`;

const WordShadow = styled.span`
  position: relative;

  &:after {
    content: 'Change';
    font-size: 1.5em;
    color: rgba(249, 249, 249, 0.3);
    font-weight: bold;
    position: absolute;
    top: -0.4em;
    right: -1em;
    white-space:nowrap;
    opacity: ${props => props.shadowVisible ? 1 : 0};
    transition: opacity 1s;
    font-family: "SF Pro Text", "SF Pro Text Medium", sans-serif;
  }
`;

const ActionButton = styled.div`
  margin-top: 1.5em;
  background-color: white;
  color: #895fd2;
  height: 3vw;
  border-radius: 20px;
  cursor: pointer;
  background-color: #fff;
	border-bottom: 2px solid #909090;
	text-shadow: 0px -2px #fff;
  text-align: center;
  line-height: 3vw;

  &:hover {
    transform: translate(0px,2px);
	  border-bottom: 1px solid;
  }

  ${mediaSize.mobile`
    height: 10vw;
    border-radius: 10px;
    line-height: 10vw;
    font-size: 4vw;
  `};
`;

const ActionInput = styled.div`
  margin-top: 1.5em;
  height: 3vw;
  border-radius: 20px;
  cursor: pointer;
  background-color: #fff;
	border-bottom: 2px solid #909090;
	text-shadow: 0px -2px #fff;
  text-align: center;
  line-height: 3vw;
  position: relative;
  overflow-y: hidden;

  & input:focus{
    outline: none;
  }

  & .grecaptcha-badge {
    display: none;
  }

  & input:-webkit-autofill,
  input:-webkit-autofill:hover,
  input:-webkit-autofill:focus,
  input:-webkit-autofill:active {
      transition: background-color 5000s ease-in-out 0s;
  }


  ${mediaSize.mobile`
    margin-top: 1.5em;
    height: 10vw;
    border-radius: 10px;
    line-height: 10vw;
    font-size: 4vw;
  `};


  animation: none;
  transform: translate3d(0, 0, 0);
  &.shake {
    animation: shake 0.82s cubic-bezier(.36,.07,.19,.97) both;
  }
`;

const ActionInputOverlay = styled.div`
  background-color: rgba(255, 255, 255, 0);
  color: ${props => props.color};
  white-space: nowrap;
  transition: transform 500ms;
  width: ${props => props.width};
  height: 3vw;
  position: absolute;
  top: 0;
  left: 5%;
  transform: ${props => props.show ? css`translateY(0)` : css`translateY(-4vw)`};

  ${mediaSize.mobile`
    height: 10vw;
    transform: ${props => props.show ? css`translateY(0)` : css`translateY(-13vw)`};
  `};
`;

const ClickButton = styled.button`
  display: inline-block;
  background: transparent;
  float: right;
  height: 3vw;
  width: 3vw;
  border: none;
  cursor: pointer;
  position: relative;
  right: 1vw;
  display: table;
  &:focus {
    outline: none;
  }

  transition: transform 500ms;
  transform: ${props => props.show ? css`translateY(0)` : css`translateY(-4vw)`};

  ${mediaSize.mobile`
    height: 10vw;
    right: 3vw;
    transform: ${props => props.show ? css`translateY(0)` : css`translateY(-13vw)`};
  `};
`;

const ClickButtonImg = styled.img`
  max-width: 1vw;
  max-height: 1vw;
  float: right;
  opacity: 0.4;
  display: table-cell;
  vertical-align: middle;

  ${mediaSize.mobile`
    max-width: 4vw;
    max-height: 4vw;
  `};
`;

const ActionInputBox = styled.input`
  width: 100%;
  height: 3vw;
  background: transparent;
  border: none;
  position: absolute;
  left: 10%;
  top: -5%;
  font-size: 1em;
  ${mediaSize.mobile`
    height: 10vw;
  `};
`;

const ToastBox = styled.div`
  font-size: 1rem;
  margin: 10px 0 5px 0;
  color: ${props => props.fontColor || 'white'};
  transition: all 500ms;
  opacity: ${props => props.show ? '1': 0 };
  transform: ${props => props.show ? css`translateY(0)` : css`translateY(1rem)`};

  ${mediaSize.mobile`
    font-size: 1.5em;
    height: 3em;
  `};
`;

const SocialContainer = styled.div`
  grid-area: social;
  align-self: end;
  opacity: ${props => props.visible ? 1 : 0};
  transform: ${props => props.visible ? css`translateY(0)` : css`translateY(1rem)`};
  transition: opacity 1s, transform 1s ease-in-out;

  & img {
    width: 3em;
    height: 3em;
    margin-right: 10px;
    opacity: 0.75;
    transition: opacity 300ms ease-in-out;

    ${mediaSize.mobile`
      opacity: 1;
      width: 1.5em;
      height: 1.5em;
      margin-right: 5px;
    `};

    &:hover {
      opacity: 1;
    }
  }
`;

const Copyright = styled.div`
  grid-area: copyright;
  font-size: 2.5vmin;
  align-self: end;
  justify-self: end;
  margin-right: 3vw;
  opacity: ${props => props.visible ? 1 : 0};
  transform: ${props => props.visible ? css`translateY(0)` : css`translateY(1rem)`};
  transition: opacity 1s, transform 1s ease-in-out;

  ${mediaSize.mobile`
    width: 80%;
    text-align: right;
    align-self: center;
    font-size: 3.25vmin;
    margin-right: 2vmin;
  `};
`;


class IndexPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputFocused: false,
      curInput: '',
      lastInputValid: null,
      lastInputShake: false,
      mainVisible: false,
      subVisible: false,
      restVisible: false,
      shadowVisible: false
    };
  }

  handleSubmit(e){
    const userEmail = e.target.children && e.target.children[1].value;
    console.log(userEmail);

    if( /(.+)@(.+){2,}\.(.+){2,}/.test(userEmail)){ // valid email
      this.setState({lastInputValid: true});

      // send the POST request
      fetch('https://usebasin.com/f/5144d514a21b.json', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: userEmail,
          sentAt: new Date().toLocaleString()
        })
      });

    } else { // invalid email
      this.setState({lastInputValid: false, lastInputShake: true})
    }

    e.preventDefault();
  }

  componentDidMount() {
    // probably the cheesiest way to do fade-on-enter transitions lol
    this.mainTimer = setTimeout(() => this.setState({mainVisible: true}), 200);
    this.subTimer = setTimeout(() => this.setState({subVisible: true}), 350);
    this.restTimer = setTimeout(() => this.setState({restVisible: true}), 1250);
    this.shadowTimer = setTimeout(() => this.setState({shadowVisible: true}), 1450);
  }

  componentWillUnmount() {
    clearTimeout(this.mainTimer);
    clearTimeout(this.subTimer);
    clearTimeout(this.restTimer);
    clearTimeout(this.shadowTimer);
  }

  render() {
    let applySrc = 'https://docs.google.com/forms/d/e/1FAIpQLScmAqnoqT8j_XbQWgbQq_I8XaA2L9eRTPFcK2QJGJGm3hMtLA/viewform?usp=sf_link';
    let imgSrc = '/button_submit.svg';
    let toastMsg = null;
    let toastColor = null;
    if(this.state.lastInputValid === false) {
      imgSrc = '/button_fail.svg';
      toastMsg = 'Your email address seems funky. Try again?';
      toastColor = '#fa5050';
    }
    if(this.state.lastInputValid === true){
      imgSrc = '/button_success.svg';
      toastMsg = 'You\'re all set! Keep an eye on your inbox.';
      toastColor = '#37d634';
    }

    return (
      <div>
        <Helmet>
          <title>Cafe7 & Resturant</title>
          <script src="https://www.google.com/recaptcha/api.js" async defer></script>
          <meta
            name="description"
            content="Cafe7 cafe Resturant"
          />
          <meta
            name="google-site-verification"
            content="WPu1QQjVXWbfMuZCZ3A5IusbfDXzdco9ptYgpC16plA"
          />
          <meta
            name="keywords"
            content="Cafe7 , cafe,  Resturant, expresso, latte"
          />
          <link
            rel="icon"
            href="/logo_tiny.png"
            sizes={['16x16', '32x32', '64x64', '128x128']}
            type="image/png"
          />
        </Helmet>
        <LavaLampBg />
        <Container>
          <Title visible={this.state.mainVisible} subVisible={this.state.subVisible}>
            Cafe7 Resturant
          </Title>

          <Logo src='https://www.freepngimg.com/thumb/coffee/32668-1-coffee-logo-transparent-image-thumb.png' visible={this.state.restVisible}/>

          <ActionContainer visible={this.state.restVisible}>
            <ActionHeader>Be a part of the <WordShadow shadowVisible={this.state.shadowVisible}>change</WordShadow>.</ActionHeader>

            <div style={{gridArea: 'mailing-list', fontSize: '2.5vmin'}}>
              { isMobile ? null : <span>Interested in <b>participating</b>? <br/> Be the first to receive updates by signing up. <br/></span> }
              <ActionInput
                onClick={() => this.setState({ inputFocused: true })}
                tabIndex="0" onBlur={() => this.setState({ inputFocused: false })}
                lastSubmitted={this.state.lastInputValid}
                onAnimationEnd={() => this.setState({ lastInputShake: false })}
                className={this.state.lastInputShake ? 'shake' : null}>
                <ActionInputOverlay show={!this.state.inputFocused} color="#895fd2" width="100%" height="50px">
                  { !this.state.curInput ? (isMobile ? "Sign Up For Updates" : "Keep Me Posted") : null }
                </ActionInputOverlay>
                <ActionInputOverlay show={this.state.inputFocused} color="rgba(142, 142, 142, 0.3)" width="100%">
                  { !this.state.curInput ? "Your Email" : null }
                </ActionInputOverlay>
                <form name="mailing-list" id="mailingListForm" onSubmit={(e) => this.handleSubmit(e)} acceptCharset="UTF-8" action="https://usebasin.com/f/5144d514a21b" method="POST" target="_blank">
                  <ClickButton type="submit" className="g-recaptcha" data-sitekey="6Lew3SMUAAAAAJ82QoS7gqOTkRI_dhYrFy1f7Sqy" data-badge="inline" show={this.state.inputFocused || this.state.curInput !== ''}>
                    <ClickButtonImg src={imgSrc} />
                  </ClickButton>
                  <ActionInputBox type="email" name="userEmail" onChange={(evt) => { this.setState({curInput: evt.target.value, lastInputValid: null}) }} />
                </form>
              </ActionInput>
              <ToastBox fontColor={toastColor} show={toastMsg !== null}>
                {toastMsg}
              </ToastBox>
            </div>


            <div style={{gridArea: 'sponsor-contact', fontSize: '2.5vmin'}}>
              { isMobile ? null : <span>Interested in <b>sponsoring</b>? <br/> Exciting! Drop us an email anytime.</span> }
              <ActionButton onClick={() => window.open('mailto:pridevihar@gmail.com', '_self')}>
                { isMobile ? "Looking to Sponsor?" : "Connect With Us" }
              </ActionButton>
            </div>
          </ActionContainer>

          <SocialContainer visible={this.state.restVisible}>
            <a href='https://www.facebook.com/cafe7/' target='_blank'>
              <img src='/social_fb.png' />
            </a>
            <a href='https://www.instagram.com/cafe7' target='_blank'>
              <img src='/social_insta.png' />
            </a>
            <a href='mailto:pridevihar@gmail.com'>
              <img src='/social_email.png' />
            </a>
          </SocialContainer>

          <Copyright visible={this.state.restVisible}>
            © Pride Vihar Snacks Pvt Ltd 2019.
          </Copyright>

        </Container>
      </div>
    )
  }
}

export default IndexPage;
