let response = {
    _body:'',
    get body(){
        return this._body
    },
    set body(newValue){
        this._body = newValue
    }
}
module.exports = response