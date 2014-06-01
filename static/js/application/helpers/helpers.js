Ember.Handlebars.helper('formattedDate', function(raw) {
  return moment(raw).format('LL');
});

Ember.Handlebars.helper('timeAgo', function(date){
    return moment(date).fromNow();
});