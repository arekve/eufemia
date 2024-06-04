/**
 * Web Logo Component
 *
 * This is a legacy component.
 * For refferencing while developing new features, please use a Functional component.
 */

import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import Context from '../../shared/Context'
import {
  validateDOMAttributes,
  extendPropsWithContextInClassComponent,
} from '../../shared/component-helper'
import {
  spacingPropTypes,
  createSpacingClasses,
} from '../space/SpacingHelper'

export default class Logo extends React.PureComponent {
  static contextType = Context

  static propTypes = {
    size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    ratio: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    brand: PropTypes.string,
    variant: PropTypes.string,
    alt: PropTypes.string,
    color: PropTypes.string,
    inherit_color: PropTypes.bool,
    class: PropTypes.string,

    ...spacingPropTypes,

    className: PropTypes.string,
  }

  static defaultProps = {
    size: null,
    ratio: 1.453690625,
    width: null,
    height: null,
    brand: null,
    variant: 'default',
    alt: 'DNB Logo',
    color: null,
    inherit_color: null,
    class: null,
    className: null,
  }

  static sbankenProps = {
    ratio: 2.72027972027972,
    brand: 'sbanken',
    alt: 'Sbanken - et konsept fra DNB logo',
  }

  static sbankenCompactProps = {
    ratio: 0.70074812967581,
  }

  static sbankenCompactHorizontalProps = {
    ratio: 1.715277777777778,
  }

