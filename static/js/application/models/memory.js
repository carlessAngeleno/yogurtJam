Memories.Memory = DS.Model.extend({
  title: DS.attr('string'),
  isCompleted: DS.attr('boolean')
});

// FIXTURE
// Memories.Memory.FIXTURES = [
//  {
//    id: 1,
//    title: 'Learn Ember.js',
//    isCompleted: true
//  },
//  {
//    id: 2,
//    title: '...',
//    isCompleted: false
//  },
//  {
//    id: 3,
//    title: 'Profit!',
//    isCompleted: false
//  }
// ];