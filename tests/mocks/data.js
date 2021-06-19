const randomWords = require('random-words')

const dataExample = {
  title: 'Lorem Ipsum',
  description: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
  image: null, // so that Object.entries had 4 fields, doesn't matter the value, well set it later
  tags: null, // same here
  priority: null // priority of data source, later will use this to sort
}

const numberOfDataSources = 100 // hardcode number of data sources for simplicity

const keyToFn = {
  tags: () => randomWords(Math.floor(Math.random() * 6)),
  image: () => `https://via.placeholder.com/${Math.floor(Math.random() * 150) + 100}`,
  priority: () => Math.floor(Math.random() * numberOfDataSources) + 1 // hardcode number of data sources for simplicity
}

const defaultFn = value => Math.random() > .5 ? value : ''

const incompleteData = (new Array(numberOfDataSources).fill(0))
  .map(() => 
    Object.fromEntries(
      Object.entries(dataExample)
        .map(([key, value]) => ([
          key,
          (keyToFn[key] || defaultFn)(value)
        ]))
    )
  )

module.exports = { array: incompleteData, item: dataExample }