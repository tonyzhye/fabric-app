import React from 'react';
import { inject } from 'mobx-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';

import { STORE_AUTH } from '../../../constants';
import { AuthStore } from '../../../stores';
import { LoginSNS, getLoginUrl } from '../../../utils';

import brandImg from '../../../assets/brand.png';

import './index.scss';

export interface LoginProps {
  auth?: AuthStore;
}

@inject(STORE_AUTH)
export default class Login extends React.Component<LoginProps, {}> {
  constructor(props: LoginProps) {
    super(props);
    this.handleLogin = this.handleLogin.bind(this);
  }

  public render() {
    /*
      <BaseMaster>
        <Row>
          <Col xs={{ span: 24 }} md={{ span: 12, offset: 6 }}>
            <div className="yt-login-overlay-dialog">
              <div className="yt-login-overlay-content">
                Login to use Kanban for One.
              </div>
              <div className="yt-login-overlay-actions">
                {this.renderSignInButton(LoginSNS.Github)}
              </div>
            </div>
          </Col>
        </Row>
      </BaseMaster>
    */
    return (
      <div id="signin-container">
        <div className="container yt-signin-box">
          <div className="row justify-content-center">
            <div className="col-xs-12 col-md-8 col-lg-6 text-center yt-signin-dialog">
              <img src={brandImg} className="" alt="Brand" />
              <h1>Sign In to Kanban for One</h1>

              <div className="yt-signin-buttons-container">
                {this.renderSignInButton(LoginSNS.Github)}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  private renderSignInButton(type: LoginSNS) {
    let title = 'Connect with ';
    let loginUrl = '';
    let faIcon = faGithub;

    switch (type) {
      case LoginSNS.Github:
        title = 'Use Github Account';
        loginUrl = 'github';
        faIcon = faGithub;
        break;
      default:
        title = 'Connect with Unknown';
        loginUrl = '';
    }

    return (
      <button 
        className="yt-signin-button"
        onClick={() => this.handleLogin(loginUrl)}
      >
        <FontAwesomeIcon icon={faIcon} size="2x" />
        <span>
          {title}
        </span>
      </button>
    );
  }

  private handleLogin(loginPath: string): void {
    window.location.href = getLoginUrl(loginPath);
  }
  
}
