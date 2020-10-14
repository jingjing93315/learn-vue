// const obj = {}

function defineReactive(obj, key, val){
    observe(val)
    Object.defineProperty(obj,key, {
        get(){
            console.log(`get ${key}: ${val}`);
            return val
        },
        set(newVal){
            if(newVal !== val){
                observe(newVal)
                val = newVal
                console.log(`set ${key}: ${newVal}`);
            }
        }
    })
}

function observe(obj){
    if(typeof obj !== 'object' || obj === null){
        return 
    }
    Object.keys(obj).forEach(key => {
        defineReactive(obj, key, obj[key])
    })
}

function set(obj, key, val){
    defineReactive(obj,key, val)
}

function deleteKey(obj,key){
    delete obj[key]
}

// defineReactive(obj, 'foo', 'foo')


// obj.foo
// obj.foo = 'foooooooooo'

let obj = {
    foo: 'foo',
    bar: 'bar',
    baz: 1
}
observe(obj)

// obj.foo
// obj.foo = '哈哈哈'

// obj.baz = { a: 2}
// obj.baz.a

set(obj, 'dong', 'dong')
// delete(obj, dong)