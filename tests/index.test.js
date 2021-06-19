const aggregateProduct = require('..')

test('Product after aggregation merges tags from all sources', () => {
  const tags1 = ['test', 'test1']
  const tags2 = ['test_tag_1', 'test', 'test_tag_2']
  const exampleDataSource1 = { title: 'title', tags: tags1 }
  const exampleDataSource2 = { title: 'title', tags: tags2 }

  const expectedOutput = { title: 'title', images: [], tags: ['test', 'test1', 'test_tag_1', 'test_tag_2'] }

  const funcRes = aggregateProduct([exampleDataSource1, exampleDataSource2])

  expect(funcRes).toStrictEqual(expectedOutput);
});

test('Product after aggregation merges images from all sources in correct order', () => {
  const image1 = 'https://via.placeholder.com/300'
  const image2 = 'https://via.placeholder.com/150'
  const image3 = 'https://via.placeholder.com/250'
  const exampleDataSource1 = { title: 'title', image: image1, tags: [] }
  const exampleDataSource2 = { title: 'title', image: image2, tags: [] }
  const exampleDataSource3 = { title: 'title', image: image3, tags: [] }

  const expectedOutput = { title: 'title', tags: [], images: ['https://via.placeholder.com/150', 'https://via.placeholder.com/250', 'https://via.placeholder.com/300'] }

  expect(aggregateProduct([exampleDataSource1, exampleDataSource2, exampleDataSource3])).toStrictEqual(expectedOutput);
});

test('Product aggregation throws if there are no title', () => {
  expect(() => aggregateProduct([{}])).toThrow('Title is required')
});

test('Product aggregation returns object with only title(and empty arrays) because it\'t single required fields', () => {
  expect(aggregateProduct([{ title: 'title' }])).toStrictEqual({ title: 'title', images: [], tags: [] })
});