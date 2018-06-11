let _thisView;

export default {
    setThis(_this) {
        _thisView = _this
    },
    addOne(){
        console.log(this)
        // _thisView.setState({count: _thisView.state.count + 1})
        this.setState({count: this.state.count + 1})
    }
}