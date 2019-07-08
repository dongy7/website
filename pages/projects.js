import styled from 'styled-components'
import Head from 'next/head'
import Page from '../layouts/Main'
import Title from '../components/post/Title'
import Description from '../components/project/Description'
import Header from '../components/project/Header'
import Item from '../components/project/Item'
import List from '../components/project/List'
import Name from '../components/project/Name'
import Project from '../components/project/Project'
import Footer from '../components/project/Footer'
import Button from '../components/project/Button'
import { projects } from './projectList'

export default () => {
  const MainTitleSection = styled.div`
    text-align: center;
    margin-bottom: 50px;
  `

  return (
    <Page project>
      <Head>
        <title>Projects</title>
      </Head>
      <div className="portfolio">
        <MainTitleSection>
          <Title>Projects</Title>
        </MainTitleSection>
        <List>
          {projects.map(({ name, description, src, demo }) =>
            <Item key={name}>
              <Project>
                <Header>
                  <Name>
                    {name}
                  </Name>
                </Header>
                <Description>
                  {description}
                </Description>
                <Footer>
                  <Button href={src} first primary>
                    Source
                  </Button>
                  <Button href={demo}>Demo</Button>
                </Footer>
              </Project>
            </Item>
          )}
        </List>
      </div>
    </Page>
  )
}
