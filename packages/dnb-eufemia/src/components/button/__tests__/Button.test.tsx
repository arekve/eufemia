/**
 * Button Test
 *
 */

import React from 'react'
import {
  fakeProps,
  axeComponent,
  loadScss,
} from '../../../core/jest/jestSetup'
import Button, { ButtonOnClick } from '../Button'
import IconPrimary from '../../IconPrimary'
import { fireEvent, render } from '@testing-library/react'
import FormRow from '../../form-row/FormRow'

const props = fakeProps(require.resolve('../Button'), {
  optional: true,
})
props.id = 'button'
props.variant = 'primary'
props.icon = 'question'
props.title = 'This is a button title'
props.size = null
props.status = null
props.element = null
props.tooltip = null
props.to = null
props.custom_content = null
props.text = null
props.icon_position = 'right'
props.globalStatus = { id: 'main' }

beforeAll(() => {
  jest.spyOn(global.console, 'log')
})

describe('Button component', () => {
  it('has a button tag', () => {
    const title = 'title'
    render(<Button {...props} title={title} href={null} />)
    const button = document.querySelector('button')

    expect(button.getAttribute('title')).toBe(title)
  })

  it('icon only has to have some extra classes', () => {
    render(<Button icon="question" />)
    const button = document.querySelector('button')

    // size "medium" and has icon
    expect(button.classList.contains('dnb-button--size-medium')).toBe(true)
    // has icon class, but not has text
    expect(button.classList.contains('dnb-button--has-icon')).toBe(true)
    expect(button.classList.contains('dnb-button--has-text')).toBe(false)
  })

  it('has size set to medium when button size is default', () => {
    render(<Button icon="question" size="default" />)
    const button = document.querySelector('button')
    const icon = document.querySelector('.dnb-icon')
    expect(button.classList.contains('dnb-button--icon-size-medium')).toBe(
      true
    )
    expect(icon.classList.contains('dnb-icon--medium')).toBe(true)
  })

  it('has medium icon if button size is large', () => {
    render(<Button text="Button" size="large" icon="question" />)
    const button = document.querySelector('button')
    const icon = document.querySelector('.dnb-icon')
    // size "large
    expect(button.classList.contains('dnb-button--size-large')).toBe(true)
    expect(icon.classList.contains('dnb-icon--default')).toBe(true)
  })

  it('has to have a bounding tag if property is set', () => {
    render(<Button bounding={true} />)
    expect(document.querySelector('.dnb-button__bounding')).toBeTruthy()
  })

  it('has a anchor tag', () => {
    render(<Button {...props} href="https://url" icon={null} />)
    expect(document.querySelector('a')).toBeTruthy()
    expect(document.querySelector('svg')).toBeFalsy()
  })

  it('has a anchor tag and includes a launch icon', () => {
    render(
      <Button {...props} href="https://url" target="_blank" icon={null} />
    )
    expect(document.querySelector('svg')).toBeTruthy()
  })

  it('supports anchor rel property', () => {
    render(<Button {...props} href="https://url" icon={null} rel="me" />)
    expect(document.querySelector('a').getAttribute('rel')).toBe('me')
  })

  it('has a disabled attribute, once we set disabled to true', () => {
    const { rerender } = render(<Button />)
    expect(document.querySelector('button').hasAttribute('disabled')).toBe(
      false
    )
    rerender(<Button disabled />)

    expect(document.querySelector('button').hasAttribute('disabled')).toBe(
      true
    )
  })

  it('should be able to omit button type', () => {
    render(<Button type="" />)
    expect(document.querySelector('button').hasAttribute('type')).toBe(
      false
    )
  })

  it('should use span element if defined', () => {
    render(<Button element="span" />)
    expect(document.querySelector('.dnb-button').tagName).toBe('SPAN')
    expect(
      document.querySelector('.dnb-button').getAttribute('type')
    ).toBe('button')
  })

  it('should support spacing props', () => {
    render(<Button top="2rem" />)

    const element = document.querySelector('.dnb-button')

    expect(Array.from(element.classList)).toEqual([
      'dnb-button',
      'dnb-button--primary',
      'dnb-space__top--large',
    ])
  })

  it('should inherit disabled from FormRow', () => {
    render(
      <FormRow vertical disabled>
        <Button text="Button" />
      </FormRow>
    )

    const element = document.querySelector('.dnb-button')
    const attributes = Array.from(element.attributes).map(
      (attr) => attr.name
    )

    expect(attributes).toEqual([
      'class',
      'disabled',
      'type',
      'aria-disabled',
    ])
    expect(Array.from(element.classList)).toEqual([
      'dnb-button',
      'dnb-button--primary',
      'dnb-button--has-text',
    ])
  })

  it('has "on_click" event which will trigger on a click', () => {
    const my_event = jest.fn()
    const myEvent = jest.fn()
    render(<Button on_click={my_event} onClick={myEvent} />)
    const button = document.querySelector('button')
    fireEvent.click(button)
    expect(my_event.mock.calls.length).toBe(1)
    expect(myEvent.mock.calls.length).toBe(1)
  })

  it('has set innerRef if ref was given', () => {
    const ref = React.createRef()
    expect(ref.current).toBe(null)
    render(<Button {...props} innerRef={ref} />)
    expect(ref.current).not.toBe(null)
    expect(typeof ref.current).toBe('object')
  })

  it('has type of button', () => {
    render(<Button />)
    const button = document.querySelector('button')
    expect(button.getAttribute('type')).toBe('button')
  })

  it('has alignment helper with aria-hidden', () => {
    const text = 'Button'
    const { rerender } = render(<Button text={text} />)

    expect(
      document
        .querySelector('.dnb-button__alignment')
        .getAttribute('aria-hidden')
    ).toBe('true')
    expect(document.querySelector('.dnb-button__text').textContent).toBe(
      text
    )

    rerender(<Button icon="bell" />)

    expect(
      document
        .querySelector('.dnb-button__alignment')
        .getAttribute('aria-hidden')
    ).toBe('true')
    expect(document.querySelector('.dnb-button__text')).toBeFalsy()
  })

  it('should validate with ARIA rules as a button', async () => {
    const Comp = render(<Button {...props} />)
    expect(await axeComponent(Comp)).toHaveNoViolations()
  })

  it('should validate with ARIA rules as a anchor', async () => {
    const Comp = render(<Button {...props} href="https://url" />)
    expect(await axeComponent(Comp)).toHaveNoViolations()
  })

  it('has variant set to primary as default', () => {
    render(<Button />)
    const button = document.querySelector('button')
    expect(button.classList.contains('dnb-button--primary')).toBe(true)
  })

  it('has variant set to primary when only setting text', () => {
    render(<Button text="Button" />)
    const button = document.querySelector('button')
    expect(button.classList.contains('dnb-button--primary')).toBe(true)
  })

  it('has variant set to secondary when only setting icon', () => {
    render(<Button icon="question" />)
    const button = document.querySelector('button')
    expect(button.classList.contains('dnb-button--secondary')).toBe(true)
  })

  it('has variant tertiary', () => {
    render(<Button text="Button" variant="tertiary" icon="question" />)
    const button = document.querySelector('button')
    expect(button.classList.contains('dnb-button--tertiary')).toBe(true)
  })

  it('has variant unstyled', () => {
    render(<Button text="Button" variant="unstyled" />)
    const button = document.querySelector('button')
    expect(button.classList.contains('dnb-button--unstyled')).toBe(true)
  })

  it('will replace icon with icon component', () => {
    const { rerender } = render(
      <Button icon={<span className="dnb-icon custom-icon">icon</span>} />
    )
    expect(document.querySelector('.custom-icon')).toBeTruthy()

    rerender(
      <Button
        icon={
          <IconPrimary icon="bell" className="custom-icon-component" />
        }
      />
    )

    expect(document.querySelector('.custom-icon')).toBeFalsy()
    expect(document.querySelector('.custom-icon-component')).toBeTruthy()
  })

  it('will only have attached event listener if one is given', () => {
    const on_click = jest.fn()
    const { rerender } = render(
      <Button text="Button" on_click={on_click} />
    )

    type Button = HTMLButtonElement & { onClickHandler: ButtonOnClick }

    const button = document.querySelector('button') as Button

    button.onClickHandler = on_click

    fireEvent.click(button)
    fireEvent.click(button)

    expect(on_click).toHaveBeenCalledTimes(2)
    expect(button.onClickHandler).toHaveBeenCalledTimes(2)

    rerender(<Button text="Button" onClick={undefined} />)

    fireEvent.click(button)

    // still 2
    expect(on_click).toHaveBeenCalledTimes(2)
    expect(button.onClickHandler).toHaveBeenCalledTimes(2)
  })

  it('will warn when tertiary is used without an icon', () => {
    process.env.NODE_ENV = 'development'
    global.console.log = jest.fn()
    render(<Button text="Button" variant="tertiary" />)
    expect(global.console.log).toBeCalled()
  })

  it('has no size when only setting text', () => {
    render(<Button text="Button" />)
    expect(document.querySelector('.dnb-button--size-medium')).toBeFalsy()
    expect(document.querySelector('.dnb-button--size-large')).toBeFalsy()
  })
})

describe('Button scss', () => {
  it('have to match snapshot', () => {
    const scss = loadScss(require.resolve('../style/deps.scss'))
    expect(scss).toMatchSnapshot()
  })
  it('have to match default theme snapshot', () => {
    const scss = loadScss(
      require.resolve('../style/themes/dnb-button-theme-ui.scss')
    )
    expect(scss).toMatchSnapshot()
  })
})
