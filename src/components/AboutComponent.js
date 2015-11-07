import React from 'react';
import hero1 from '../assets/hero1.png';
import hero2 from '../assets/hero2.png';

export default class About extends React.Component {
  render () {
    return (

      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <div className="row">
              <div className="col-md-12">
                <h2>
                  Welcome to SideChalk
                </h2>
                <p>
                  SideChalk is a realtime memory experience. All you need to is open up your phone and you’ll see a list of memories located nearby.

                </p>
                   Who wrote them? Unless they tell you, you’ll never know. <p>SideChalk is not a social network. SideChalk is a throwback to the good old days when all you had to do was grab some chalk and share some a thought or an idea on the sidewalk. To get started just login with Twitter, Facebook, or Google (we won't ever email you or post on your behalf) and start sharing memories.</p>

              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <img className="img-responsive" src={hero1} />
              </div>
              <div className="col-md-6">
                <p>
                  SideChalk makes it easy for you to annonymously leave behind memories all over the world. No matter where you are you can leave behind a memory and see the memories of others. You write or draw or even leave behind a clip of music to capture the mood of a time and place.
                </p>

                <p>
                What should you post? Whatever you want. Happy, sad, funny, existential angst, whatever is on your mind you can leave behind a memory. (If there's a memory you want to keep for yourself at a particular location-- like the name of your barista--  we added the option for you to mark memories as private.)
                </p>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <p>
                In addition to leaving behind musings and music clips, we also added the ability to draw on a virtual sidewalk. Pick your colors and start drawing whatever you want!
                </p>
              </div>
              <div className="col-md-6">
                <img className="img-responsive" src={hero2} />
              </div>
            </div>
          </div>
        </div>
        <div className="row center-blow">
        <a className="btn" href="http://www.sidechalkapp.com">Let's Get Started »</a>
        </div>

      </div>

    );
  }
}
