import type { SubscribeFormParmeters, SubscribeFormData } from '../../types/types'
import styled from 'styled-components'
import SimpleBlockContent from '../../common/SimpleBlockContent'
import { TitleBlockRenderer } from '../../common/serializers'
import { Button, TextField, Checkbox, Icon } from '@equinor/eds-core-react'
import { useForm, Controller } from 'react-hook-form'
import { error_filled } from '@equinor/eds-icons'
import { useRouter } from 'next/router'

const StyledHeading = styled(TitleBlockRenderer)`
  padding: 0 0 var(--space-large) 0;
`
const Container = styled.div`
  padding: var(--space-3xLarge) var(--layout-paddingHorizontal-large);
  max-width: var(--maxViewportWidth);
  margin: auto;
`

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: right;
  padding: var(--space-medium) 0px var(--space-medium) 0px;
`
const TextFieldWrapper = styled.div`
  padding: var(--space-small) 0px var(--space-medium) 0px;
  p {
    color: var(--clear-red-100);
  }
`

const StyledFieldset = styled.fieldset`
  border: 0;
  padding: 0;
  margin-inline-start: 0;
  margin-inline-end: 0;
  padding-block-start: 0;
  padding-inline-start: 0;
  padding-inline-end: 0;
  padding-block-end: 0;
`
const StyledLegend = styled.legend`
  font-weight: var(--fontWeight-regular);
  font-size: var(--typeScale-2);
  padding: 0 0 var(--space-small) 0;
`
const UnstyledList = styled.ul`
  margin: -12px;
  padding: var(--space-medium) 0 var(--space-large) 0px;
  list-style-type: none;
  column-count: 2;
  @media (max-width: 920px) {
    column-count: 1;
  }
`
const StyledButton = styled(Button)`
  padding-left: var(--space-xLarge);
  padding-right: var(--space-xLarge);
`
const ErrorStyledDiv = styled.div`
  font-weight: var(--fontWeight-regular);
  font-size: var(--typeScale-1);
  color: var(--clear-red-100);
  align-items: center;
  display: flex;
`
const StyledIcon = styled(Icon)`
  margin-left: var(--space-small);
`

const StyledCheckbox = styled(Checkbox)`
  margin: 8px 0;
`

type FormValues = {
  firstName: string
  email: string
  categories: string[]
}

const SubscribeForm = ({ data: { title } }: { data: SubscribeFormData }) => {
  const router = useRouter()
  const onSubmit = async (data: FormValues) => {
    const allCategories = data.categories.includes('all')
    const subscribeFormParamers: SubscribeFormParmeters = {
      firstName: data.firstName,
      email: data.email,
      crudeOilAssays: allCategories || data.categories.includes('crudeOilAssays'),
      generalNews: allCategories || data.categories.includes('generalNews'),
      stockMarketAnnouncements: allCategories || data.categories.includes('stockMarketAnnouncements'),
      magazineStories: allCategories || data.categories.includes('magazineStories'),
      loopStories: allCategories || data.categories.includes('loopStories'),
      languageCode: router.locale == 'no-nb' ? 'no' : 'en',
    }
    /*const res = await fetch('/api/subscribe-form', {
      body: JSON.stringify(subscribeFormParamers),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    })
    const result = await res.json()
    if (result.statusCode != 200) console.error(result)*/
    console.log(subscribeFormParamers)
    reset()
  }

  const {
    handleSubmit,
    control,
    register,
    reset,
    formState: { errors },
  } = useForm()

  return (
    <>
      <Container>
        {title && (
          <SimpleBlockContent
            blocks={title}
            serializers={{
              types: {
                block: (props) => <StyledHeading {...props} />,
              },
            }}
          />
        )}
        {/* @TODO Norwegian translations for labels and button text*/}
        <form onSubmit={handleSubmit(onSubmit)}>
          <StyledFieldset>
            <StyledLegend>Let us know what you’re interested in</StyledLegend>

            {errors.categories && (
              <ErrorStyledDiv role="alert" id="atleast-one-category-required">
                <span>Please select at least one category</span>
                <StyledIcon data={error_filled} aria-hidden="true" />
              </ErrorStyledDiv>
            )}

            <UnstyledList>
              <li>
                <StyledCheckbox
                  label="General news"
                  value="generalNews"
                  aria-describedby="atleast-one-category-required"
                  {...register('categories', {
                    validate: (values) => values.length > 0,
                  })}
                  aria-invalid={errors.categories ? 'true' : 'false'}
                />
              </li>
              <li>
                <StyledCheckbox
                  label="Magazine stories"
                  aria-invalid={errors.categories ? 'true' : 'false'}
                  aria-describedby="atleast-one-category-required"
                  value="magazineStories"
                  {...register('categories')}
                />
              </li>
              <li>
                <StyledCheckbox
                  label="Stock market announcements"
                  value="stockMarketAnnouncements"
                  aria-invalid={errors.categories ? 'true' : 'false'}
                  aria-describedby="atleast-one-category-required"
                  {...register('categories')}
                />
              </li>
              <li>
                <StyledCheckbox
                  label="Crude oil assays"
                  aria-invalid={errors.categories ? 'true' : 'false'}
                  aria-describedby="atleast-one-category-required"
                  value="crudeOilAssays"
                  {...register('categories')}
                />
              </li>
              <li>
                <StyledCheckbox
                  label="Loop stories"
                  aria-invalid={errors.categories ? 'true' : 'false'}
                  aria-describedby="atleast-one-category-required"
                  value="loopStories"
                  {...register('categories')}
                />
              </li>
              <li>
                <StyledCheckbox
                  label="All"
                  aria-invalid={errors.categories ? 'true' : 'false'}
                  aria-describedby="atleast-one-category-required"
                  value="all"
                  {...register('categories')}
                />
              </li>
            </UnstyledList>
          </StyledFieldset>
          <Controller
            name="firstName"
            control={control}
            rules={{
              required: 'Please fill out your name',
            }}
            render={({ field: { ref, ...props }, fieldState: { invalid, error } }) => (
              <TextFieldWrapper>
                <TextField
                  {...props}
                  id={props.name}
                  label="First Name"
                  inputRef={ref}
                  inputIcon={invalid ? <Icon data={error_filled} title="error" /> : undefined}
                  helperText={error?.message}
                  variant={invalid ? 'error' : 'default'}
                  aria-invalid={invalid ? 'true' : 'false'}
                />
              </TextFieldWrapper>
            )}
          />
          <Controller
            name="email"
            control={control}
            rules={{
              required: 'Please fill out a valid email address',
              pattern: {
                value: /^[\w!#$%&'*+/=?`{|}~^-]+(?:\.[\w!#$%&'*+/=?`{|}~^-]+)*@(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,6}$/g,
                message: 'Please fill out a valid email address',
              },
            }}
            render={({ field: { ref, ...props }, fieldState: { invalid, error } }) => (
              <TextFieldWrapper>
                <TextField
                  {...props}
                  id={props.name}
                  label="Email"
                  inputRef={ref}
                  inputIcon={invalid ? <Icon data={error_filled} title="error" /> : undefined}
                  helperText={error?.message}
                  variant={invalid ? 'error' : 'default'}
                  aria-invalid={invalid ? 'true' : 'false'}
                />
              </TextFieldWrapper>
            )}
          />
          <ButtonWrapper>
            <StyledButton type="submit">Subscribe</StyledButton>
          </ButtonWrapper>
        </form>
      </Container>
    </>
  )
}
export default SubscribeForm
