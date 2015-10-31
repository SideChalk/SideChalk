import React from 'react';
import { Grid, Row, Col, Image} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

export default class About extends React.Component {


  render () {
    const _bgDiscover = {};
    _bgDiscover.backgroundImage = 'url("https://upload.wikimedia.org/wikipedia/commons/6/65/Yoga4Love_Freedom_Gratitude.jpg")';
    // _bgDiscover.backgroundColor = '#222';
    _bgDiscover.backgroundSize = 'cover';
    _bgDiscover.backgroundRepeat = 'no-repeat';
    const _bgMemories = {};
    _bgMemories.backgroundImage = 'url("https://upload.wikimedia.org/wikipedia/commons/5/54/Golden_Gate_Bridge_0002.jpg")';
    // _bgMemories.backgroundColor = '#333';
    _bgMemories.backgroundSize = 'cover';
    _bgMemories.backgroundRepeat = 'no-repeat';
    const _bgView = {};
    _bgView.backgroundImage = 'url("https://upload.wikimedia.org/wikipedia/commons/7/78/Sparkler.JPG")';
    // _bgView.backgroundColor = '#375a7f';
    _bgView.backgroundSize = 'cover';
    _bgView.backgroundRepeat = 'no-repeat';
    const _bgRedirect = {};
    _bgRedirect.cursor = 'pointer';

    return (
      <Grid>
        <Row>
          <Col lg={12}>
            <div className='hero' style={_bgDiscover}>
              <h1 className='hero-title'> Discover your local community. </h1>
              <span className='hero-content'>
              </span>
            </div>
          </Col>
        </Row>
        <Row>
          <Col lg={12}>
            <div className='hero' style={_bgMemories}>
              <h1 className='hero-title'> Share your experiences. </h1>
              <span className='hero-content'>
              </span>
            </div>
          </Col>
        </Row>
        <Row>
          <Col lg={12}>
            <div className='hero' style={_bgView}>
              <h1 className='hero-title'> Save your memories. Anytime. Anyplace. </h1>
              <span className='hero-content'>
              </span>
            </div>
          </Col>
        </Row>
        <Row>
          <Col lg={12}>
            <LinkContainer to="/list">
              <div className='hero' >
                <h1 className='hero-title' style={_bgRedirect}> Lets start exploring. </h1>
                <div className='hero-content'>
                  Well prompt you for your location
                </div>
              </div>
            </LinkContainer>
          </Col>
        </Row>
      </Grid>
    );
  }
}
