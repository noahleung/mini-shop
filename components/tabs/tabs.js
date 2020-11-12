Component({
  data: {},
  properties: {
    tabs: {
      type: Array,
      value: []
    }
  },
  methods: {
    change(e){
      let index = e.currentTarget.dataset.index
      this.triggerEvent('changeItem',index)
    }
  }
})