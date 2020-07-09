import React from 'react';
import Layout from './components/layout'
import utilStyles from './styles/utils.module.css'
import SignInForm from './components/signinform'

class App extends React.Component {

  render() {
    return (
      <>
        <Layout>
          <div>
            <section className={utilStyles.headingXl + " m-auto pb-8 text-center"}>
              <p>A Login UX and UI Test</p>
            </section>
          </div>
          <div className="w-full m-auto max-w-sm content-center justify-center">
            <SignInForm></SignInForm>
          </div>
        </Layout>
      </>
    )
  }
}

export default App;
