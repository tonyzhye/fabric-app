import React, { SFC } from 'react';
import { PrimaryButton } from 'office-ui-fabric-react/lib/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter, faGithub } from '@fortawesome/free-brands-svg-icons';
import { faGem, faPaperPlane, faNewspaper } from '@fortawesome/free-solid-svg-icons';

import { SiteNav } from '../../components/site/site-nav';
import { getWebSiginUrl } from '../../utils';

import brandImg from '../../assets/brand.png';
import presentImg from './landing-present.jpg';

import './index.scss';

const Site: SFC<{}> = () => {
  const url = getWebSiginUrl();
  const iconColor = '#f05f40';

  return (
    <div>
      <SiteNav />
      <main id="main-site-content">
        <section id="welcome">
          <div className="container-fluid no-gutters">
            <div className="row">
              <div className="col-xs-12 col-sm-4 col-md-5 text-center">
                <div className="interaction">
                  <img src={brandImg} className="" alt="Brand" />
                  <h1>Kanban for One</h1>
                  <p>One thing at a time</p>
                  <div className="interaction-signin">
                    <PrimaryButton 
                      href={url} 
                      className="signin-button" 
                      text="Try for free" 
                    />
                  </div>
                </div>
              </div>
              <div className="col-sm-8 col-md-7 presentation-col">
                <div className="presentation">
                  <img src={presentImg} className="" alt="Present" />
                </div>
              </div>
            </div>
          </div>
        </section>
        <section id="feature">
          <div className="container-fluid">
            <div className="row">
              <div className="col text-center">
                <h2 className="section-heading">Simple enough to Get Shit Done</h2>
                <hr className="my-4" />
              </div>
            </div>
            <div className="row">
              <div className="col-lg-4 col-md-6 text-center">
                <div className="service-box mt-5 mx-auto">
                  <FontAwesomeIcon size="4x" color={iconColor} icon={faGem} />
                  <h3 className="mb-3">Overview of your to do list</h3>
                  <p className="text-muted mb-0">
                    The kanban helps you keep an eye on your progress and get visibility over 
                    what you’re actually achieving.
                  </p>
                </div>
              </div>
              <div className="col-lg-4 col-md-6 text-center">
                <div className="service-box mt-5 mx-auto">
                  <FontAwesomeIcon size="4x" color={iconColor} icon={faPaperPlane} />
                  <h3 className="mb-3">Don't multi-task</h3>
                  <p className="text-muted mb-0">
                    Multi-tasking is at least majorly inefficient. 
                    Studies have shown that each time we switch tasks we lose up to 20% of our 
                    working time and fidelity on each project.
                  </p>
                </div>
              </div>
              <div className="col-lg-4 col-md-6 text-center">
                <div className="service-box mt-5 mx-auto">
                  <FontAwesomeIcon size="4x" color={iconColor} icon={faNewspaper} />
                  <h3 className="mb-3">From idea to completion</h3>
                  <p className="text-muted mb-0">
                    By tracking your tasks, you’ll become more organised, 
                    more efficient and more productive.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section id="contact">
          <div className="container">
            <div className="row">
              <div className="col text-center">
                <h2 className="section-heading">Get In Touch!</h2>
                <hr className="my-4" />
              </div>
            </div>
            <div className="row text-center mt-5">
              <div className="col-lg-4 ml-auto">
                <FontAwesomeIcon size="3x" className="mb-3 sr-contact" icon={faGithub} />
                <p>
                  On <a target="_blank" href="https://github.com/tonyzhye">Github</a>
                </p>
              </div>
              <div className="col-lg-4 mr-auto">
                <FontAwesomeIcon size="3x" className="mb-3 sr-contact" icon={faTwitter} />
                <p>
                  On <a target="_blank" href="https://twitter.com/tonyzhye">Twitter</a>
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Site;
