/**
 * Component Test
 *
 */

import React from 'react'
import {
  mount,
  fakeProps,
  axeComponent,
  toJson,
  loadScss,
} from '../../../core/jest/jestSetup'
import { fireEvent, render } from '@testing-library/react'
import Component from '../Tabs'
import Input from '../../input/Input'

const props = fakeProps(require.resolve('../Tabs'), {
  all: true,
  optional: true,
})
delete props.render
props.id = 'id'

const startup_selected_key = 'second'
const tablistData = [
  { title: 'First', key: 'first' },
  { title: 'Second', key: 'second' },
  { title: 'Third', key: 'third' },
]
const tablistDataWithContent = [
  { title: 'First', key: 1, content: <h2>First</h2> }, // without function
  { title: 'Second', key: 2, content: () => <h2>Second</h2> }, // with function
  { title: 'Third', key: 3, content: () => <h2>Third</h2> }, // with function
]
const contentWrapperData = {
  first: <h2>First</h2>, // without function
  second: () => <h2>Second</h2>, // with function
  third: <h2>Third</h2>, // without function
}

describe('Tabs component', () => {
  it('have to match snapshot', () => {
    const Comp = mount(
      <Component
        {...props}
        data={tablistData}
        selected_key={startup_selected_key}
      >
        {contentWrapperData}
      </Component>
    )
    expect(toJson(Comp)).toMatchSnapshot()
  })

  it('have a "selected_key" state have to be same as prop from startup', () => {
    render(
      <Component
        {...props}
        data={tablistData}
        selected_key={startup_selected_key}
      >
        {contentWrapperData}
      </Component>
    )
    expect(
      document
        .querySelector('.dnb-tabs__button.selected')
        .querySelectorAll('span')[0].textContent
    ).toBe(
      tablistData.find(({ key }) => key === startup_selected_key).title
    )
  })

  it('has working "on_change" and "on_click" event handler', () => {
    let preventChange = false
    const on_change = jest.fn((e) => {
      if (preventChange) {
        return false
      }
      return e
    })
    const on_click = jest.fn((e) => {
      if (preventChange) {
        return false
      }
      return e
    })

    render(
      <Component
        {...props}
        data={tablistData}
        on_change={on_change}
        on_click={on_click}
      >
        {contentWrapperData}
      </Component>
    )

    fireEvent.click(document.querySelectorAll('.dnb-tabs__button')[1])
    expect(on_change).toBeCalledTimes(1)
    expect(on_click).toBeCalledTimes(1)

    fireEvent.click(document.querySelectorAll('.dnb-tabs__button')[2])
    expect(on_change).toBeCalledTimes(2)
    expect(on_click).toBeCalledTimes(2)

    preventChange = true

    fireEvent.click(document.querySelectorAll('.dnb-tabs__button')[1])
    expect(on_change).toBeCalledTimes(2)
    expect(on_click).toBeCalledTimes(3)
  })

  it('has working "on_focus" event handler', () => {
    const on_focus = jest.fn()

    render(
      <Component {...props} data={tablistData} on_focus={on_focus}>
        {contentWrapperData}
      </Component>
    )

    fireEvent.keyDown(document.querySelector('.dnb-tabs__tabs__tablist'), {
      keyCode: 39, // right
    })
    expect(on_focus).toBeCalledTimes(1)

    fireEvent.keyDown(document.querySelector('.dnb-tabs__tabs__tablist'), {
      keyCode: 39, // right
    })
    expect(on_focus).toBeCalledTimes(2)
  })

  it('will use given tab_element', () => {
    const Link = ({ href, children }) => {
      return <a href={href}>{children}</a>
    }

    const tablistData = [
      { title: 'First', key: 'first', href: '/first' },
      { title: 'Second', key: 'second', href: '/second' },
      { title: 'Third', key: 'third', href: '/third' },
    ]

    render(
      <Component {...props} data={tablistData} tab_element={Link}>
        {contentWrapperData}
      </Component>
    )

    expect(
      document
        .querySelector('.dnb-tabs__tabs__tablist')
        .querySelectorAll('a')[1].outerHTML
    ).toMatchInlineSnapshot(
      `"<a href="/second"><span class="dnb-tabs__button__title">Second</span><span aria-hidden="true" hidden="" class="dnb-dummy">Second</span></a>"`
    )
  })

  it('should support "align" prop', () => {
    render(
      <Component {...props} data={tablistData} align="right">
        {contentWrapperData}
      </Component>
    )

    const element = document.querySelector('.dnb-tabs__tabs')

    expect(Array.from(element.classList)).toEqual([
      'dnb-tabs__tabs',
      'dnb-tabs__tabs--right',
    ])
  })

  it('should support "no_border" prop', () => {
    render(
      <Component {...props} data={tablistData} no_border>
        {contentWrapperData}
      </Component>
    )

    const element = document.querySelector('.dnb-tabs__tabs')

    expect(Array.from(element.classList)).toEqual([
      'dnb-tabs__tabs',
      'dnb-tabs__tabs--left',
      'dnb-tabs__tabs--no-border',
    ])
  })

  it('should support "content_spacing" prop', () => {
    render(
      <Component {...props} data={tablistData} content_spacing="small">
        {contentWrapperData}
      </Component>
    )

    const element = document.querySelector('.dnb-tabs__content')

    expect(Array.from(element.classList)).toEqual(
      expect.arrayContaining([
        'dnb-tabs__content',
        'dnb-height-animation--is-in-dom',
        'dnb-height-animation--show-overflow',
      ])
    )
  })

  it('should support "tabs_spacing" prop', () => {
    render(
      <Component {...props} data={tablistData} tabs_spacing="small">
        {contentWrapperData}
      </Component>
    )

    const element = document.querySelector('.dnb-tabs__tabs')

    expect(Array.from(element.classList)).toEqual([
      'dnb-tabs__tabs',
      'dnb-tabs__tabs--left',
      'dnb-section--spacing-small',
    ])
  })

  it('should support outer spacing props', () => {
    render(
      <Component {...props} data={tablistData} top="large">
        {contentWrapperData}
      </Component>
    )

    const element = document.querySelector('.dnb-tabs')

    expect(Array.from(element.classList)).toEqual([
      'dnb-tabs',
      'dnb-space__top--large',
    ])
  })

  it('should use section component when "tabs_style" is set', () => {
    render(
      <Component {...props} data={tablistData} tabs_style="black-3">
        {contentWrapperData}
      </Component>
    )

    const element = document.querySelector('.dnb-tabs__tabs')

    expect(element.tagName).toBe('DIV')
    expect(Array.from(element.classList)).toEqual(
      expect.arrayContaining([
        'dnb-tabs__tabs',
        'dnb-tabs__tabs--left',
        'dnb-section',
        'dnb-section--black-3',
      ])
    )
  })

  it('should use section component when "content_style" is set', () => {
    render(
      <Component {...props} data={tablistData} content_style="black-3">
        {contentWrapperData}
      </Component>
    )

    const element = document.querySelector('.dnb-tabs__content')

    expect(element.tagName).toBe('SECTION')
    expect(Array.from(element.classList)).toEqual(
      expect.arrayContaining([
        'dnb-tabs__content',
        'dnb-section',
        'dnb-section--black-3',
        'dnb-section--spacing-large',
        'dnb-no-focus',
        'dnb-space',
        'dnb-height-animation',
        'dnb-height-animation--is-in-dom',
        'dnb-height-animation--parallax',
        'dnb-height-animation--show-overflow',
      ])
    )
  })

  it('should validate with ARIA rules', async () => {
    const Comp = mount(
      <Component
        {...props}
        data={tablistData}
        selected_key={startup_selected_key}
      >
        {contentWrapperData}
      </Component>
    )
    expect(await axeComponent(Comp)).toHaveNoViolations()
  })
})

