const path = require('path')
const merge = require('deepmerge')
const FsDriver = require('./FsDriver')

class VuexPersist {
  /**
   * Constructor.
   * @param {object} options
   */
  constructor(options) {
    this.options = Object.assign({
      path: null,
      file: 'store.json',
      reducer: null,
      mutations: [],
      driver: null
    }, options)

    this.driver = options.driver || new FsDriver()
  }

  /**
   * Persist the state to file.
   * @param {object} state
   */
  saveState(state) {
    let data = JSON.stringify(this.options.reducer ? this.options.reducer(state, this.options) : state)
    this.driver.write(
      this.options.path,
      data
    )
  }

  /**
   * Load the state from file.
   * @param {object} store
   */
  loadState(store) {
    try {
      let data = this.driver.read(this.options.path)
      store.replaceState(merge(store.state, JSON.parse(data)))
    } catch (err) { console.log(err) }
  }

  /**
   * Subscribe to the Vuex store.
   * @returns {function}
   */
  subscribe() {
    return (store) => {
      this.loadState(store)

      store.subscribe((mutation, state) => {
        if (this._mutation(mutation.type)) {
          this.saveState(state)
        }
      })
    }
  }

  /**
   * Checks if a mutation is in the list of allowed
   * mutations.
   * @param {string} type
   * @returns {boolean}
   * @private
   */
  _mutation(type) {
    return !this.options.mutations.length ||
      this.options.mutations.includes(type)
  }
}

module.exports = VuexPersist
