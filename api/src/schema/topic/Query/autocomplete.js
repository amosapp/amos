import {H} from 'common'

// const _1 = `
// match (t:Topic)
// unwind t.names as name
// with t, name, toLower (name) as nameLower, toLower ($str) as strLower
// with t, name, strLower, split (nameLower, ' ') as nameWords
// unwind nameWords as word
// with t, name, strLower, word
// where word starts with strLower
// return t,name
// limit $first
// `

const _1 = `
match (t:Topic)
unwind t.names as name
with t, name, toLower (name) as nameLower, toLower ($str) as strLower
where nameLower contains strLower
return t,name
limit $first
`

const autocomplete = async (_, {input}, {session}) => {
  const {records: recs} = await session.run (_1, input)
  const results = recs.map (rec => ({
    topic: {...rec.get (`t`).properties, _id: rec.get (`t`).identity.low},
    name: rec.get (`name`),
  }))
  return {results}
}

export default H.wrapInResponse (autocomplete)