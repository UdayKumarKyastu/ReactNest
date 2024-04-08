import React, { FC, useCallback, useState, useRef, forwardRef, useEffect } from 'react'
import { Chevron } from '@pretamanger/component-library'
import DayPickerInput from 'react-day-picker/DayPickerInput'
import {
  DayPickerInputProps,
  NavbarElementProps,
  CaptionElementProps,
} from 'react-day-picker/types/Props'
import { DateUtils } from 'react-day-picker'
import 'react-day-picker/lib/style.css'
import { DatepickerStyles } from './Datepicker.styles'
import { Calendar } from '../../../../icons/Calendar'
import { parse as dateFnsParse } from 'date-fns'
import { Dropdown } from '../Dropdown/Dropdown'

const { DatePickerInput, Wrapper, StyledNavbar } = DatepickerStyles

export declare namespace DatePicker {
  export interface Props {
    id: string
    label: string
    onChange?(date?: Date | string): void
    value?: Date | string | null
    format?: string
    locale?: string
  }

  export interface YearMonthFormProps {
    date: Date
    localeUtils: CaptionElementProps['localeUtils']
    onChange(date: { year: number; month: number }): void
  }
}

export const parseDate = (dateString: string, format: string) => {
  const parsed = dateFnsParse(dateString, format, new Date())

  if (DateUtils.isDate(parsed)) {
    return parsed
  }

  return undefined
}

export const formatDate = (date: Date, format: string, locale: string) => {
  if (date) {
    return new Intl.DateTimeFormat(locale).format(date)
  }

  return ''
}

const currentYear = new Date().getFullYear()
const fromMonth = new Date(currentYear, 0)
const toMonth = new Date(currentYear + 10, 11)

const YearMonthForm: FC<DatePicker.YearMonthFormProps> = ({ date, localeUtils, onChange }) => {
  const months = localeUtils.getMonths()

  const years = []
  for (let i = fromMonth.getFullYear(); i <= toMonth.getFullYear(); i += 1) {
    years.push(i)
  }

  const handleMonthChange = useCallback(
    (option) => {
      onChange({ year: date.getFullYear(), month: option.key })
    },
    [date, onChange],
  )

  const handleYearChange = useCallback(
    (option) => {
      onChange({ year: option.label, month: date.getMonth() })
    },
    [date, onChange],
  )

  return (
    <div className="DayPicker-Caption">
      <Dropdown
        value={{ key: date.getMonth(), label: months[date.getMonth()] }}
        id="month"
        label="Month"
        onChange={handleMonthChange}
        options={months.map((month: string, i: number) => ({ key: i, label: month }))}
      />
      <Dropdown
        value={{ key: date.getFullYear(), label: date.getFullYear().toString() }}
        id="year"
        label="year"
        onChange={handleYearChange}
        options={years.map((year) => ({ key: year, label: year.toString() }))}
      />
    </div>
  )
}

const Navbar: FC<NavbarElementProps> = ({ onPreviousClick, onNextClick }) => {
  return (
    <StyledNavbar>
      <Chevron
        type="left"
        onClick={() => onPreviousClick()}
        data-testid="datepicker-arrow-previous"
      />
      <Chevron type="right" onClick={() => onNextClick()} data-testid="datepicker-arrow-next" />
    </StyledNavbar>
  )
}

export const Datepicker: FC<DatePicker.Props> = ({
  id,
  label,
  value,
  onChange,
  locale,
  format = 'dd/MM/yyyy',
}) => {
  const [currentMonth, setCurrentMonth] = useState(fromMonth)
  const dayPickerRef = useRef<HTMLDivElement>(null)
  const dayPickerInputRef = useRef<DayPickerInput>(null)

  /* eslint-disable react/display-name */
  const inputComponent = forwardRef((props: DayPickerInputProps, ref) => (
    <DatePickerInput
      id={id}
      label={label}
      {...props}
      ref={ref}
      adornment={<Calendar size={24} />}
    />
  ))

  const handleYearMonthChange = useCallback((date) => {
    setCurrentMonth(new Date(date.year, date.month))
  }, [])

  const captionElement: FC<CaptionElementProps> = ({ date, localeUtils }) => (
    <YearMonthForm date={date} localeUtils={localeUtils} onChange={handleYearMonthChange} />
  )

  useEffect(() => {
    document.addEventListener('mousedown', handleOutsideOverlayClick)

    return () => {
      document.removeEventListener('mousedown', handleOutsideOverlayClick)
    }
  }, [])

  const handleOutsideOverlayClick = (e: MouseEvent) => {
    if (dayPickerRef && !dayPickerRef.current?.contains(e.target as Node)) {
      dayPickerInputRef.current?.hideDayPicker()
    }
  }

  const handleChange = useCallback(
    (date: Date) => {
      onChange?.(date)
    },
    [onChange],
  )

  return (
    <Wrapper data-cy="day-picker-input" ref={dayPickerRef}>
      <DayPickerInput
        value={value!}
        format={format}
        formatDate={formatDate}
        parseDate={parseDate}
        ref={dayPickerInputRef}
        component={inputComponent}
        inputProps={{ ref: null, readOnly: true }}
        placeholder=""
        dayPickerProps={{
          navbarElement: Navbar,
          captionElement: captionElement,
          locale: locale,
          month: currentMonth,
          fromMonth: fromMonth,
          toMonth: toMonth,
        }}
        onDayChange={(date: Date) => handleChange(date)}
      />
    </Wrapper>
  )
}
