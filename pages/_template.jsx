import React from 'react'
import {Link} from 'react-router'
import {Container, Grid, Span} from 'react-responsive-grid'
import Breakpoint from 'components/Breakpoint'
import find from 'lodash/find'
import {prefixLink} from 'gatsby-helpers'
import includes from 'underscore.string/include'
import {colors, activeColors} from 'utils/colors'

import typography from 'utils/typography'
import {config} from 'config'

// Import styles.
import 'css/main.css'
import 'css/github.css'

const {rhythm, adjustFontSizeTo} = typography

module.exports = React.createClass({
  propTypes() {
    return {children: React.PropTypes.object,
    route: React.PropTypes.object}
  },

  contextTypes: {router: React.PropTypes.object.isRequired},

  handleTopicChange(e) {
    return this
      .context
      .router
      .push(e.target.value)
      console.log(e.target.value);
  },
  render() {
    const docsActive = includes(this.props.location.pathname, '/')
    const examplesActive = includes(this.props.location.pathname, '/portfolio/')
    const childPages = config
      .docPages
      .map((p) => {
        const page = find(this.props.route.pages, (_p) => _p.path === p)
        return {title: page.data.title, path: page.path}
      })
    const docOptions = childPages.map((child) => <option key={prefixLink(child.path)} value={prefixLink(child.path)}>
      {child.title}
    </option>)
    const docPages = childPages.map((child) => {
      const isActive = prefixLink(child.path) === this.props.location.pathname
      return (
        <li key={child.path} style={{
          marginBottom: rhythm(1 / 2)
        }}>
          <Link
            to={prefixLink(child.path)}
            style={{
            textDecoration: 'none',
            color: colors.bg
          }}>
            {isActive
              ? <strong>{child.title}</strong>
              : child.title}
          </Link>
        </li>
      )
    })
    return (
      <div>
        <div
          style={{
          background: colors.bg,
          color: colors.fg,
          marginBottom: rhythm(1.5)
        }}>
          <Container
            style={{
            maxWidth: 960,
            paddingLeft: rhythm(3 / 4)
          }}>
            <Grid
              columns={12}
              style={{
              padding: `${rhythm(3 / 4)} 0`
            }}>
              <Span columns={4} style={{
                height: 24
              }}>
                <Link
                  to={prefixLink('/')}
                  style={{
                  textDecoration: 'none',
                  color: colors.fg,
                  fontSize: adjustFontSizeTo('21px').fontSize
                }}>
                  {config.siteTitle}
                </Link>
              </Span>
              <Span columns={8} last>
                <a
                  style={{
                  float: 'right',
                  color: colors.fg,
                  textDecoration: 'none',
                  marginLeft: rhythm(1 / 2)
                }}
                  href="https://github.com/osfan501">
                  Github
                </a>
                <a
                  style={{
                  float: 'right',
                  color: colors.fg,
                  textDecoration: 'none',
                  marginLeft: rhythm(1 / 2)
                }}
                  href="https://twitter.com/kevindavus">
                  Twitter
                </a>
                <a
                  style={{
                  float: 'right',
                  color: colors.fg,
                  textDecoration: 'none',
                  marginLeft: rhythm(1 / 2)
                }}
                  href="https://blog.kevindav.us">
                  Blog
                </a>
                <Link
                  to={prefixLink('/')}
                  style={{
                  background: docsActive
                    ? activeColors.bg
                    : colors.bg,
                  color: docsActive
                    ? activeColors.fg
                    : colors.fg,
                  float: 'right',
                  textDecoration: 'none',
                  paddingLeft: rhythm(1 / 2),
                  paddingRight: rhythm(1 / 2),
                  paddingBottom: rhythm(3 / 4),
                  marginBottom: rhythm(-1),
                  paddingTop: rhythm(1),
                  marginTop: rhythm(-1)
                }}>
                  Home
                </Link>
              </Span>
            </Grid>
          </Container>
        </div>
        <Container
          style={{
          maxWidth: 960,
          padding: `${rhythm(1)} ${rhythm(3 / 4)}`,
          paddingTop: 0
        }}>
          <Breakpoint mobile>
            <div
              style={{
              overflowY: 'auto',
              paddingRight: `calc(${rhythm(1 / 2)} - 1px)`,
              position: 'absolute',
              width: `calc(${rhythm(8)} - 1px)`,
              borderRight: '1px solid lightgrey'
            }}>
              <ul
                style={{
                listStyle: 'none',
                marginLeft: 0,
                marginTop: rhythm(1 / 2),
                color: colors.fg
              }}>
                {docPages}
              </ul>
            </div>
            <div
              style={{
              padding: `0 ${rhythm(1)}`,
              paddingLeft: `calc(${rhythm(8)} + ${rhythm(1)})`
            }}>
              {this.props.children}
            </div>
          </Breakpoint>
          <Breakpoint>
            <strong>Topics:</strong>
            {' '}
            <select
              defaultValue={this.props.location.pathname}
              onChange={this.handleTopicChange}>
              {docOptions}
            </select>
            <br/>
            <br/> {this.props.children}
          </Breakpoint>
        </Container>
      </div>
    )
  }
})
