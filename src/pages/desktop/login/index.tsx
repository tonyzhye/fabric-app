import React from 'react';
import { inject } from 'mobx-react';

import { STORE_AUTH } from '../../../constants';
import { AuthStore } from '../../../stores';
// import { LoginSNS, getLoginUrl } from 'src/utils';

import './index.scss';

export interface LoginProps {
  auth?: AuthStore;
}

@inject(STORE_AUTH)
export default class Login extends React.Component<LoginProps, {}> {
  constructor(props: LoginProps) {
    super(props);
    // this.handleLogin = this.handleLogin.bind(this);
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
      <div>
        <div>Sign In</div>
      </div>
    );
  }

  /*
  private handleLogin(loginPath: string): void {
    window.location.href = getLoginUrl(loginPath);
  }

  private renderSignInButton(type: LoginSNS) {
    const faIconClassNameCommon = 'yt-login-sign-icon fa fa-2x';
    const btnClassNameCommon = 'yt-login-btn-sign';

    let title = 'Connect with ';
    let faIconClassName = '';
    let signButtonClassName = '';
    let loginUrl = '';

    switch (type) {
      case LoginSNS.Github:
        title = 'Connect with Github';
        faIconClassName = faIconClassNameCommon + ' fa-inverse fa-github';
        signButtonClassName = btnClassNameCommon + ' yt-login-btn-sign-github';
        loginUrl = 'github';
        break;
      default:
        title = 'Connect with Unknown';
        faIconClassName = faIconClassNameCommon;
        signButtonClassName = btnClassNameCommon;
        loginUrl = '';
    }

    return (
      <button 
        className={signButtonClassName} 
        onClick={() => this.handleLogin(loginUrl)} 
        title={title}
      >
        <i className={faIconClassName} />
        <div className="yt-login-label-set">
          <span className="yt-login-sign-title">
            {title}
          </span>
        </div>
      </button>
    );
  }
  */
}
