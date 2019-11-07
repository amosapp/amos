/* eslint-disable max-lines */
import {
  React, R, useState, H, useCallback, CONST,
  AmosChat, Button, Title, Input, RadioGroup, Hr
} from 'common'
import {useReviewTopics} from '../review-hook'
import Buttons from '../buttons'
import top from '../review-top.sc'
import inputForm from '../input-form.sc'

const View = (props) => {
  const [checked, setChecked] = useState ([])
  const setOneChecked = useCallback ((key) => val => {
    setChecked (H.update (key) (val))
  })
  const {
    results, messages, times, onChange, loading,
    onSubmit, onClick, form, onEnt, valid, checkboxesValid
  } = useReviewTopics (`prerequisite`) ({...props, setOneChecked})

  return <div css={top} {...props}>
    <AmosChat>
      {messages}
    </AmosChat>
    <div css={inputForm}>
      <Title>Prerequisites</Title>
      <Buttons>
        <form onSubmit={onSubmit.previous}>
          <Button type='submit'>
            Previous
          </Button>
        </form>
        <form onSubmit={onSubmit.finish}>
          <Button primary type='submit'>
            Finish
          </Button>
        </form>
      </Buttons>
      {R.times (
        (key,
          res = results?.prerequisite?.[key]) => (
          <React.Fragment key={key}>
            <RadioGroup
              header='I:'
              name={`prerequisite[${key}].strength`}
              elements={CONST.elements.strength}
              _key={key}
              onClick={(e, _checked) => onClick [3 * key] (e, key, `strength`, _checked)}
              checked={checked?.[3 * key]}
              setChecked={setOneChecked (3 * key)}
              {...{form}}
            />
            <RadioGroup
              header='for people to be atleast:'
              name={`prerequisite[${key}].level`}
              elements={CONST.elements.level}
              _key={key}
              onClick={(e, _checked) => onClick [3 * key + 1] (e, key, `level`, _checked)}
              footer='in:'
              checked={checked?.[3 * key + 1]}
              setChecked={setOneChecked (3 * key + 1)}
              {...{form}}
            />
            <Input
              name={`prerequisite[${key}].topic`}
              ref={form.register}
              key={key}
              _key={key}
              link={false}
              loading={loading}
              errors={form.errors [name]}
              results={res}
              onClick={e => onClick [3 * key + 2] (e, key)}
              valid={valid[key] && checkboxesValid[key]}
              onChange={onChange[key]}
              onEnt={onEnt}
              {...props}
            />
            <Hr/>
          </React.Fragment>
        )) (times)}
    </div>
  </div>
}

export default H.styled (View) ``