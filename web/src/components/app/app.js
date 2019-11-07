import {
  React, CookiesProvider, H, Router, ApolloProvider
} from 'common'
import PageLayout from './page-layout'
import AppRoutes from './app-routes'
import client from 'apollo/client'

const App = () => (
  <CookiesProvider>
    <ApolloProvider client={client}>
      <Router history={H.history}>
        <PageLayout>
          <AppRoutes/>
        </PageLayout>
      </Router>
    </ApolloProvider>
  </CookiesProvider>
)

export default App
