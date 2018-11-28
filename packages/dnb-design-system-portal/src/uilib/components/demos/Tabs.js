/**
 * ATTENTION: This file is auto generated by using "makeDemosFactory".
 * Do not change the content!
 *
 * "Component" Demo setup
 * Ready for imporing in page
 *
 */

import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import ItemWrapper from '../../../shared/parts/uilib/ItemWrapper'
import DemoComponent, {
  Example as CodeComponent
} from 'dnb-ui-lib/src/components/tabs/Example'
import Description from 'dnb-ui-lib/src/components/tabs/description.md'
import Details from 'dnb-ui-lib/src/components/tabs/details.md'
import ExampleCode from 'raw-loader!../examples/Tabs.txt'

export default class TabsDemo extends PureComponent {
  static propTypes = {
    title: PropTypes.string,
    id: PropTypes.string,
    Description: PropTypes.func,
    Details: PropTypes.func,
    DemoComponent: PropTypes.func,
    CodeComponent: PropTypes.func,
    hideTabs: PropTypes.bool
  }
  static defaultProps = {
    title: 'Tabs',
    id: 'tabs',
    ExampleCode,
    Description,
    Details,
    DemoComponent,
    CodeComponent,
    callback: CodeComponent.AdditionalCallback || null,
    hideTabs: false
  }
  render() {
    return <ItemWrapper {...TabsDemo.defaultProps} {...this.props} />
  }
}
