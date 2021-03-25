import { FormattedDate as ReactIntlDate } from 'react-intl'
import { DateProps, StyledDate, DateIcon } from './shared'

export const FormattedDate = ({
  datetime,
  year = 'numeric',
  month = 'long',
  day = '2-digit',
  withIcon = false,
}: DateProps): JSX.Element => {
  if (withIcon) {
    return (
      <StyledDate>
        <DateIcon />
        <ReactIntlDate value={new Date(datetime)} year={year} month={month} day={day} />
      </StyledDate>
    )
  }

  return <ReactIntlDate value={new Date(datetime)} year={year} month={month} day={day} />
}
