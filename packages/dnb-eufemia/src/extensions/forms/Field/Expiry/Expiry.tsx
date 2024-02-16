import React, { useCallback, useContext } from 'react'
import SharedContext from '../../../../shared/Context'
import { FieldHelpProps, FieldProps } from '../../types'
import { pickSpacingProps } from '../../../../components/flex/utils'
import { useDataValue } from '../../hooks'
import classnames from 'classnames'
import FieldBlock from '../../FieldBlock'
import { MultiInputMask } from '../../../../components/input-masked'
import type { MultiInputMaskValue } from '../../../../components/input-masked'
import { HelpButton } from '../../../../components'
import useErrorMessage from '../../hooks/useErrorMessage'

type ExpiryValue = MultiInputMaskValue<'month' | 'year'>

export type ExpiryProps = FieldHelpProps & FieldProps<string>

function Expiry(props: ExpiryProps) {
  const sharedContext = useContext(SharedContext)
  const translations = sharedContext?.translation.Forms
  const placeholders =
    sharedContext?.translation.DatePicker.placeholder_characters

  const errorMessages = useErrorMessage(props.path, props.errorMessages, {
    required: translations.dateErrorRequired,
  })

  const validateRequired = useCallback(
    (value: string, { required, error }) => {
      return required && !value ? error : undefined
    },
    []
  )

  const preparedProps: ExpiryProps = {
    ...props,
    errorMessages,
    fromInput: toExpiryString,
    validateRequired,
  }

  const {
    id,
    className,
    label = translations.expiryLabel,
    error,
    hasError,
    info,
    warning,
    help,
    disabled,
    value = '',
    labelDescription,
    layout = 'vertical',
    ariaAttributes,
    handleFocus,
    handleBlur,
    handleChange,
  } = useDataValue(preparedProps)

  const expiry: ExpiryValue = {
    month: ensureValidMonth(value?.substring(0, 2)),
    year: value?.substring(2, 4) ?? '',
  }

  const status = hasError
    ? 'error'
    : warning
    ? 'warn'
    : info
    ? 'info'
    : null

  return (
    <FieldBlock
      className={classnames('dnb-forms-field-expiry', className)}
      id={id}
      forId={`${id}-input-month`}
      label={label}
      layout={layout}
      labelDescription={labelDescription}
      info={info}
      warning={warning}
      error={error}
      {...pickSpacingProps(props)}
    >
      <MultiInputMask
        stretch
        id={`${id}-input`}
        values={expiry}
        status={status}
        statusState={disabled ? 'disabled' : undefined}
        disabled={disabled}
        onChange={handleChange}
        onBlur={handleBlur}
        onFocus={handleFocus}
        delimiter="/"
        inputMode="numeric"
        inputs={[
          {
            id: 'month',
            label: sharedContext?.translation.DatePicker['month'],
            mask: getMonthMask(expiry?.month),
            placeholderCharacter: placeholders['month'],
            autoComplete: 'cc-exp-month',
            ...ariaAttributes,
          },
          {
            id: 'year',
            label: sharedContext?.translation.DatePicker['year'],
            mask: [/[0-9]/, /[0-9]/],
            placeholderCharacter: placeholders['year'],
            autoComplete: 'cc-exp-year',
            ...ariaAttributes,
          },
        ]}
        suffix={
          help ? (
            <HelpButton title={help.title}>{help.content}</HelpButton>
          ) : undefined
        }
      />
    </FieldBlock>
  )

  function toExpiryString(values: ExpiryValue) {
    return Object.values(values).join('')
  }

  function ensureValidMonth(month: string) {
    // Return empty value if no month is given
    if (!month) {
      return ''
    }

    const [firstMask, secondMask] = getMonthMask(month)

    const firstDigit = month?.charAt(0)
    const isFirstDigitValid = firstMask.test(firstDigit)

    if (firstDigit && !isFirstDigitValid) {
      // Return empty value if the first digit is invalid
      return ''
    }

    const seconDigit = month?.charAt(1)
    const isSecondDigitValid = secondMask.test(seconDigit)

    if (seconDigit && !isSecondDigitValid) {
      // Return empty value if the second digit is invalid
      return ''
    }

    // Return given month of month value is valid
    return month
  }

  function getMonthMask(month: string) {
    const firstDigit = month?.charAt(0)

    return [
      /[0-1]/,
      firstDigit === '0' || firstDigit === '' ? /[1-9]/ : /[0-2]/,
    ]
  }
}

Expiry._supportsEufemiaSpacingProps = true
export default Expiry
