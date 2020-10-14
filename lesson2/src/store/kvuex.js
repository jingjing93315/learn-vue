const { default: Vue } = require("vue")

let Vue

class Store{
    constructor(options= {}) {
        this._mutations = options.mutations || {}
        this._actions = options.actions || {}

        this._wrappedGetters = options._wrappedGetters
        
        const computed = {}

        this.getters= {}


        Object.keys(this._wrappedGetters).forEach(key => {
            const fn = store._wrappedGetters[key]

            computed[key] = function(){
                return fn(store.state)
            }

            Object.defineProperty(store.getters, key, {
                get: () => store._vm[key]
            })
        })

        const store = this
        const {commit, action} = store

        this.commit = function boundCommit(type, payload){
            commit.call(store, type, payload)
        }
        this.action = function boundAction(type, payload){
            return action.call(store, type, payload)
        }
        this._vm = new Vue({
            data: {
                $$state: options.state
            },
            computed
        })
    }
    get state(){
        return this._vm._data.$$state
    }

    set state(v){
        console.error('please use replaceState to reset state');
    }

    commit(type, payload){
        const entry = this._mutations[type]
        if(!entry){
            console.error(`known mutations type: ${type}`);
            return
        }

        entry(this.state, payload)
    }
    dispatch(type, payload){
        const entry = this._actions[type]
        if(!entry) {
            console.error(`unknown action type:${type}`);
            return
        }
        return entry(this, payload)
    }
    
}

function install(_Vue){
    Vue = _Vue
    Vue.mixin({
        beforeCreate(){
            if(this.$options.store){
                Vue.prototype.$store = this.$options.store
            }
        }
    })
}

export default { Store, install }