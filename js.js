
Vue.component('data-table', {
  render: function (createElement) {
    return createElement(
      "table", null, []
      )
  },
  props: ['cuerpotabla'],
  data() {
    return {
      headers: [
        { title: 'Id' },
        { title: 'Title' },
        { title: 'estado' },
        ],
      rows: [] ,
      dtHandle: null
    }
  },
  watch: {
    cuerpotabla(val) {
		console.log('Segundo--Json ',val);
      let vm = this;
      vm.rows = [];
	  console.log('Tercero----',vm.rows);
      val.forEach(function (item) {
        let row = [];
        row.push(item.id);
        row.push(item.title);
        row.push(item.completed);
        vm.rows.push(row);
		
      });
	  console.log('cuarto----- ',vm.rows);
      vm.dtHandle.clear();
      vm.dtHandle.rows.add(vm.rows);
      vm.dtHandle.draw();
    }
  },
  mounted() {
    let vm = this;
    vm.dtHandle = $(this.$el).DataTable({
      columns: vm.headers,
      data: vm.rows,
      searching: true,
      paging: true,
      info: false
    });
  }  
});

var vm=new Vue({
  el: '#tabledemo',
  data: {
    cuerpotabla: [], //es el mismo del html
    search: ''
  },
  computed: {
    filteredComments: function () {
      let self = this
      let buscar = self.search.toLowerCase()
      return self.cuerpotabla.filter(function (comentario) {
        return  comentario.title.toLowerCase().indexOf(buscar) !== -1
          
          
      })
    }
  },
  mounted() {
    $.ajax({
     //url: 'https://jsonplaceholder.typicode.com/comments',
	 url: 'https://jsonplaceholder.typicode.com/todos',
      success(res) {
        vm.cuerpotabla = res;
		console.log('Primero...',vm.cuerpotabla);
      }
    });
  }
});