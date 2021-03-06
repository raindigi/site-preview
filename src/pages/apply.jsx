import React from 'react';
import styled, { css } from 'styled-components';
import LavaLampBg from '../components/LavaLampBg';
import Helmet from 'react-helmet';
import { mediaSize } from '../configOptions.js';
import { isMobile } from 'react-device-detect';


const Container = styled.div`
  height: 80vh;
  width: 80vw;
  padding: 10vh 10vw;
  background: linear-gradient(to bottom right, #895fd2 10%, #8f6bcd 48%, #b797ee 99%);

  color: white;
  font-family: "SF Pro Text", sans-serif;
`;

const Text = styled.div`
  width: 70%;
  padding: 3vw;
  margin-left: auto;
  margin-right: auto;

  font-size: 5vmin;
  font-weight: bold;
  position: relative;
  z-index: 3;

  opacity: ${props => props.visible ? 0.9 : 0};
  transform: ${props => props.visible ? css`translateY(0)` : css`translateY(1rem)`};
  transition: opacity 1s, transform 1s ease-in-out;

  & a {
    color: white;
    opacity: 0.8;
    font-size: 2rem;

    &:hover {
      opacity: 1;
      transition: opacity 500ms;
    }
  }

  ${mediaSize.mobile`
    width: 90%;
    font-size: 7vmin;
    padding-bottom: 7vw;
  `}
`;

const SecondaryText = styled(Text)`
  padding-top: 3vw;
  font-weight: normal;
  font-size: 2vmin;

  & a {
    font-size: inherit;
  }

  ${mediaSize.mobile`
    font-size: 4vmin;
    padding-top: 8vw;
  `}
`

const Link = styled.a`
  color: inherit;
  opacity: 0.8;

  &:hover {
    opacity: 1;
    transition: opacity 500ms;
  }
`
const AppForm = styled.iframe`
  height: 80%;
  width: 100%;
  position: relative;
  z-index: 3;

  opacity: ${props => props.visible ? 0.9 : 0};
  transform: ${props => props.visible ? css`translateY(0)` : css`translateY(1rem)`};
  transition: opacity 1s, transform 1s ease-in-out;
`


class NotFoundPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mainVisible: false
    };
  }

  componentDidMount() {
    // probably the cheesiest way to do fade-on-enter transitions lol
    this.mainTimer = setTimeout(() => this.setState({mainVisible: true}), 200);
  }

  componentWillUnmount() {
    clearTimeout(this.mainTimer);
  }

  render() {
    return (
      <Container>
        <Helmet>
          <title>Ambiensis</title>
          <meta
            name="description"
            content="Ambiensis is a Education Consultancy & IT Solution Provider"
          />
          <meta
            name="google-site-verification"
            content="b15i3BEcJgaQWKdZ81MC9gFRwJXr_6wasb-XxKHlktk"
          />
          <meta
            name="keywords"
            content="collage,education, study, medical, engineer, proffesional , course university, 2019, apply, applications, organizer, exec"
          />
          <meta
            property="og:title"
            content="Ambiensis Executive Applications"
          />
          <meta
            property="og:description"
            content="Apply now to be a part of the 2019 Ambiensis Education Fair!"
          />
          <meta
            property="og:site_name"
            content="Equithon"
          />
          <meta
            property="og:image"
            content="https://ambiensis.co.in/apply_og.jpg"
          />
          <link
            rel="icon"
            href="/logo_tiny.png"
            sizes={['16x16', '32x32', '64x64', '128x128']}
            type="image/png"
          />
        </Helmet>
        <LavaLampBg />
        <Text visible={this.state.mainVisible}>
          Applications for the 2019 Educational Session . <br/> <br/>
          Thank you to everyone who applied - keep an eye on your inbox! <br/> <br/>
          <Link href="/" style={{fontSize: isMobile ? "5vw" : "1em"}}>Still interested in counseling? Sign up for updates!</Link>
        </Text>
      </Container>
    )
  }
}

export default NotFoundPage;
