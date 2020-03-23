const files = require.context('.', false, /\.vue$/)
const actions = {}

files.keys().forEach(key => {
  actions[key.replace(/(\.\/|\.vue)/g, '')] = files(key).default
})

export default actions