describe('TabList component', () => {
  it('has to have the right amount of rendered components', () => {
    render(
      <Component
        {...props}
        data={tablistData}
        selected_key={startup_selected_key}
      >
        {contentWrapperData}
      </Component>
    )

    expect(
      document.querySelectorAll('.dnb-tabs__button__snap').length
    ).toBe(tablistData.length)
    expect(document.querySelectorAll('div[role="tabpanel"]').length).toBe(
      1
    )
  })

  it('has to have the right content on a "click event"', () => {
    render(
      <Component
        {...props}
        data={tablistData}
        selected_key={startup_selected_key}
      >
        {contentWrapperData}
      </Component>
    )

    fireEvent.click(document.querySelector('button[data-tab-key="third"]'))

    expect(
      document
        .querySelector('button[data-tab-key="third"]')
        .classList.contains('selected')
    ).toBe(true)

    const content = document.querySelector('div[role="tabpanel"]')
    const { container } = render(contentWrapperData.third)
    expect(content.innerHTML).toBe(container.innerHTML)
  })
})

describe('A single Tab component', () => {
  it('has to have a role="tab" attribute and a selected class', () => {
    render(
      <Component
        {...props}
        data={tablistData}
        selected_key={startup_selected_key}
      >
        {contentWrapperData}
      </Component>
    )

    expect(
      document
        .querySelector('button[data-tab-key="second"]')
        .getAttribute('role')
    ).toBe('tab')
    expect(
      document
        .querySelector('button[data-tab-key="second"]')
        .classList.contains('selected')
    ).toBe(true)
  })

  it('has to have the right content on a keydown "ArrowRight"', () => {
    render(
      <Component
        {...props}
        data={tablistData}
        selected_key={startup_selected_key}
      >
        {contentWrapperData}
      </Component>
    )

    // reset the state
    fireEvent.click(
      document.querySelector('button[data-tab-key="second"]')
    )

    fireEvent.keyDown(document.querySelector('div[role="tablist"]'), {
      key: 'ArrowRight',
      keyCode: 39, // right
    })
    fireEvent.click(document.querySelector('button[data-tab-key="third"]'))

    const content = document.querySelector('div[role="tabpanel"]')
    const { container } = render(contentWrapperData.third)
    expect(content.innerHTML).toBe(container.innerHTML)
  })

  it('has to work with "data only" property containing a "content"', () => {
    render(<Component data={tablistDataWithContent} />)
    expect(
      document
        .querySelectorAll('.dnb-tabs__button__snap')[0]
        .querySelector('button')
        .classList.contains('selected')
    ).toBe(true)
    expect(
      document.querySelector('div.dnb-tabs__content').textContent
    ).toBe('First')

    // then click on tab two
    // also test the ability of having a integer only as the key
    fireEvent.click(document.querySelector('button[data-tab-key="2"]'))
    expect(
      document.querySelector('div.dnb-tabs__content').textContent
    ).toBe('Second')
  })

  it('has to run "prevent_rerender" as supposed', () => {
    render(
      <Component
        {...props}
        prevent_rerender
        data={[
          {
            title: 'One',
            key: 'one',
            content: () => (
              <Input label="Content one" placeholder="Edit me" />
            ),
          },
          { title: 'Two', key: 'two', content: 'Content two' },
        ]}
      />
    )

    expect(document.querySelector('div.dnb-tabs__cached')).toBeTruthy()

    // also check a real live rerender scenario
    const value = 'value'
    fireEvent.change(document.querySelector('.dnb-input__input'), {
      target: { value },
    })

    // then click on tab two
    fireEvent.click(document.querySelector('button[data-tab-key="two"]'))

    // the first cache should now be hidden
    expect(
      document
        .querySelectorAll('div.dnb-tabs__cached')[0]
        .getAttribute('aria-hidden')
    ).toBe('true')

    // and on tab one again
    fireEvent.click(document.querySelector('button[data-tab-key="one"]'))

    // the entered value should still be the same
    expect(
      (document.querySelector('.dnb-input__input') as HTMLInputElement)
        .value
    ).toBe(value)

    expect(
      document
        .querySelectorAll('div.dnb-tabs__cached')[0]
        .getAttribute('aria-hidden')
    ).not.toBe('true')
    expect(
      document
        .querySelectorAll('div.dnb-tabs__cached')[1]
        .getAttribute('aria-hidden')
    ).toBe('true')
  })

  it('has to run "prerender" as supposed', () => {
    render(
      <Component
        {...props}
        prerender
        data={[
          {
            title: 'One',
            key: 1,
            content: 'Content one',
          },
          { title: 'Two', key: 2, content: 'Content two' },
        ]}
      />
    )

    expect(document.querySelector('div.dnb-tabs__cached')).toBeTruthy()

    expect(
      document
        .querySelectorAll('div.dnb-tabs__cached')[0]
        .hasAttribute('aria-hidden')
    ).toBe(false)
    expect(
      document
        .querySelectorAll('div.dnb-tabs__cached')[1]
        .getAttribute('aria-hidden')
    ).toBe('true')

    expect(
      document.querySelectorAll('div.dnb-tabs__cached')[0].textContent
    ).toBe('Content one')
    expect(
      document.querySelectorAll('div.dnb-tabs__cached')[1].textContent
    ).toBe('Content two')
  })

  it('has to work with "Tabs.Content" as children Components', () => {
    render(
      <Component {...props} data={tablistData}>
        <Component.Content title="first title">first</Component.Content>
        <Component.Content title="second title" selected>
          second
        </Component.Content>
      </Component>
    )
    expect(
      document
        .querySelector('button.selected')
        .getAttribute('data-tab-key')
    ).toBe('second-title')
    expect(
      document
        .querySelectorAll('.dnb-tabs__button__snap button')[1]
        .getAttribute('data-tab-key')
    ).toBe('second-title')
    expect(
      document.querySelector('div.dnb-tabs__content').textContent
    ).toBe('second')
    expect(
      document.querySelector(
        'button[aria-selected=true] span.dnb-tabs__button__title'
      ).textContent
    ).toBe('second title')
  })

  it('has to work with "Tabs.Content" from outside', () => {
    let testKey = null
    let testTitle = null
    const LinkedContent = (props: { selected_key?: string }) => {
      return (
        <>
          <Component id="linked" data={tablistData} {...props} />
          <Component.Content id="linked">
            {({ key, title }) => {
              testKey = key
              testTitle = title

              return key
            }}
          </Component.Content>
        </>
      )
    }

    const { rerender } = render(<LinkedContent />)

    expect(
      document
        .querySelector('button.selected')
        .getAttribute('data-tab-key')
    ).toBe('first')
    expect(testKey).toBe('first')
    expect(testTitle).toBe('First')

    rerender(<LinkedContent selected_key="second" />)

    expect(
      document
        .querySelector('button.selected')
        .getAttribute('data-tab-key')
    ).toBe('second')
    expect(testKey).toBe('second')

    fireEvent.click(document.querySelectorAll('.dnb-tabs__button')[2])

    expect(
      document
        .querySelector('button.selected')
        .getAttribute('data-tab-key')
    ).toBe('third')
    expect(testKey).toBe('third')
  })
})

describe('Tabs scss', () => {
  it('have to match snapshot', () => {
    const scss = loadScss(require.resolve('../style/deps.scss'))
    expect(scss).toMatchSnapshot()
  })
  it('have to match default theme snapshot', () => {
    const scss = loadScss(
      require.resolve('../style/themes/dnb-tabs-theme-ui.scss')
    )
    expect(scss).toMatchSnapshot()
  })
})