  render() {
    // use only the props from context, who are available here anyway
    const props = extendPropsWithContextInClassComponent(
      this.props,
      Logo.defaultProps,
      this.context.getTranslation(this.props).Logo,
      this.context.Logo
    )

    let {
      ratio,
      size,
      width,
      height,
      brand,
      variant,
      color,
      inherit_color,
      alt,
      className,
      ...rest
    } = props

    if (brand == null && this.context.theme) {
      // Attempt to get theme from context
      brand = this.context.theme.name
    }

    if (brand === 'sbanken') {
      ratio = Logo.sbankenProps.ratio
      alt = Logo.sbankenProps.alt

      if (variant === 'compact') {
        ratio = Logo.sbankenCompactProps.ratio
      } else if (variant === 'compactHorizontal') {
        ratio = Logo.sbankenCompactHorizontalProps.ratio
      }
    }

    if (parseFloat(size) > -1 && width === null && height === null) {
      width = size * ratio
      height = width / ratio
    } else if (parseFloat(width) > -1 && height === null) {
      height = width / ratio
    } else if (parseFloat(height) > -1 && width === null) {
      width = height * ratio
    }

    const rootParams = {
      ui: {
        className: classnames(
          'dnb-logo',
          className,
          createSpacingClasses(props),
          (width > 0 || height > 0) && 'dnb-logo--has-size',
          size === 'inherit' && 'dnb-logo--inherit-size',
          inherit_color && 'dnb-logo--inherit-color'
        ),
        role: 'img',
        alt,
        ['data-ratio']: ratio,
        ['aria-hidden']: true,
        ...rest,
      },
      sbanken: {
        className: classnames(
          'sbanken-logo',
          className,
          createSpacingClasses(props),
          (width > 0 || height > 0) && 'sbanken-logo--has-size',
          size === 'inherit' && 'sbanken-logo--inherit-size',
          inherit_color && 'sbanken-logo--inherit-color'
        ),
        role: 'img',
        alt,
        ['data-ratio']: ratio,
        ['aria-hidden']: true,
        ...rest,
      },
    }

    const svgParams = {
      ui: {
        default: {
          viewBox: '0 0 93.0362 64', // these size are set to me associated with the svg path point values
        },
      },
      sbanken: {
        default: {
          viewBox: '0 0 389 143',
        },
        compact: {
          viewBox: '0 0 281 401',
        },
        compactHorizontal: {
          viewBox: '0 0 494 288',
        },
      },
    }

    if (parseFloat(width) > -1) {
      svgParams.ui.default['width'] = width
      svgParams.sbanken.default['width'] = width
      svgParams.sbanken.compact['width'] = width
      svgParams.sbanken.compactHorizontal['width'] = width
    }
    if (parseFloat(height) > -1) {
      svgParams.ui.default['height'] = height
      svgParams.sbanken.default['height'] = height
      svgParams.sbanken.compact['height'] = height
      svgParams.sbanken.compactHorizontal['height'] = height
    }
    if (color) {
      svgParams.ui.default['color'] = color
      svgParams.sbanken.default['color'] = color
      svgParams.sbanken.compact['color'] = color
      svgParams.sbanken.compactHorizontal['color'] = color
    }

    const logos = {
      ui: {
        default: (
          <svg {...svgParams.ui.default}>
            <title>{alt}</title>
            <path d="M89.668 31.9442a10.6487 10.6487 0 0 0-1.8465-1.2184l-.178-.0887.1554-.1337a8.7063 8.7063 0 0 0 2.7652-6.848c-.006-3.3331-1.1437-5.82-3.413-7.3936-1.9135-1.3528-4.5588-2.0142-8.092-2.0079l-10.1326.0182a1.081 1.081 0 0 0-1.0645 1.0685l.0597 33.2203a1.0667 1.0667 0 0 0 1.0685 1.0646l11.577-.0208c3.644-.0065 6.5758-.7897 8.684-2.3266a8.6558 8.6558 0 0 0 2.7937-3.4054 11.2675 11.2675 0 0 0 .9913-4.868 8.967 8.967 0 0 0-3.3681-7.0605zM71.1547 17.5795l7.9106-.0142q4.1997-.0076 6.202 1.3885c.8454.5985 2.003 1.752 2.0083 4.7074.0095 5.2883-4.1672 5.7179-5.4338 5.7201l-10.6659.0192zm9.4066 28.7366l-9.355.0168-.0244-13.6438 10.6659-.0191c4.6219-.0083 7.8707 2.6072 7.8774 6.3407.0033 1.8.0131 7.289-9.1639 7.3054z" />
            <path d="M22.4948 19.6221a14.0642 14.0642 0 0 0-5.5848-4.101 16.8443 16.8443 0 0 0-6.2238-1.1443l-9.6215.0173A1.086 1.086 0 0 0 0 15.4853L.0597 48.683a1.0668 1.0668 0 0 0 1.0686 1.0646l9.6214-.0173a16.3939 16.3939 0 0 0 6.2197-1.1667 13.8015 13.8015 0 0 0 5.57-4.0994c3.3924-4.1833 3.894-9.4508 3.889-12.2284-.0043-2.3544-.3927-8.2876-3.9336-12.6136zm-2.5144 22.758a11.615 11.615 0 0 1-9.2366 4.0615l-7.3773.0133-.0516-28.7535 7.3772-.0132a11.5412 11.5412 0 0 1 9.2512 4.0271c2.9396 3.5948 3.1714 8.9716 3.1742 10.5264.0042 2.3338-.3878 6.7559-3.137 10.1384z" />
            <path d="M59.9016 0l.0877 48.7976a.9801.9801 0 0 1-.6872.956.7852.7852 0 0 1-.311.0678 1.011 1.011 0 0 1-.8229-.4217L36.3643 21.7303l.076 42.2638L33.1294 64l-.0879-48.9083a.9989.9989 0 0 1 .7094-.956.706.706 0 0 1 .311-.045 1.0218 1.0218 0 0 1 .8229.3978l21.8038 27.6922L56.6128.0059z" />
          </svg>
        ),
      },
      sbanken: {
        default: (
          <svg {...svgParams.sbanken.default}>
            <title>{alt}</title>
            <path d="M55.6037 14.6658C59.8037 14.6658 62.9037 11.4658 62.9037 7.36577C62.9037 3.26577 59.7037 0.165771 55.6037 0.165771C51.3037 0.165771 48.1037 3.26577 48.1037 7.36577C48.1037 11.5658 51.3037 14.6658 55.6037 14.6658ZM97.2037 80.9658C111.104 80.9658 121.004 69.5658 121.004 52.9658C121.004 36.3658 111.104 24.9658 97.1037 24.9658C90.6037 24.9658 85.0037 27.8658 81.6037 31.9658H81.4037V6.46577H73.4037V79.4658H81.1037V74.2658H81.3037C84.8037 78.5658 90.7037 80.9658 97.2037 80.9658ZM237.504 79.4658H245.504V61.1658L253.504 52.6658H253.704L270.804 79.4658H280.304L259.204 46.9658L278.904 26.4658H267.704L245.704 49.8658H245.504V6.46577H237.504V79.4658ZM23.6037 80.8658C36.0037 80.8658 45.5037 71.9658 45.5037 60.0658C45.5037 49.4658 40.5037 44.0658 24.2037 37.0658C16.3037 33.5658 13.5037 30.7658 13.5037 26.3658C13.5037 20.9658 17.7037 17.0658 23.6037 17.0658C28.9037 17.0658 32.8037 20.4658 34.1037 26.2658L43.4037 23.9658C41.2037 14.2658 33.4037 7.96577 23.6037 7.96577C12.4037 7.96577 3.90371 15.9658 3.90371 26.3658C3.90371 35.3658 8.50371 40.4658 21.8037 46.4658C32.4037 50.9658 35.9037 54.3658 35.9037 60.0658C35.9037 66.8658 30.6037 71.7658 23.6037 71.7658C16.3037 71.7658 11.6037 67.5658 10.0037 59.6658L0.803711 61.9658C3.40371 73.9658 11.6037 80.8658 23.6037 80.8658ZM146.504 80.9658C153.104 80.9658 158.804 78.3658 161.804 73.9658H162.004V79.4658H169.504V42.2658C169.504 31.5658 162.204 24.9658 150.304 24.9658C139.204 24.9658 130.904 31.5658 129.004 41.9658L137.104 43.5658C138.504 36.4658 143.404 32.2658 150.304 32.2658C156.804 32.2658 161.004 35.3658 161.004 40.2658C161.004 44.4658 157.804 46.6658 147.604 49.1658C134.304 52.4658 129.104 56.9658 129.104 65.9658C129.104 75.1658 135.804 80.9658 146.504 80.9658ZM182.004 79.4658H190.004V46.2658C190.004 38.0658 195.604 32.4658 203.904 32.4658C212.004 32.4658 217.004 37.6658 217.004 46.2658V79.4658H225.004V45.1658C225.004 32.8658 217.104 24.9658 204.804 24.9658C199.204 24.9658 193.204 27.4658 190.004 31.1658H189.804V26.4658H182.004V79.4658ZM308.404 80.9658C318.604 80.9658 326.304 76.2658 330.904 67.1658L324.304 63.1658C319.704 70.9658 315.604 73.6658 308.204 73.6658C298.504 73.6658 292.204 65.2658 292.004 55.3658H332.104V51.2658C332.104 35.5658 322.704 24.9658 308.404 24.9658C293.804 24.9658 283.804 36.2658 283.804 52.9658C283.804 69.6658 293.704 80.9658 308.404 80.9658ZM343.104 79.4658H351.104V46.2658C351.104 38.0658 356.704 32.4658 365.004 32.4658C373.104 32.4658 378.104 37.6658 378.104 46.2658V79.4658H386.104V45.1658C386.104 32.8658 378.204 24.9658 365.904 24.9658C360.304 24.9658 354.304 27.4658 351.104 31.1658H350.904V26.4658H343.104V79.4658ZM292.204 48.8658C292.304 40.1658 299.304 32.2658 308.404 32.2658C317.704 32.2658 323.704 39.5658 324.004 48.8658H292.204ZM96.6037 73.4658C88.3037 73.4658 81.4037 66.5658 81.4037 57.8658V47.9658C81.4037 39.3658 88.3037 32.4658 97.1037 32.4658C106.504 32.4658 113.004 40.5658 113.004 52.9658C113.004 65.3658 106.504 73.4658 96.6037 73.4658ZM147.104 73.4658C140.604 73.4658 137.104 70.6658 137.104 65.4658C137.104 60.9658 140.604 58.4658 149.804 56.0658C156.804 54.2658 160.204 52.4658 161.304 49.8658H161.504V61.4658C161.504 68.4658 155.504 73.4658 147.104 73.4658Z" />
            <path d="M81.5615 134.527C78.7757 134.527 76.509 133.615 74.7616 131.792C73.0141 129.956 72.1404 127.505 72.1404 124.441V123.795C72.1404 121.756 72.5266 119.939 73.299 118.344C74.0841 116.736 75.1731 115.482 76.566 114.583C77.9716 113.671 79.4911 113.215 81.1246 113.215C83.7965 113.215 85.8731 114.095 87.3547 115.856C88.8362 117.616 89.577 120.136 89.577 123.415V124.878H75.6543C75.7049 126.904 76.2938 128.544 77.4208 129.797C78.5604 131.038 80.004 131.659 81.7514 131.659C82.9924 131.659 84.0434 131.405 84.9044 130.899C85.7655 130.392 86.5189 129.721 87.1647 128.885L89.3111 130.557C87.589 133.204 85.0057 134.527 81.5615 134.527ZM81.1246 116.102C79.7064 116.102 78.5161 116.622 77.5537 117.66C76.5913 118.686 75.9962 120.129 75.7683 121.991H86.0631V121.725C85.9618 119.939 85.4806 118.559 84.6195 117.584C83.7585 116.596 82.5935 116.102 81.1246 116.102Z" />
            <path d="M98.1099 108.619V113.595H101.947V116.311H98.1099V129.056C98.1099 129.88 98.2808 130.5 98.6227 130.918C98.9646 131.323 99.5471 131.526 100.37 131.526C100.775 131.526 101.333 131.45 102.042 131.298V134.147C101.117 134.4 100.218 134.527 99.3445 134.527C97.7743 134.527 96.5903 134.052 95.7926 133.102C94.9948 132.152 94.5959 130.804 94.5959 129.056V116.311H90.8541V113.595H94.5959V108.619H98.1099Z" />
            <path d="M120.817 124.631L118.614 126.929V134.147H115.1V104.972H118.614V122.617L120.494 120.357L126.895 113.595H131.169L123.172 122.181L132.099 134.147H127.978L120.817 124.631Z" />
            <path d="M133.547 123.681C133.547 121.668 133.94 119.857 134.725 118.249C135.523 116.641 136.624 115.4 138.03 114.526C139.448 113.652 141.063 113.215 142.874 113.215C145.672 113.215 147.932 114.184 149.654 116.121C151.389 118.059 152.257 120.636 152.257 123.852V124.099C152.257 126.1 151.87 127.898 151.098 129.493C150.338 131.076 149.243 132.311 147.812 133.197C146.394 134.084 144.76 134.527 142.911 134.527C140.126 134.527 137.865 133.558 136.131 131.621C134.408 129.683 133.547 127.119 133.547 123.928V123.681ZM137.08 124.099C137.08 126.378 137.606 128.208 138.657 129.588C139.72 130.969 141.139 131.659 142.911 131.659C144.697 131.659 146.115 130.962 147.166 129.569C148.217 128.164 148.743 126.201 148.743 123.681C148.743 121.427 148.205 119.604 147.128 118.211C146.065 116.805 144.646 116.102 142.874 116.102C141.139 116.102 139.739 116.793 138.676 118.173C137.612 119.553 137.08 121.528 137.08 124.099Z" />
            <path d="M159.669 113.595L159.783 116.178C161.353 114.203 163.404 113.215 165.937 113.215C170.28 113.215 172.471 115.666 172.509 120.566V134.147H168.995V120.547C168.982 119.066 168.64 117.97 167.969 117.261C167.311 116.552 166.279 116.197 164.873 116.197C163.734 116.197 162.733 116.501 161.872 117.109C161.011 117.717 160.34 118.515 159.859 119.502V134.147H156.345V113.595H159.669Z" />
            <path d="M189.456 128.696C189.456 127.746 189.095 127.011 188.373 126.492C187.664 125.96 186.417 125.505 184.632 125.125C182.859 124.745 181.447 124.289 180.396 123.757C179.358 123.225 178.585 122.592 178.079 121.858C177.585 121.123 177.338 120.249 177.338 119.236C177.338 117.552 178.047 116.128 179.465 114.963C180.896 113.798 182.72 113.215 184.936 113.215C187.265 113.215 189.152 113.817 190.596 115.02C192.052 116.223 192.78 117.761 192.78 119.635H189.247C189.247 118.673 188.836 117.844 188.013 117.147C187.202 116.451 186.176 116.102 184.936 116.102C183.657 116.102 182.656 116.381 181.934 116.938C181.213 117.495 180.852 118.223 180.852 119.123C180.852 119.971 181.187 120.61 181.858 121.041C182.53 121.471 183.739 121.883 185.486 122.276C187.246 122.668 188.671 123.137 189.76 123.681C190.849 124.226 191.653 124.884 192.172 125.656C192.704 126.416 192.97 127.347 192.97 128.449C192.97 130.285 192.236 131.76 190.767 132.874C189.298 133.976 187.392 134.527 185.049 134.527C183.403 134.527 181.947 134.236 180.681 133.653C179.415 133.071 178.421 132.26 177.699 131.222C176.99 130.171 176.635 129.037 176.635 127.822H180.149C180.212 128.999 180.681 129.937 181.555 130.633C182.441 131.317 183.606 131.659 185.049 131.659C186.379 131.659 187.443 131.393 188.24 130.861C189.051 130.316 189.456 129.595 189.456 128.696Z" />
            <path d="M205.758 134.527C202.972 134.527 200.705 133.615 198.958 131.792C197.21 129.956 196.336 127.505 196.336 124.441V123.795C196.336 121.756 196.723 119.939 197.495 118.344C198.28 116.736 199.369 115.482 200.762 114.583C202.168 113.671 203.687 113.215 205.321 113.215C207.993 113.215 210.069 114.095 211.551 115.856C213.032 117.616 213.773 120.136 213.773 123.415V124.878H199.85C199.901 126.904 200.49 128.544 201.617 129.797C202.756 131.038 204.2 131.659 205.948 131.659C207.188 131.659 208.239 131.405 209.101 130.899C209.962 130.392 210.715 129.721 211.361 128.885L213.507 130.557C211.785 133.204 209.202 134.527 205.758 134.527ZM205.321 116.102C203.902 116.102 202.712 116.622 201.75 117.66C200.787 118.686 200.192 120.129 199.964 121.991H210.259V121.725C210.158 119.939 209.677 118.559 208.816 117.584C207.955 116.596 206.79 116.102 205.321 116.102Z" />
            <path d="M234.899 124.099C234.899 127.227 234.184 129.747 232.753 131.659C231.322 133.571 229.384 134.527 226.941 134.527C224.446 134.527 222.483 133.735 221.052 132.152V142.048H217.538V113.595H220.748L220.919 115.875C222.35 114.102 224.338 113.215 226.884 113.215C229.353 113.215 231.303 114.146 232.734 116.007C234.177 117.869 234.899 120.458 234.899 123.776V124.099ZM231.385 123.7C231.385 121.383 230.891 119.553 229.904 118.211C228.916 116.869 227.561 116.197 225.839 116.197C223.712 116.197 222.116 117.141 221.052 119.028V128.848C222.103 130.722 223.712 131.659 225.877 131.659C227.561 131.659 228.897 130.994 229.885 129.664C230.885 128.322 231.385 126.334 231.385 123.7Z" />
            <path d="M243.831 108.619V113.595H247.668V116.311H243.831V129.056C243.831 129.88 244.002 130.5 244.344 130.918C244.686 131.323 245.268 131.526 246.091 131.526C246.496 131.526 247.053 131.45 247.763 131.298V134.147C246.838 134.4 245.939 134.527 245.065 134.527C243.495 134.527 242.311 134.052 241.514 133.102C240.716 132.152 240.317 130.804 240.317 129.056V116.311H236.575V113.595H240.317V108.619H243.831Z" />
            <path d="M262.53 134.147V116.311H259.282V113.595H262.53V111.487C262.53 109.284 263.119 107.58 264.296 106.377C265.474 105.174 267.139 104.573 269.292 104.573C270.102 104.573 270.906 104.681 271.704 104.896L271.514 107.745C270.919 107.631 270.286 107.574 269.615 107.574C268.475 107.574 267.595 107.91 266.975 108.581C266.354 109.239 266.044 110.189 266.044 111.43V113.595H270.432V116.311H266.044V134.147H262.53Z" />
            <path d="M283.941 116.748C283.409 116.66 282.833 116.615 282.212 116.615C279.908 116.615 278.344 117.597 277.521 119.559V134.147H274.007V113.595H277.426L277.483 115.969C278.635 114.133 280.269 113.215 282.383 113.215C283.067 113.215 283.586 113.304 283.941 113.481V116.748Z" />
            <path d="M298.799 134.147C298.596 133.742 298.432 133.02 298.305 131.982C296.671 133.678 294.721 134.527 292.455 134.527C290.429 134.527 288.764 133.957 287.459 132.817C286.168 131.665 285.522 130.209 285.522 128.449C285.522 126.309 286.332 124.65 287.953 123.472C289.587 122.282 291.879 121.687 294.829 121.687H298.248V120.072C298.248 118.844 297.881 117.869 297.146 117.147C296.412 116.413 295.329 116.045 293.898 116.045C292.645 116.045 291.594 116.362 290.745 116.995C289.897 117.628 289.473 118.394 289.473 119.293H285.94C285.94 118.268 286.301 117.28 287.022 116.33C287.757 115.368 288.745 114.608 289.986 114.051C291.239 113.494 292.613 113.215 294.107 113.215C296.475 113.215 298.33 113.81 299.673 115.001C301.015 116.178 301.711 117.806 301.762 119.882V129.341C301.762 131.228 302.002 132.729 302.484 133.843V134.147H298.799ZM292.968 131.469C294.069 131.469 295.114 131.184 296.102 130.614C297.089 130.044 297.805 129.303 298.248 128.392V124.175H295.494C291.188 124.175 289.036 125.435 289.036 127.955C289.036 129.056 289.403 129.918 290.137 130.538C290.872 131.158 291.815 131.469 292.968 131.469Z" />
            <path d="M316.833 134.147V106.491H324.64C327.046 106.491 329.173 107.023 331.022 108.087C332.871 109.151 334.295 110.664 335.295 112.627C336.308 114.589 336.821 116.843 336.834 119.388V121.155C336.834 123.763 336.328 126.049 335.314 128.012C334.314 129.974 332.877 131.481 331.003 132.532C329.141 133.583 326.97 134.122 324.488 134.147H316.833ZM320.48 109.492V131.165H324.317C327.128 131.165 329.312 130.291 330.87 128.544C332.44 126.796 333.225 124.308 333.225 121.079V119.464C333.225 116.324 332.484 113.886 331.003 112.152C329.534 110.404 327.445 109.518 324.735 109.492H320.48Z" />
            <path d="M363.297 134.147H359.631L345.709 112.835V134.147H342.043V106.491H345.709L359.669 127.898V106.491H363.297V134.147Z" />
            <path d="M369.456 134.147V106.491H378.497C381.498 106.491 383.752 107.112 385.259 108.353C386.779 109.594 387.538 111.43 387.538 113.861C387.538 115.153 387.171 116.299 386.437 117.299C385.702 118.287 384.702 119.053 383.436 119.597C384.93 120.015 386.107 120.813 386.969 121.991C387.842 123.156 388.279 124.549 388.279 126.169C388.279 128.651 387.475 130.601 385.867 132.02C384.259 133.438 381.986 134.147 379.048 134.147H369.456ZM373.103 121.212V131.165H379.124C380.821 131.165 382.157 130.728 383.132 129.854C384.119 128.968 384.613 127.752 384.613 126.207C384.613 122.877 382.802 121.212 379.181 121.212H373.103ZM373.103 118.287H378.611C380.207 118.287 381.479 117.888 382.429 117.09C383.391 116.292 383.872 115.21 383.872 113.842C383.872 112.323 383.429 111.221 382.543 110.537C381.656 109.841 380.308 109.492 378.497 109.492H373.103V118.287Z" />
          </svg>
        ),
        compact: (
          <svg {...svgParams.sbanken.compact}>
            <title>{alt}</title>
            <path d="M249.271 51.7618C264.189 51.7618 275.2 40.3957 275.2 25.8328C275.2 11.27 263.834 0.259033 249.271 0.259033C233.998 0.259033 222.632 11.27 222.632 25.8328C222.632 40.7509 233.998 51.7618 249.271 51.7618ZM135.61 286.898C179.654 286.898 213.397 255.286 213.397 213.019C213.397 175.368 195.637 156.188 137.741 131.325C109.681 118.893 99.7358 108.948 99.7358 93.3192C99.7358 74.1388 114.654 60.2864 135.61 60.2864C154.435 60.2864 168.288 72.3629 172.905 92.964L205.938 84.7946C198.124 50.341 170.419 27.964 135.61 27.964C95.8287 27.964 65.6374 56.3793 65.6374 93.3192C65.6374 125.286 81.9762 143.401 129.217 164.713C166.867 180.696 179.299 192.773 179.299 213.019C179.299 237.172 160.474 254.576 135.61 254.576C109.681 254.576 92.9871 239.658 87.3041 211.598L54.6265 219.767C63.8614 262.39 92.9871 286.898 135.61 286.898Z" />
            <path d="M7.49563 399.426V360.341H0.37793V354.389H7.49563V349.769C7.49563 344.94 8.78598 341.208 11.3667 338.572C13.9474 335.936 17.5964 334.618 22.3138 334.618C24.0897 334.618 25.8518 334.854 27.6 335.325L27.1838 341.569C25.8796 341.319 24.4921 341.194 23.0214 341.194C20.5239 341.194 18.5954 341.93 17.2356 343.4C15.8759 344.843 15.1961 346.925 15.1961 349.644V354.389H24.8112V360.341H15.1961V399.426H7.49563Z" />
            <path d="M53.9825 361.299C52.817 361.104 51.5544 361.007 50.1947 361.007C45.1443 361.007 41.7173 363.158 39.9136 367.459V399.426H32.2131V354.389H39.7055L39.8303 359.592C42.3555 355.568 45.9352 353.557 50.5693 353.557C52.0678 353.557 53.2055 353.751 53.9825 354.139V361.299Z" />
            <path d="M86.1091 399.426C85.6651 398.538 85.3043 396.957 85.0268 394.681C81.4472 398.4 77.1738 400.259 72.2066 400.259C67.7668 400.259 64.1177 399.01 61.2595 396.513C58.4291 393.987 57.0139 390.796 57.0139 386.939C57.0139 382.249 58.7898 378.614 62.3418 376.034C65.9214 373.425 70.9441 372.121 77.4097 372.121H84.902V368.583C84.902 365.891 84.0972 363.754 82.4878 362.173C80.8783 360.563 78.5058 359.759 75.3701 359.759C72.6229 359.759 70.3197 360.452 68.4605 361.84C66.6013 363.227 65.6717 364.906 65.6717 366.876H57.9296C57.9296 364.629 58.7205 362.464 60.3022 360.383C61.9116 358.274 64.0761 356.609 66.7955 355.388C69.5427 354.167 72.5535 353.557 75.8279 353.557C81.0171 353.557 85.0823 354.861 88.0238 357.469C90.9652 360.05 92.4914 363.616 92.6024 368.167V388.895C92.6024 393.03 93.1296 396.318 94.1841 398.76V399.426H86.1091ZM73.3305 393.557C75.7447 393.557 78.034 392.933 80.1985 391.684C82.3629 390.435 83.9307 388.812 84.902 386.814V377.574H78.8665C69.4317 377.574 64.7143 380.335 64.7143 385.857C64.7143 388.271 65.5191 390.158 67.1285 391.518C68.738 392.877 70.8053 393.557 73.3305 393.557Z" />
            <path d="M124.763 399.426V338.822H141.871C147.143 338.822 151.805 339.987 155.857 342.318C159.908 344.649 163.03 347.965 165.222 352.266C167.442 356.567 168.566 361.507 168.594 367.084V370.955C168.594 376.672 167.484 381.681 165.264 385.982C163.071 390.283 159.922 393.585 155.815 395.888C151.736 398.191 146.977 399.371 141.538 399.426H124.763ZM132.755 345.398V392.891H141.163C147.324 392.891 152.11 390.977 155.524 387.147C158.965 383.318 160.685 377.865 160.685 370.789V367.251C160.685 360.369 159.062 355.027 155.815 351.226C152.596 347.396 148.017 345.454 142.079 345.398H132.755Z" />
            <path d="M226.152 399.426H218.119L187.609 352.724V399.426H179.575V338.822H187.609L218.202 385.732V338.822H226.152V399.426Z" />
            <path d="M239.215 399.426V338.822H259.028C265.605 338.822 270.544 340.181 273.846 342.901C277.176 345.62 278.841 349.644 278.841 354.972C278.841 357.802 278.036 360.314 276.427 362.506C274.818 364.67 272.625 366.349 269.85 367.542C273.125 368.458 275.706 370.206 277.592 372.787C279.507 375.34 280.465 378.392 280.465 381.944C280.465 387.383 278.702 391.656 275.178 394.764C271.654 397.872 266.673 399.426 260.235 399.426H239.215ZM247.207 371.08V392.891H260.402C264.12 392.891 267.048 391.934 269.184 390.019C271.349 388.077 272.431 385.413 272.431 382.027C272.431 374.729 268.463 371.08 260.527 371.08H247.207ZM247.207 364.67H259.278C262.774 364.67 265.563 363.796 267.644 362.048C269.753 360.3 270.808 357.927 270.808 354.93C270.808 351.6 269.837 349.186 267.894 347.688C265.952 346.161 262.996 345.398 259.028 345.398H247.207V364.67Z" />
          </svg>
        ),
        compactHorizontal: (
          <svg {...svgParams.sbanken.compactHorizontal}>
            <title>{alt}</title>
            <path d="M194.648 52.4349C209.566 52.4349 220.577 41.0687 220.577 26.5059C220.577 11.9431 209.211 0.932129 194.648 0.932129C179.374 0.932129 168.008 11.9431 168.008 26.5059C168.008 41.4239 179.374 52.4349 194.648 52.4349ZM80.9865 287.571C125.03 287.571 158.773 255.959 158.773 213.692C158.773 176.041 141.014 156.861 83.1177 131.998C55.0576 119.566 45.1122 109.621 45.1122 93.9922C45.1122 74.8119 60.0302 60.9594 80.9865 60.9594C99.8116 60.9594 113.664 73.0359 118.282 93.637L151.314 85.4676C143.5 51.0141 115.795 28.637 80.9865 28.637C41.2051 28.637 11.0138 57.0523 11.0138 93.9922C11.0138 125.959 27.3526 144.074 74.5931 165.386C112.243 181.369 124.675 193.446 124.675 213.692C124.675 237.845 105.85 255.249 80.9865 255.249C55.0576 255.249 38.3636 240.331 32.6805 212.271L0.00292969 220.44C9.2379 263.063 38.3636 287.571 80.9865 287.571Z" />
            <path d="M220.589 279.199V240.114H213.471V234.162H220.589V229.541C220.589 224.713 221.879 220.981 224.46 218.344C227.041 215.708 230.69 214.39 235.407 214.39C237.183 214.39 238.945 214.626 240.693 215.098L240.277 221.341C238.973 221.092 237.585 220.967 236.115 220.967C233.617 220.967 231.689 221.702 230.329 223.173C228.969 224.616 228.289 226.697 228.289 229.416V234.162H237.904V240.114H228.289V279.199H220.589Z" />
            <path d="M267.076 241.071C265.91 240.877 264.648 240.78 263.288 240.78C258.238 240.78 254.811 242.93 253.007 247.231V279.199H245.306V234.162H252.799L252.924 239.365C255.449 235.341 259.028 233.329 263.663 233.329C265.161 233.329 266.299 233.523 267.076 233.912V241.071Z" />
            <path d="M299.202 279.199C298.758 278.311 298.398 276.729 298.12 274.454C294.54 278.172 290.267 280.031 285.3 280.031C280.86 280.031 277.211 278.782 274.353 276.285C271.522 273.76 270.107 270.569 270.107 266.711C270.107 262.022 271.883 258.387 275.435 255.806C279.015 253.198 284.037 251.893 290.503 251.893H297.995V248.355C297.995 245.664 297.19 243.527 295.581 241.945C293.972 240.336 291.599 239.531 288.463 239.531C285.716 239.531 283.413 240.225 281.554 241.612C279.694 243 278.765 244.679 278.765 246.649H271.023C271.023 244.401 271.814 242.237 273.395 240.155C275.005 238.046 277.169 236.381 279.889 235.16C282.636 233.94 285.647 233.329 288.921 233.329C294.11 233.329 298.176 234.633 301.117 237.242C304.058 239.822 305.585 243.388 305.696 247.939V268.668C305.696 272.802 306.223 276.091 307.277 278.533V279.199H299.202ZM286.424 273.33C288.838 273.33 291.127 272.705 293.292 271.457C295.456 270.208 297.024 268.585 297.995 266.587V257.346H291.96C282.525 257.346 277.808 260.107 277.808 265.629C277.808 268.043 278.612 269.93 280.222 271.29C281.831 272.65 283.899 273.33 286.424 273.33Z" />
            <path d="M337.857 279.199V218.594H354.964C360.236 218.594 364.898 219.76 368.95 222.091C373.001 224.422 376.123 227.738 378.315 232.039C380.535 236.34 381.659 241.279 381.687 246.857V250.728C381.687 256.444 380.577 261.453 378.357 265.754C376.165 270.055 373.015 273.357 368.908 275.661C364.829 277.964 360.07 279.143 354.631 279.199H337.857ZM345.848 225.171V272.664H354.256C360.417 272.664 365.204 270.749 368.617 266.92C372.058 263.09 373.778 257.637 373.778 250.561V247.023C373.778 240.141 372.155 234.8 368.908 230.998C365.689 227.169 361.111 225.226 355.172 225.171H345.848Z" />
            <path d="M439.245 279.199H431.212L400.702 232.497V279.199H392.668V218.594H400.702L431.295 265.504V218.594H439.245V279.199Z" />
            <path d="M452.308 279.199V218.594H472.121C478.698 218.594 483.637 219.954 486.939 222.673C490.269 225.393 491.934 229.416 491.934 234.744C491.934 237.575 491.129 240.086 489.52 242.278C487.911 244.443 485.718 246.121 482.943 247.315C486.218 248.23 488.799 249.979 490.686 252.559C492.6 255.112 493.558 258.165 493.558 261.717C493.558 267.155 491.795 271.429 488.271 274.537C484.747 277.645 479.766 279.199 473.328 279.199H452.308ZM460.3 250.853V272.664H473.495C477.213 272.664 480.141 271.706 482.277 269.792C484.442 267.849 485.524 265.185 485.524 261.8C485.524 254.502 481.556 250.853 473.62 250.853H460.3ZM460.3 244.443H472.371C475.867 244.443 478.656 243.569 480.737 241.82C482.846 240.072 483.901 237.7 483.901 234.703C483.901 231.373 482.93 228.959 480.987 227.46C479.045 225.934 476.089 225.171 472.121 225.171H460.3V244.443Z" />
          </svg>
        ),
      },
    }

    let selectedLogo = logos.ui.default
    let selectedLogoRootParams = rootParams.ui
    if (brand === 'sbanken') {
      selectedLogoRootParams = rootParams.sbanken
      switch (variant) {
        case 'compact':
          selectedLogo = logos.sbanken.compact
          break
        case 'compactHorizontal':
          selectedLogo = logos.sbanken.compactHorizontal
          break
        default:
          selectedLogo = logos.sbanken.default
      }
    }

    validateDOMAttributes(this.props, selectedLogoRootParams)

    return <span {...selectedLogoRootParams}>{selectedLogo}</span>
  }
}

Logo._supportsSpacingProps = true
