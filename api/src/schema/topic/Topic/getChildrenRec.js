// // TODO:
// const getChildrenRec = async (_, {name, level}, {session}) => {
//   const _1 =
//   `MATCH (t:Topic {name: $name})
//   <-[:IS_PART_OF*1..$level]-
//   (t:Topic)
//   RETURN `

//   await session.run()
// }

// export default getChildrenRec