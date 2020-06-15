Component({
  data: {

  },
  properties: {
    tabs: {
      type: Array,
      value: []
    }
  },
  methods: {
    handleItemTap: function (e) {
      const { index } = e.currentTarget.dataset
      //触发父组件的事件 
      this.triggerEvent("tabsItemChange",{index});
    }
  }
})