const _ = require('lodash')

const aggregateProduct = (dataObjects = []) => {
  const tags = _.sortBy(_.uniqBy( // take into account that tags can repeat in different data sources
    dataObjects.reduce((tags, currentItem) => [...tags, ...(currentItem.tags || [])], []),
    _.identity
  ))

  const images = _.sortBy(dataObjects.reduce((images, currentItem) => [...images, currentItem.image], [])).filter(Boolean)
  // I won't use unique here because I assume all the real world image links would be unique
  // I sort it for convenience so we can take last element and it would be highest res

  const title = dataObjects.map(i => i.title).filter(Boolean)[0]

  const description = dataObjects.map(i => i.description).filter(Boolean)[0]

  if (!title) {
    throw new Error('Title is required')
    // It's seems to me that title is a required field
    // I also assume all other fields are not required
  }

  return Object.fromEntries(Object.entries({ title, description, tags, images }).map(([key, value]) => value ? [key, value] : null).filter(i => i)) // no need for { key: undefined }
}

module.exports = aggregateProduct
